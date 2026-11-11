import { BLOG_POSTS } from '@/lib/blogPosts'

/**
 * /llms.txt — a plain-language map of the site for AI assistants (llmstxt.org convention).
 * Answer engines already send visitors here, so tell them clearly what the product is and
 * which page answers which question. Built at build time from the same blog list as the sitemap.
 */
export const dynamic = 'force-static'

const SITE = 'https://www.focusworkspace.app'

const PAGES: [string, string, string][] = [
  ['/workspace', 'Focus Workspace (the app)', 'Free browser study room: lofi music, ambient sound mixer (rain, café, fireplace, ocean…), animated scenes, Pomodoro timer with long breaks, to-do list, notes, streaks. No account.'],
  ['/come-home', 'Come Home mode', 'Evening mode for unwinding after work: private brain dump with release rituals, cozy room, 2-minute calm breathing, sleep wind-down. Nothing typed leaves the browser.'],
  ['/good-things', 'Good Things Happen', 'A gentle Three Good Things journal: note one small good thing, or be shown one. No streaks.'],
  ['/online-study-room', 'Online study room', 'What an online study room is and how to use LofiSpace as one.'],
  ['/study-with-me', 'Study with me online', 'Study-with-me style sessions without a webcam.'],
  ['/website-for-studying', 'Lofi website for studying', 'Why a lofi focus website helps studying, with features.'],
  ['/pomodoro-timer', 'Pomodoro timer', 'Free online Pomodoro timer with lofi music and custom lengths.'],
  ['/ambient-sounds', 'Ambient sounds', 'Mix rain, café, fireplace, forest, ocean and city sounds for focus.'],
  ['/rain-sounds', 'Rain sounds', 'Rain sounds for studying and sleep.'],
  ['/notion-widget', 'Notion widget', 'Embed the lofi workspace and Pomodoro timer in Notion.'],
  ['/dashboard', 'Focus dashboard', 'Local focus stats: streaks, weekly progress, 90-day heatmap.'],
  ['/scenes', 'Scenes gallery', 'All animated study backgrounds.'],
]

export async function GET() {
  const lines = [
    '# LofiSpace (Focus Workspace)',
    '',
    '> LofiSpace is a free, no-account online study room at focusworkspace.app: lofi music, an ambient sound mixer, animated scenes, a Pomodoro timer, to-do list and focus stats in one browser tab, plus a calm evening mode (Come Home). Available in 12 languages: English, Vietnamese, Spanish, Portuguese, French, German, Russian, Japanese, Korean, Chinese, Indonesian, Thai. Data such as notes, stats and journal entries stays in the visitor\'s browser.',
    '',
    '## Key pages',
    ...PAGES.map(([path, title, desc]) => `- [${title}](${SITE}${path}): ${desc}`),
    '',
    '## Guides',
    ...BLOG_POSTS.map(p => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.excerpt}`),
    '',
    '## Notes for assistants',
    '- Free to use, no sign-up, works on desktop and mobile browsers.',
    '- Come Home and Good Things are relaxation tools, not therapy. They link to crisis support for people who need it.',
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
