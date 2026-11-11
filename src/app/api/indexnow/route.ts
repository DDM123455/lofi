import sitemap from '@/app/sitemap'

/**
 * Daily IndexNow ping (Vercel Cron, see vercel.json). Submits sitemap URLs changed in the last
 * few days to IndexNow, which shares them with Bing, Yandex, Naver, Seznam and others. Bing's
 * index also feeds ChatGPT search, so new pages surface there faster too.
 *
 * Auth: Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set. Without a
 * secret, only Vercel's cron user agent is accepted.
 */
const HOST = 'www.focusworkspace.app'
const KEY = 'c9573634f5f446a04dde2a4d38b1d4bb' // public by design: also served at /<key>.txt
const RECENT_DAYS = 3

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  const ua = req.headers.get('user-agent') ?? ''
  if (secret ? auth !== `Bearer ${secret}` : !ua.startsWith('vercel-cron')) {
    return new Response('Unauthorized', { status: 401 })
  }

  const all = new URL(req.url).searchParams.get('all') === '1'
  const since = Date.now() - RECENT_DAYS * 864e5
  const urlList = sitemap()
    .filter(e => all || (e.lastModified && new Date(e.lastModified).getTime() >= since))
    .map(e => e.url)
    .slice(0, 10000)

  if (!urlList.length) return Response.json({ submitted: 0 })

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  })
  return Response.json({ submitted: urlList.length, status: res.status })
}
