import type { BlogPost } from './blogPosts'

/**
 * "Evening Reset" cluster — supports Come Home mode (/come-home). Every post links to at
 * least two siblings and to Come Home, and carries a visible FAQ that the post template also
 * emits as FAQPage structured data. Kept separate from blogPosts.ts purely for file size.
 */

const CTA = (lead: string, body = '') =>
  `<p class="come-home-inline"><strong>${lead}</strong> ${body} <a href="/workspace?mode=home">Try Come Home →</a></p>`

export const EVENING_POSTS: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-relax-after-work',
    title: 'How to Relax After Work: A Simple Evening Reset',
    seoTitle: 'How to Relax After Work: A Simple 20-Minute Evening Reset',
    excerpt: 'Home from work but your head is still at the office? A realistic evening reset to help you relax after work — no productivity hacks, no perfect routine required.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#1f1520', '#2e1d24'],
    emoji: '🛋️',
    cta: 'come-home',
    content: `
<p>You close the laptop, you walk through the door, you put your bag down — and your brain keeps working. It replays the meeting. It drafts the reply you didn't send. It reminds you about tomorrow's deadline while you're trying to cook dinner.</p>
<p>That gap between <em>finishing</em> work and actually <em>leaving</em> it is where a lot of evenings quietly disappear. This guide is about closing that gap with a short, repeatable reset — not a perfect routine, just a few small signals that tell your mind the workday is over.</p>

<h2>Why it's so hard to switch off after work</h2>
<p>Work psychologists have a name for the thing most of us are missing in the evening: <strong>psychological detachment</strong>. Researchers such as Sabine Sonnentag have spent years studying how people recover from work, and detachment — not thinking about work during time off — keeps showing up as one of the key recovery experiences, alongside relaxation, doing something you enjoy, and feeling in control of your own time.</p>
<p>The tricky part is that detachment doesn't happen just because you're physically home. Unfinished tasks stay "open" in your head. Your phone keeps a direct line to the office. And after a long day, you're often too tired to choose something restful, so you default to whatever is easiest — usually scrolling.</p>
<p>So the goal isn't to try harder to relax. It's to make the transition easier.</p>

<h2>A simple evening reset (about 20 minutes)</h2>
<p>You don't need to do all of these every night. Think of them as a menu. Even one of them, done consistently, helps.</p>

<h3>1. Mark the end of the workday</h3>
<p>Give your workday a clear last step. Before you close the laptop, write down the very first thing you'll do tomorrow. Close the tabs. If you work from home, physically close the laptop lid and put it somewhere you can't see it from the sofa.</p>
<p>This works because a clear plan for unfinished work makes it easier to stop thinking about it. In a well-known set of studies, Masicampo and Baumeister found that simply making a specific plan for an unfinished goal reduced how much it intruded on people's thoughts afterwards. You're not finishing the task — you're giving your brain permission to put it down.</p>

<h3>2. Change something physical</h3>
<p>Your body is a surprisingly good messenger. Change your clothes. Take a warm shower. Swap the bright overhead light for a lamp. Open a window for a few minutes. These small physical changes act as a boundary: <em>that</em> was work, <em>this</em> is home.</p>

<h3>3. Empty your head onto a page</h3>
<p>If your mind is still busy, don't argue with it. Give it somewhere to put things. Take two minutes and write down everything that's taking up space — tasks, worries, half-thoughts, the thing you forgot to buy. No structure, no priorities. We go deeper on this in <a href="/blog/brain-dump-before-bed">Brain Dump Before Bed</a>.</p>
${CTA('Want a quiet place to do it?', `Come Home mode has a private brain dump where your thoughts float away into the night sky — nothing is saved or sent anywhere.`)}

<h3>4. Do one easy, pleasant thing</h3>
<p>Not a self-improvement project. Something small and low-effort that you actually like: tea on the balcony, one chapter of a novel, ten minutes of stretching, a playlist with rain in the background. The point is to give your evening a first "home" moment that isn't a screen.</p>

<h2>What quietly undoes the reset</h2>
<ul>
  <li><strong>Checking email "just once".</strong> One message is enough to reopen the whole workday in your head. If you must check, pick a single time and stick to it.</li>
  <li><strong>Scrolling as the default.</strong> Scrolling isn't evil, but it rarely feels restful. It's stimulating in small, unpredictable bursts — the opposite of winding down.</li>
  <li><strong>Turning relaxation into another task.</strong> If your evening routine has a checklist and a streak counter, it's just more work with softer lighting.</li>
</ul>

<h2>If you only have five minutes</h2>
<p>Some evenings are just too full — kids, dinner, errands. On those nights, shrink the reset: write tomorrow's first task, take three slow breaths, and put your phone in another room for ten minutes. We put together a version for exactly these nights in <a href="/blog/5-minute-relaxation-routine">A Simple 5-Minute Relaxation Routine After Work</a>.</p>

<h2>Make it a ritual, not a rule</h2>
<p>The reset works best when it becomes automatic — the same few steps, in the same order, most evenings. But "most" is the key word. Missing a night isn't failure; the next evening is a fresh start. If you want to build a longer evening rhythm around this, read <a href="/blog/evening-routine-after-work">How to Create a Calm Evening Routine After a Busy Workday</a>.</p>
<p>And if some evenings your head feels louder than usual, <a href="/blog/how-to-stop-overthinking-at-night">How to Stop Overthinking at Night</a> covers what to do when the thoughts don't want to settle.</p>

<h2>A quiet place between work and sleep</h2>
<p>We built <a href="/come-home">Come Home</a> for exactly this moment: a calm corner of Focus Workspace for after work. No timers, no tasks, no scores. You can rest in a cozy room, clear your mind, turn on soft rain, or just sit for a while. You did enough today.</p>
`.trim(),
    faq: [
      { q: 'How long does it take to relax after work?', a: 'It varies, but most people notice a difference within 15–30 minutes if they give themselves a clear transition — ending the workday on purpose, changing something physical, and putting their thoughts somewhere other than their head. Without a transition, work thoughts can linger all evening.' },
      { q: 'Is it bad to check work email in the evening?', a: 'Not always, but it makes it much harder to detach from work. If you need to check, choose one specific time, keep it short, and write down anything that needs action tomorrow so you do not carry it around.' },
      { q: 'What is the fastest way to relax after work?', a: 'A two-minute brain dump followed by a few slow breaths and a change of environment — a shower, different lighting, or stepping outside — is one of the quickest ways to signal to your mind that work is over.' },
      { q: 'Should I exercise after work to relax?', a: 'Gentle movement such as a walk or stretching helps many people unwind. Intense exercise very close to bedtime can feel energising for some, so notice how it affects your sleep and adjust.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-clear-your-mind-before-bed',
    title: 'How to Clear Your Mind Before Bed: Simple Ways to Calm Down for Sleep',
    seoTitle: 'How to Clear Your Mind Before Bed — Simple Ways to Calm Your Mind',
    excerpt: 'Lying in bed with a busy mind? Gentle, practical ways to clear your mind before bed and calm your thoughts for sleep — without forcing it.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#10142a', '#1d1a36'],
    emoji: '🌙',
    cta: 'come-home',
    content: `
<p>The lights are off, your body is tired, and your mind has decided now is the perfect time to review your entire life. Tomorrow's meeting. The message you didn't answer. Something awkward you said in 2019.</p>
<p>A busy mind at bedtime is incredibly common, and the frustrating part is that trying hard to stop thinking usually makes it worse. This guide is about clearing your mind the gentle way — by giving your thoughts somewhere to go and your attention something softer to rest on.</p>

<h2>Why your mind gets louder at night</h2>
<p>During the day, your attention is constantly pulled outward: conversations, screens, tasks. At night, all of that goes quiet — and whatever was waiting in the background gets its turn. Unfinished tasks, worries, and unprocessed moments from the day finally have space to surface.</p>
<p>So a racing mind at night isn't a sign that something is wrong with you. It's often just a backlog. Clearing your mind before bed is mostly about processing that backlog <em>earlier</em>, and more kindly.</p>

<h2>1. Close the day before you get into bed</h2>
<p>Bed is a bad place to plan tomorrow. Try to do your "closing" 30–60 minutes earlier, somewhere else — the kitchen table, the sofa. Two small things help:</p>
<ul>
  <li><strong>Write tomorrow's list.</strong> In a 2018 sleep-lab study, Scullin and colleagues found that people who spent five minutes writing a to-do list for the coming days fell asleep faster than people who wrote about tasks they'd already completed — and the more specific the list, the better.</li>
  <li><strong>Do a brain dump.</strong> Write down everything else that's on your mind, in any order. Not to solve it — just to get it out of your head. Our full guide is here: <a href="/blog/brain-dump-before-bed">Brain Dump Before Bed</a>.</li>
</ul>
${CTA('Try a 2-minute brain dump in Come Home mode.', `Write it all down, then watch it drift away. Nothing is stored.`)}

<h2>2. Lower the volume of everything</h2>
<p>A calm mind is easier in a calm environment. In the last hour before bed, slowly turn things down: dimmer lights, quieter sounds, fewer inputs. If silence makes your thoughts louder, soft, steady sound can help — gentle rain, a low fan, distant waves. Predictable sounds give your attention something neutral to rest on. You can mix your own in the <a href="/rain-sounds">rain sounds</a> player or the Quiet room in <a href="/come-home">Come Home</a>.</p>

<h2>3. Simple ways to calm your mind before sleep</h2>
<h3>Slow your breathing, especially the exhale</h3>
<p>You don't need a complicated technique. Breathe in gently through your nose for about four counts, and out slowly for about six. Longer exhales tend to feel settling. Do it for two minutes without trying to "get it right".</p>
<h3>Give your mind a boring, pleasant job</h3>
<p>Instead of emptying your mind (hard), fill it with something mild (easy). Picture walking slowly through a house you know well. Imagine random, unrelated objects — a cup, a bicycle, a pine tree — one at a time. This kind of low-stakes imagining crowds out worry without demanding effort.</p>
<h3>Notice, then set it down</h3>
<p>When a worry shows up, name it lightly — "that's the budget thing again" — and imagine placing it on a shelf for tomorrow. You don't have to win the argument with it. You just don't have to hold it right now.</p>

<h2>4. If you've been lying awake a long time</h2>
<p>If you've been awake and frustrated for a while, it can help to get up, go somewhere dim, and do something quiet — read something unexciting, write down what's looping, listen to soft sound — and only return to bed when you feel sleepy. Lying in bed battling your thoughts tends to make bed feel like a place for battling.</p>
<p>If trouble sleeping becomes a regular pattern over weeks, it's worth talking to a doctor. Persistent insomnia is common and treatable, and you don't have to figure it out alone.</p>

<h2>What doesn't help (even though it feels like it should)</h2>
<ul>
  <li><strong>Telling yourself to stop thinking.</strong> Suppressing a thought tends to make it come back more often.</li>
  <li><strong>Solving problems in bed.</strong> Your judgment at 1 a.m. is not your best judgment. Problems look bigger in the dark.</li>
  <li><strong>"One more video" to distract yourself.</strong> It works for a moment, but it keeps your brain in input mode.</li>
</ul>

<h2>Keep going</h2>
<p>If your thoughts are specifically about work, <a href="/blog/how-to-stop-overthinking-at-night">How to Stop Overthinking at Night</a> goes deeper on that. And if you want a full wind-down, try the guided five-minute Sleep experience in <a href="/come-home">Come Home</a> — it dims the screen, lowers the sound, and simply reminds you that tomorrow's problems can wait until tomorrow.</p>
`.trim(),
    faq: [
      { q: 'How do I clear my mind before bed quickly?', a: 'Spend two minutes writing down everything on your mind, then write the first task for tomorrow. Follow it with a minute or two of slow breathing with a longer exhale. Getting thoughts onto paper is usually faster than trying to push them away.' },
      { q: 'Why does my mind race when I try to sleep?', a: 'At night the distractions of the day disappear, so unfinished tasks and worries finally have room to surface. It is very common and often reflects a backlog of unprocessed thoughts rather than a problem with you.' },
      { q: 'Does background noise help you fall asleep?', a: 'Many people find steady, predictable sounds such as rain, fan noise or ocean waves easier to fall asleep to than silence, because they give the mind something neutral to rest on and mask sudden noises. Keep the volume low.' },
      { q: 'When should I see a doctor about not sleeping?', a: 'If you regularly struggle to fall or stay asleep for several weeks, or it affects how you function during the day, talk to a doctor. Persistent sleep problems are common and there are effective treatments.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'brain-dump-before-bed',
    title: 'Brain Dump Before Bed: How to Get Thoughts Out of Your Head',
    seoTitle: 'Brain Dump Before Bed: How to Get Thoughts Out of Your Head',
    excerpt: 'A brain dump is the simplest way to stop carrying every thought to bed with you. What it is, how to do one in two minutes, and what to do with it afterwards.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 7,
    publishedAt: '2026-09-24',
    coverGradient: ['#1b1626', '#2a2038'],
    emoji: '💭',
    cta: 'come-home',
    content: `
<p>Some nights your head feels like a browser with forty tabs open. None of them are urgent enough to deal with right now, but none of them will close either. A <strong>brain dump</strong> is the simplest tool we know for those nights: you move the tabs out of your head and onto a page.</p>
<p>It takes two minutes, needs no app, and doesn't require you to be organised. Here's how it works, why it helps, and how to make it part of your evening.</p>

<h2>What is a brain dump?</h2>
<p>A brain dump is writing down everything that's currently taking up space in your mind — without sorting, judging, or solving any of it. Tasks, worries, ideas, reminders, feelings, random fragments. It's not journaling (no reflection required) and it's not planning (no priorities required). It's just unloading.</p>
<p>A real one often looks something like this:</p>
<blockquote><p>deadline tomorrow · money · meeting with my boss · I need to learn Kafka · birthday gift for Mai · I'm tired · did I reply to the landlord · I don't know what I'm doing with my career</p></blockquote>
<p>Messy is the point. If you wait until your thoughts are organised, you'll never start.</p>

<h2>Why a brain dump before bed helps</h2>
<p>Your mind is good at holding onto unfinished things — it keeps them "active" so you don't forget them. That's useful at 11 a.m. and exhausting at 11 p.m. Writing them down tells your brain they've been captured somewhere safe, so it can loosen its grip.</p>
<p>There's some nice research behind this. In a 2018 study run in a sleep lab, psychologist Michael Scullin and colleagues asked people to spend five minutes before bed either writing a to-do list for the next few days or writing about tasks they had already completed. The to-do list group fell asleep faster — and people who wrote more specific lists fell asleep faster still. A brain dump is a looser cousin of that list: it catches the tasks <em>and</em> the worries.</p>

<h2>How to do a brain dump in two minutes</h2>
<h3>1. Set a tiny timer</h3>
<p>Two minutes is enough. A short limit makes it feel easy to start and stops it turning into a planning session.</p>
<h3>2. Write whatever shows up</h3>
<p>One thought per line. Single words are fine. Don't fix spelling. If you get stuck, try these prompts:</p>
<ul>
  <li>What am I worried I'll forget?</li>
  <li>What's bothering me right now?</li>
  <li>What do I keep replaying from today?</li>
  <li>What am I dreading about tomorrow?</li>
</ul>
<h3>3. Don't solve anything</h3>
<p>This is the hard part. The moment you start fixing, your brain switches back into work mode. Just capture.</p>
<h3>4. Let it go — literally</h3>
<p>Close the notebook. Put the paper somewhere else. Some people like a small physical gesture of release: folding the page, turning it face down, or throwing a scrap away. The gesture sounds silly but it gives the ritual an ending.</p>
${CTA('Prefer to do it on screen?', `In Come Home's "Clear my mind", you write your thoughts, press <em>Leave it here</em>, and watch them float away into the night sky, clouds, or a river. Nothing is saved, synced, or sent anywhere.`)}

<h2>What to do with the list afterwards</h2>
<p>Most of what you write won't need anything. For the rest, a quick sort the <em>next morning</em> works well:</p>
<ul>
  <li><strong>Actual tasks</strong> → move to your to-do list or calendar.</li>
  <li><strong>Worries you can influence</strong> → note one small next step.</li>
  <li><strong>Worries you can't influence</strong> → let them stay on the page.</li>
</ul>
<p>Some people keep a morning list and throw the night list away. Both are fine. The value is in the unloading, not the archive.</p>

<h2>Brain dump vs. journaling vs. to-do list</h2>
<ul>
  <li><strong>To-do list:</strong> only tasks, usually prioritised. Great for work; misses the emotional stuff.</li>
  <li><strong>Journaling:</strong> reflective, often longer. Great for understanding yourself; can stir things up late at night.</li>
  <li><strong>Brain dump:</strong> everything, unfiltered, short. Great for getting to sleep.</li>
</ul>
<p>If your evenings are mostly about processing a heavy day, you might pair a brain dump with the gentle ritual in <a href="/blog/how-to-reset-after-a-stressful-workday">How to Reset After a Stressful Workday</a>.</p>

<h2>Common questions people have when starting</h2>
<p><strong>"What if writing it down makes me more anxious?"</strong> Keep it short and stop at two minutes. If a single worry dominates, write it once and then switch to something calming, like slow breathing or soft rain. <a href="/blog/what-to-do-when-your-mind-wont-stop-thinking">What to Do When Your Mind Won't Stop Thinking</a> has more ideas.</p>
<p><strong>"Can I do it in my phone's notes app?"</strong> You can, but your phone is also where work email and endless feeds live. If you use a screen, pick somewhere quiet and single-purpose.</p>

<h2>Make it part of your evening</h2>
<p>A brain dump works best as the first step of winding down, not the last thing you do in bed. Pair it with the ideas in <a href="/blog/how-to-clear-your-mind-before-bed">How to Clear Your Mind Before Bed</a> and <a href="/blog/evening-routine-after-work">a calm evening routine</a>, and your nights start to feel a little lighter.</p>
<p>You don't have to solve everything tonight. You just have to put it down. When you're ready, <a href="/come-home">Come Home</a> has a quiet place to do exactly that.</p>
`.trim(),
    faq: [
      { q: 'What is a brain dump?', a: 'A brain dump is writing down everything that is on your mind — tasks, worries, ideas, reminders — without organising or solving any of it. The goal is simply to move thoughts out of your head and onto a page.' },
      { q: 'Does a brain dump before bed help you sleep?', a: 'Many people find it helps. A 2018 sleep-lab study by Scullin and colleagues found that writing a specific to-do list before bed helped people fall asleep faster than writing about completed tasks. A brain dump captures those tasks along with the worries that keep minds busy.' },
      { q: 'How long should a brain dump take?', a: 'Two to five minutes is plenty. Keeping it short stops it from turning into a planning or problem-solving session, which would wake your mind back up.' },
      { q: 'Is my brain dump saved in Come Home mode?', a: 'No. In Come Home, brain dump text stays only on your device while you write it and is discarded when you release it. It is never saved, synced, or sent to a server.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-stop-overthinking-at-night',
    title: 'How to Stop Overthinking at Night (Especially About Work)',
    seoTitle: 'How to Stop Overthinking at Night and Stop Thinking About Work',
    excerpt: 'Replaying meetings and rehearsing tomorrow at 1 a.m.? Why overthinking at night happens and gentle, practical ways to stop thinking about work in bed.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 7,
    publishedAt: '2026-09-24',
    coverGradient: ['#141828', '#232142'],
    emoji: '🌀',
    cta: 'come-home',
    content: `
<p>It usually starts innocently. You remember something from a meeting. Then you wonder how it came across. Then you rehearse what you'll say tomorrow, then what they'll say back, then what that means for the project, then your career. It's 1:14 a.m.</p>
<p>Overthinking at night — especially about work — is one of the most common reasons people feel tired even after a full night in bed. The good news is that you don't need to become a different person to calm it down. You need a few ways to interrupt the loop.</p>

<h2>Why overthinking gets worse at night</h2>
<p>At night there's nothing competing for your attention, you're tired (which makes problems feel bigger and solutions feel further away), and you can't actually <em>do</em> anything about most of what you're thinking about. That combination is perfect for looping: the same thoughts, around and around, without progress.</p>
<p>It helps to notice the difference between <strong>thinking</strong> and <strong>overthinking</strong>. Thinking moves toward a decision or an action. Overthinking circles. If you've had the same thought three times and nothing has changed, you're not solving — you're spinning.</p>

<h2>Before bed: give work a proper ending</h2>
<h3>Do a five-minute "shutdown"</h3>
<p>At the end of your workday, spend five minutes closing loops: jot down where you left each open task, note the very first thing you'll do tomorrow, and write down anything you're worried about. Research on unfinished goals (for example, Masicampo and Baumeister's work) suggests that making a concrete plan for an unfinished task reduces how often it pops back into your mind.</p>
<h3>Schedule your worrying — earlier</h3>
<p>This sounds strange, but it helps many people: set aside ten minutes in the early evening as "worry time". Write down what's bothering you and anything you could do about it. When a worry shows up later in bed, remind yourself it has an appointment tomorrow.</p>
<h3>Create a physical boundary</h3>
<p>Close the laptop and put it out of sight. Turn off work notifications on your phone after a set time. Your brain takes cues from your environment; if work is visible, it's still "on".</p>
${CTA('Close the day with a brain dump.', `Come Home's "Clear my mind" lets you write everything down and let it float away — private and never saved.`)}

<h2>In bed: interrupt the loop</h2>
<h3>Name it, don't fight it</h3>
<p>Arguing with a thought keeps it center stage. Try naming it instead: "I'm replaying the meeting again." Naming creates a little distance, and distance is where calm starts.</p>
<h3>Ask one question: "Can I do anything about this right now?"</h3>
<p>If yes (rare at 1 a.m.), write it down. If no, the most helpful thing you can do for the problem is sleep. Tomorrow-you will handle it better than midnight-you.</p>
<h3>Move your attention somewhere gentle</h3>
<p>Your mind needs somewhere else to go. Try slow breathing with a longer exhale, listening to steady rain or waves, or picturing a familiar, calm place in detail. Don't aim to feel relaxed — aim to feel slightly bored.</p>
<h3>Get up if it's not working</h3>
<p>If you've been looping and frustrated for a while, get up and do something quiet in dim light until you feel sleepy. It keeps bed associated with sleep rather than struggle.</p>

<h2>During the day: fewer loops at night</h2>
<ul>
  <li><strong>Deal with small things early.</strong> The unsent email becomes a 1 a.m. thought. Two minutes in the afternoon saves an hour at night.</li>
  <li><strong>Talk it through.</strong> Saying a worry out loud to a friend or colleague often shrinks it.</li>
  <li><strong>Protect a buffer after work.</strong> Even 20 minutes between your last work task and the rest of your evening helps. See <a href="/blog/how-to-relax-after-work">How to Relax After Work</a>.</li>
</ul>

<h2>When overthinking is more than a bad night</h2>
<p>Everyone overthinks sometimes. But if racing thoughts keep you awake most nights, or you feel constantly on edge, it's worth speaking with a doctor or a mental health professional. That's not a failure — it's just getting the right kind of help, the same way you would for a sore back.</p>

<h2>Keep reading</h2>
<ul>
  <li><a href="/blog/brain-dump-before-bed">Brain Dump Before Bed: How to Get Thoughts Out of Your Head</a></li>
  <li><a href="/blog/what-to-do-when-your-mind-wont-stop-thinking">What to Do When Your Mind Won't Stop Thinking</a></li>
  <li><a href="/blog/how-to-clear-your-mind-before-bed">How to Clear Your Mind Before Bed</a></li>
</ul>
<p>And when it's late and your head is full, <a href="/come-home">Come Home</a> is there — a quiet room, soft rain, and a reminder that you don't have to solve everything tonight.</p>
`.trim(),
    faq: [
      { q: 'How do I stop thinking about work at night?', a: 'Give your workday a clear ending: write where you left each task and the first thing you will do tomorrow, turn off work notifications, and put your laptop out of sight. If work thoughts return in bed, write them down and remind yourself they have a place on tomorrow’s list.' },
      { q: 'Why do I overthink more at night?', a: 'At night there are fewer distractions, you are tired, and you cannot act on most of what you are thinking about. That combination makes it easy for thoughts to loop instead of moving toward a decision.' },
      { q: 'What is scheduled worry time?', a: 'It is a short, planned window earlier in the evening — often around ten minutes — where you write down your worries and any possible next steps. When a worry appears later, you can postpone it to that time instead of engaging with it in bed.' },
      { q: 'Is overthinking at night a sign of anxiety?', a: 'Occasional overthinking is normal. If racing thoughts keep you awake most nights or you feel constantly on edge, talk to a doctor or mental health professional. This article is general wellbeing information, not medical advice.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'evening-routine-after-work',
    title: 'How to Create a Calm Evening Routine After a Busy Workday',
    seoTitle: 'Simple Evening Routine After Work: How to Create a Calm Evening',
    excerpt: 'A calm evening routine after work does not need to be long or perfect. How to build a simple, flexible evening rhythm that helps you rest, not perform.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#201819', '#35231f'],
    emoji: '🍵',
    cta: 'come-home',
    content: `
<p>Search for "evening routine" and you'll find beautifully lit videos: skincare, journaling, reading, yoga, meal prep, a cup of tea steaming in perfect light. It's lovely. It's also two hours long, and most of us get home with about forty spare minutes and a head full of work.</p>
<p>A calm evening routine after work doesn't have to look impressive. It has to be <strong>easy enough to do when you're tired</strong>. This guide will help you build one that fits your real evenings.</p>

<h2>What an evening routine is actually for</h2>
<p>The point isn't productivity. It's transition. A good evening routine does three things:</p>
<ol>
  <li>It <strong>ends the workday</strong> clearly, so work stops leaking into your evening.</li>
  <li>It gives you <strong>some time that's just yours</strong>, even if it's short.</li>
  <li>It <strong>winds your body and mind down</strong> toward sleep.</li>
</ol>
<p>If your routine does those three things, it's working — no matter how plain it looks.</p>

<h2>Build it in three small blocks</h2>
<h3>Block 1: The handover (5–10 minutes)</h3>
<p>This is the bridge from work to home. Write tomorrow's first task. Close your work apps. Change clothes. If you commute, use the last few minutes of the trip without your inbox — music, a podcast, or just looking out the window.</p>
<p>If your mind is still busy, add a quick brain dump here. It's the single most useful step for people who "can't switch off". More in <a href="/blog/brain-dump-before-bed">Brain Dump Before Bed</a>.</p>
${CTA('Need a bridge between work and home?', `Come Home mode is designed for exactly this handover.`)}

<h3>Block 2: The middle of the evening (flexible)</h3>
<p>This is dinner, chores, family, friends, hobbies, TV — life. You don't need to schedule it. Just try to include one thing that restores you rather than drains you. Researchers who study recovery from work often describe a few different kinds of recovery:</p>
<ul>
  <li><strong>Relaxation:</strong> low-effort, calming activities (a bath, a walk, gentle music).</li>
  <li><strong>Mastery:</strong> something mildly challenging that isn't work (cooking something new, learning an instrument, a puzzle).</li>
  <li><strong>Detachment:</strong> anything that absorbs you enough to forget about work.</li>
  <li><strong>Control:</strong> choosing for yourself how to spend the time.</li>
</ul>
<p>You don't need all four every night. Notice which one you're missing most.</p>

<h3>Block 3: The wind-down (20–30 minutes)</h3>
<p>This is the part that most directly affects sleep. Lower the lights. Lower the volume. Move from screens to slower inputs if you can — a book, a stretch, a warm drink, soft ambient sound. If phones are your weak spot, <a href="/blog/digital-detox-before-bed">Digital Detox Before Bed</a> has a gentle approach that doesn't require throwing yours in a lake.</p>

<h2>Keep it flexible</h2>
<p>Rigid routines break the first time you have a late meeting or a friend's birthday. Instead of fixed times, think in sequence: <em>handover → something restorative → wind-down</em>. On a busy night, each block can shrink to a few minutes. On a free night, they can stretch.</p>
<p>It also helps to have a "minimum version" for your hardest evenings — something you can do in five minutes while exhausted. We wrote one here: <a href="/blog/5-minute-relaxation-routine">A Simple 5-Minute Relaxation Routine After Work</a>.</p>

<h2>A sample calm evening (for a real, tired person)</h2>
<ul>
  <li><strong>18:30</strong> — Close laptop, write tomorrow's first task, two-minute brain dump.</li>
  <li><strong>18:40</strong> — Change clothes, open a window, put the phone on the charger in another room.</li>
  <li><strong>19:00–21:30</strong> — Dinner, life, one restorative thing (a walk, a show you love, a call with a friend).</li>
  <li><strong>22:00</strong> — Lamps only. Soft rain in the background. Read, stretch, or just sit.</li>
  <li><strong>22:30</strong> — Bed.</li>
</ul>
<p>Adjust the times to your life. The shape matters more than the clock.</p>

<h2>Things to leave out</h2>
<ul>
  <li><strong>Streaks and scores.</strong> Missing a night shouldn't make you feel worse.</li>
  <li><strong>Too many steps.</strong> If your routine has ten steps, it becomes a job.</li>
  <li><strong>"Catching up" on work in the wind-down.</strong> It resets the whole process.</li>
</ul>

<h2>Where Come Home fits in</h2>
<p>We built <a href="/come-home">Come Home</a> as a gentle companion for evenings like these. Tell it how today felt, choose what you need — rest, calm, quiet, company, or sleep — and it takes care of the atmosphere. No tasks. No productivity. Just a quiet place between work and sleep.</p>
<p>If your days are especially draining, you might also like <a href="/blog/how-to-unwind-after-a-long-day">How to Unwind After a Long and Stressful Day</a>.</p>
`.trim(),
    faq: [
      { q: 'What is a good evening routine after work?', a: 'A good evening routine clearly ends the workday, includes at least one thing that restores you, and winds you down toward sleep. For example: write tomorrow’s first task and do a brain dump, spend the evening on something you enjoy, then dim the lights and slow down for 20–30 minutes before bed.' },
      { q: 'How long should an evening routine be?', a: 'It can be as short as five minutes on busy nights. Rather than fixed times, think in a sequence — handover, something restorative, wind-down — and let each part stretch or shrink with your evening.' },
      { q: 'How do I stick to an evening routine?', a: 'Keep it simple enough to do when you are tired, attach it to things you already do (like getting home or brushing your teeth), and have a five-minute minimum version for hard nights. Avoid streaks that make missed nights feel like failure.' },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-unwind-after-a-long-day',
    title: 'How to Unwind After a Long and Stressful Day',
    seoTitle: 'How to Unwind After a Long Day: 9 Gentle Ideas That Actually Help',
    excerpt: 'Mentally exhausted after a long day? Gentle, realistic ways to unwind — for the evenings when you are too tired to do anything that looks like self-care.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#1a1420', '#2b1b2e'],
    emoji: '🌧️',
    cta: 'come-home',
    content: `
<p>There's a specific kind of tired that comes after a long day. Not sleepy — just <em>empty</em>. Too tired to cook properly, too wired to sleep, too drained to do any of the relaxing things you know you're supposed to do. So you end up on the sofa, scrolling, feeling neither rested nor productive.</p>
<p>If that sounds familiar, this guide is for you. These ideas are designed for low-energy evenings: small, gentle, and realistic when you're mentally exhausted.</p>

<h2>First, lower the bar</h2>
<p>When you're drained, "unwinding" can start to feel like another task you're failing at. So let's make it simpler: the goal tonight isn't to have a perfect relaxing evening. It's to feel <strong>a little lighter</strong> than you do right now. That's it.</p>

<h2>9 gentle ways to unwind after a long day</h2>
<h3>1. Take a two-minute arrival pause</h3>
<p>When you get home, before anything else, sit down for two minutes. Coat still on if you want. Look out the window. Breathe out slowly a few times. This short pause gives your nervous system a moment to register that the day's demands are over.</p>

<h3>2. Get the day out of your head</h3>
<p>Long, stressful days leave lots of mental residue. Write down what's still buzzing — tasks, conversations, worries — in a quick, messy list. It takes two minutes and makes the rest of the evening quieter. See <a href="/blog/brain-dump-before-bed">Brain Dump Before Bed</a> for how.</p>
${CTA('Too tired for a notebook?', `Come Home has a private "Clear my mind" space: write, press <em>Leave it here</em>, and watch it float away.`)}

<h3>3. Change the light</h3>
<p>Bright overhead light feels like office light. Switch to a lamp or two. Warmer, dimmer light is one of the quickest ways to make a room feel like evening.</p>

<h3>4. Put something warm in your hands</h3>
<p>Tea, warm milk, soup, a hot shower. Warmth is comforting in a very basic, bodily way, and it gives you a natural reason to slow down for a few minutes.</p>

<h3>5. Let sound do the work</h3>
<p>When you're too tired to choose anything, soft ambient sound is an easy win. Rain on a window, a fireplace crackling, distant waves. It fills the silence without asking anything of you. Try a mix in our <a href="/ambient-sounds">ambient sound mixer</a>.</p>

<h3>6. Move a little, slowly</h3>
<p>Not a workout. A ten-minute walk around the block, a few stretches on the floor, rolling your shoulders. Gentle movement helps release the physical tension that builds during stressful days.</p>

<h3>7. Choose comfort over self-improvement</h3>
<p>Rewatching a favourite show, re-reading a familiar book, cooking something simple you've made a hundred times. On hard days, familiar things are restful precisely because they ask nothing new of you.</p>

<h3>8. Talk to someone — or don't</h3>
<p>For some people, venting to a friend or partner is the fastest way to let a day go. For others, the best thing is quiet. Both are valid. Notice which one you need tonight rather than which one you think you should want.</p>

<h3>9. Go to bed a little earlier</h3>
<p>The simplest unwinding strategy there is. If the day was long, the kindest thing you can do for tomorrow-you is to give them a bit more sleep.</p>

<h2>What makes exhaustion worse</h2>
<ul>
  <li><strong>Doomscrolling.</strong> It feels like rest because you're lying down, but your brain is taking in a constant stream of new information.</li>
  <li><strong>"I should be doing something useful."</strong> Rest <em>is</em> useful. Recovering from work is what lets you keep doing it.</li>
  <li><strong>Replaying the day.</strong> If you catch yourself rehashing a stressful moment, write it down once and set it aside. <a href="/blog/how-to-stop-overthinking-at-night">How to Stop Overthinking at Night</a> can help with this.</li>
</ul>

<h2>When it's more than one long day</h2>
<p>If every day feels this draining, and it's been going on for a while, that's worth paying attention to. Persistent exhaustion can be a sign of burnout or a health issue, and it's worth talking to a doctor or someone you trust about it. You deserve more support than a nice evening routine can provide.</p>

<h2>A soft place to land</h2>
<p>For the ordinary long days, <a href="/come-home">Come Home</a> is a quiet space in Focus Workspace built for exactly this feeling. Tell it how today was, choose "I just want to rest", and you'll find a cozy room with a warm lamp, a cup of tea, and rain on the window. Nothing to do. Nothing to achieve.</p>
<p>More gentle reading: <a href="/blog/how-to-reset-after-a-stressful-workday">How to Reset After a Stressful Workday</a> and <a href="/blog/how-to-relax-after-work">How to Relax After Work</a>.</p>
`.trim(),
    faq: [
      { q: 'How can I relax when I am mentally exhausted?', a: 'Keep it very simple: a short arrival pause, dimmer and warmer light, something warm to drink, and soft background sound. Writing down what is still on your mind for two minutes can also make the evening feel quieter.' },
      { q: 'Why can’t I relax after a stressful day?', a: 'Stress can leave your body and mind in an alert state even after the stressful situation ends. Small signals of safety and comfort — a change of environment, slow breathing, warmth, quiet sound — help you gradually shift out of that state.' },
      { q: 'Is it okay to do nothing after work?', a: 'Yes. Rest is part of recovery, not a waste of time. Doing something low-effort that you enjoy is a completely valid way to spend an evening.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-to-do-when-your-mind-wont-stop-thinking',
    title: "What to Do When Your Mind Won't Stop Thinking",
    seoTitle: "What to Do When Your Mind Won't Stop Thinking (Racing Thoughts)",
    excerpt: 'Racing thoughts, a mind that feels overwhelmed, the same worries on repeat? Practical, gentle things to do when your mind won’t stop thinking.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#171a2b', '#26223d'],
    emoji: '🌀',
    cta: 'come-home',
    content: `
<p>Sometimes your mind feels like a radio stuck between stations: bits of work, a conversation from lunch, a worry about money, a song lyric, tomorrow's schedule, all at once and all at full volume. You're not choosing to think about any of it. It's just <em>happening</em>.</p>
<p>When your mind won't stop thinking, the instinct is to force it quiet. That almost never works. What works better is giving your thoughts somewhere to go, and giving your attention somewhere gentler to rest.</p>

<h2>Why your mind gets overwhelmed</h2>
<p>An overwhelmed mind is usually holding too many open loops at once — things you need to do, decide, remember, or feel. Each one takes a small amount of attention, and together they add up to noise. Tiredness, stress, and lack of downtime make it worse, because you have less capacity to sort through everything.</p>
<p>The fix, then, isn't to stop thinking. It's to <strong>close some loops</strong> and <strong>lower the volume</strong> on the rest.</p>

<h2>Step 1: Get it out of your head</h2>
<p>Your working memory is small. Paper is not. Write down everything that's rattling around — one item per line, no order, no judgment. This is called a brain dump, and it's the single most effective first step we know of for a racing mind. (Full guide: <a href="/blog/brain-dump-before-bed">Brain Dump Before Bed</a>.)</p>
<p>Once it's all on the page, most people notice two things: the list is shorter than it felt, and a lot of it doesn't need anything from them tonight.</p>
${CTA('Try it now:', `a two-minute brain dump in Come Home, where your thoughts drift away and nothing is saved.`)}

<h2>Step 2: Sort lightly (only if it helps)</h2>
<p>If you have a bit of energy, glance at your list and mark items with one of three labels:</p>
<ul>
  <li><strong>Do</strong> — something with a concrete next step. Write the next step.</li>
  <li><strong>Later</strong> — real, but not for today. Put it somewhere you'll see it.</li>
  <li><strong>Let go</strong> — things you can't influence, or that don't really matter.</li>
</ul>
<p>Making a specific plan for an unfinished task is one of the most reliable ways to stop it from popping back up. It doesn't need to be done — it just needs a plan.</p>

<h2>Step 3: Lower the volume</h2>
<h3>Breathe out longer than you breathe in</h3>
<p>Try in for about four counts, out for about six, for a couple of minutes. There's growing interest in short breathing practices for stress; one 2023 study from Stanford researchers found that just five minutes a day of breathing that emphasised slow exhales was linked to improved mood over a month. You don't need a study to try it, though — it's free and takes two minutes.</p>
<h3>Give your senses something steady</h3>
<p>Steady, predictable sounds — rain, wind, a fan — give your brain a neutral background. It's easier to let thoughts pass when there's something calm underneath them.</p>
<h3>Move your body</h3>
<p>A short walk, stretching, shaking out your arms. Physical movement can break a mental loop surprisingly quickly.</p>

<h2>Step 4: Change your relationship with the thoughts</h2>
<p>Thoughts aren't instructions. You can notice a thought — "I'm going to mess up that presentation" — without treating it as a fact or a task. A simple way to practise this is labelling: "that's a worry about work," "that's planning," "that's a memory." Labels create a small gap between you and the thought, and in that gap, things get quieter.</p>

<h2>Things that make racing thoughts worse</h2>
<ul>
  <li><strong>Trying to solve everything tonight.</strong> Late-night you is not your best problem-solver.</li>
  <li><strong>Constant input.</strong> More feeds, more videos, more notifications — more loops.</li>
  <li><strong>Caffeine late in the day.</strong> It can make a busy mind busier.</li>
</ul>

<h2>When to get more support</h2>
<p>If racing thoughts are frequent, intense, or making it hard to function or sleep, please talk to a doctor or a mental health professional. This article is about everyday overwhelm — it isn't a substitute for proper care, and reaching out is a strong, sensible thing to do.</p>

<h2>A quiet place to put it all down</h2>
<p>We built <a href="/come-home">Come Home</a> for the end of days like these. Choose "I need to clear my mind", write what's taking up space, and let it float away into the night sky. Then stay a while in a quiet room. You don't have to solve everything tonight.</p>
<p>Related: <a href="/blog/how-to-stop-overthinking-at-night">How to Stop Overthinking at Night</a> · <a href="/blog/how-to-clear-your-mind-before-bed">How to Clear Your Mind Before Bed</a></p>
`.trim(),
    faq: [
      { q: 'How do I stop my mind from racing?', a: 'Start by writing everything down in a quick brain dump, then give your attention something steady — slow breathing with a longer exhale, soft background sound, or a short walk. Trying to force thoughts away usually makes them louder.' },
      { q: 'What should I do when my mind feels overwhelmed?', a: 'Reduce the number of open loops: write down what is on your mind, choose one concrete next step for anything urgent, and consciously postpone the rest. Then lower your inputs for a while — fewer screens, quieter surroundings.' },
      { q: 'Are racing thoughts normal?', a: 'Occasional racing thoughts are very common, especially when you are tired or stressed. If they are frequent, intense, or affect your sleep or daily life, speak with a doctor or mental health professional.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: '5-minute-relaxation-routine',
    title: 'A Simple 5-Minute Relaxation Routine After Work',
    seoTitle: 'A Simple 5-Minute Relaxation Routine After Work (Step by Step)',
    excerpt: 'No time for a long evening routine? This five-minute relaxation routine after work helps you switch off, clear your head, and arrive home — step by step.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 5,
    publishedAt: '2026-09-24',
    coverGradient: ['#1c1718', '#30211c'],
    emoji: '⏳',
    cta: 'come-home',
    content: `
<p>Most relaxation advice assumes you have an hour. You don't. You have dinner to make, messages to answer, maybe kids to put to bed, and about five minutes that are genuinely yours.</p>
<p>Good news: five minutes is enough to make a real difference — if you use them on purpose. Here's a simple routine you can do almost anywhere, as soon as you get home (or close your laptop).</p>

<h2>The 5-minute routine</h2>

<h3>Minute 1 — Close the workday</h3>
<p>Write down one line: <em>the first thing I'll do tomorrow</em>. Then close your work apps or put your work bag out of sight. This tiny act tells your brain the day has an official ending, and it makes it easier to stop replaying unfinished tasks.</p>

<h3>Minute 2 — Empty your head</h3>
<p>Set a one-minute timer and write down everything that's still on your mind. Tasks, worries, fragments. Don't organise. Don't fix. Just unload. (If you like this, the longer version is in <a href="/blog/brain-dump-before-bed">Brain Dump Before Bed</a>.)</p>

<h3>Minute 3 — Breathe out the day</h3>
<p>Sit comfortably. Breathe in through your nose for about four counts, and out slowly for about six. Let your shoulders drop on each exhale. Don't worry about doing it perfectly — slower is enough.</p>

<h3>Minute 4 — Change one thing around you</h3>
<p>Switch off the overhead light and turn on a lamp. Open a window. Put on soft background sound — rain, a fireplace, the ocean. Change your clothes. Pick one. The goal is a small physical signal that you're in a different part of the day now.</p>

<h3>Minute 5 — Choose your first "home" moment</h3>
<p>Ask yourself: <em>what would feel nice right now?</em> Tea. A shower. Five minutes on the balcony. A call to someone you like. Then do that — before you open your phone.</p>

${CTA('Want the routine guided for you?', `Come Home walks you through it gently: tell it how today was, clear your mind, and let the rest go.`)}

<h2>Why such a short routine works</h2>
<p>A routine this short works because it targets the two things that most often keep people "at work" in the evening:</p>
<ul>
  <li><strong>Open loops</strong> — unfinished tasks that stay active in your head. Minutes 1 and 2 give them somewhere to go.</li>
  <li><strong>No transition</strong> — going straight from work mode into evening chores without any signal that something has changed. Minutes 3–5 create that signal.</li>
</ul>
<p>And because it only takes five minutes, you're far more likely to actually do it on the evenings you need it most.</p>

<h2>Make it stick</h2>
<ul>
  <li><strong>Attach it to something you already do.</strong> Right after you drop your keys, or right after you close the laptop.</li>
  <li><strong>Keep the tools visible.</strong> A notebook and pen by the door or on the desk.</li>
  <li><strong>Don't track it.</strong> No streaks. If you forget, you forget. Tomorrow is a new evening.</li>
</ul>

<h2>Variations for different evenings</h2>
<ul>
  <li><strong>After a stressful day:</strong> spend two minutes on the brain dump and add a short walk. See <a href="/blog/how-to-reset-after-a-stressful-workday">How to Reset After a Stressful Workday</a>.</li>
  <li><strong>Right before bed:</strong> skip minute 5 and go straight to lights-out. <a href="/blog/how-to-clear-your-mind-before-bed">How to Clear Your Mind Before Bed</a> has more.</li>
  <li><strong>Working from home:</strong> physically leave your desk for minutes 3–5 — even another room makes a difference.</li>
</ul>

<h2>What if five minutes feels like too much?</h2>
<p>Some evenings, even five minutes of anything feels impossible. That's a signal worth listening to, not a failure. On those nights, do just one step — usually minute 1, because writing down tomorrow's first task is what stops work from following you around. Or skip the steps entirely: sit down, put soft rain on, and let the evening be slow. Rest doesn't have to be earned by finishing a routine. The routine is there to help you, not to become one more thing you're behind on.</p>

<h2>When you have more time</h2>
<p>If you'd like to build on this, <a href="/blog/evening-routine-after-work">How to Create a Calm Evening Routine</a> shows how to turn these five minutes into a flexible evening rhythm. But on busy nights, these five minutes are enough. You did enough today.</p>
<p>And if you want a place to do this without any distractions, <a href="/come-home">Come Home</a> is waiting — soft sound, a quiet room, no timers.</p>
`.trim(),
    faq: [
      { q: 'Can five minutes really help me relax?', a: 'Yes. Five focused minutes that close out your workday, empty your head onto paper, and create a clear change of environment can noticeably reduce how much work follows you into the evening.' },
      { q: 'What is the best thing to do right after work?', a: 'Give the workday a clear ending — note the first thing you will do tomorrow and close your work apps — then do a short brain dump before anything else. This stops unfinished tasks from staying active in your mind.' },
      { q: 'How do I remember to do an evening routine?', a: 'Attach it to something you already do every day, like dropping your keys when you get home or closing your laptop, and keep a notebook somewhere visible. Keep it short enough that it never feels like a chore.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-reset-after-a-stressful-workday',
    title: 'How to Reset After a Stressful Workday',
    seoTitle: 'How to Reset After a Stressful Workday: What to Do Tonight',
    excerpt: 'Had a stressful day at work? What to do in the first hour after a hard workday to reset your body and mind — and how to stop carrying it into tomorrow.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#1d1522', '#301f30'],
    emoji: '🌊',
    cta: 'come-home',
    content: `
<p>Some workdays leave marks. A tense meeting. A mistake that felt huge. A difficult client, a deadline that ate the whole afternoon, a comment that stung more than it should have. You get home and the day is technically over, but your body is still braced and your mind is still at the office.</p>
<p>This guide is about the evening after a hard day: what to do in the first hour, how to let the day go without pretending it didn't happen, and how to avoid carrying it into tomorrow.</p>

<h2>First: stress lives in the body, too</h2>
<p>After a stressful day, it's not just your thoughts that stay "on". Many people notice tight shoulders, a clenched jaw, shallow breathing, or a restless feeling. That's your body still in alert mode. So resetting isn't only about thinking differently — it's about giving your body clear signals that the stressful situation is over.</p>

<h2>The first hour after a stressful workday</h2>

<h3>1. Discharge the tension physically</h3>
<p>Before you try to relax, move. A brisk ten-minute walk, stretching, shaking out your arms and legs, even cleaning the kitchen with some energy. Movement helps burn off the restless energy that stress leaves behind, and it often makes the calm that follows feel easier to reach.</p>

<h3>2. Slow your breathing down</h3>
<p>Once you've moved, sit somewhere comfortable. Breathe in gently, then breathe out slowly — longer out than in. Let your shoulders drop. Two or three minutes is enough to notice a shift. If you'd like to be guided, Come Home's "I need to calm down" is a two-minute breathing-paced experience.</p>
${CTA('Two minutes to calm down:', `slow waves, soft light, and four short sentences, timed to your breathing.`)}

<h3>3. Name what happened — once</h3>
<p>Stressful moments tend to replay because they feel unfinished. Try writing one or two sentences about what happened and how it made you feel. Not an essay; just a few honest lines. "Today I had a really difficult meeting and I felt dismissed." Naming it helps you put it down.</p>
<p>In Come Home, there's a small ritual for this called "One thing from today": you write one sentence, and either <em>let it go</em> — it dissolves — or, if it was something good, <em>keep it</em> as a star in your own private sky.</p>

<h3>4. Separate "what I can do" from "what I can't"</h3>
<p>If part of the stress is about tomorrow, make a quick list: what can I actually do about this? Write the next small step for each item. Everything else — other people's reactions, outcomes you can't control — goes on the "let go" side. Having a plan for the things you can influence makes them much less likely to haunt your evening.</p>

<h3>5. Do something that absorbs you</h3>
<p>Recovery research suggests that being mentally absorbed in something unrelated to work helps people detach. Cooking a real meal, a game, a hobby, a gripping book, a conversation about anything but work. Choose something that takes enough attention that the office fades into the background.</p>

<h2>What to avoid on a hard evening</h2>
<ul>
  <li><strong>Re-reading the email or the Slack thread.</strong> You won't see anything new, and you'll restart the stress response.</li>
  <li><strong>Deciding big things tonight.</strong> Resigning, confronting, sending the strongly worded message — sleep on it.</li>
  <li><strong>Numbing out for hours.</strong> A bit of mindless TV is fine. Four hours of scrolling usually leaves you feeling worse.</li>
</ul>

<h2>Before bed: close the day kindly</h2>
<p>Do a short <a href="/blog/brain-dump-before-bed">brain dump</a> so tomorrow's worries have somewhere to live, then wind down with dim light and soft sound. If you find yourself replaying the day in bed, <a href="/blog/how-to-stop-overthinking-at-night">How to Stop Overthinking at Night</a> has gentle ways to interrupt the loop.</p>

<h2>If stressful days are the norm</h2>
<p>One bad day is part of working life. But if most days leave you this depleted, that's important information. Talking to your manager, HR, a trusted friend, or a professional can help. Chronic stress is worth addressing at its source — an evening routine can soften it, but it can't fix a job that's consistently too much.</p>

<h2>You did enough today</h2>
<p>A stressful day doesn't mean you failed. It means today was hard. <a href="/come-home">Come Home</a> is a quiet space in Focus Workspace for exactly these evenings — no productivity, no pressure. Just a moment to breathe out and leave the rest for tomorrow.</p>
<p>Keep reading: <a href="/blog/how-to-unwind-after-a-long-day">How to Unwind After a Long and Stressful Day</a></p>
`.trim(),
    faq: [
      { q: 'What should I do after a stressful day at work?', a: 'Start with physical movement to release tension, then slow your breathing with longer exhales. Write a sentence or two about what happened, list the concrete next steps you can take, and then do something absorbing that has nothing to do with work.' },
      { q: 'How do I stop bringing work stress home?', a: 'Create a clear transition: end your workday with a short shutdown, change your environment when you get home, and give work worries a place on paper instead of in your head. Avoid rechecking work messages in the evening.' },
      { q: 'How long does it take to recover from a stressful day?', a: 'It varies, but deliberate steps — movement, slow breathing, and writing things down — usually help people feel noticeably calmer within an hour. Consistent evening recovery also matters for how you feel over weeks.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'digital-detox-before-bed',
    title: 'Digital Detox Before Bed: A Simple Nighttime Routine',
    seoTitle: 'Digital Detox Before Bed: A Simple Nighttime Routine That Sticks',
    excerpt: 'Want to stop scrolling in bed without giving up your phone? A realistic digital detox before bed — a gentle nighttime routine that actually sticks.',
    author: 'Alex Chen',
    category: 'Evening Reset',
    readTime: 6,
    publishedAt: '2026-09-24',
    coverGradient: ['#11151f', '#1e2233'],
    emoji: '📵',
    cta: 'come-home',
    content: `
<p>You get into bed intending to sleep. You pick up your phone "just to check something". Forty minutes later you're watching a video about how bridges are built, and you feel more awake than when you started.</p>
<p>A digital detox before bed doesn't have to mean throwing your phone in a drawer forever. It means creating a little space between your screens and your sleep. Here's a realistic way to do it.</p>

<h2>Why screens make it harder to wind down</h2>
<p>You've probably heard that blue light from screens keeps you awake. Light does affect your body clock, but for most people the bigger issue is what's <em>on</em> the screen. Feeds are designed to be engaging: new information, emotional content, endless next items. That's the opposite of what a mind needs before sleep — fewer inputs, slower pace, nothing new to react to.</p>
<p>There's also the work problem. If your phone has work email or chat on it, one glance can restart your whole workday in your head.</p>

<h2>A simple nighttime digital detox routine</h2>

<h3>1. Pick a "screens down" time</h3>
<p>Choose a time — 30 to 60 minutes before you want to be asleep — after which you stop using screens for anything stimulating. Start with 30 minutes. It's more important that it's realistic than impressive.</p>

<h3>2. Do your last check on purpose</h3>
<p>Right before your screens-down time, do one intentional check: messages, tomorrow's alarm, anything you really need. Then you're done — no "just in case" checks later.</p>

<h3>3. Move the phone out of reach</h3>
<p>This is the single most effective step. Charge your phone across the room, or in another room entirely. If you use it as an alarm, a cheap standalone alarm clock is one of the best sleep investments you can make.</p>

<h3>4. Replace, don't just remove</h3>
<p>If you remove your phone and leave a gap, your hand will reach for it. Fill the time with something slow and pleasant:</p>
<ul>
  <li>A paper book or magazine (ideally not a thriller).</li>
  <li>A short <a href="/blog/brain-dump-before-bed">brain dump</a> to clear your head.</li>
  <li>Stretching, a shower, skincare, making tomorrow's lunch.</li>
  <li>Soft sound — rain, fireplace, ocean — playing from a speaker, with the screen off.</li>
</ul>

<h3>5. Use screens gently if you use them at all</h3>
<p>Not ready to go fully screen-free? That's okay. Make screen time as calm as possible: dim the brightness, turn on night mode, silence notifications, and choose something with no feed and no comments — a calming ambient page, a gentle audiobook, a wind-down you can start and then put down.</p>
${CTA('A screen that helps you put the screen down:', `Come Home's Sleep mode is a five-minute wind-down that dims the screen, lowers the sound, and ends with "Good night."`)}

<h2>If you use your phone for sleep sounds</h2>
<p>Plenty of people fall asleep to rain, white noise, or a podcast playing from their phone, and that's fine. The trick is to set it up before your screens-down time and then leave the screen alone: start the sound, turn the brightness all the way down, lock the phone, and put it face down or out of reach. A sleep timer helps too, so the sound fades out on its own. If you have a small speaker, playing from that instead means the phone never has to come to bed with you at all.</p>

<h2>Making it stick</h2>
<ul>
  <li><strong>Turn off work notifications after hours.</strong> Most phones let you schedule this.</li>
  <li><strong>Remove the most tempting apps from your home screen.</strong> A bit of friction goes a long way.</li>
  <li><strong>Expect to slip.</strong> Some nights you'll scroll. That's fine. The next night is a new chance.</li>
  <li><strong>Notice how you feel.</strong> After a week, compare mornings with and without the detox. That feeling is the best motivation there is.</li>
</ul>

<h2>What a calm, screen-light evening can look like</h2>
<ul>
  <li><strong>21:30</strong> — Last intentional check. Alarm set.</li>
  <li><strong>21:35</strong> — Phone charging in the kitchen. Lamps on, overhead lights off.</li>
  <li><strong>21:40</strong> — Two-minute brain dump. Tea.</li>
  <li><strong>21:50</strong> — Book, stretching, or soft rain in the background.</li>
  <li><strong>22:15</strong> — Lights out.</li>
</ul>

<h2>Keep going</h2>
<p>A digital detox pairs naturally with a broader evening rhythm — see <a href="/blog/evening-routine-after-work">How to Create a Calm Evening Routine After a Busy Workday</a> — and with the ideas in <a href="/blog/how-to-clear-your-mind-before-bed">How to Clear Your Mind Before Bed</a>.</p>
<p>And when you need a quiet place between work and sleep, <a href="/come-home">Come Home</a> is there: no feeds, no notifications, no scores. Just a calm room and a gentle nudge toward rest.</p>
`.trim(),
    faq: [
      { q: 'How long before bed should I stop using my phone?', a: 'Try starting with 30 minutes and extend to an hour if it feels good. A realistic routine you actually follow is better than an ambitious one you abandon.' },
      { q: 'Is it the blue light or the content that keeps me awake?', a: 'Both can play a part, but for many people the stimulating content — feeds, messages, emotional or work-related information — matters at least as much as the light. Night mode helps a little; putting the phone out of reach helps a lot.' },
      { q: 'What can I do instead of scrolling before bed?', a: 'Read a paper book, do a two-minute brain dump, stretch, take a warm shower, or listen to soft ambient sound with the screen off. Replacing the habit works better than simply trying to resist it.' },
    ],
  },
]
