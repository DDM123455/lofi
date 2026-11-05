import type { Metadata } from 'next'
import { GoodThingsLanding, type GoodThingsLandingCopy } from '@/components/comehome/GoodThingsLanding'

const URL = 'https://www.focusworkspace.app/good-things'
const VI_URL = 'https://www.focusworkspace.app/vi/dieu-tot-van-den'

export const metadata: Metadata = {
  title: 'Good Things Happen — A Gentle Three Good Things Journal',
  description:
    'Notice one small good thing from today, or just be shown one. A quiet, private take on the Three Good Things exercise. No streaks, no account, nothing leaves your browser.',
  keywords: ['three good things', 'three good things exercise', 'good things happen', 'gratitude journal online', 'something good today', 'what to do on a bad day'],
  alternates: { canonical: URL, languages: { en: URL, vi: VI_URL, 'x-default': URL } },
  openGraph: {
    title: 'Good Things Happen — Even on Days That Did Not Feel Like It',
    description: 'Notice one small good thing, or just be shown one. Free, private, no streaks.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good Things Happen',
    description: 'Notice one small good thing, or just be shown one. Free, private, no streaks.',
  },
}

const COPY: GoodThingsLandingCopy = {
  lang: 'en',
  url: URL,
  app: '/workspace?mode=home&exp=good',
  crumbHome: 'Home',
  crumb: 'Good Things',
  h1: 'Good things happen',
  tagline: 'Even on days that did not feel like it',
  intro: 'A small, quiet place inside Come Home. Notice one good thing from today and keep it as a star, or, on the evenings you have nothing left, simply be shown one.',
  cta: 'Open Good Things',
  finePrint: 'Free · No account · Stays in your browser',
  doorsTitle: 'Two doors, both gentle',
  doors: [
    { emoji: '✦', title: 'Notice one from today', body: 'A warm meal, a kind word, a meeting that went okay. Soft prompts help if nothing comes to mind. One is enough, and three is the most we ask.' },
    { emoji: '🌟', title: 'Just show me one', body: 'No writing. See something you kept on an easier day, or a small line about somewhere tonight. If you tell us the day was heavy, this door comes first.' },
  ],
  whyTitle: 'Why noticing helps',
  why: 'Our minds hold on to what went wrong far more easily than what went right. In a 2005 study, people who wrote down three good things each evening for a week reported more happiness and fewer depressive symptoms at follow-ups up to six months later. Later reviews suggest effects are modest on average, so we treat it as a small kindness, not a cure.',
  whyLink: { href: '/blog/three-good-things-exercise', label: 'Read about the exercise →' },
  privacyTitle: 'Private by design',
  privacy: [
    'Good things you keep are stored only in this browser, as stars in your sky.',
    'What you write is never sent to a server or included in analytics.',
    'There is no feed. Nobody sees what you write, and "somewhere tonight" lines are written by us, not by other users.',
    'You can let any star go at any time.',
  ],
  notTitle: 'No streaks. No forced gratitude.',
  not: 'Missing a day costs nothing, and you never have to feel thankful on command. Good Things is not therapy. If life has felt heavy for a while, please talk to a doctor or someone you trust.',
  faqTitle: 'Questions',
  faq: [
    { q: 'What is Good Things?', a: 'A gentle part of Come Home mode, based on the Three Good Things exercise. You can note a small good thing from today or be shown one.' },
    { q: 'Do I have to write three things?', a: 'No. One is enough, and you do not have to write anything at all.' },
    { q: 'Are the "somewhere tonight" lines real people?', a: 'No. We wrote them. They describe ordinary good things that happen somewhere every evening.' },
    { q: 'Is it free?', a: 'Yes. It is free and needs no account, like the rest of Focus Workspace.' },
  ],
  guidesTitle: 'Further reading',
  guides: [
    { href: '/blog/three-good-things-exercise', label: 'The Three Good Things Exercise: A Gentle Way to End the Day' },
    { href: '/blog/what-to-do-on-a-bad-day', label: 'What to Do on a Bad Day' },
    { href: '/blog/good-things-happen-come-home', label: 'Introducing Good Things' },
    { href: '/come-home', label: 'Come Home: a quiet place between work and sleep' },
  ],
  closing: 'Tonight, one small thing is enough.',
  otherLang: { href: '/vi/dieu-tot-van-den', hrefLang: 'vi', label: 'Tiếng Việt' },
}

export default function GoodThingsPage() {
  return <GoodThingsLanding c={COPY} />
}
