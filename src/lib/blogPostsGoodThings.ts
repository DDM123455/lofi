import type { BlogPost } from './blogPosts'

/**
 * "Good things happen" cluster — supports the Good Things experience in Come Home
 * (/good-things). Same conventions as blogPostsEvening.ts: visible FAQ, links to siblings
 * and to the feature. Claims about research stay close to what the cited papers found.
 */

const APP = '/workspace?mode=home&exp=good'
const CTA = (lead: string, body = '') =>
  `<p class="come-home-inline"><strong>${lead}</strong> ${body} <a href="${APP}">Open Good Things →</a></p>`

export const GOOD_THINGS_POSTS: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'three-good-things-exercise',
    title: 'The Three Good Things Exercise: A Gentle Way to End the Day',
    seoTitle: 'Three Good Things Exercise: How It Works and How to Start',
    excerpt: 'The Three Good Things exercise takes about ten minutes before bed. Here is what the research found, how to do it, and how to keep it gentle on the days it feels impossible.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-11-01',
    coverGradient: ['#2a1f14', '#33241a'],
    emoji: '🌟',
    cta: 'come-home',
    faq: [
      { q: 'How do you do the Three Good Things exercise?', a: 'Each evening, write down three things that went well that day and, for each one, a short note on why it happened. They can be small. The original version ran for one week.' },
      { q: 'Does the Three Good Things exercise really work?', a: 'A 2005 study by Seligman and colleagues found that people who did it for a week reported more happiness and fewer depressive symptoms at follow-ups up to six months later. Later reviews suggest gratitude-style exercises help modestly on average, so treat it as a small, useful habit rather than a cure.' },
      { q: 'What if I cannot think of three good things?', a: 'Write one, or write none. Small things count, and a hard day does not mean you did the exercise wrong. If low mood lasts for weeks, talking to a doctor or mental health professional will help more than any journaling exercise.' },
      { q: 'How often should I do it?', a: 'Whatever you can keep doing without it feeling like a chore. One study by Lyubomirsky and colleagues found that counting blessings once a week lifted well-being while doing it three times a week did not, so more is not automatically better.' },
    ],
    content: `
<p>Most of us can recite the worst moment of the day without trying. The awkward comment in the meeting. The email that stung. The thing you forgot. The good moments are harder to recall, even on days that had plenty of them.</p>
<p>The Three Good Things exercise is a small attempt to balance that out. It takes a few minutes before bed, costs nothing, and is one of the most studied exercises in positive psychology.</p>

<h2>What is the Three Good Things exercise?</h2>
<p>Every evening, you write down three things that went well today, and for each one, a short note on <em>why</em> it happened. That is the whole exercise.</p>
<p>"Went well" does not have to mean impressive. A warm meal counts. So does a friend replying, a bus arriving on time, or a meeting that was shorter than you feared.</p>

<h2>Why it might help</h2>
<p>Psychologists have a phrase for our tilt toward the negative: <strong>bad is stronger than good</strong>, the title of a widely cited 2001 review by Roy Baumeister and colleagues. Negative events tend to hold our attention and stick in memory more than positive ones. That was probably useful for staying alive. It is less useful at 11pm.</p>
<p>The exercise does not deny the bad parts of the day. It just gives the good parts a few minutes of the attention they would not otherwise get.</p>

<h2>What the research found</h2>
<p>The best-known study comes from Martin Seligman, Tracy Steen, Nansook Park and Christopher Peterson, published in <em>American Psychologist</em> in 2005. Participants who wrote down three good things each night for one week reported more happiness and fewer depressive symptoms than a placebo group, and the benefit was still visible at follow-ups up to six months later.</p>
<p>Two honest caveats. Later reviews of gratitude-style exercises have tended to find modest average effects, not dramatic ones. And it works less like a pill and more like a habit: people who kept going on their own tended to benefit most. This is a small tool, and a useful one.</p>

<h2>How to do it (without making it homework)</h2>
<ol>
  <li><strong>Pick a moment you already have.</strong> In bed, or while the kettle boils.</li>
  <li><strong>Write down one good thing.</strong> Start with one. If a second arrives, fine.</li>
  <li><strong>Add a few words on why.</strong> "The sky was pink on the way home, because I left the office on time." The why is the part that nudges you to notice what you and others did to make it happen.</li>
  <li><strong>Stop there.</strong> No score, no streak, no catching up on days you missed.</li>
</ol>
${CTA('Prefer somewhere quiet to do it?', 'Good Things in Come Home lets you note one small thing and keep it as a star. It stays in your browser, and on a harder evening it can come back to you.')}

<h2>When it feels impossible</h2>
<p>Some days you will sit there with nothing, and being told to feel grateful can make that worse. That is not a failure. On those nights, skip the writing and read something good you noted on an easier day, or just <a href="/blog/what-to-do-on-a-bad-day">let the day be bad</a>.</p>
<p>And if most days feel like that, it may be more than a bad week. Please talk to a doctor or someone you trust. This exercise is meant to sit alongside real support, never to replace it.</p>

<h2>Pairing it with the rest of your evening</h2>
<p>It fits well after a <a href="/blog/brain-dump-before-bed">brain dump</a>: get the worries out of your head first, then end on something good. If you want a whole routine, start with <a href="/blog/evening-routine-after-work">a simple evening routine after work</a>.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-to-do-on-a-bad-day',
    title: 'What to Do on a Bad Day (When Positive Thinking Is the Last Thing You Want)',
    seoTitle: 'What to Do on a Bad Day: Gentle Ideas That Actually Help',
    excerpt: 'Having a bad day? You do not have to fix it or find the silver lining. A few gentle, realistic things to do when the day has gone wrong.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 5,
    publishedAt: '2026-11-01',
    coverGradient: ['#1a1a2b', '#262338'],
    emoji: '🌧️',
    cta: 'come-home',
    faq: [
      { q: 'What should I do when I am having a bad day?', a: 'Lower the bar. Take care of the basics such as food, water and a little movement, say out loud or on paper what went wrong, and do one small kind thing for yourself. You do not need to turn the day around.' },
      { q: 'Why does "just think positive" make me feel worse?', a: 'Being told to feel differently can sound like your real feelings are not allowed. Naming what you feel first usually helps more than trying to overwrite it.' },
      { q: 'When is a bad day more than a bad day?', a: 'If low mood, hopelessness or trouble sleeping lasts for around two weeks or more, or if you have thoughts of harming yourself, please reach out to a doctor, a local crisis line or someone you trust right away.' },
    ],
    content: `
<p>Some days just go wrong. Nothing dramatic, or maybe something very dramatic. Either way, you are at the end of it, tired, and the last thing you want is someone telling you to look on the bright side.</p>
<p>So this is not that. Here are a few gentle things that tend to help, none of which require you to feel better first.</p>

<h2>1. Stop trying to rescue the day</h2>
<p>The day was bad. You are allowed to let it be bad. The pressure to turn it around is often heavier than the day itself. Your only job now is to get to tomorrow in reasonable shape.</p>

<h2>2. Say what actually happened</h2>
<p>Put it into words, to a friend or on paper. "I am embarrassed about that meeting" is easier to carry than a general cloud of awfulness. Research by Matthew Lieberman and colleagues suggests that putting feelings into words can dial down the brain's emotional response. If your head is too loud, try a <a href="/blog/brain-dump-before-bed">two-minute brain dump</a>.</p>

<h2>3. Do the boring basics</h2>
<p>Eat something. Drink some water. Take a shower or step outside for five minutes. Everything looks worse when you are hungry and exhausted, and none of this needs motivation you do not have.</p>

<h2>4. Be slightly kinder than you feel like being</h2>
<p>Ask what you would say to a friend who had this exact day. You would not list their mistakes. Say that to yourself instead, even if you only half believe it.</p>

<h2>5. Let one small good thing in, if you can</h2>
<p>This is not about gratitude or pretending. It is only a reminder that the day was not the whole story. Good things happen, even if tonight is not when you feel it. On days when you cannot find anything yourself, it can help to be shown something instead.</p>
${CTA('Too tired to think of anything?', 'Good Things can simply show you one: a moment you kept on an easier day, or a small line about someone, somewhere, tonight. No writing needed.')}

<h2>6. Go to bed earlier than the bad day wants you to</h2>
<p>A bad day has a way of keeping you up, scrolling or replaying it. <a href="/blog/how-to-stop-overthinking-at-night">If you are overthinking at night</a>, you do not need to solve it now. The problem will still be there tomorrow, and you will be better rested.</p>

<h2>If it is more than one day</h2>
<p>A bad day ends. If the heaviness has been with you for a couple of weeks, or if you have thoughts of hurting yourself, please do not sit with it alone. Reach out to a doctor, a local crisis line or someone you trust. You deserve real support.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'good-things-happen-come-home',
    title: 'Introducing Good Things: A Small, Quiet Place for What Went Right',
    seoTitle: 'Good Things Happen: A New Gentle Feature in LofiSpace Come Home',
    excerpt: 'Good Things is a new part of Come Home mode. Notice one small good thing from today, or just be shown one. No streaks, no scores, and nothing leaves your browser.',
    author: 'Alex Chen',
    category: 'Product Updates',
    readTime: 3,
    publishedAt: '2026-11-01',
    coverGradient: ['#1b1433', '#33241a'],
    emoji: '🌟',
    cta: 'come-home',
    faq: [
      { q: 'Are the "Somewhere tonight" lines real people?', a: 'No. They are short lines we wrote about ordinary good things that happen somewhere every evening. Nobody else can see what you write, and you cannot see what others write.' },
      { q: 'Is what I write in Good Things private?', a: 'Yes. Good things you keep are stored only in your own browser, together with the stars in your sky. They are never sent to a server or included in analytics, and you can let any of them go at any time.' },
    ],
    content: `
<p>Come Home began as a place to put things down after work. People needed somewhere to let go of a hard day. But an evening should also leave room for what went right, and that is usually the first thing a tired mind forgets.</p>
<p>So we added <strong>Good Things</strong>, built around one simple sentence: good things happen, even on days that did not feel like it.</p>

<h2>Two doors</h2>
<p><strong>Notice one from today.</strong> Write one small good thing. There are soft prompts if nothing comes to mind, and an optional line for why it happened, the part of the <a href="/blog/three-good-things-exercise">Three Good Things exercise</a> that researchers studied. One is enough. It rises and becomes a star in your sky.</p>
<p><strong>Just show me one.</strong> For the evenings when you have nothing to give. Good Things shows you something you kept on an earlier day, or, if your sky is still empty, a small "somewhere tonight" line. You do not have to write a word.</p>

<h2>What we left out on purpose</h2>
<ul>
  <li><strong>No streaks.</strong> Missing a day should cost nothing.</li>
  <li><strong>No forced gratitude.</strong> If you tell us the day was heavy, showing comes first and writing is never required.</li>
  <li><strong>No feed.</strong> Nothing you write is shared with anyone.</li>
</ul>
<p>Good Things is available in all 12 languages. Read more on the <a href="/good-things">Good Things page</a>, or see <a href="/blog/what-to-do-on-a-bad-day">what to do on a bad day</a>.</p>
${CTA('Want to try it tonight?')}
`,
  },
]
