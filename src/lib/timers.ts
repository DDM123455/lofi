// Data for the "N minute timer" landing pages (/7-minute-timer, /25-minute-timer, …) and the
// /timers hub. One template renders every page from this file; each entry carries its own
// copy so no two pages share the same body text.
//
// i18n: English only for now. `TIMER_LOCALES` is where localized slugs will be added later —
// hreflang alternates are built from it, so adding a language is a data change, not a rewrite.

export const BASE = 'https://www.focusworkspace.app'

export interface TimerUse { title: string; desc: string }
export interface TimerFaq { q: string; a: string }
export interface TimerInfo {
  minutes: number
  /** Short line under the H1 and in the hub list. */
  tagline: string
  /** Opening paragraph of the article below the timer. */
  intro: string
  uses: TimerUse[]
  tips: string[]
  /** Page-specific questions; shared ones are appended by `timerFaq`. */
  faq: TimerFaq[]
  emoji: string
}

export type TimerGroup = 'short' | 'medium' | 'long'
export const GROUP_LABEL: Record<TimerGroup, { title: string; range: string }> = {
  short: { title: 'Short timers', range: '1–10 minutes' },
  medium: { title: 'Medium timers', range: '11–30 minutes' },
  long: { title: 'Long timers', range: '35–120 minutes' },
}
export const groupOf = (m: number): TimerGroup => (m <= 10 ? 'short' : m <= 30 ? 'medium' : 'long')

export const timerSlug = (m: number) => `${m}-minute-timer`
export const timerPath = (m: number) => `/${timerSlug(m)}`
export const timerUrl = (m: number) => `${BASE}${timerPath(m)}`

/** Localized slugs, filled in later per language (e.g. vi: m => `/vi/hen-gio-${m}-phut`). */
export const TIMER_LOCALES: Partial<Record<string, (m: number) => string>> = {}

export function timerAlternates(m: number): Record<string, string> {
  const langs: Record<string, string> = { en: timerUrl(m) }
  for (const [lang, path] of Object.entries(TIMER_LOCALES)) if (path) langs[lang] = `${BASE}${path(m)}`
  langs['x-default'] = timerUrl(m)
  return langs
}

export const timerTitle = (m: number) => `${m} Minute Timer – Free Countdown with Alarm | LofiSpace`
export const timerDescription = (m: number) =>
  `Free ${m} minute timer with alarm. Start instantly, no sign-up. Fullscreen, works in background tabs, optional lofi & rain sounds.`

export const fmtDuration = (m: number) => {
  if (m < 60) return `${m} minute${m === 1 ? '' : 's'}`
  const h = Math.floor(m / 60), r = m % 60
  return `${h} hour${h === 1 ? '' : 's'}${r ? ` ${r} minutes` : ''}`
}

export const TIMERS: TimerInfo[] = [
  {
    minutes: 1, emoji: '⚡',
    tagline: 'Sixty seconds, start to bell.',
    intro: 'A one minute timer is for the tiny tasks that only get done when there is a clock on them: a quick tidy, a speaking drill, a single breathing exercise. One minute feels too short to argue with, which is exactly why it works as a starter.',
    uses: [
      { title: 'The one-minute rule', desc: 'If something takes less than a minute (reply to that text, put the mug away), start the timer and just do it.' },
      { title: 'Speaking practice', desc: 'Answer an interview question or a language-class prompt out loud and stop when the bell rings.' },
      { title: 'Plank or wall sit', desc: 'A classic one-minute hold. Watching the last 15 seconds count down helps you finish.' },
      { title: 'Breathing reset', desc: 'Six slow breaths fit almost exactly into a minute: in for four, out for six.' },
    ],
    tips: [
      'Use the +1 min button to stack a second round without resetting.',
      'In fullscreen the digits fill the screen, which makes it easy to follow from across a room.',
    ],
    faq: [
      { q: 'Is a one minute timer accurate to the second?', a: 'Yes. The countdown is calculated from the exact moment you pressed Start, not by counting ticks, so it stays accurate even if your device is busy.' },
    ],
  },
  {
    minutes: 2, emoji: '🪥',
    tagline: 'The length of a proper tooth-brush.',
    intro: 'Two minutes is the length dentists recommend for brushing, and it is also a sweet spot for micro-habits: long enough to do something properly, short enough that you never feel like skipping it.',
    uses: [
      { title: 'Brushing teeth', desc: 'Kids especially do better when they can see the clock. Put it in fullscreen on a tablet in the bathroom.' },
      { title: 'Two-minute tidy', desc: 'Clear one surface, desk or kitchen counter, before the bell. Small resets add up.' },
      { title: 'Soft-boiled timing', desc: 'Useful for the last stretch of cooking: resting a steak, blanching greens, or letting instant noodles soak.' },
      { title: 'Elevator pitch', desc: 'Rehearse a short pitch or presentation opener and keep it under two minutes.' },
    ],
    tips: [
      'Pick the gentle chime alarm for kids so the end feels like a reward, not a buzzer.',
      'If you are building a habit, do the same two-minute task at the same time every day.',
    ],
    faq: [
      { q: 'Can I use this 2 minute timer for brushing teeth with kids?', a: 'Yes. Press F for fullscreen so the big countdown is easy to see, and choose a soft alarm sound in the settings below the timer.' },
    ],
  },
  {
    minutes: 3, emoji: '🍵',
    tagline: 'Green tea, eggs, and quick rounds.',
    intro: 'Three minutes shows up everywhere in daily life: green or black tea steeps for about three minutes, a boxing round lasts three, and many board games use a three-minute sand timer. This page gives you the same countdown, with a proper alarm.',
    uses: [
      { title: 'Steeping tea', desc: 'Black tea usually wants 3–5 minutes; green tea 2–3. Start the timer as soon as the water hits the leaves.' },
      { title: 'Boxing or HIIT rounds', desc: 'Three-minute work rounds are standard in boxing training. Use +1 min to add a rest round between them.' },
      { title: 'Game turns', desc: 'Replace the lost sand timer for Boggle, Pictionary or word games with a loud, unmistakable alarm.' },
      { title: 'Cooling down', desc: 'A three-minute stretch at the end of a workout is easy to skip unless a timer holds you to it.' },
    ],
    tips: [
      'The digital alarm is the most noticeable in a noisy kitchen or gym.',
      'Press R to reset instantly between game rounds.',
    ],
    faq: [
      { q: 'How long should I steep tea?', a: 'As a rule of thumb: green tea 2–3 minutes, black tea 3–5, herbal 5–7. A 3 minute timer covers most green and black teas.' },
    ],
  },
  {
    minutes: 4, emoji: '🏋️',
    tagline: 'One Tabata block, or a quick focus burst.',
    intro: 'Four minutes is exactly one Tabata block: eight rounds of 20 seconds of work and 10 seconds of rest. It is also a good length for anything you want to keep deliberately short, like a stand-up update or a timed writing sprint.',
    uses: [
      { title: 'Tabata workout', desc: 'Run a four-minute block and count your rounds as you go. Repeat with a minute of rest between blocks.' },
      { title: 'Stand-up updates', desc: 'Give each person in a meeting a strict four-minute slot so the call ends on time.' },
      { title: 'Free-writing sprint', desc: 'Write without stopping or editing until the alarm goes. It is a reliable cure for a blank page.' },
      { title: 'Cooking pasta extras', desc: 'Fresh pasta, poached eggs and steamed vegetables are often done in about four minutes.' },
    ],
    tips: [
      'Turn on rain or café sounds for writing sprints; it helps you tune out the room.',
      'Allow notifications so the alarm reaches you even if this tab is behind other windows.',
    ],
    faq: [
      { q: 'Is a 4 minute timer the same as a Tabata timer?', a: 'A Tabata session is four minutes long, so this timer marks the whole block. It does not beep every 20 seconds, so count your rounds or watch the seconds.' },
    ],
  },
  {
    minutes: 5, emoji: '🧘',
    tagline: 'A real break, a short meditation, a fast start.',
    intro: 'Five minutes is the classic Pomodoro break, a common length for beginner meditation, and the "just five minutes" trick for getting started on something you have been avoiding. Most people find that once five minutes are done, carrying on is easy.',
    uses: [
      { title: 'Pomodoro break', desc: 'After a 25-minute focus block, stand up, stretch and look away from the screen until the bell.' },
      { title: 'Meditation', desc: 'Sit, close your eyes and follow your breath. Add soft rain sounds if silence feels too loud.' },
      { title: 'Beat procrastination', desc: 'Promise yourself only five minutes on the dreaded task. Starting is the hard part.' },
      { title: 'Classroom transitions', desc: 'Teachers use a visible five-minute countdown for clean-up or switching activities.' },
    ],
    tips: [
      'Choose the gentle chime for meditation so the end is not a shock.',
      'For a full Pomodoro cycle, pair this with the 25 minute timer or open the focus workspace.',
    ],
    faq: [
      { q: 'Is 5 minutes long enough to meditate?', a: 'Yes. Short daily sessions are a common way to start. Five quiet minutes with a gentle alarm is easier to keep up than an occasional long session.' },
    ],
  },
  {
    minutes: 6, emoji: '🥚',
    tagline: 'Jammy eggs and short warm-ups.',
    intro: 'Six minutes is the magic number for jammy soft-boiled eggs: set yolk edges, soft centre. It also fits a light warm-up, a quick reading break, or one short guided breathing session.',
    uses: [
      { title: 'Jammy eggs', desc: 'Lower eggs into boiling water, start the timer, then move them to ice water when it rings.' },
      { title: 'Warm-up routine', desc: 'Six minutes of mobility work before a run or lifting session is quick but noticeably helps.' },
      { title: 'Short reading break', desc: 'Read a few pages of a book between work tasks instead of opening social media.' },
      { title: 'Timed quiz section', desc: 'Give students a short six-minute section of practice questions.' },
    ],
    tips: [
      'Set the volume high enough to hear over a boiling pot or an extractor fan.',
      'The alarm repeats until you stop it, so you will not miss the egg window.',
    ],
    faq: [
      { q: 'How long do you boil an egg for a jammy yolk?', a: 'About six minutes in already-boiling water for a large egg, then into cold water. Use 7 minutes for a firmer yolk and 9–10 for hard-boiled.' },
    ],
  },
  {
    minutes: 7, emoji: '🔥',
    tagline: 'A plank round, a cup of tea, a calm reset.',
    intro: 'Seven minutes is short enough to fit between meetings and long enough to matter. It is the length of the well-known "7-minute workout", a good steep for stronger teas, and a comfortable quick meditation.',
    uses: [
      { title: '7-minute workout', desc: 'Run twelve bodyweight exercises (jumping jacks, wall sit, push-ups, plank and more) back to back, about 30 seconds each with short rests.' },
      { title: 'HIIT or plank round', desc: 'Keep a single high-intensity round honest by letting the clock decide when you stop.' },
      { title: 'Steeping tea', desc: 'Herbal and rooibos teas often taste best after 5–7 minutes of steeping.' },
      { title: 'Quick meditation', desc: 'Seven minutes of quiet breathing before a meeting or an exam helps you arrive calmer.' },
      { title: 'Short presentation', desc: 'Rehearse a lightning talk and see whether it fits the slot.' },
    ],
    tips: [
      'Turn on soft rain sounds for meditation; switch to the digital alarm for workouts.',
      'Need one more round? Press +1 min instead of restarting.',
    ],
    faq: [
      { q: 'What is the 7-minute workout?', a: 'A circuit of 12 bodyweight exercises, each done for about 30 seconds with roughly 10 seconds of rest, totaling about seven minutes. This timer counts down the whole circuit.' },
    ],
  },
  {
    minutes: 8, emoji: '🍝',
    tagline: 'Al dente pasta and focused micro-sessions.',
    intro: 'Many dried pasta shapes are al dente in about eight minutes, which makes this one of the most-used kitchen timers. Outside the kitchen, eight minutes is a good "micro-focus" session for people who find 25 minutes daunting.',
    uses: [
      { title: 'Cooking pasta', desc: 'Start the timer when the pasta goes into boiling water; check a piece a minute before the alarm.' },
      { title: 'Micro-focus session', desc: 'If concentrating is hard today, work for eight minutes, rest for two, and repeat.' },
      { title: 'Power nap wind-down', desc: 'Lie down, close your eyes and let the gentle chime bring you back.' },
      { title: 'Group activity', desc: 'Small-group discussions or brainstorms with a hard eight-minute stop stay focused.' },
    ],
    tips: [
      'Use the lofi button for micro-focus sessions; music makes the first minute easier.',
      'Allow notifications so the alarm reaches you even if you switch to another app.',
    ],
    faq: [
      { q: 'How long should pasta cook?', a: 'Check the packet, but most dried spaghetti and penne are al dente in 8–11 minutes. Start tasting a minute before the timer ends.' },
    ],
  },
  {
    minutes: 9, emoji: '🥖',
    tagline: 'Just under ten, on purpose.',
    intro: 'Nine minutes is handy when ten is a little too long: a firm-yolk egg, a pan of cookies in a hot oven, or a short task you want to finish before the hour turns over.',
    uses: [
      { title: 'Hard-ish boiled eggs', desc: 'Nine minutes gives a fully set but still tender yolk for most large eggs.' },
      { title: 'Baking batches', desc: 'Many cookie recipes bake in 8–10 minutes; use nine and check for golden edges.' },
      { title: 'Wrap-up before a meeting', desc: 'Send the last email or clear the to-do before your next call starts.' },
      { title: 'Reading aloud practice', desc: 'Read a passage aloud at a steady pace and see how far you get.' },
    ],
    tips: [
      'Press F to go fullscreen if you need to read the clock from across the kitchen.',
      'Your alarm sound and volume are remembered next time you open any timer.',
    ],
    faq: [
      { q: 'How long do cookies bake?', a: 'Most drop cookies bake for 8–12 minutes depending on size and oven. A 9 minute timer is a safe first check.' },
    ],
  },
  {
    minutes: 10, emoji: '⏱️',
    tagline: 'The everyday ten-minute countdown.',
    intro: 'Ten minutes is the most-used short timer there is: a coffee break, a quick workout, a timed reading, a classroom activity. It is long enough to get something real done and short enough to start right now.',
    uses: [
      { title: 'Quick study review', desc: 'Go over flashcards or yesterday’s notes before starting new material.' },
      { title: 'Short workout', desc: 'A ten-minute bodyweight circuit or a brisk walk around the block.' },
      { title: 'Classroom activity', desc: 'Silent reading, a worksheet or group work with a visible end time.' },
      { title: 'Coffee break', desc: 'A real break away from the screen, with a bell to bring you back.' },
    ],
    tips: [
      'Teachers: fullscreen plus the loud digital alarm works well on a projector.',
      'Combine with rain or café sounds for a calm study block.',
    ],
    faq: [
      { q: 'What can I do in 10 minutes?', a: 'Review notes, answer a few emails, do a short workout, tidy one room, or meditate. Ten focused minutes is often enough to break a task’s inertia.' },
    ],
  },
  {
    minutes: 11, emoji: '🎯',
    tagline: 'For tasks that run just past ten.',
    intro: 'An eleven minute timer covers jobs that overrun a round ten: a slightly longer workout, a full cycle of some recipes, or a short speech with time for applause.',
    uses: [
      { title: 'Timed speeches', desc: 'Toastmasters-style or class speeches with a firm upper limit.' },
      { title: 'Baked potatoes in the microwave', desc: 'Two medium potatoes often take around ten to twelve minutes; check halfway.' },
      { title: 'Language drills', desc: 'Run through a vocab deck once, start to finish, without stopping.' },
      { title: 'Mini cleaning sprint', desc: 'Tackle one room while the countdown keeps you moving.' },
    ],
    tips: [
      'Use −1 min / +1 min to fine-tune the time without leaving the page.',
      'The countdown shows in the browser tab title, so you can glance at it from another tab.',
    ],
    faq: [
      { q: 'Can I change this to 12 or 10 minutes?', a: 'Yes. Use the +1 min and −1 min buttons, or open the 10 or 12 minute timer from the list of other timers below.' },
    ],
  },
  {
    minutes: 12, emoji: '📖',
    tagline: 'A focused chunk for reading and drills.',
    intro: 'Twelve minutes is a good length for a deliberate practice block: a set of exam questions, a chapter of a short book, or a focused round of instrument practice before your attention starts to drift.',
    uses: [
      { title: 'Practice questions', desc: 'Do a timed set of exam-style questions to get used to working under time pressure.' },
      { title: 'Instrument practice', desc: 'Drill one passage or a set of scales with full attention.' },
      { title: 'Reading sprint', desc: 'Read one section of an article or textbook, then summarise it in two lines.' },
      { title: 'Short run', desc: 'An easy recovery run or a timed mile-and-a-half for fitness tests.' },
    ],
    tips: [
      'Lofi or café sounds help mask background noise while you read.',
      'Stack two 12-minute blocks with a 3-minute break for a lighter Pomodoro rhythm.',
    ],
    faq: [
      { q: 'Is 12 minutes a good study session length?', a: 'For hard material or when focus is low, yes. Short blocks with quick breaks keep attention fresh; build up to longer sessions over time.' },
    ],
  },
  {
    minutes: 13, emoji: '✍️',
    tagline: 'An odd number for an honest sprint.',
    intro: 'Thirteen minutes is a favourite "writing sprint" length in online writing communities: long enough to get a few hundred words down, short enough that you never stop to edit. Odd numbers also feel less like a chore than round ones.',
    uses: [
      { title: 'Writing sprint', desc: 'Write a draft paragraph or scene without deleting anything until the alarm.' },
      { title: 'Inbox clear-out', desc: 'Archive, reply or delete as many emails as you can in one pass.' },
      { title: 'Timed puzzle', desc: 'A crossword or sudoku against the clock.' },
      { title: 'Laundry fold', desc: 'Fold and put away a full load before the bell.' },
    ],
    tips: [
      'Turn on rain sounds and go fullscreen to hide everything else on the screen.',
      'Note your word count after each sprint to see your pace improve.',
    ],
    faq: [
      { q: 'What is a writing sprint?', a: 'A short, timed burst of writing where you focus on getting words down instead of editing. Many writers use 10–20 minute sprints; 13 is a popular choice.' },
    ],
  },
  {
    minutes: 14, emoji: '🧹',
    tagline: 'Two weeks in days, one tidy in minutes.',
    intro: 'Fourteen minutes works well for routines with a few distinct steps: a skincare and stretching routine, a deep clean of the bathroom, or a quick review of the day’s notes and tomorrow’s plan.',
    uses: [
      { title: 'Evening reset', desc: 'Tidy, plan tomorrow and lay out what you need before the bell.' },
      { title: 'Bathroom deep clean', desc: 'Surfaces, mirror and floor in one focused round.' },
      { title: 'Daily review', desc: 'Read back over today’s notes and write three things to do tomorrow.' },
      { title: 'Short yoga flow', desc: 'A gentle flow that is long enough to loosen up without needing a full class.' },
    ],
    tips: [
      'Pick the soft gong alarm for yoga or evening routines.',
      'Turn on notifications in case you leave the room.',
    ],
    faq: [
      { q: 'Will the alarm ring if my screen locks?', a: 'On a computer the alarm plays even if the tab is in the background. On phones, keep the screen on or the browser in the foreground, because mobile systems pause web pages to save battery.' },
    ],
  },
  {
    minutes: 15, emoji: '☕',
    tagline: 'A quarter hour: breaks, naps and quick wins.',
    intro: 'Fifteen minutes is a natural unit of time: a long Pomodoro break, a power-nap window, a quick meeting or a short study session. A quarter of an hour is small enough to start and big enough to finish something.',
    uses: [
      { title: 'Long Pomodoro break', desc: 'After four focus sessions, take 15 minutes completely away from the screen.' },
      { title: 'Power nap', desc: 'Lie down and let the gentle chime wake you before you fall into deep sleep.' },
      { title: 'Quick study session', desc: 'Review one topic or do a set of flashcards with full attention.' },
      { title: 'Meeting slot', desc: 'Keep check-ins to a hard 15 minutes so everyone gets back to work.' },
    ],
    tips: [
      'For a nap, set the volume a little lower and choose the gentle chime.',
      'The countdown in the tab title lets you track the time from other tabs.',
    ],
    faq: [
      { q: 'How long should a power nap be?', a: 'Many people nap for 10–20 minutes so they wake before deep sleep. A 15 minute timer, plus a minute or two to fall asleep, is a common choice.' },
    ],
  },
  {
    minutes: 16, emoji: '🔄',
    tagline: 'For routines a little past a quarter hour.',
    intro: 'Sixteen minutes covers routines that run just past fifteen: a full set of sun salutations, a longer warm-up, or two eight-minute rounds of a game. Fine-tuned lengths like this help you stop guessing.',
    uses: [
      { title: 'Two 8-minute rounds', desc: 'Debate practice or a pair activity with a swap halfway through.' },
      { title: 'Yoga sequence', desc: 'A short flow from standing poses down to a few minutes of rest.' },
      { title: 'Oven bakes', desc: 'Muffins, roasted vegetables or frozen snacks that need around 15–18 minutes.' },
      { title: 'Language listening', desc: 'One podcast episode or listening exercise, with notes.' },
    ],
    tips: [
      'Use +1 min if the oven needs a little longer, without resetting the clock.',
      'Go fullscreen so the timer is readable from across the room.',
    ],
    faq: [
      { q: 'Can I set the timer to a custom number of minutes?', a: 'Yes. Start from the closest timer and use +1 min or −1 min. For focus sessions with breaks and to-dos, open the full focus workspace.' },
    ],
  },
  {
    minutes: 17, emoji: '📚',
    tagline: 'Short focus with a built-in breather.',
    intro: 'A seventeen minute timer is a good fit for "focus block plus breather" routines: work for 17, rest for 3, and you have a clean 20-minute cycle that is easier on tired days than a full Pomodoro.',
    uses: [
      { title: '17 + 3 cycles', desc: 'Work 17 minutes, rest 3, repeat. Three cycles is exactly an hour.' },
      { title: 'Reading a chapter', desc: 'Most short chapters fit; summarise in a sentence when the alarm rings.' },
      { title: 'Short commute planning', desc: 'Leave the house when the alarm goes so you are not late.' },
      { title: 'Homework block', desc: 'Kids can do one subject per block with a visible finish line.' },
    ],
    tips: [
      'Lofi music makes repeated short cycles feel less mechanical.',
      'Turn on notifications to hear the alarm from another tab.',
    ],
    faq: [
      { q: 'Is a 17 minute timer good for studying?', a: 'Yes, especially if 25 minutes feels too long. Short sessions with a three-minute break are easier to keep up when you are tired.' },
    ],
  },
  {
    minutes: 18, emoji: '🍪',
    tagline: 'Bakes, laps and steady focus.',
    intro: 'Eighteen minutes is a common baking time for muffins, cupcakes and many trays of roasted vegetables. It is also a comfortable focus block for anyone who wants something between a quarter hour and a Pomodoro.',
    uses: [
      { title: 'Muffins and cupcakes', desc: 'Most bake in 18–22 minutes; check with a toothpick when the alarm rings.' },
      { title: 'Roasted vegetables', desc: 'Small chunks in a hot oven are often ready around the 18-minute mark.' },
      { title: 'Focus block', desc: 'Work on one task with your phone out of reach until the bell.' },
      { title: 'Treadmill session', desc: 'A steady 18-minute run or incline walk.' },
    ],
    tips: [
      'The digital alarm cuts through kitchen noise best.',
      'For focus, add rain or café sounds and go fullscreen.',
    ],
    faq: [
      { q: 'How long do muffins take to bake?', a: 'Standard-size muffins usually bake 18–22 minutes. Start checking when this timer ends; a toothpick should come out clean.' },
    ],
  },
  {
    minutes: 20, emoji: '🌿',
    tagline: 'A full nap, a full workout, a full focus block.',
    intro: 'Twenty minutes is one of the most practical timer lengths: the top of the power-nap range, a full workout or yoga session, and a focus block that works well with the 20-20-20 eye rule (every 20 minutes, look 20 feet away for 20 seconds).',
    uses: [
      { title: 'Power nap', desc: 'Twenty minutes is about the upper limit before deep sleep makes you groggy.' },
      { title: 'Eye break reminder', desc: 'Every 20 minutes of screen time, look at something far away for 20 seconds.' },
      { title: 'Home workout', desc: 'A complete strength or cardio session without needing a gym.' },
      { title: 'Study block', desc: 'Long enough to make progress on one topic, short enough to stay sharp.' },
    ],
    tips: [
      'Use the gentle chime for naps, the bell for workouts.',
      'Restart with R after each block if you are using it as an eye-break reminder.',
    ],
    faq: [
      { q: 'What is the 20-20-20 rule?', a: 'A common tip for reducing eye strain: every 20 minutes of screen use, look at something about 20 feet (6 metres) away for 20 seconds. A 20 minute timer is an easy reminder.' },
    ],
  },
  {
    minutes: 25, emoji: '🍅',
    tagline: 'One Pomodoro: the classic focus session.',
    intro: 'Twenty-five minutes is one Pomodoro, the core of the Pomodoro Technique: work on a single task for 25 minutes, take a 5-minute break, and after four rounds take a longer 15–30 minute break. This timer gives you one clean session; the focus workspace runs the full cycle for you.',
    uses: [
      { title: 'A Pomodoro session', desc: 'Pick one task, silence notifications, and work until the bell. Then take a 5-minute break.' },
      { title: 'Exam practice', desc: 'Many exam sections and practice papers are split into 20–30 minute parts.' },
      { title: 'Deep cleaning', desc: 'A whole room, from clutter to floor, in one focused pass.' },
      { title: 'Language lesson', desc: 'One app lesson plus review of the words you got wrong.' },
    ],
    tips: [
      'Write down the one task you will do before pressing Start.',
      'Want automatic breaks, a to-do list and focus stats? Use the free Pomodoro timer in the workspace.',
    ],
    faq: [
      { q: 'Why 25 minutes for a Pomodoro?', a: 'Francesco Cirillo, who created the technique, settled on 25 minutes as a block that is long enough for real progress but short enough to keep urgency. It is a starting point; adjust it if a different length suits you.' },
      { q: 'How do I do a full Pomodoro cycle?', a: 'Work 25 minutes, break 5, repeat four times, then take a longer 15–30 minute break. The LofiSpace Pomodoro timer switches between focus and break for you.' },
    ],
  },
  {
    minutes: 30, emoji: '🕧',
    tagline: 'Half an hour, start to finish.',
    intro: 'Thirty minutes is the default length for a lot of things: a workout, a meeting, a study session, a load of laundry or a lunch break. A half-hour countdown keeps those things from quietly turning into an hour.',
    uses: [
      { title: 'Study session', desc: 'One subject or one chapter, then a short break.' },
      { title: 'Workout', desc: 'A full run, yoga class or strength session in a fixed window.' },
      { title: 'Screen-time limit', desc: 'Kids (and adults) know exactly when gaming or scrolling time ends.' },
      { title: 'Lunch break', desc: 'Eat away from your desk and come back on time.' },
    ],
    tips: [
      'Fullscreen mode is great for screen-time limits: the countdown is impossible to miss.',
      'Pair with café or lofi sounds for a relaxed study session.',
    ],
    faq: [
      { q: 'Can I pause the 30 minute timer?', a: 'Yes. Press Pause (or Space) and Start again later. The remaining time is kept exactly.' },
    ],
  },
  {
    minutes: 35, emoji: '🍗',
    tagline: 'Slightly longer bakes and deeper focus.',
    intro: 'Thirty-five minutes suits tasks that need a little more than half an hour: baking a banana bread loaf’s first check, roasting chicken pieces, or a focus session that leaves time to finish a thought.',
    uses: [
      { title: 'Roasting', desc: 'Chicken thighs, salmon fillets in foil or a tray of potatoes are often near done around 35 minutes.' },
      { title: 'Extended focus', desc: 'A focus block for people who find they hit their stride just as 25 minutes ends.' },
      { title: 'Lecture review', desc: 'Watch a recorded lecture at 1.25× and take notes.' },
      { title: 'Outdoor walk', desc: 'A brisk walk out and back, turning around at the halfway point.' },
    ],
    tips: [
      'Use the tab-title countdown to keep an eye on the oven from your other tabs.',
      'For focus, switch on rain or lofi so the room stays quiet in your head.',
    ],
    faq: [
      { q: 'Does the timer keep running if I close the laptop lid?', a: 'Most laptops suspend when the lid closes, which pauses web pages. Keep the lid open (the screen can dim) for the alarm to ring on time.' },
    ],
  },
  {
    minutes: 40, emoji: '🧠',
    tagline: 'A deep-work block or a class period.',
    intro: 'Forty minutes is a common class period in many schools and a good length for a deep-work block. It gives you time to get past the warm-up phase of a hard task and still finish with energy left.',
    uses: [
      { title: 'Deep-work block', desc: 'One demanding task (writing, coding, problem sets) with everything else closed.' },
      { title: 'Class period', desc: 'Teachers can project the countdown so students see how much time is left.' },
      { title: 'Exam section practice', desc: 'Many test sections run around 35–45 minutes; practise at real pace.' },
      { title: 'Bread or casserole bake', desc: 'Lots of bakes need around 40 minutes; check at the alarm.' },
    ],
    tips: [
      'Use fullscreen on a projector; the digits scale to any screen size.',
      'Set the alarm to the bell so the end of a class is clear but not jarring.',
    ],
    faq: [
      { q: 'Is 40 minutes a good length for studying?', a: 'Yes. A 40-minute block followed by a 10-minute break is a popular rhythm for hard material, close to the 50/10 pattern many students use.' },
    ],
  },
  {
    minutes: 45, emoji: '🎓',
    tagline: 'A lesson, a session, a deep-work sprint.',
    intro: 'Forty-five minutes is the length of a typical school lesson and a classic deep-work block. It fits one serious chunk of a project, a full gym session, or a long read with notes.',
    uses: [
      { title: 'One lesson', desc: 'Teachers and tutors can show a visible countdown to the end of the lesson.' },
      { title: 'Deep-work sprint', desc: 'Pick the hardest task of the day and give it 45 uninterrupted minutes.' },
      { title: 'Gym session', desc: 'A complete strength workout including warm-up and cool-down.' },
      { title: 'Exam simulation', desc: 'Practise a full paper section under real time pressure.' },
    ],
    tips: [
      'Put your phone in another room for the full 45 minutes; it makes a real difference.',
      'Lofi music gives a steady background that does not pull your attention.',
    ],
    faq: [
      { q: 'How long is a school lesson?', a: 'It varies by country and school, but 40–50 minutes is common. A 45 minute timer matches many class periods.' },
    ],
  },
  {
    minutes: 50, emoji: '💼',
    tagline: 'The 50/10 rhythm for long work sessions.',
    intro: 'Fifty minutes of work followed by a ten-minute break is a popular alternative to the Pomodoro technique for people who need longer stretches of concentration, such as programmers, writers and students working through problem sets.',
    uses: [
      { title: '50/10 work rhythm', desc: 'Work for 50, break for 10, and every hour has a natural rest built in.' },
      { title: 'Therapy-hour style sessions', desc: 'Coaching or tutoring sessions that end ten minutes before the hour.' },
      { title: 'Long study block', desc: 'Read and take notes on one big topic.' },
      { title: 'Slow-cooked bakes', desc: 'Larger cakes and loaves often need around 50 minutes.' },
    ],
    tips: [
      'Use the 10 minute timer for the break that follows.',
      'Turn on notifications so the end reaches you even when you are deep in another app.',
    ],
    faq: [
      { q: 'Is 50/10 better than Pomodoro?', a: 'Neither is universally better. 25/5 suits tasks with many small steps or low motivation; 50/10 suits deep work where getting into flow takes a while. Try both and keep what works.' },
    ],
  },
  {
    minutes: 60, emoji: '🕐',
    tagline: 'One hour, counted down.',
    intro: 'A one hour timer is for anything you want to box into exactly sixty minutes: a study session, a meeting, a long bake, a gaming limit or a full workout. Seeing the hour count down makes it easier to pace yourself.',
    uses: [
      { title: 'Study hour', desc: 'Split it into two 25-minute blocks with a short break, or work straight through.' },
      { title: 'Screen-time limit', desc: 'A clear, visible end to gaming or TV time.' },
      { title: 'Meetings and workshops', desc: 'Keep a session to the hour and leave time for questions.' },
      { title: 'Baking and slow cooking', desc: 'Many breads, roasts and casseroles need about an hour.' },
    ],
    tips: [
      'Glance at the tab title to see the time left without switching tabs.',
      'Add rain sounds for a calm, steady background over the full hour.',
    ],
    faq: [
      { q: 'Can I set a 1 hour timer that works in the background?', a: 'Yes. On a computer the countdown keeps running and the alarm plays even if this tab is in the background or minimised.' },
    ],
  },
  {
    minutes: 90, emoji: '🌊',
    tagline: 'One full deep-work cycle.',
    intro: 'Ninety minutes is a popular deep-work length, often linked to the body’s roughly 90-minute ultradian rhythm. Many people plan their hardest work in 90-minute blocks followed by a proper 15–20 minute break. It is also the length of a typical film or football match.',
    uses: [
      { title: 'Deep-work cycle', desc: 'One major task, no email or chat, then a real break away from the screen.' },
      { title: 'Exam paper', desc: 'Many full exam papers run around 90 minutes; practise at full length.' },
      { title: 'Movie night', desc: 'Know when the kids’ film should end, or limit binge-watching.' },
      { title: 'Long bake or brew', desc: 'Slow roasts, bread proofing or cold brew steps.' },
    ],
    tips: [
      'Lofi music plays continuously, so you do not need to restart a playlist mid-session.',
      'Drink water and stretch during the break afterwards; 90 minutes is a long time to sit.',
    ],
    faq: [
      { q: 'Why work in 90-minute blocks?', a: 'Many people find their focus naturally fades after about 90 minutes, so working in 90-minute blocks with real breaks helps them keep up quality over a full day.' },
    ],
  },
  {
    minutes: 120, emoji: '📝',
    tagline: 'Two hours for long exams and big projects.',
    intro: 'A two hour timer covers long, single-sitting tasks: a full mock exam, a long writing session, a board-game night or a slow-cooked dish. Breaking a big project into a fixed two-hour window makes it feel finite.',
    uses: [
      { title: 'Mock exams', desc: 'Sit a full-length practice paper exactly as long as the real thing.' },
      { title: 'Writing session', desc: 'Draft a chapter, report or essay in one sitting.' },
      { title: 'Board-game limit', desc: 'Keep long games from running past bedtime.' },
      { title: 'Slow cooking', desc: 'Braises, stews and slow roasts with a firm check-in time.' },
    ],
    tips: [
      'Take a short stretch break halfway; use Pause and Start again so no time is lost.',
      'Keep this tab open and your computer awake so the alarm rings on time.',
    ],
    faq: [
      { q: 'Will a 2 hour timer still be accurate after a long time?', a: 'Yes. The countdown is measured against the exact end time, so it does not drift no matter how long it runs or how many tabs you switch between.' },
    ],
  },
]

export const TIMER_MINUTES = TIMERS.map(t => t.minutes)
export const getTimer = (m: number) => TIMERS.find(t => t.minutes === m)

/** Shared questions, worded for this length and appended after the page-specific ones. */
export function timerFaq(t: TimerInfo): TimerFaq[] {
  const m = t.minutes
  const d = fmtDuration(m)
  const shared: TimerFaq[] = [
    { q: `How do I set a ${m} minute timer?`, a: `It is already set. This page opens with ${d} on the clock, so just press Start (or the Space bar). Use +1 min or −1 min to adjust, R to reset, and F for fullscreen.` },
    { q: 'Does it work if I switch tabs?', a: `Yes. The timer counts against the exact end time instead of counting ticks, so it stays accurate in a background tab, and the time left is shown in the tab title. The alarm is scheduled when you press Start, so it rings on time even if the browser slows down background tabs.` },
    { q: 'Can I use it in fullscreen?', a: 'Yes. Press F or the fullscreen button to fill the screen with large, high-contrast digits. That makes it easy to read from across a classroom, gym or kitchen.' },
  ]
  return [...t.faq, ...shared].slice(0, 4)
}

/** Neighbours first (N−1, N+1 when they exist), then the popular lengths. */
export const POPULAR_TIMERS = [5, 10, 15, 20, 25, 30, 45, 60]
export function relatedTimers(m: number): number[] {
  const i = TIMER_MINUTES.indexOf(m)
  const near = [TIMER_MINUTES[i - 1], TIMER_MINUTES[i + 1]].filter((x): x is number => x != null)
  return [...new Set([...near, ...POPULAR_TIMERS])].filter(x => x !== m)
}
