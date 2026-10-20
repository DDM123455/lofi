"""Make the background clips loop seamlessly.

Each clip is ~5.9s and its last frame doesn't match its first, so <video loop> visibly
jumps every few seconds. This rebuilds a clip C (N frames) as:

    C[D .. N-D)  then  crossfade( C[N-D .. N) -> C[0 .. D) )

so the output (N-D frames) ends exactly where it begins: the last output frame is
(almost) C[D-1] and playback wraps to C[D]. No new tools needed — decoding/encoding uses
Remotion's bundled ffmpeg (it has no xfade filter, so the blend is done here in numpy).

Usage:  python scripts/seamless-loop.py [clip.mp4 ...]   (default: every public/video/*.mp4)
Writes in place (originals are in git) and refreshes the matching -poster.jpg.
"""
import glob
import json
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image

FFMPEG = r"E:\WEB\lofispace-ads\node_modules\@remotion\compositor-win32-x64-msvc\ffmpeg.exe"
XFADE_SECONDS = 0.8


def probe(path):
    out = subprocess.run([FFMPEG, "-hide_banner", "-i", path], capture_output=True, text=True).stderr
    import re
    w, h = map(int, re.search(r"Video: .*?(\d{3,4})x(\d{3,4})", out).groups())
    fps = float(re.search(r"([\d.]+) fps", out).group(1))
    return w, h, fps


def decode(path, w, h):
    # This ffmpeg build has no rawvideo muxer, so frames go through PNG files on disk.
    with tempfile.TemporaryDirectory() as d:
        subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-i", path,
                        "-pix_fmt", "rgb24", os.path.join(d, "f%05d.png")], check=True)
        files = sorted(glob.glob(os.path.join(d, "f*.png")))
        return np.stack([np.asarray(Image.open(f).convert("RGB")) for f in files])


def encode(frames, path, w, h, fps):
    tmp = path + ".tmp.mp4"
    with tempfile.TemporaryDirectory() as d:
        for i, fr in enumerate(frames):
            Image.fromarray(fr).save(os.path.join(d, f"o{i:05d}.png"), compress_level=1)
        subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
                        "-framerate", str(fps), "-i", os.path.join(d, "o%05d.png"),
                        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
                        "-maxrate", "750k", "-bufsize", "1500k", "-pix_fmt", "yuv420p",
                        "-profile:v", "high", "-movflags", "+faststart", tmp], check=True)
    os.replace(tmp, path)


def seam(frames):
    """Mean abs difference between last and first frame vs. a typical step between frames."""
    f = frames.astype(np.int16)
    wrap = float(np.abs(f[-1] - f[0]).mean())
    step = float(np.mean([np.abs(f[i + 1] - f[i]).mean() for i in range(0, len(f) - 1, max(1, len(f) // 12))]))
    return wrap, step


def make_seamless(frames, fps):
    n = len(frames)
    d = max(2, round(XFADE_SECONDS * fps))
    body = frames[d:n - d]
    tail, head = frames[n - d:].astype(np.float32), frames[:d].astype(np.float32)
    t = (np.arange(1, d + 1) / (d + 1)).reshape(-1, 1, 1, 1)
    a = t * t * (3 - 2 * t)  # smoothstep: no visible "start/stop" of the blend
    blend = (tail * (1 - a) + head * a).round().clip(0, 255).astype(np.uint8)
    return np.concatenate([body, blend])


def main():
    paths = sys.argv[1:] or sorted(glob.glob(os.path.join(os.path.dirname(__file__), "..", "public", "video", "*.mp4")))
    report = {}
    for path in paths:
        w, h, fps = probe(path)
        frames = decode(path, w, h)
        before = seam(frames)
        out = make_seamless(frames, fps)
        after = seam(out)
        encode(out, path, w, h, fps)
        poster = path[:-4] + "-poster.jpg"
        Image.fromarray(out[0]).save(poster, quality=82, optimize=True, progressive=True)
        name = os.path.basename(path)
        report[name] = {"frames": [len(frames), len(out)], "seam_before": round(before[0], 1),
                        "seam_after": round(after[0], 1), "normal_step": round(after[1], 1),
                        "kb": os.path.getsize(path) // 1024}
        print(name, json.dumps(report[name]), flush=True)


if __name__ == "__main__":
    main()
