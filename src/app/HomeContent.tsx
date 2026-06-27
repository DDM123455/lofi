'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS } from '@/lib/blogPosts'

const ROOM_HREFS = [
  '/online-study-room',
  '/anime-study-room',
  '/coding-room',
  '/focus-room',
  '/deep-work-room',
]
const ROOM_EMOJIS = ['📚', '🌸', '💻', '🎯', '🧠']
const ROOM_COLORS = [
  'from-violet-700 to-violet-900',
  'from-pink-700 to-pink-900',
  'from-cyan-700 to-cyan-900',
  'from-indigo-700 to-indigo-900',
  'from-violet-800 to-indigo-900',
]

export function HomeContent() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0d14]">
      <Header />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/5 pb-24 pt-20 text-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)' }}
          />
          <div className="mx-auto max-w-4xl px-4">
            <span className="mb-5 inline-block rounded-full bg-violet-900/30 px-4 py-1.5 text-sm text-violet-300 ring-1 ring-violet-500/20">
              {t.home_badge}
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              {t.home_h1_prefix}{' '}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                {t.home_h1_accent}
              </span>
            </h1>
            <p className="mb-10 mx-auto max-w-2xl text-xl text-white/60 leading-relaxed">
              {t.home_desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/workspace"
                className="rounded-full bg-violet-600 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-900/40 hover:bg-violet-500 transition-all hover:scale-105"
              >
                {t.home_cta_open}
              </Link>
              <Link
                href="/scenes"
                className="rounded-full border border-white/15 bg-white/5 px-10 py-4 text-lg font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                {t.home_cta_scenes}
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/25">{t.home_cta_tagline}</p>
          </div>
        </section>

        {/* ── Study Rooms ─────────────────────────────────────────── */}
        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold text-white">{t.home_rooms_h2}</h2>
              <p className="text-white/45">{t.home_rooms_desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {ROOM_HREFS.map((href, i) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br ${ROOM_COLORS[i]} p-5 transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-900/30`}
                >
                  <span className="text-3xl">{ROOM_EMOJIS[i]}</span>
                  <span className="text-center text-sm font-semibold text-white leading-tight">
                    {t.home_room_labels[i]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────────── */}
        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold text-white">{t.home_feat_h2}</h2>
              <p className="text-white/45">{t.home_feat_desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {t.home_feat_items.map(f => (
                <div key={f.title} className="rounded-2xl border border-white/8 bg-white/4 p-5 transition-all hover:border-violet-500/30">
                  <div className="mb-3 text-3xl">{f.emoji}</div>
                  <h3 className="mb-1.5 font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────────── */}
        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-10 text-3xl font-bold text-white">{t.home_steps_h2}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {t.home_steps.map(s => (
                <div key={s.n} className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-700 text-xl font-bold text-white">
                    {s.n}
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-white/50">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Blog highlights ─────────────────────────────────────── */}
        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 flex items-baseline justify-between">
              <h2 className="text-3xl font-bold text-white">{t.home_blog_h2}</h2>
              <Link href="/blog" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                {t.home_blog_all}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.slice(0, 3).map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/4 transition-all hover:border-violet-500/35"
                >
                  <div
                    className="flex h-32 items-center justify-center text-4xl"
                    style={{ background: `linear-gradient(135deg, ${post.coverGradient[0]}, ${post.coverGradient[1]})` }}
                  >
                    {post.emoji}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-xs text-white/35">{post.category}</span>
                    <h3 className="flex-1 text-sm font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-xs text-white/35">{post.readTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-10 text-center text-3xl font-bold text-white">{t.home_faq_h2}</h2>
            <div className="space-y-4">
              {t.home_faq.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-white/8 bg-white/4 p-5">
                  <h3 className="mb-2 font-semibold text-white">{q}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <div
              className="rounded-3xl border border-violet-500/20 p-12"
              style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, rgba(13,13,20,0) 70%)' }}
            >
              <h2 className="mb-4 text-4xl font-bold text-white">{t.home_cta2_h2}</h2>
              <p className="mb-8 text-lg text-white/50">{t.home_cta2_desc}</p>
              <Link
                href="/workspace"
                className="inline-block rounded-full bg-violet-600 px-12 py-4 text-lg font-semibold text-white shadow-2xl shadow-violet-900/50 hover:bg-violet-500 transition-all hover:scale-105"
              >
                {t.home_cta2_btn}
              </Link>
              <p className="mt-4 text-sm text-white/25">{t.home_cta2_tagline}</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
