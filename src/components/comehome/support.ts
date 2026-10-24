// Gentle crisis-support routing for Come Home.
//
// Come Home is for decompressing after a hard day, and some people arrive on much worse
// ones. Two light touches, never blocking anything:
//  1. A quiet, always-present way to reach a real person (helpline directory).
//  2. If what someone writes contains clear self-harm language, the next screen shows a warm
//     note with that link before the release ritual.
//
// Privacy contract still holds: the check below runs on the text in memory, in this browser.
// Nothing is stored, sent, or tracked — not even the fact that the note was shown.

/** International directory of free, confidential helplines (auto-detects the country). */
export const SUPPORT_URL = 'https://findahelpline.com'

// Deliberately narrow (explicit phrases only) — a false alarm on "I'm dying of boredom"
// would feel patronising; a missed indirect phrase still has the always-visible link.
const PATTERNS: RegExp[] = [
  // English
  /\b(suicid\w*|kill(ing)? my ?self|end(ing)? (it all|my life)|want(ed)? to die|wanna die|self[- ]?harm\w*|hurt(ing)? my ?self|no reason to (live|go on)|better off dead|don'?t want to (live|be alive|exist))\b/i,
  // Vietnamese (with and without diacritics)
  // (no unaccented "tu tu" / "tu sat": they collide with "từ từ" and friends)
  /(tự tử|tự sát|muốn chết|muon chet|không muốn sống|khong muon song|chẳng muốn sống|tự làm hại|tu lam hai|tự hại|kết thúc tất cả|ket thuc tat ca|kết liễu|cắt tay|chết đi cho xong|chet di cho xong|biến mất mãi mãi)/i,
  // Spanish / Portuguese
  /(suicid|quiero morir|me quiero matar|quitarme la vida|quero morrer|me matar|tirar minha vida)/i,
  // French / German
  /(suicid|envie de mourir|me tuer|en finir|selbstmord|suizid|umbringen|sterben will|will nicht mehr leben)/i,
  // Russian
  /(суицид|самоубийств|покончить с собой|хочу умереть|не хочу жить)/i,
  // Japanese / Korean / Chinese
  /(死にたい|自殺|消えたい|죽고 싶|자살|자해|自杀|想死|不想活)/,
  // Indonesian / Thai
  /(bunuh diri|ingin mati|pengen mati|ฆ่าตัวตาย|อยากตาย)/i,
]

export function needsSupport(text: string): boolean {
  const t = text.normalize('NFC')
  return PATTERNS.some(re => re.test(t))
}
