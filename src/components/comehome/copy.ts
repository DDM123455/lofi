// Copy for Come Home mode. Deliberately short — this mode is about saying less.
// Kept local to the feature (instead of the big workspace `Translations` type) so the
// lazy-loaded chunk carries its own strings and the focus workspace bundle stays untouched.

export type Mood = 'heavy' | 'okay' | 'good' | 'lovely'
export type Need = 'rest' | 'calm' | 'mind' | 'quiet' | 'company' | 'sleep'
/** Everything the hub can open. */
export type Exp = Need | 'one' | 'sky'
export type HubGroup = 'out' | 'settle' | 'sleep'
/** Ways to let go of what you wrote. */
export type Ritual = 'sky' | 'river' | 'burn' | 'wind' | 'rain'

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

  final_1: string
  final_2: string
  final_night: string
  closed_title: string
  closed_sub: string
  closed_reopen: string
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
  hub_groups: { out: 'Let it out', settle: 'Settle in', sleep: 'Wind down' },
  cards: {
    mind: { title: 'Clear my mind', desc: 'Write it all down, then let it go.' },
    one: { title: 'One thing from today', desc: 'Keep it as a star, or release it.' },
    rest: { title: 'Just rest', desc: 'A cozy room. Nothing to do.' },
    calm: { title: 'Calm down', desc: 'Two minutes of slow breathing.' },
    quiet: { title: 'Some quiet', desc: 'Only the sounds you choose.' },
    company: { title: 'Some company', desc: 'Lit windows across the street.' },
    sleep: { title: 'Get ready for sleep', desc: 'Five minutes, slowly fading out.' },
    sky: { title: 'Your sky', desc: 'Good moments you kept, as stars.' },
  },
  exp_titles: { mind: 'Clear my mind', one: 'One thing', rest: 'Rest', calm: 'Calm', quiet: 'Quiet', company: 'Company', sleep: 'Sleep', sky: 'Your sky' },
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

  final_1: 'You did enough today.',
  final_2: 'You can leave the rest for tomorrow.',
  final_night: 'Good night.',
  closed_title: 'Good night.',
  closed_sub: 'Sound is off. You can close this tab whenever you like.',
  closed_reopen: 'Come back in',
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
  hub_groups: { out: 'Trút bỏ', settle: 'Thả lỏng', sleep: 'Chuẩn bị ngủ' },
  cards: {
    mind: { title: 'Gỡ rối đầu óc', desc: 'Viết hết ra, rồi buông nó đi.' },
    one: { title: 'Một điều hôm nay', desc: 'Giữ lại thành sao, hoặc buông đi.' },
    rest: { title: 'Chỉ nghỉ ngơi', desc: 'Một căn phòng ấm. Không phải làm gì.' },
    calm: { title: 'Bình tĩnh lại', desc: 'Hai phút thở thật chậm.' },
    quiet: { title: 'Chút yên tĩnh', desc: 'Chỉ những âm thanh bạn chọn.' },
    company: { title: 'Có người bên cạnh', desc: 'Những ô cửa sáng đèn bên kia đường.' },
    sleep: { title: 'Chuẩn bị đi ngủ', desc: 'Năm phút, mọi thứ dịu dần.' },
    sky: { title: 'Bầu trời của bạn', desc: 'Những khoảnh khắc đẹp, hoá thành sao.' },
  },
  exp_titles: { mind: 'Gỡ rối', one: 'Một điều', rest: 'Nghỉ ngơi', calm: 'Bình tĩnh', quiet: 'Yên tĩnh', company: 'Bầu bạn', sleep: 'Đi ngủ', sky: 'Bầu trời' },
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

  final_1: 'Hôm nay bạn đã làm đủ rồi.',
  final_2: 'Phần còn lại để mai tính.',
  final_night: 'Chúc ngủ ngon.',
  closed_title: 'Chúc ngủ ngon.',
  closed_sub: 'Âm thanh đã tắt. Bạn có thể đóng tab này bất cứ lúc nào.',
  closed_reopen: 'Quay lại',
}

export const HOME_COPY: Record<'en' | 'vi', HomeCopy> = { en, vi }

export const MOOD_EMOJI: Record<Mood, string> = { heavy: '😫', okay: '😐', good: '🙂', lovely: '❤️' }
export const EXP_EMOJI: Record<Exp, string> = { mind: '💭', one: '✍️', rest: '🛋️', calm: '🌬️', quiet: '🎧', company: '🏙️', sleep: '🌙', sky: '✦' }

/** Hub layout: what's in each group, in order. */
export const HUB: { group: HubGroup; items: Exp[] }[] = [
  { group: 'out', items: ['mind', 'one'] },
  { group: 'settle', items: ['rest', 'calm', 'quiet', 'company'] },
  { group: 'sleep', items: ['sleep', 'sky'] },
]
/** Gentle suggestion per mood — highlighted on the hub, never forced. */
export const MOOD_SUGGEST: Record<Mood, Exp> = { heavy: 'mind', okay: 'rest', good: 'one', lovely: 'one' }

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

export const RITUAL_ORDER: Ritual[] = ['sky', 'river', 'burn', 'wind', 'rain']
export const RITUAL_EMOJI: Record<Ritual, string> = { sky: '🌌', river: '⛵', burn: '🔥', wind: '🍃', rain: '🌧️' }
/** Soft sound under each ritual (only plays if sound is already on). */
export const RITUAL_MIX: Record<Ritual, Record<string, number>> = {
  sky: { wind: 12, rain: 14 }, river: { wave: 30 }, burn: { fire: 38 }, wind: { wind: 30 }, rain: { rain: 38 },
}
