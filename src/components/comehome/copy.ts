// Copy for Come Home mode. Deliberately short — this mode is about saying less.
// Kept local to the feature (instead of the big workspace `Translations` type) so the
// lazy-loaded chunk carries its own strings and the focus workspace bundle stays untouched.

import type { Lang } from '@/lib/i18n'

export type Mood = 'heavy' | 'okay' | 'good' | 'lovely'
export type Need = 'rest' | 'calm' | 'mind' | 'quiet' | 'company' | 'sleep'
/** Everything the hub can open. */
export type Exp = Need | 'one' | 'sky' | 'good' | 'step'
/** One Small Step suggestions; order is irrelevant (shuffled per visit). */
export const STEP_IDS = ['water', 'window', 'face', 'stretch', 'eat', 'outside', 'tidy', 'song', 'text', 'hug', 'sky', 'write', 'see', 'clothes'] as const
export type StepId = (typeof STEP_IDS)[number]
export type HubGroup = 'out' | 'light' | 'settle' | 'sleep'
/** Ways to let go of what you wrote. */
export type Ritual = 'sky' | 'river' | 'burn' | 'wind' | 'rain'
/** One-tap end-of-session check-in. */
export type CheckResult = 'lighter' | 'same' | 'heavier'
/** Sleep wind-down: minutes until the sound fades to silence, or 0 = rain all night. */
export type SleepTimer = 15 | 30 | 60 | 0

export interface HomeCopy {
  mode_focus: string
  mode_home: string
  mode_switch_label: string
  sound_on: string
  sound_off: string
  sound_hint: string
  back: string
  menu: string
  close: string
  sky_open: string

  welcome_title: string
  welcome_sub: string
  welcome_q: string
  moods: Record<Mood, string>
  mood_reply: Record<Mood, string>
  mood_skip: string

  need_q: string
  hub_groups: Record<HubGroup, string>
  /** Card title + one-line description for every hub entry. */
  cards: Record<Exp, { title: string; desc: string }>
  /** Short name shown in the top bar while inside an experience. */
  exp_titles: Record<Exp, string>
  suggested: string

  steps: { write: string; choose: string; release: string }
  ctrl_enter: string
  next: string
  edit: string

  mind_title: string
  mind_sub: string
  mind_placeholder: string
  mind_choose_title: string
  mind_choose_sub: string
  mind_release: string
  mind_privacy: string
  rituals: Record<Ritual, { name: string; desc: string; after: string }>
  mind_tomorrow_title: string
  mind_tomorrow_sub: string
  mind_tomorrow_privacy: string
  mind_save_only: string
  mind_saved_one: string
  /** `{n}` is replaced with the count. */
  mind_saved_many: string
  mind_saved_where: string

  after_menu: string
  after_rest: string
  done_tonight: string

  one_title: string
  one_prefix: string
  one_placeholder: string
  one_choose_title: string
  one_keep: string
  one_keep_desc: string
  one_go_label: string
  one_after_keep: string
  one_privacy: string

  sky_title: string
  sky_empty: string
  sky_forget: string
  sky_hint: string
  sky_add_label: string
  sky_add_placeholder: string
  sky_add: string
  sky_added: string

  good: {
    title: string
    sub: string
    note: string
    show: string
    note_title: string
    note_more: string
    one_is_enough: string
    /** Tap-to-change prompts for when nothing comes to mind; `example` is the placeholder. */
    hints: { label: string; example: string }[]
    why_label: string
    why_placeholder: string
    keep: string
    enough: string
    /** `{date}` is replaced with the localized date. */
    own_label: string
    somewhere_label: string
    another: string
    after_kept: string
    after_read: string
    privacy: string
    /** "Somewhere tonight…" lines for people with nothing saved yet. */
    world: string[]
  }

  step: {
    title: string
    sub: string
    about: string
    accept: string
    other: string
    not_tonight: string
    doing: string
    done: string
    skip: string
    done_line: string
    more: string
    rest_line: string
    steps: Record<StepId, { text: string; why: string }>
  }

  rest_hint: string
  rest_objects: { lamp: string; window: string; curtain: string; tea: string; fire: string }
  room_label: string

  calm_lines: [string, string, string, string]
  calm_in: string
  calm_out: string

  quiet_title: string
  quiet_master: string
  quiet_volume: string
  quiet_sounds: Record<'rain' | 'wind' | 'fire' | 'cafe' | 'wave' | 'city' | 'forest', string>

  company_lines: string[]
  company_label: string

  sleep_intro: string
  sleep_main: string
  sleep_eyes: string
  sleep_night: string
  close_ws: string
  sleep_choose_title: string
  sleep_choose_sub: string
  /** `{n}` is replaced with the minutes. */
  sleep_minutes: string
  sleep_all_night: string
  sleep_start: string
  /** `{t}` is replaced with a clock time like 23:40. */
  sleep_fades_at: string
  sleep_stays_on: string
  sleep_screen_on: string
  sleep_faded: string

  checkin_q: string
  checkin: Record<CheckResult, string>
  checkin_thanks: string
  heavy_note: string
  heavy_dismiss: string

  final_1: string
  final_2: string
  final_night: string
  closed_title: string
  closed_sub: string
  closed_reopen: string
  support_hint: string
  support_link: string
  support_title: string
  support_body: string
  support_after: string
}

const en: HomeCopy = {
  mode_focus: 'Focus',
  mode_home: 'Come Home',
  mode_switch_label: 'Workspace mode',
  sound_on: 'Soft sound on',
  sound_off: 'Sound off',
  sound_hint: 'Tap for soft rain',
  back: 'Back',
  menu: 'Menu',
  close: 'Close',
  sky_open: 'Your sky',

  welcome_title: 'Welcome home.',
  welcome_sub: "You don't have to do anything here.",
  welcome_q: 'How was today?',
  moods: { heavy: 'Heavy', okay: 'Okay', good: 'Good', lovely: 'Lovely' },
  mood_reply: {
    heavy: "That sounds like a lot. Let's go slowly.",
    okay: 'Okay is enough.',
    good: "Good. Let's keep it gentle.",
    lovely: "Let's hold on to that for a moment.",
  },
  mood_skip: 'Skip',

  need_q: 'What do you need right now?',
  hub_groups: { light: "Let the light in", out: 'Let it out', settle: 'Settle in', sleep: 'Wind down' },
  cards: {
    mind: { title: 'Clear my mind', desc: 'Write it all down, then let it go.' },
    one: { title: 'One thing from today', desc: 'Keep it as a star, or release it.' },
    rest: { title: 'Just rest', desc: 'A cozy room. Nothing to do.' },
    calm: { title: 'Calm down', desc: 'Two minutes of slow breathing.' },
    quiet: { title: 'Some quiet', desc: 'Only the sounds you choose.' },
    company: { title: 'Some company', desc: 'Lit windows across the street.' },
    sleep: { title: 'Get ready for sleep', desc: 'Five minutes, slowly fading out.' },
    step: { title: "One small step", desc: "For when you can't get started." },
    good: { title: "Good things happen", desc: "Notice one, or let one find you." },
    sky: { title: 'Your sky', desc: 'Good moments you kept, as stars.' },
  },
  exp_titles: { step: "Small step", good: "Good things", mind: 'Clear my mind', one: 'One thing', rest: 'Rest', calm: 'Calm', quiet: 'Quiet', company: 'Company', sleep: 'Sleep', sky: 'Your sky' },
  suggested: 'for tonight',

  steps: { write: 'Write', choose: 'Choose', release: 'Let go' },
  ctrl_enter: 'Ctrl + Enter to continue',
  next: 'Next',
  edit: 'Edit',

  mind_title: "What's taking up space in your mind?",
  mind_sub: "Write anything. You don't have to organize it.",
  mind_placeholder: "deadline tomorrow\nmoney\nmeeting with my boss\nI need to learn Kafka\nbirthday gift\nI'm tired\nI don't know what I'm doing...",
  mind_choose_title: 'How do you want to let it go?',
  mind_choose_sub: 'Pick whatever feels right tonight.',
  mind_release: 'Let it go',
  mind_privacy: 'Nothing you write leaves this device. It is not saved anywhere.',
  rituals: {
    sky: { name: 'Up to the stars', desc: 'Each worry rises and becomes a tiny star.', after: "You don't have to solve everything tonight." },
    river: { name: 'Down the river', desc: 'Folded into paper boats and carried away.', after: "It's downstream now. Let it keep going." },
    burn: { name: 'Burn it', desc: 'Watch it turn to embers and ash.', after: "It's ashes now. Nothing left to carry." },
    wind: { name: 'To the wind', desc: 'A gust picks it up and scatters it.', after: 'The wind has it. Your hands can rest.' },
    rain: { name: 'Into the rain', desc: 'The ink blurs and washes away.', after: 'Washed away. Tomorrow starts clean.' },
  },
  mind_tomorrow_title: 'Anything to deal with tomorrow?',
  mind_tomorrow_sub: 'Tap a line to save it to your to-do list. Everything else, you let go.',
  mind_tomorrow_privacy: 'Saved lines go only to your to-do list in this browser.',
  mind_save_only: 'Save for tomorrow',
  mind_saved_one: '1 thing is waiting for you tomorrow.',
  mind_saved_many: '{n} things are waiting for you tomorrow.',
  mind_saved_where: "They're in your Focus to-do list. You can put them down for tonight.",

  after_menu: 'Something else',
  after_rest: 'Rest in the room',
  done_tonight: "I'm done for tonight",

  one_title: 'Tell me one thing from today.',
  one_prefix: 'Today I…',
  one_placeholder: 'had a really difficult meeting.',
  one_choose_title: 'What do you want to do with it?',
  one_keep: 'Keep this moment',
  one_keep_desc: 'It becomes a star in your sky (only in this browser).',
  one_go_label: 'Or let it go',
  one_after_keep: 'Kept. It lives in your sky now.',
  one_privacy: 'Kept moments stay only in this browser.',

  sky_title: 'Your sky',
  sky_empty: 'Nothing here yet. Write a good moment below and it becomes your first star.',
  sky_forget: 'Let this one go',
  sky_hint: 'Each star is a moment you kept. Tap one to read it.',
  sky_add_label: 'A good moment to keep',
  sky_add_placeholder: 'A good moment to keep…',
  sky_add: 'Add a star',
  sky_added: 'A new star is in your sky.',

  good: {
    title: "Good things happen.",
    sub: "Even on days that didn't feel like it.",
    note: "Notice one from today",
    show: "Just show me one",
    note_title: "What was one small good thing today?",
    note_more: "Anything else, however small?",
    one_is_enough: "One is enough. Small counts.",
    hints: [{"label": "Something you ate", "example": "a warm bowl of noodles"}, {"label": "Someone kind", "example": "a coworker saved me a seat"}, {"label": "It went okay", "example": "the meeting was shorter than I feared"}, {"label": "Something you saw", "example": "the sky turned pink on the way home"}, {"label": "Something you did", "example": "I went outside for ten minutes"}],
    why_label: "Why do you think it happened? (optional)",
    why_placeholder: "because…",
    keep: "Keep it",
    enough: "That's enough for tonight",
    own_label: "You kept this on {date}",
    somewhere_label: "Somewhere tonight",
    another: "Show me another",
    after_kept: "It happened. It's in your sky now.",
    after_read: "You don't have to feel it tonight. It's still true.",
    privacy: "Stays only in this browser.",
    world: ["Someone is reading the message they were hoping for.", "A kettle is on for a friend who needed to talk.", "Someone just laughed until they cried.", "A stranger is holding a door without thinking about it.", "Someone is finally hearing good news.", "A child is falling asleep on a warm shoulder.", "Someone is being told, \"I'm glad you're here.\"", "A small plant on a windowsill has a new leaf.", "Someone who was hurting is having an easier evening.", "A dog is overjoyed that someone came home."],
  },

  step: {
    title: "One small step.",
    sub: "When everything feels like too much, start tiny. Motivation usually comes after you move, not before.",
    about: "about 2 minutes",
    accept: "I'll do this",
    other: "Something else",
    not_tonight: "Not even this tonight",
    doing: "Take your time. Come back when you're done.",
    done: "Done",
    skip: "Didn't do it — that's okay",
    done_line: "You did one thing. That's enough for right now.",
    more: "One more small step",
    rest_line: "That's okay. Some nights, resting is the step.",
    steps: {
      water: {"text": "Drink a glass of water.", "why": "A tired mind is often a thirsty one."},
      window: {"text": "Open a window and take three slow breaths.", "why": "Fresh air is a small reset."},
      face: {"text": "Wash your face with warm water.", "why": "A little care still counts."},
      stretch: {"text": "Stand up and stretch your arms over your head.", "why": "Your body has been holding the day."},
      eat: {"text": "Eat something small. Fruit, bread, anything.", "why": "It's hard to feel okay on an empty stomach."},
      outside: {"text": "Step outside your door for one minute.", "why": "A change of air, nothing more."},
      tidy: {"text": "Put away just one thing near you.", "why": "One clear spot is enough."},
      song: {"text": "Play one song you used to love.", "why": "Some songs remember who you are."},
      text: {"text": "Send someone a short message: \"thinking of you\".", "why": "Small threads still connect us."},
      hug: {"text": "Hug someone, or a pillow. Really.", "why": "Holding on helps, even to a pillow."},
      sky: {"text": "Look out at the sky for a minute.", "why": "It has been there all along."},
      write: {"text": "Write one sentence about how you feel. Any sentence.", "why": "Naming it makes it a little smaller."},
      see: {"text": "Name three things you can see right now.", "why": "It brings you back to here."},
      clothes: {"text": "Change into something comfortable.", "why": "You're allowed to be comfortable."},
    },
  },

  rest_hint: 'Nothing to do. Things here respond if you touch them.',
  rest_objects: { lamp: 'Lamp', window: 'Window — rain', curtain: 'Curtain', tea: 'Cup of tea', fire: 'Fireplace' },
  room_label: 'A quiet apartment at night',

  calm_lines: [
    'Take a slow breath.',
    'Let your shoulders drop.',
    'You are home now.',
    "You don't need to solve everything tonight.",
  ],
  calm_in: 'breathe in',
  calm_out: 'breathe out',

  quiet_title: 'Just the sounds you want.',
  quiet_master: 'Master volume',
  quiet_volume: 'volume',
  quiet_sounds: { rain: 'Rain', wind: 'Wind', fire: 'Fireplace', cafe: 'Cafe', wave: 'Ocean', city: 'Night city', forest: 'Forest' },

  company_lines: [
    'Someone across the street is still up too.',
    'Another light just came on.',
    "You're not the only one who had a long day.",
    'Everyone is winding down, one window at a time.',
    "It's okay to rest.",
  ],
  company_label: 'Lit windows in the building across the street',

  sleep_intro: "Let's slow everything down.",
  sleep_main: "You can leave tomorrow's problems for tomorrow.",
  sleep_eyes: 'Let your eyes get heavy.',
  sleep_night: 'Good night.',
  close_ws: 'Close workspace',
  sleep_choose_title: 'How long should the sound stay?',
  sleep_choose_sub: 'It fades to silence on its own. Nothing to remember.',
  sleep_minutes: '{n} min',
  sleep_all_night: 'Rain all night',
  sleep_start: 'Start winding down',
  sleep_fades_at: 'Sound fades out at {t}',
  sleep_stays_on: 'Rain stays on all night',
  sleep_screen_on: 'The screen stays on, dimmed, so the sound keeps playing.',
  sleep_faded: 'The sound has faded out. Sleep well.',

  checkin_q: 'Feel lighter?',
  checkin: { lighter: 'Lighter', same: 'Same', heavier: 'Heavier' },
  checkin_thanks: 'Thank you for telling me.',
  heavy_note: "It's been heavy for a few evenings now. Talking to someone you trust, or to a professional, can really help.",
  heavy_dismiss: 'Hide this',

  final_1: 'You did enough today.',
  final_2: 'You can leave the rest for tomorrow.',
  final_night: 'Good night.',
  closed_title: 'Good night.',
  closed_sub: 'Sound is off. You can close this tab whenever you like.',
  closed_reopen: 'Come back in',
  support_hint: "Heavier than a hard day? You can talk to someone — free and confidential.",
  support_link: "Find someone to talk to →",
  support_title: "What you wrote sounds really heavy.",
  support_body: "You don't have to carry this alone. If you're thinking about ending your life or hurting yourself, please reach out to someone right now — a trained person can listen, free and confidential, day or night.",
  support_after: "If you'd still like to, you can let the rest go below.",
}

const vi: HomeCopy = {
  mode_focus: 'Tập trung',
  mode_home: 'Về nhà',
  mode_switch_label: 'Chế độ không gian',
  sound_on: 'Âm thanh nhẹ: bật',
  sound_off: 'Âm thanh: tắt',
  sound_hint: 'Chạm để nghe mưa nhẹ',
  back: 'Quay lại',
  menu: 'Danh sách',
  close: 'Đóng',
  sky_open: 'Bầu trời của bạn',

  welcome_title: 'Chào mừng về nhà.',
  welcome_sub: 'Ở đây bạn không cần phải làm gì cả.',
  welcome_q: 'Hôm nay của bạn thế nào?',
  moods: { heavy: 'Nặng nề', okay: 'Tạm ổn', good: 'Ổn', lovely: 'Thật tốt' },
  mood_reply: {
    heavy: 'Nghe có vẻ nhiều thứ quá. Mình đi chậm thôi.',
    okay: 'Tạm ổn là đủ rồi.',
    good: 'Tốt quá. Mình cứ nhẹ nhàng nhé.',
    lovely: 'Giữ lại cảm giác đó một chút nhé.',
  },
  mood_skip: 'Bỏ qua',

  need_q: 'Lúc này bạn cần gì?',
  hub_groups: { light: "Đón chút ánh sáng", out: 'Trút bỏ', settle: 'Thả lỏng', sleep: 'Chuẩn bị ngủ' },
  cards: {
    mind: { title: 'Gỡ rối đầu óc', desc: 'Viết hết ra, rồi buông nó đi.' },
    one: { title: 'Một điều hôm nay', desc: 'Giữ lại thành sao, hoặc buông đi.' },
    rest: { title: 'Chỉ nghỉ ngơi', desc: 'Một căn phòng ấm. Không phải làm gì.' },
    calm: { title: 'Bình tĩnh lại', desc: 'Hai phút thở thật chậm.' },
    quiet: { title: 'Chút yên tĩnh', desc: 'Chỉ những âm thanh bạn chọn.' },
    company: { title: 'Có người bên cạnh', desc: 'Những ô cửa sáng đèn bên kia đường.' },
    sleep: { title: 'Chuẩn bị đi ngủ', desc: 'Năm phút, mọi thứ dịu dần.' },
    step: { title: "Một bước nhỏ", desc: "Cho những lúc chẳng muốn bắt đầu gì cả." },
    good: { title: "Điều tốt vẫn đến", desc: "Ghi lại một điều, hoặc để một điều tìm đến bạn." },
    sky: { title: 'Bầu trời của bạn', desc: 'Những khoảnh khắc đẹp, hoá thành sao.' },
  },
  exp_titles: { step: "Bước nhỏ", good: "Điều tốt", mind: 'Gỡ rối', one: 'Một điều', rest: 'Nghỉ ngơi', calm: 'Bình tĩnh', quiet: 'Yên tĩnh', company: 'Bầu bạn', sleep: 'Đi ngủ', sky: 'Bầu trời' },
  suggested: 'hợp với tối nay',

  steps: { write: 'Viết', choose: 'Chọn', release: 'Buông' },
  ctrl_enter: 'Ctrl + Enter để tiếp tục',
  next: 'Tiếp tục',
  edit: 'Sửa lại',

  mind_title: 'Điều gì đang chiếm chỗ trong đầu bạn?',
  mind_sub: 'Viết bất cứ gì. Không cần sắp xếp.',
  mind_placeholder: 'deadline ngày mai\ntiền\nhọp với sếp\nphải học Kafka\nquà sinh nhật\nmệt quá\nkhông biết mình đang làm gì nữa...',
  mind_choose_title: 'Bạn muốn buông nó theo cách nào?',
  mind_choose_sub: 'Chọn cách nào thấy hợp với tối nay.',
  mind_release: 'Buông đi',
  mind_privacy: 'Những gì bạn viết không rời khỏi thiết bị này và không được lưu ở đâu cả.',
  rituals: {
    sky: { name: 'Bay lên trời', desc: 'Từng nỗi lo bay lên, hoá thành sao nhỏ.', after: 'Bạn không cần giải quyết mọi thứ trong tối nay.' },
    river: { name: 'Thả trôi sông', desc: 'Gấp thành thuyền giấy, để dòng nước mang đi.', after: 'Nó trôi xa rồi. Cứ để nó đi tiếp.' },
    burn: { name: 'Đốt đi', desc: 'Nhìn nó cháy thành than hồng và tro.', after: 'Giờ chỉ còn tro. Không còn gì phải mang theo.' },
    wind: { name: 'Gửi theo gió', desc: 'Một cơn gió cuốn đi, tan tác.', after: 'Gió mang đi rồi. Đôi tay bạn nghỉ được rồi.' },
    rain: { name: 'Tan vào mưa', desc: 'Mực nhoè dần rồi trôi mất.', after: 'Mưa rửa sạch rồi. Ngày mai bắt đầu lại.' },
  },
  mind_tomorrow_title: 'Có việc gì cần làm vào ngày mai không?',
  mind_tomorrow_sub: 'Chạm vào một dòng để lưu vào danh sách việc cần làm. Phần còn lại, cứ buông đi.',
  mind_tomorrow_privacy: 'Dòng được lưu chỉ nằm trong danh sách việc cần làm ở trình duyệt này.',
  mind_save_only: 'Để dành cho ngày mai',
  mind_saved_one: 'Có 1 việc đang chờ bạn vào ngày mai.',
  mind_saved_many: 'Có {n} việc đang chờ bạn vào ngày mai.',
  mind_saved_where: 'Chúng nằm trong danh sách việc cần làm ở chế độ Tập trung. Tối nay bạn có thể đặt chúng xuống.',

  after_menu: 'Làm điều khác',
  after_rest: 'Nghỉ trong phòng',
  done_tonight: 'Tối nay vậy là đủ rồi',

  one_title: 'Kể mình nghe một điều hôm nay.',
  one_prefix: 'Hôm nay mình…',
  one_placeholder: 'có một cuộc họp thật khó khăn.',
  one_choose_title: 'Bạn muốn làm gì với nó?',
  one_keep: 'Giữ lại khoảnh khắc này',
  one_keep_desc: 'Nó sẽ thành một ngôi sao trên bầu trời của bạn (chỉ trong trình duyệt này).',
  one_go_label: 'Hoặc buông nó đi',
  one_after_keep: 'Đã giữ lại. Giờ nó là một ngôi sao trên bầu trời của bạn.',
  one_privacy: 'Khoảnh khắc được giữ chỉ nằm trong trình duyệt này.',

  sky_title: 'Bầu trời của bạn',
  sky_empty: 'Chưa có gì cả. Viết một khoảnh khắc đẹp bên dưới để thắp ngôi sao đầu tiên.',
  sky_forget: 'Buông ngôi sao này',
  sky_hint: 'Mỗi ngôi sao là một khoảnh khắc bạn đã giữ lại. Chạm để đọc.',
  sky_add_label: 'Một khoảnh khắc đẹp muốn giữ',
  sky_add_placeholder: 'Một khoảnh khắc đẹp muốn giữ…',
  sky_add: 'Thêm sao',
  sky_added: 'Một ngôi sao mới đã sáng trên bầu trời.',

  good: {
    title: "Điều tốt vẫn đến.",
    sub: "Kể cả vào những ngày không thấy vậy.",
    note: "Ghi lại một điều hôm nay",
    show: "Chỉ cần cho mình xem một điều",
    note_title: "Hôm nay có điều gì nhỏ mà tốt không?",
    note_more: "Còn gì nữa không, nhỏ thôi cũng được?",
    one_is_enough: "Một điều là đủ. Nhỏ cũng tính.",
    hints: [{"label": "Món gì đó ngon", "example": "một tô phở nóng"}, {"label": "Ai đó tử tế", "example": "đồng nghiệp để phần mình ly cà phê"}, {"label": "Việc suôn sẻ", "example": "cuộc họp ngắn hơn mình tưởng"}, {"label": "Điều bạn thấy", "example": "trời hồng trên đường về"}, {"label": "Việc bạn làm", "example": "mình đã ra ngoài đi bộ mười phút"}],
    why_label: "Vì sao điều đó xảy ra? (không bắt buộc)",
    why_placeholder: "vì…",
    keep: "Giữ lại",
    enough: "Tối nay vậy là đủ rồi",
    own_label: "Bạn đã giữ lại điều này vào {date}",
    somewhere_label: "Đâu đó tối nay",
    another: "Cho mình xem điều khác",
    after_kept: "Nó đã xảy ra. Giờ nó nằm trên bầu trời của bạn.",
    after_read: "Tối nay chưa cảm thấy cũng không sao. Điều đó vẫn là thật.",
    privacy: "Chỉ lưu trong trình duyệt này.",
    world: ["Có người đang đọc tin nhắn họ mong đợi bấy lâu.", "Có ấm nước đang sôi cho một người bạn cần tâm sự.", "Có người vừa cười đến chảy nước mắt.", "Một người lạ đang giữ cửa cho ai đó mà chẳng nghĩ ngợi gì.", "Có người cuối cùng cũng nhận được tin vui.", "Một em bé đang ngủ thiếp đi trên vai ai đó thật ấm.", "Có người đang được nghe câu: \"May mà có bạn ở đây.\"", "Chậu cây nhỏ bên cửa sổ vừa ra một chiếc lá mới.", "Một người từng đau lòng đang có một buổi tối dễ chịu hơn.", "Một chú chó đang mừng rỡ vì có người vừa về nhà."],
  },

  step: {
    title: "Một bước nhỏ thôi.",
    sub: "Khi mọi thứ đều quá sức, hãy bắt đầu thật nhỏ. Động lực thường đến sau khi mình nhúc nhích, chứ không phải trước.",
    about: "khoảng 2 phút",
    accept: "Mình làm việc này",
    other: "Việc khác",
    not_tonight: "Tối nay chưa làm nổi",
    doing: "Cứ từ từ. Làm xong thì quay lại đây.",
    done: "Xong rồi",
    skip: "Chưa làm được — không sao cả",
    done_line: "Bạn vừa làm được một điều. Vậy là đủ cho lúc này.",
    more: "Thêm một bước nhỏ nữa",
    rest_line: "Không sao đâu. Có những tối, nghỉ ngơi chính là bước nhỏ.",
    steps: {
      water: {"text": "Uống một cốc nước.", "why": "Đầu óc mệt thường là đang khát."},
      window: {"text": "Mở cửa sổ và hít thở chậm ba lần.", "why": "Một chút không khí mới là đủ để làm mới."},
      face: {"text": "Rửa mặt bằng nước ấm.", "why": "Chăm sóc mình một chút cũng là chăm sóc."},
      stretch: {"text": "Đứng dậy, vươn hai tay qua đầu.", "why": "Cơ thể bạn đã gồng cả ngày rồi."},
      eat: {"text": "Ăn một chút gì đó. Trái cây, bánh mì, gì cũng được.", "why": "Bụng đói thì khó mà thấy ổn."},
      outside: {"text": "Bước ra khỏi cửa một phút.", "why": "Đổi không khí thôi, không cần gì hơn."},
      tidy: {"text": "Cất gọn đúng một món đồ gần bạn.", "why": "Một góc gọn gàng là đủ."},
      song: {"text": "Mở một bài hát bạn từng rất thích.", "why": "Có những bài hát còn nhớ bạn là ai."},
      text: {"text": "Nhắn cho ai đó: \"tự nhiên nhớ bạn\".", "why": "Những sợi dây nhỏ vẫn kết nối mình với nhau."},
      hug: {"text": "Ôm một ai đó, hoặc ôm cái gối. Thật đấy.", "why": "Được ôm giúp ích, kể cả là ôm gối."},
      sky: {"text": "Nhìn bầu trời một phút.", "why": "Nó vẫn luôn ở đó."},
      write: {"text": "Viết một câu về cảm giác của bạn. Câu gì cũng được.", "why": "Gọi được tên nó, nó nhỏ đi một chút."},
      see: {"text": "Kể tên ba thứ bạn đang nhìn thấy.", "why": "Nó đưa bạn trở về với hiện tại."},
      clothes: {"text": "Thay một bộ đồ thật thoải mái.", "why": "Bạn được phép thoải mái."},
    },
  },

  rest_hint: 'Không có gì phải làm. Đồ vật ở đây sẽ phản hồi nếu bạn chạm vào.',
  rest_objects: { lamp: 'Đèn', window: 'Cửa sổ — mưa', curtain: 'Rèm cửa', tea: 'Tách trà', fire: 'Lò sưởi' },
  room_label: 'Một căn hộ yên tĩnh về đêm',

  calm_lines: [
    'Hít một hơi thật chậm.',
    'Thả lỏng đôi vai.',
    'Bạn đã về nhà rồi.',
    'Bạn không cần giải quyết mọi thứ trong tối nay.',
  ],
  calm_in: 'hít vào',
  calm_out: 'thở ra',

  quiet_title: 'Chỉ những âm thanh bạn muốn.',
  quiet_master: 'Âm lượng chung',
  quiet_volume: 'âm lượng',
  quiet_sounds: { rain: 'Mưa', wind: 'Gió', fire: 'Lò sưởi', cafe: 'Quán cà phê', wave: 'Biển', city: 'Phố đêm', forest: 'Rừng' },

  company_lines: [
    'Bên kia đường cũng có người còn thức.',
    'Vừa có thêm một ô cửa sáng đèn.',
    'Không chỉ mình bạn có một ngày dài.',
    'Mọi người đang chậm lại, từng ô cửa một.',
    'Nghỉ ngơi cũng được mà.',
  ],
  company_label: 'Những ô cửa sáng đèn ở toà nhà bên kia đường',

  sleep_intro: 'Mình chậm mọi thứ lại nhé.',
  sleep_main: 'Chuyện của ngày mai, cứ để ngày mai lo.',
  sleep_eyes: 'Để đôi mắt nặng dần.',
  sleep_night: 'Chúc ngủ ngon.',
  close_ws: 'Đóng không gian',
  sleep_choose_title: 'Bạn muốn âm thanh ở lại bao lâu?',
  sleep_choose_sub: 'Nó sẽ tự nhỏ dần rồi tắt. Bạn không cần nhớ gì cả.',
  sleep_minutes: '{n} phút',
  sleep_all_night: 'Mưa suốt đêm',
  sleep_start: 'Bắt đầu thư giãn',
  sleep_fades_at: 'Âm thanh tắt dần lúc {t}',
  sleep_stays_on: 'Tiếng mưa ở lại suốt đêm',
  sleep_screen_on: 'Màn hình vẫn sáng mờ để âm thanh không bị ngắt.',
  sleep_faded: 'Âm thanh đã tắt. Ngủ ngon nhé.',

  checkin_q: 'Bạn thấy nhẹ lòng hơn chưa?',
  checkin: { lighter: 'Nhẹ hơn', same: 'Như cũ', heavier: 'Nặng hơn' },
  checkin_thanks: 'Cảm ơn bạn đã chia sẻ.',
  heavy_note: 'Mấy buổi tối gần đây có vẻ nặng nề. Trò chuyện với người bạn tin tưởng, hoặc với chuyên gia, có thể giúp ích rất nhiều.',
  heavy_dismiss: 'Ẩn đi',

  final_1: 'Hôm nay bạn đã làm đủ rồi.',
  final_2: 'Phần còn lại để mai tính.',
  final_night: 'Chúc ngủ ngon.',
  closed_title: 'Chúc ngủ ngon.',
  closed_sub: 'Âm thanh đã tắt. Bạn có thể đóng tab này bất cứ lúc nào.',
  closed_reopen: 'Quay lại',
  support_hint: "Nặng hơn một ngày tệ? Bạn có thể nói chuyện với ai đó — miễn phí và kín đáo.",
  support_link: "Tìm người lắng nghe →",
  support_title: "Những điều bạn viết nghe thật sự rất nặng.",
  support_body: "Bạn không phải mang nó một mình. Nếu bạn đang nghĩ đến việc kết thúc cuộc sống hay làm tổn thương bản thân, hãy liên hệ với ai đó ngay bây giờ — có những người được đào tạo để lắng nghe, miễn phí và kín đáo, cả ngày lẫn đêm.",
  support_after: "Nếu bạn vẫn muốn, bạn có thể buông phần còn lại ở bên dưới.",
}

export const HOME_COPY: Record<'en' | 'vi', HomeCopy> = { en, vi }

// Other languages live in their own chunks (see ./locales) and are fetched only when used.
const LOADERS: Record<Exclude<Lang, 'en' | 'vi'>, () => Promise<{ default: HomeCopy }>> = {
  es: () => import('./locales/es'),
  pt: () => import('./locales/pt'),
  fr: () => import('./locales/fr'),
  de: () => import('./locales/de'),
  ru: () => import('./locales/ru'),
  ja: () => import('./locales/ja'),
  ko: () => import('./locales/ko'),
  zh: () => import('./locales/zh'),
  id: () => import('./locales/id'),
  th: () => import('./locales/th'),
}

export async function loadHomeCopy(lang: Lang): Promise<HomeCopy> {
  if (lang === 'en' || lang === 'vi') return HOME_COPY[lang]
  return (await LOADERS[lang]()).default
}

export const MOOD_EMOJI: Record<Mood, string> = { heavy: '😫', okay: '😐', good: '🙂', lovely: '❤️' }
export const EXP_EMOJI: Record<Exp, string> = { mind: '💭', one: '✍️', rest: '🛋️', calm: '🌬️', quiet: '🎧', company: '🏙️', sleep: '🌙', sky: '✦', good: '🌟', step: '🌱' }

/** Hub layout: what's in each group, in order. */
export const HUB: { group: HubGroup; items: Exp[] }[] = [
  { group: 'out', items: ['mind', 'one'] },
  { group: 'light', items: ['step', 'good', 'sky'] },
  { group: 'settle', items: ['rest', 'calm', 'quiet', 'company'] },
  { group: 'sleep', items: ['sleep'] },
]
/** Gentle suggestion per mood — highlighted on the hub, never forced. */
export const MOOD_SUGGEST: Record<Mood, Exp> = { heavy: 'mind', okay: 'rest', good: 'good', lovely: 'good' }

/** Gentle ambient mix each experience suggests (ids from AMBIENT_SOUNDS, 0-100). */
export const NEED_MIX: Record<Need | 'welcome', Record<string, number>> = {
  welcome: { rain: 30 },
  rest: { rain: 32, fire: 18 },
  calm: { wave: 38 },
  mind: { rain: 28 },
  quiet: {}, // keeps whatever the person already has
  company: { rain: 24, fire: 20 },
  sleep: { rain: 24, wind: 10 },
}

export const CHECK_ORDER: CheckResult[] = ['lighter', 'same', 'heavier']
export const CHECK_EMOJI: Record<CheckResult, string> = { lighter: '🪶', same: '😐', heavier: '🪨' }
export const SLEEP_TIMERS: SleepTimer[] = [15, 30, 60, 0]

export const RITUAL_ORDER: Ritual[] = ['sky', 'river', 'burn', 'wind', 'rain']
export const RITUAL_EMOJI: Record<Ritual, string> = { sky: '🌌', river: '⛵', burn: '🔥', wind: '🍃', rain: '🌧️' }
/** Soft sound under each ritual (only plays if sound is already on). */
export const RITUAL_MIX: Record<Ritual, Record<string, number>> = {
  sky: { wind: 12, rain: 14 }, river: { wave: 30 }, burn: { fire: 38 }, wind: { wind: 30 }, rain: { rain: 38 },
}

export const STEP_EMOJI: Record<StepId, string> = {
  water: '💧',
  window: '🪟',
  face: '🫧',
  stretch: '🙆',
  eat: '🍎',
  outside: '🚪',
  tidy: '🧺',
  song: '🎵',
  text: '💬',
  hug: '🤗',
  sky: '🌙',
  write: '✏️',
  see: '👀',
  clothes: '👕',
}
