"""Make background clips loop seamlessly (and import new, longer ones).

A clip C of N frames is rebuilt as

    C[D .. N-D)  then  crossfade( C[N-D .. N) -> C[0 .. D) )

so it ends exactly where it begins (the last frame is ~C[D-1], playback wraps to C[D]).
Blending is harmless for a clip that already loops (it only trims D frames); pass --no-blend
to keep such a clip at full length. Note: even a frame-perfect loop keeps a small texture
"shimmer" at the wrap — the first frame is an I-frame whose compression noise differs from
the P-frames before it (measured ~2-4 mean abs diff vs ~0.5 for a normal step, regardless
of CRF). Longer clips simply make the wrap rarer. Remotion's bundled ffmpeg is used for decode/encode; it
has no xfade filter, so frames go through PNG files and the blend is done in numpy — only
the 2*D blended frames are ever held in memory, so long 1080p clips are fine.

Usage
  python scripts/seamless-loop.py                         # every public/video/*.mp4, in place
  python scripts/seamless-loop.py public/video/forest.mp4 # one clip, in place
  python scripts/seamless-loop.py D:/ai/forest-30s.mp4 --as forest [--no-blend]
        # import a new clip as public/video/forest.mp4 (+ forest-poster.jpg)

After replacing any clip, bump MEDIA_VERSION in src/lib/backgrounds.ts — /video/* is cached
immutable, so browsers would otherwise keep the old file for a year.
"""
import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import tempfile

import numpy as np
from PIL import Image

FFMPEG = r"E:\WEB\lofispace-ads\node_modules\@remotion\compositor-win32-x64-msvc\ffmpeg.exe"
VIDEO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "video")
XFADE_SECONDS = 0.8
MAX_WIDTH = 1280      # backgrounds sit under a dark overlay; larger only costs bandwidth
MAXRATE = "800k"      # keeps a 20 s clip around 2 MB


def probe(path):
    out = subprocess.run([FFMPEG, "-hide_banner", "-i", path], capture_output=True, text=True).stderr
    fps = float(re.search(r"([\d.]+) fps", out).group(1))
    return fps


def decode_to(path, d):
    """Decode every frame to d/f00001.png (downscaled to MAX_WIDTH, even dimensions)."""
    vf = f"scale='min({MAX_WIDTH},iw)':-2:flags=lanczos"
    subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-i", path, "-vf", vf,
                    "-pix_fmt", "rgb24", os.path.join(d, "f%05d.png")], check=True)
    return sorted(glob.glob(os.path.join(d, "f*.png")))


def load(p):
    return np.asarray(Image.open(p).convert("RGB")).astype(np.int16)


def diff(a, b):
    return float(np.abs(a - b).mean())


def encode_from(files, fps, out_path):
    with tempfile.TemporaryDirectory() as d:
        for i, f in enumerate(files):
            # Hard links / copies give ffmpeg a gap-free o00000.png sequence.
            dst = os.path.join(d, f"o{i:05d}.png")
            try:
                os.link(f, dst)
            except OSError:
                shutil.copyfile(f, dst)
        tmp = out_path + ".tmp.mp4"
        subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
                        "-framerate", str(fps), "-i", os.path.join(d, "o%05d.png"),
                        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
                        "-maxrate", MAXRATE, "-bufsize", "1600k", "-pix_fmt", "yuv420p",
                        "-profile:v", "high", "-movflags", "+faststart", tmp], check=True)
        os.replace(tmp, out_path)


def process(src, dst, blend=True):
    fps = probe(src)
    with tempfile.TemporaryDirectory() as d:
        files = decode_to(src, d)
        n = len(files)
        first, last = load(files[0]), load(files[-1])
        step = float(np.mean([diff(load(files[i]), load(files[i + 1]))
                              for i in range(0, n - 1, max(1, n // 10))]))
        seam_before = diff(last, first)
        k = max(2, round(XFADE_SECONDS * fps))
        if not blend:
            out_files, blended = files, False
        else:
            t = np.arange(1, k + 1) / (k + 1)
            a = t * t * (3 - 2 * t)  # smoothstep
            blend_files = []
            for j in range(k):
                fr = load(files[n - k + j]) * (1 - a[j]) + load(files[j]) * a[j]
                bp = os.path.join(d, f"b{j:05d}.png")
                Image.fromarray(fr.round().clip(0, 255).astype(np.uint8)).save(bp, compress_level=1)
                blend_files.append(bp)
            out_files, blended = files[k:n - k] + blend_files, True
        seam_after = diff(load(out_files[-1]), load(out_files[0]))
        encode_from(out_files, fps, dst)
        Image.open(out_files[0]).convert("RGB").save(dst[:-4] + "-poster.jpg", quality=82, optimize=True, progressive=True)
    return {"seconds": round(len(out_files) / fps, 1), "blended": blended,
            "seam_before": round(seam_before, 1), "seam_after": round(seam_after, 1),
            "normal_step": round(step, 1), "kb": os.path.getsize(dst) // 1024}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("clips", nargs="*")
    ap.add_argument("--as", dest="name", help="import the (single) clip as public/video/<name>.mp4")
    ap.add_argument("--no-blend", action="store_true", help="clip already loops (same first/last frame): don't crossfade")
    args = ap.parse_args()
    clips = args.clips or sorted(glob.glob(os.path.join(VIDEO_DIR, "*.mp4")))
    if args.name and len(clips) != 1:
        ap.error("--as takes exactly one clip")
    for src in clips:
        dst = os.path.join(VIDEO_DIR, args.name + ".mp4") if args.name else src
        print(os.path.basename(dst), json.dumps(process(src, dst, blend=not args.no_blend)), flush=True)
    print("\nNext: bump MEDIA_VERSION in src/lib/backgrounds.ts so browsers fetch the new files.")


if __name__ == "__main__":
    main()
