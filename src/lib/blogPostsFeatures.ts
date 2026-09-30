import type { BlogPost } from './blogPosts'

/**
 * "Product Updates" cluster — introduces features shipped in September 2026 (12 UI
 * languages, the Pomodoro rewrite, keyboard shortcuts / Zen mode, custom YouTube music,
 * faster scene loading, Come Home). Every post links to the roundup and at least one
 * sibling. Kept separate from blogPosts.ts purely for file size.
 */

const TRY = (lead: string, href = '/workspace', label = 'Open the workspace →') =>
  `<p><strong>${lead}</strong> <a href="${href}">${label}</a></p>`

export const FEATURE_POSTS: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'whats-new-lofispace-september-2026',
    title: "What's New in LofiSpace: 12 Languages, a Smarter Pomodoro and Come Home Mode",
    seoTitle: "What's New in LofiSpace (September 2026): Languages, Pomodoro, Come Home",
    excerpt: 'The biggest LofiSpace update so far: the workspace now speaks 12 languages, the Pomodoro timer gets long breaks and custom lengths, scenes load faster, YouTube music is more reliable, and there is a new evening mode called Come Home.',
    author: 'Alex Chen',
    category: 'Product Updates',
    readTime: 6,
    publishedAt: '2026-09-30',
    coverGradient: ['#1b1433', '#2a1f4a'],
    emoji: '✨',
    content: `
<p>LofiSpace started as a simple idea: lofi music, a few ambient sounds and a timer in one browser tab, free and without an account. This update keeps that promise — still free, still no sign-up — but reworks almost everything underneath. Here is what changed and where to find it.</p>

<h2>1. The workspace now speaks 12 languages</h2>
<p>The workspace, the homepage and Come Home mode are now available in <strong>English, Tiếng Việt, Español, Português, Français, Deutsch, Русский, 日本語, 한국어, 简体中文, Bahasa Indonesia and ไทย</strong>. LofiSpace picks the language your browser prefers on your first visit, and you can switch at any time from the language menu in the header or from the <em>More (⋯)</em> menu inside the workspace. Dates, weekdays and weather descriptions follow the language you pick.</p>
<p>Full details: <a href="/blog/lofispace-in-your-language">LofiSpace in your language</a>.</p>

<h2>2. A Pomodoro timer that behaves like a real one</h2>
<p>The timer was rebuilt from scratch. It now supports <strong>long breaks</strong> after a set number of focus sessions, <strong>custom lengths</strong> for focus, short and long breaks, an <strong>auto-start</strong> toggle, a <strong>skip</strong> button, and a <strong>daily goal</strong> with a progress bar. It also keeps accurate time when the tab is in the background and resumes where it left off if you reload the page.</p>
<p>When a phase ends you hear a soft chime, the browser tab shows the countdown, and — if you allow notifications — you get a quiet desktop notification while you're in another tab.</p>
<p>Full details: <a href="/blog/pomodoro-timer-long-breaks-custom-lengths">the new Pomodoro timer</a>.</p>

<h2>3. Keyboard shortcuts and Zen mode</h2>
<p>You can now drive the workspace without touching the mouse: <kbd>Space</kbd> plays or pauses, <kbd>F</kbd> goes fullscreen, <kbd>P</kbd> and <kbd>N</kbd> show or hide the Pomodoro and To-Do panels, <kbd>Z</kbd> toggles Zen mode and <kbd>?</kbd> shows the full list. Zen mode hides everything except the timer and clock, so it's just you, the scene and the music.</p>
<p>Full details: <a href="/blog/lofispace-keyboard-shortcuts-zen-mode">keyboard shortcuts and Zen mode</a>.</p>

<h2>4. Scenes appear instantly</h2>
<p>Animated background scenes used to wait for the whole app to load before they appeared, and some clips were several megabytes. Now the scene you last used shows up immediately — even before the rest of the workspace is ready — and every clip has been re-encoded to be much lighter with no visible loss of quality. All eleven scenes together are now smaller than a single clip used to be.</p>

<h2>5. More reliable YouTube music</h2>
<p>The music player was rewritten to be quicker and more forgiving:</p>
<ul>
  <li>Switching stations is near-instant — the player is reused instead of rebuilt.</li>
  <li>If a station goes offline, LofiSpace moves to the next working one automatically.</li>
  <li>If your browser blocks sound from starting automatically (common on iPhone and iPad), you'll see a <strong>Tap to play music</strong> button instead of silence.</li>
  <li>Your own YouTube link is now remembered after a reload.</li>
</ul>
<p>Full details: <a href="/blog/play-your-own-youtube-music-lofispace">play your own YouTube music</a>.</p>

<h2>6. Come Home: a quiet evening mode</h2>
<p>Not every session is about productivity. <a href="/come-home">Come Home</a> is a separate, gentle mode for the end of the day: write down what's on your mind and let it go, keep one good moment as a star, breathe slowly for two minutes, or simply sit in a cozy night room with soft rain. Nothing you write leaves your device. Switch to it with the 🌙 button at the top of the workspace, or open it directly: <a href="/workspace?mode=home">Come Home →</a>.</p>

<h2>What stays the same</h2>
<p>Everything is still free, with no account and no download. Your settings still live in your browser and in the workspace URL, so the <a href="/notion-widget">Notion embed</a> you set up before keeps working exactly as it did.</p>
${TRY('Try the update now:')}
    `.trim(),
    faq: [
      { q: 'Do I need to do anything to get the update?', a: 'No. Reload the workspace and you are on the new version. Your saved scene, sounds, to-dos and statistics are kept.' },
      { q: 'Is LofiSpace still free?', a: 'Yes. Every feature in this update is free and works without an account.' },
      { q: 'Will my Notion embed break?', a: 'No. Existing workspace URLs keep working. New options such as custom Pomodoro lengths can be added to the URL if you want them.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'lofispace-in-your-language',
    title: 'LofiSpace in Your Language: The Workspace Now Supports 12 Languages',
    excerpt: 'Use the LofiSpace focus workspace in English, Vietnamese, Spanish, Portuguese, French, German, Russian, Japanese, Korean, Chinese, Indonesian or Thai — here is how the language is chosen and how to change it.',
    author: 'Alex Chen',
    category: 'Product Updates',
    readTime: 4,
    publishedAt: '2026-09-30',
    coverGradient: ['#0f1a2e', '#1c2d4a'],
    emoji: '🌍',
    content: `
<p>People study and work with LofiSpace from all over the world, and a timer that says "Break time" isn't much comfort if English isn't your first language. As of this update, the workspace is available in <strong>12 languages</strong>.</p>

<h2>Supported languages</h2>
<ul>
  <li>English</li>
  <li>Tiếng Việt (Vietnamese)</li>
  <li>Español (Spanish)</li>
  <li>Português (Portuguese)</li>
  <li>Français (French)</li>
  <li>Deutsch (German)</li>
  <li>Русский (Russian)</li>
  <li>日本語 (Japanese)</li>
  <li>한국어 (Korean)</li>
  <li>简体中文 (Simplified Chinese)</li>
  <li>Bahasa Indonesia</li>
  <li>ไทย (Thai)</li>
</ul>

<h2>What gets translated</h2>
<p>Everything you touch while working: the <a href="/pomodoro-timer">Pomodoro timer</a> and its settings, the to-do list, the calendar, the music and sound panels, scene settings, the weather widget, tooltips, keyboard-shortcut help, the phase-change notifications, and the whole <a href="/come-home">Come Home</a> evening mode. The clock shows the weekday and date the way your language writes them, and ambient sounds and weather conditions use their local names.</p>
<p>The homepage is translated too. Blog articles and the in-depth guides remain in English for now.</p>

<h2>How LofiSpace chooses your language</h2>
<ol>
  <li><strong>A language you picked before</strong> always wins — your choice is remembered in this browser.</li>
  <li>Otherwise LofiSpace looks at the <strong>languages your browser prefers</strong> and uses the first one it supports. A browser set to Brazilian Portuguese gets Portuguese; one set to Traditional Chinese gets Simplified Chinese.</li>
  <li>If none match, it falls back to English.</li>
</ol>

<h2>How to change the language</h2>
<ul>
  <li><strong>On the website:</strong> use the 🌐 language menu in the top navigation bar.</li>
  <li><strong>Inside the workspace:</strong> open the <em>More (⋯)</em> button at the right end of the dock and choose from the <em>Language</em> menu.</li>
  <li><strong>With a link:</strong> add <code>?lang=</code> and a language code to the address, for example <code>/workspace?lang=ja</code>. Codes: <code>en, vi, es, pt, fr, de, ru, ja, ko, zh, id, th</code>.</li>
</ul>
<p>The link option is handy for sharing: send a classmate <code>focusworkspace.app/workspace?lang=es</code> and it opens in Spanish for them.</p>

<h2>Does it slow anything down?</h2>
<p>No. English and Vietnamese are built in; every other language is a small separate file that is downloaded only when you choose it. If you never switch, you never download it.</p>

<h2>Spotted a clumsy translation?</h2>
<p>Translations for a calm, gentle app are tricky — tone matters as much as meaning. If a phrase in your language feels off, let us know through the <a href="/about">About page</a> and we'll fix it.</p>
${TRY('Open the workspace in your language:')}
    `.trim(),
    faq: [
      { q: 'Which languages does LofiSpace support?', a: 'English, Vietnamese, Spanish, Portuguese, French, German, Russian, Japanese, Korean, Simplified Chinese, Indonesian and Thai.' },
      { q: 'How do I change the language inside the workspace?', a: 'Click the More (⋯) button on the dock and pick a language from the Language menu. Your choice is remembered in this browser.' },
      { q: 'Can I share a link that opens in a specific language?', a: 'Yes. Add ?lang= plus the language code to the workspace URL, for example /workspace?lang=ko for Korean.' },
      { q: 'Are the blog posts translated too?', a: 'Not yet. The workspace, homepage and Come Home mode are translated; articles and guides remain in English.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'pomodoro-timer-long-breaks-custom-lengths',
    title: 'The New LofiSpace Pomodoro Timer: Long Breaks, Custom Lengths and a Daily Goal',
    seoTitle: 'Pomodoro Timer with Long Breaks & Custom Lengths — Free Online',
    excerpt: 'The LofiSpace Pomodoro timer now does long breaks, custom focus and break lengths, auto-start, a daily goal, notifications and accurate timing in background tabs. Here is how each feature works.',
    author: 'Alex Chen',
    category: 'Product Updates',
    readTime: 6,
    publishedAt: '2026-09-30',
    coverGradient: ['#2a0f14', '#3d1a1f'],
    emoji: '🍅',
    content: `
<p>The Pomodoro timer is the heart of the workspace, and it used to be the simplest part of it: 25 minutes of focus, 5 minutes of break, repeat. That's fine for a first session, but the <a href="/blog/pomodoro-technique-guide">Pomodoro Technique</a> has always had more to it — and people work in very different rhythms. So we rebuilt the timer.</p>

<h2>Long breaks, the way the technique intends</h2>
<p>In the classic method, every fourth focus session is followed by a longer break. The timer now does this for you. By default you get <strong>four focus sessions of 25 minutes</strong>, short breaks of <strong>5 minutes</strong>, and a <strong>15-minute long break</strong> after the fourth session. The phase label at the top of the timer tells you where you are: <em>Focus</em>, <em>Break</em> or <em>Long break</em>.</p>

<h2>Set your own rhythm</h2>
<p>Click the ⚙️ icon on the Pomodoro panel to open timer settings. You can change:</p>
<ul>
  <li><strong>Focus length</strong> — 1 to 90 minutes. Try 50 for deep work, 15 if you're easing into a hard task.</li>
  <li><strong>Break length</strong> — 1 to 30 minutes.</li>
  <li><strong>Long break length</strong> — 1 to 60 minutes.</li>
  <li><strong>Sessions before a long break</strong> — 2 to 8.</li>
  <li><strong>Auto-start next phase</strong> — on by default. Turn it off if you prefer to start each session yourself.</li>
</ul>
<p>There is also a <strong>skip</strong> button (⏭) to jump straight to the next phase when a break isn't needed — or when you need it early.</p>

<h2>A timer that never drifts</h2>
<p>Browsers slow down timers in background tabs to save battery, which is why many web Pomodoro timers fall behind when you switch to another tab. The LofiSpace timer now counts down to a fixed end time instead of counting seconds, so it stays exact no matter how long the tab sits in the background. It also saves its state — if you reload the page or your browser restarts, the session picks up where it was.</p>
<p>And because losing a focus session to a stray <kbd>Ctrl</kbd>+<kbd>W</kbd> is painful, the browser now asks for confirmation if you try to close the tab in the middle of a focus phase.</p>

<h2>Knowing when a phase ends — without staring at it</h2>
<ul>
  <li><strong>A soft chime</strong> plays when focus ends and when the break is over (a rising tone for breaks, a falling one for focus).</li>
  <li><strong>The tab title</strong> shows the countdown, like <code>18:42 · FOCUS</code>, so you can glance at it from any other tab.</li>
  <li><strong>A desktop notification</strong> appears if the LofiSpace tab isn't visible. The browser asks for permission the first time you press start; notifications are silent and only show while you're elsewhere.</li>
</ul>

<h2>A daily goal</h2>
<p>Below the timer you'll now see today's pomodoro count and a progress bar toward your <strong>daily goal</strong> — 8 by default, adjustable from 1 to 24 in timer settings. Reach it and you get a small celebration. Every completed session also still earns XP and counts toward your streak on the <a href="/dashboard">dashboard</a>.</p>

<h2>Custom timers in Notion and shared links</h2>
<p>All of these settings can live in the workspace URL, which makes them perfect for a <a href="/notion-pomodoro-widget">Notion Pomodoro widget</a>:</p>
<ul>
  <li><code>pw</code> — focus minutes</li>
  <li><code>pb</code> — break minutes</li>
  <li><code>plb</code> — long-break minutes</li>
  <li><code>pc</code> — sessions before a long break</li>
  <li><code>pas=0</code> — turn auto-start off</li>
</ul>
<p>For example, a 50/10 deep-work timer with a 30-minute long break after three sessions:</p>
<p><code>focusworkspace.app/workspace?pw=50&amp;pb=10&amp;plb=30&amp;pc=3</code></p>
<p>Paste that into a Notion <code>/embed</code> block and the timer opens with those settings every time.</p>

<h2>Which settings should you use?</h2>
<p>Start with the default 25/5 for a week, then adjust. If you're regularly still deep in the task when the bell rings, lengthen focus. If you drift after 15 minutes, shorten it — a finished short session beats an abandoned long one. Our <a href="/blog/pomodoro-technique-guide">Pomodoro guide</a> has more on choosing a rhythm.</p>
${TRY('Try the new timer:', '/pomodoro-timer', 'Open the Pomodoro timer →')}
    `.trim(),
    faq: [
      { q: 'Does the LofiSpace Pomodoro timer support long breaks?', a: 'Yes. By default a 15-minute long break follows every fourth 25-minute focus session. Both the long-break length and the number of sessions before it can be changed.' },
      { q: 'Does the timer keep running in a background tab?', a: 'Yes. It counts down to a fixed end time, so it stays accurate in background tabs, and it resumes after a page reload.' },
      { q: 'How do I set a 50/10 timer in Notion?', a: 'Embed the URL focusworkspace.app/workspace?pw=50&pb=10 in a Notion /embed block. Add plb and pc to change the long break and cycle length.' },
      { q: 'Can I turn off the automatic start of the next phase?', a: 'Yes. Switch off Auto-start next phase in the timer settings, or add pas=0 to the workspace URL.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'lofispace-keyboard-shortcuts-zen-mode',
    title: 'LofiSpace Keyboard Shortcuts and Zen Mode: Focus Without the Mouse',
    excerpt: 'Play, pause, go fullscreen, hide panels and enter Zen mode with a single key. The complete list of LofiSpace keyboard shortcuts and how Zen mode helps you focus.',
    author: 'Alex Chen',
    category: 'Product Updates',
    readTime: 4,
    publishedAt: '2026-09-30',
    coverGradient: ['#0d1f1a', '#153128'],
    emoji: '⌨️',
    content: `
<p>Every time you reach for the mouse to pause the music or hide a panel, you pull a little attention away from the work. The workspace now responds to single-key shortcuts, so small adjustments take a fraction of a second.</p>

<h2>All keyboard shortcuts</h2>
<ul>
  <li><kbd>Space</kbd> — play / pause music and ambient sounds</li>
  <li><kbd>F</kbd> — enter or leave fullscreen</li>
  <li><kbd>P</kbd> — show or hide the Pomodoro timer</li>
  <li><kbd>N</kbd> — show or hide the To-Do list</li>
  <li><kbd>Z</kbd> — toggle Zen mode</li>
  <li><kbd>?</kbd> — show the shortcut cheat sheet</li>
  <li><kbd>Esc</kbd> — close whatever is open (menus, panels, the calendar) and leave Zen mode</li>
</ul>
<p>Shortcuts are ignored while you're typing in a to-do, note or search field, so adding a task with a space in it never pauses your music. You can open the cheat sheet any time with <kbd>?</kbd> or from the <em>More (⋯)</em> menu → <em>Keyboard shortcuts</em>.</p>

<h2>Zen mode: just the timer and the scene</h2>
<p>Zen mode hides every panel — to-dos, the progress card, weather, notes — and leaves only the clock and the Pomodoro ring over your background scene. Music and sounds keep playing, and the timer keeps running.</p>
<p>It's built for the moment you have decided what to work on and don't want the list of everything else in your peripheral vision. Press <kbd>Z</kbd> (or use the Zen button in the dock) to enter it, and <kbd>Z</kbd> or <kbd>Esc</kbd> to come back.</p>

<h2>A distraction-free setup in three keys</h2>
<ol>
  <li>Pick your <a href="/scenes">scene</a> and sounds, then write the one task you're working on in the To-Do list and mark it active.</li>
  <li>Press <kbd>F</kbd> for fullscreen — browser tabs and your taskbar disappear.</li>
  <li>Press <kbd>Z</kbd> for Zen mode and start the timer.</li>
</ol>
<p>When the break chime plays, <kbd>Esc</kbd> brings everything back so you can check off the task.</p>

<h2>Does this work in Notion?</h2>
<p>Yes, as long as the embedded workspace has focus — click once inside the embed first. Fullscreen may be restricted by the page hosting the embed; if <kbd>F</kbd> does nothing, open the workspace in its own tab.</p>

<h2>Other small touches in this update</h2>
<p>Icon-only buttons in the dock now show a label when you hover or tab to them, and the timer countdown appears in the browser tab title. See <a href="/blog/whats-new-lofispace-september-2026">everything that's new</a>, or read about the <a href="/blog/pomodoro-timer-long-breaks-custom-lengths">new Pomodoro timer</a>.</p>
${TRY('Try it now — press ? inside the workspace:')}
    `.trim(),
    faq: [
      { q: 'What does Zen mode hide?', a: 'All panels except the clock and the Pomodoro timer. Music, sounds and the timer keep running.' },
      { q: 'Why does Space not pause the music while I type?', a: 'Shortcuts are switched off while a text field is focused, so typing never triggers them.' },
      { q: 'How do I see all shortcuts?', a: 'Press ? in the workspace, or open More (⋯) → Keyboard shortcuts.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'play-your-own-youtube-music-lofispace',
    title: 'How to Play Your Own YouTube Music in LofiSpace (and Fix It When It Won\'t Play)',
    seoTitle: 'Play Any YouTube Music in LofiSpace + Fix "No Sound" Problems',
    excerpt: 'Use any YouTube video or live stream as the soundtrack of your focus workspace, and a step-by-step checklist for when the music doesn\'t start.',
    author: 'Alex Chen',
    category: 'Product Updates',
    readTime: 6,
    publishedAt: '2026-09-30',
    coverGradient: ['#2b0d0d', '#3b1414'],
    emoji: '🎧',
    content: `
<p>LofiSpace comes with a few hand-picked 24/7 <a href="/lofi-music">lofi radio stations</a>, but your perfect focus soundtrack might be a jazz café mix, a video game soundtrack or an hour of piano. You can play any YouTube video or live stream inside the workspace — and with this update it's quicker, it remembers your choice, and it tells you clearly when something is wrong.</p>

<h2>Play your own YouTube link</h2>
<ol>
  <li>Open the <a href="/workspace">workspace</a> and tap <strong>Tap to start</strong>.</li>
  <li>Click <strong>YouTube</strong> in the dock at the bottom (or <em>Music</em> → <em>Custom YouTube</em>).</li>
  <li>Paste a YouTube link — a normal <code>youtube.com/watch?v=…</code> URL, a short <code>youtu.be/…</code> link, or just the 11-character video ID.</li>
  <li>Press <strong>Play</strong> or <kbd>Enter</kbd>.</li>
</ol>
<p>Your link is now <strong>remembered</strong>: reload the page tomorrow and the same music is ready. Ambient sounds keep playing on top, and the music volume slider controls YouTube separately from rain, café and the other sounds.</p>

<h2>What's better in this update</h2>
<ul>
  <li><strong>Faster switching.</strong> Changing station or link reuses the same player instead of loading a new one, so music changes in about a second.</li>
  <li><strong>Automatic fallback.</strong> 24/7 streams sometimes end and restart under a new address. If one of the built-in stations stops working, LofiSpace switches to the next working station on its own.</li>
  <li><strong>No more silent failures.</strong> If the music can't start, you now see why — and what to do — instead of nothing happening.</li>
</ul>

<h2>Music won't play? Work through this checklist</h2>

<h3>You see "Tap to play music"</h3>
<p>Your browser blocked sound from starting on its own. This is normal on iPhone and iPad, and on some desktop browsers with strict autoplay settings. Tap the button once — the music starts immediately.</p>

<h3>You see "This video can't be played here"</h3>
<p>The video was removed, is private, or its owner has turned off playback on other websites (embedding). Nothing on your side can fix that — try another link. Official music-label uploads are the most likely to have embedding disabled; 24/7 radio streams and independent creators usually allow it.</p>

<h3>You see "YouTube not ready" with a Retry button</h3>
<p>The YouTube player couldn't load at all. The usual causes:</p>
<ul>
  <li><strong>An ad blocker or privacy extension</strong> blocking YouTube's player on other sites. Allow <code>focusworkspace.app</code> in the extension, or try a private window with extensions off.</li>
  <li><strong>A school, office or public network</strong> that blocks YouTube. If youtube.com itself doesn't open, the workspace can't reach it either.</li>
  <li><strong>A slow or unstable connection.</strong> Press Retry once the connection is back.</li>
</ul>
<p>Ambient sounds are generated inside your browser and don't need YouTube, so they keep working either way.</p>

<h3>Everything looks fine, but there's no sound</h3>
<ul>
  <li>Check the <strong>music volume</strong> slider in the Music panel and your system volume.</li>
  <li>Check the <strong>browser tab isn't muted</strong> (right-click the tab → <em>Unmute site</em>).</li>
  <li>On an <strong>iPhone</strong>, flip the silent switch off and turn the volume up — silent mode can mute sound in the browser.</li>
  <li>If the workspace is <strong>embedded in Notion</strong> or another site, click once inside the embed to start it; some hosts only allow sound after a click inside the frame.</li>
  <li>Still nothing? Reload the page. If you had the workspace open from before the update, the reload also loads the new, more reliable player.</li>
</ul>

<h2>Good YouTube picks for focus</h2>
<p>Long, lyric-free audio works best — 24/7 lofi or jazz radio, piano compilations, game soundtracks or nature ambience. Lyrics compete with reading and writing for the same attention, which is why our <a href="/blog/best-lofi-music-for-studying">guide to the best lofi music for studying</a> recommends instrumental music for deep work.</p>
${TRY('Paste your favourite focus music:')}
    `.trim(),
    faq: [
      { q: 'Can I play any YouTube video in LofiSpace?', a: 'Any public video or live stream whose owner allows embedding. Paste the link or the 11-character video ID into Custom YouTube.' },
      { q: 'Why does it say "This video can\'t be played here"?', a: 'The video was removed, is private, or has embedding turned off by its owner. Try a different link.' },
      { q: 'Why do I have to tap "Tap to play music" on my phone?', a: 'Mobile browsers only allow sound to start after a direct tap. One tap on the button starts the music.' },
      { q: 'Does LofiSpace remember my YouTube link?', a: 'Yes. Your custom link is saved in your browser and loads again the next time you open the workspace.' },
      { q: 'The music doesn\'t load at all — what should I check first?', a: 'Ad blockers and privacy extensions are the most common cause. Allow focusworkspace.app, or test in a private window with extensions disabled. Networks that block YouTube will also stop it.' },
    ],
  },
]
