export type Lang = 'en' | 'vi'

export interface Translations {
  // Pomodoro
  pom_focus: string
  pom_break: string
  pom_start: string
  pom_pause: string
  pom_phase_focus: string
  pom_phase_break: string

  // Panel tabs (tooltips)
  tab_music: string
  tab_sounds: string
  tab_scene: string
  tab_settings: string

  // Dock chip labels (short — must fit a small pill on mobile)
  dock_music: string
  dock_background: string
  dock_todo: string
  dock_calendar: string

  // Music tab
  music_custom_yt: string
  music_custom_placeholder: string
  music_play_btn: string
  music_connecting: string
  music_yt_blocked: string
  music_now_playing: string
  music_paused: string

  // Sounds tab
  sounds_title: string

  // Scene tab
  bg_loading: string
  scene_atm_title: string
  scene_bg_title: string
  scene_gif_title: string
  scene_gif_use: string
  scene_yt_title: string
  scene_yt_placeholder: string
  scene_yt_btn: string
  scene_yt_active: string
  scene_yt_off: string
  scene_dark_title: string
  scene_blur_title: string
  scene_view_all: string

  // Atmosphere
  atm_none_label: string; atm_none_note: string
  atm_day_label: string;  atm_day_note: string
  atm_dusk_label: string; atm_dusk_note: string
  atm_night_label: string; atm_night_note: string
  atm_dim_label: string;  atm_dim_note: string

  // More tabs
  more_widgets: string
  more_weather: string
  more_pet: string
  more_xp: string
  more_share: string

  // Widgets subtab
  widgets_toggle: string
  widgets_clock: string
  widgets_weather: string
  widgets_pom: string
  widgets_notes: string
  widgets_progress: string
  widgets_clock_style: string
  widgets_reset_pos: string
  widgets_reset: string
  widgets_music_vol: string

  // Weather subtab
  wx_desc: string
  wx_detect_btn: string
  wx_loading: string
  wx_error: string
  wx_retry: string
  wx_refresh: string
  wx_clear: string
  wx_location_fallback: string
  wmo_fallback: string

  // Pet subtab
  pet_focused: string
  pet_break: string
  pet_choose: string
  pet_show: string
  pet_hide: string
  pet_hide_btn: string
  pet_enlarge: string
  pet_shrink: string

  // Progress subtab
  progress_achievements: string

  // Share subtab
  share_desc: string
  share_copy: string
  share_copied: string
  share_hint: string

  // Todos
  todo_title: string
  todo_empty: string
  todo_placeholder: string
  todo_estimate_placeholder: string
  todo_set_active: string
  todo_active_hint: string
  todo_active_label: string
  todo_active_none: string
  todo_remove: string

  // Calendar
  cal_today: string
  cal_day_notes: string
  cal_empty: string
  cal_placeholder: string
  cal_months: string[]
  cal_days_short: string[]
  cal_days_long: string[]

  // Progress card
  progress_title: string
  progress_days: string
  progress_best: string

  // Misc
  click_to_start: string
  pom_done_toast: string
  switch_theme: string
  open_player: string

  // WMO weather codes
  wmo: Record<number, string>

  // Ambient sound labels (keyed by sound ID)
  ambient: Record<string, string>

  // Day/night period labels
  dn_labels: Record<string, string>

  // ── Landing page ─────────────────────────────────────────────────────
  home_badge: string
  home_h1_prefix: string
  home_h1_accent: string
  home_desc: string
  home_cta_open: string
  home_cta_scenes: string
  home_cta_tagline: string

  home_rooms_h2: string
  home_rooms_desc: string
  home_room_labels: string[]

  home_feat_h2: string
  home_feat_desc: string
  home_feat_items: { emoji: string; title: string; desc: string }[]

  home_steps_h2: string
  home_steps: { n: string; title: string; desc: string }[]

  home_blog_h2: string
  home_blog_all: string

  home_faq_h2: string
  home_faq: { q: string; a: string }[]

  home_cta2_h2: string
  home_cta2_desc: string
  home_cta2_btn: string
  home_cta2_tagline: string
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    pom_focus: 'Focus',
    pom_break: 'Break',
    pom_start: 'Start',
    pom_pause: 'Pause',
    pom_phase_focus: 'FOCUS',
    pom_phase_break: 'BREAK',

    tab_music: 'Lofi Music',
    tab_sounds: 'Ambient Sounds',
    tab_scene: 'Background',
    tab_settings: 'Settings',

    dock_music: 'Music',
    dock_background: 'Scene',
    dock_todo: 'To-Do',
    dock_calendar: 'Calendar',

    music_custom_yt: 'Custom YouTube',
    music_custom_placeholder: 'Paste URL or video ID…',
    music_play_btn: 'Play',
    music_connecting: 'connecting…',
    music_yt_blocked: '⚠ YouTube not ready. Synth audio is active.',
    music_now_playing: 'Now Playing',
    music_paused: 'Paused',

    sounds_title: 'Ambient Sounds — mix your own vibe',

    bg_loading: 'Loading scene…',
    scene_atm_title: 'Atmosphere — light & background',
    scene_bg_title: 'Backgrounds',
    scene_gif_title: 'Custom GIF',
    scene_gif_use: 'Use',
    scene_yt_title: 'YouTube Video Background',
    scene_yt_placeholder: 'YouTube URL or video ID…',
    scene_yt_btn: '▶ Set BG',
    scene_yt_active: '🎬 YouTube video as background',
    scene_yt_off: 'Off ×',
    scene_dark_title: 'Background Darkness',
    scene_blur_title: 'Background Blur',
    scene_view_all: 'View all scenes →',

    atm_none_label: 'Default',   atm_none_note: 'Transparent',
    atm_day_label: 'Daytime',    atm_day_note: 'Bright',
    atm_dusk_label: 'Dusk',      atm_dusk_note: 'Warm',
    atm_night_label: 'Night',    atm_night_note: 'Deep',
    atm_dim_label: 'Focus',      atm_dim_note: 'Dark, minimal distraction',

    more_widgets: '🧩 Widget',
    more_weather: '🌤️ Weather',
    more_pet: '🐱 Cat',
    more_xp: '🏆 XP',
    more_share: '🔗 Share',

    widgets_toggle: 'Toggle Widgets',
    widgets_clock: '🕐 Clock',
    widgets_weather: '🌤️ Weather',
    widgets_pom: '🍅 Pomodoro',
    widgets_notes: '📝 Notes',
    widgets_progress: '📊 Progress',
    widgets_clock_style: 'Clock Style',
    widgets_reset_pos: 'Reset Positions',
    widgets_reset: 'Reset',
    widgets_music_vol: 'Music Volume',

    wx_desc: 'Automatically detect your location and display weather on screen.',
    wx_detect_btn: '📍 Detect My Weather',
    wx_loading: 'Reading location…',
    wx_error: '⚠ Could not access location. Allow GPS and try again.',
    wx_retry: 'Retry',
    wx_refresh: '↺ Refresh',
    wx_clear: 'Clear',
    wx_location_fallback: 'Your location',
    wmo_fallback: 'Special weather',

    pet_focused: '⌨️ focused',
    pet_break: '☕ on break',
    pet_choose: 'Choose Companion Cat',
    pet_show: '+ Show cat on screen',
    pet_hide: '✕ Hide cat from screen',
    pet_hide_btn: 'Hide cat',
    pet_enlarge: 'Enlarge',
    pet_shrink: 'Shrink',

    progress_achievements: 'Achievements',

    share_desc: 'Share your current vibe via an embed link.',
    share_copy: '📋 Copy Embed Link',
    share_copied: '✓ Copied!',
    share_hint: 'Paste into Notion, blog, or any website',

    todo_title: 'To-Do',
    todo_empty: 'No items yet',
    todo_placeholder: 'Add item…',
    todo_estimate_placeholder: '🍅',
    todo_set_active: 'Set as active task',
    todo_active_hint: 'Click a task to focus it — pomodoros you complete count toward it',
    todo_active_label: 'Focusing on',
    todo_active_none: 'No active task',
    todo_remove: 'Remove',

    cal_today: 'Today',
    cal_day_notes: 'Day Notes',
    cal_empty: 'No notes for this day',
    cal_placeholder: 'Note for this day…',
    cal_months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    cal_days_short: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    cal_days_long: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],

    progress_title: 'PROGRESS',
    progress_days: 'days',
    progress_best: 'Best',

    click_to_start: 'Tap to start',
    pom_done_toast: 'Pomodoro complete!',
    switch_theme: 'Switch theme',
    open_player: 'Player',

    wmo: {
      0: 'Clear sky', 1: 'Few clouds', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Icy fog',
      51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
      61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
      71: 'Light snow', 73: 'Moderate snow', 75: 'Heavy snow',
      80: 'Light showers', 81: 'Showers', 82: 'Heavy showers',
      95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Heavy thunderstorm',
    },

    ambient: {
      rain: 'Rain', wave: 'Ocean Waves', cafe: 'Café',
      fire: 'Campfire', wind: 'Wind', thunder: 'Thunder',
      forest: 'Forest', city: 'City',
    },

    dn_labels: {
      dawn: 'Dawn', morning: 'Morning', afternoon: 'Afternoon',
      evening: 'Evening', night: 'Night',
    },

    home_badge: '🌍 50K+ sessions · Free · No sign-up',
    home_h1_prefix: 'Your Free',
    home_h1_accent: 'Focus & Study Workspace',
    home_desc: 'Lofi music, ambient sounds mixer, Pomodoro timer, to-do list and XP rewards — all in one beautiful workspace. Embed in Notion or use standalone.',
    home_cta_open: 'Open Workspace →',
    home_cta_scenes: 'Browse Scenes',
    home_cta_tagline: 'No account needed · Free forever · Embed in Notion, blogs & any website',

    home_rooms_h2: 'Study Room Presets',
    home_rooms_desc: 'Open a curated workspace with one click — music, sounds and background included.',
    home_room_labels: ['Online Study Room', 'Anime Study Room', 'Coding Room', 'Focus Room', 'Deep Work Room'],

    home_feat_h2: 'Everything You Need to Focus',
    home_feat_desc: 'A complete productivity workspace in one browser tab.',
    home_feat_items: [
      { emoji: '🎵', title: 'Lofi Music Player', desc: 'Curated lofi streams — jazz hop, synthwave, chill beats. Ad-free.' },
      { emoji: '🌧️', title: 'Ambient Sound Mixer', desc: 'Layer rain, café, fire, wind. Build your perfect soundscape.' },
      { emoji: '🍅', title: 'Pomodoro Timer', desc: 'Built-in 25/5 Pomodoro timer. Earn XP on every completed session.' },
      { emoji: '✅', title: 'To-Do List', desc: 'Add tasks, tick them off. Completions auto-log to your calendar.' },
      { emoji: '⭐', title: 'XP & Achievements', desc: 'Level up with every Pomodoro. Unlock achievements and build streaks.' },
      { emoji: '🌤️', title: 'Weather Widget', desc: 'Live weather for your city. Scene adapts to current conditions.' },
      { emoji: '🎭', title: '15+ Study Scenes', desc: 'Tokyo Café Rain, Midnight Coding, Cozy Cabin and more — one click.' },
      { emoji: '🐱', title: 'Coding Cat Companion', desc: 'An animated companion that studies with you. Draggable & resizable.' },
    ],

    home_steps_h2: 'Start in 30 Seconds',
    home_steps: [
      { n: '1', title: 'Open the Workspace', desc: 'No account. No download. Click the button — done.' },
      { n: '2', title: 'Pick Your Vibe', desc: 'Choose a scene or mix your own sounds and background.' },
      { n: '3', title: 'Start the Timer', desc: 'Hit Start on the Pomodoro. Focus for 25 minutes. Earn XP.' },
    ],

    home_blog_h2: 'From the Blog',
    home_blog_all: 'All posts →',

    home_faq_h2: 'Frequently Asked Questions',
    home_faq: [
      { q: 'Is LofiSpace free?', a: 'Yes, completely free. No account, no subscription, no hidden costs. Open the workspace and start immediately.' },
      { q: 'Can I embed the workspace in Notion?', a: 'Yes. Customise your workspace, copy the URL, and paste it into a Notion /embed block. Your exact settings — music, sounds, background — are encoded in the URL.' },
      { q: 'What devices does it work on?', a: 'LofiSpace works on desktop, tablet and mobile browsers. All widgets are touch-friendly and the layout adapts to screen size.' },
      { q: 'How does the XP system work?', a: 'You earn XP by completing Pomodoro sessions (25 XP each). XP fills your level bar — reach the threshold to level up. Achievements unlock for milestones like streaks and session counts.' },
      { q: 'Can I share my workspace settings with a friend?', a: 'Yes. The workspace URL encodes all your settings. Copy the link from the address bar and anyone can open your exact configuration.' },
      { q: 'What is the best sound combination for studying?', a: 'A classic: Lofi music at 60% volume + Rain at 40% + Café murmur at 25%. Experiment in the ambient sound mixer to find your ideal mix.' },
    ],

    home_cta2_h2: 'Ready to study smarter?',
    home_cta2_desc: 'Join thousands of students and developers using LofiSpace every day.',
    home_cta2_btn: 'Open Free Workspace →',
    home_cta2_tagline: 'No account · No payment · Forever free',
  },

  vi: {
    pom_focus: 'Tập trung',
    pom_break: 'Nghỉ',
    pom_start: 'Bắt đầu',
    pom_pause: 'Tạm dừng',
    pom_phase_focus: 'TẬP TRUNG',
    pom_phase_break: 'GIẢI LAO',

    tab_music: 'Nhạc Lofi',
    tab_sounds: 'Âm thanh nền',
    tab_scene: 'Hình nền',
    tab_settings: 'Cài đặt',

    dock_music: 'Nhạc',
    dock_background: 'Nền',
    dock_todo: 'Việc',
    dock_calendar: 'Lịch',

    music_custom_yt: 'YouTube tùy chỉnh',
    music_custom_placeholder: 'Dán URL hoặc video ID…',
    music_play_btn: 'Phát',
    music_connecting: 'đang kết nối…',
    music_yt_blocked: '⚠ YouTube chưa sẵn sàng. Âm thanh tổng hợp đang hoạt động.',
    music_now_playing: 'Đang phát',
    music_paused: 'Tạm dừng',

    sounds_title: 'Âm thanh nền — trộn theo ý bạn',

    bg_loading: 'Đang tải cảnh nền…',
    scene_atm_title: 'Không khí — ánh sáng & cảnh nền',
    scene_bg_title: 'Hình nền',
    scene_gif_title: 'GIF tùy chỉnh',
    scene_gif_use: 'Dùng',
    scene_yt_title: 'Video YouTube làm nền',
    scene_yt_placeholder: 'URL hoặc video ID YouTube…',
    scene_yt_btn: '▶ Nền',
    scene_yt_active: '🎬 Video YouTube đang làm nền',
    scene_yt_off: 'Tắt ×',
    scene_dark_title: 'Độ tối nền',
    scene_blur_title: 'Blur nền',
    scene_view_all: 'Xem tất cả cảnh nền →',

    atm_none_label: 'Mặc định',   atm_none_note: 'Trong suốt',
    atm_day_label: 'Ban ngày',    atm_day_note: 'Tươi sáng',
    atm_dusk_label: 'Hoàng hôn',  atm_dusk_note: 'Ấm áp',
    atm_night_label: 'Ban đêm',   atm_night_note: 'Trầm tĩnh',
    atm_dim_label: 'Tập trung',   atm_dim_note: 'Tối, ít sao nhãng',

    more_widgets: '🧩 Widget',
    more_weather: '🌤️ Thời tiết',
    more_pet: '🐱 Mèo',
    more_xp: '🏆 XP',
    more_share: '🔗 Chia sẻ',

    widgets_toggle: 'Bật / Tắt',
    widgets_clock: '🕐 Đồng hồ',
    widgets_weather: '🌤️ Thời tiết',
    widgets_pom: '🍅 Pomodoro',
    widgets_notes: '📝 Ghi chú',
    widgets_progress: '📊 Tiến trình',
    widgets_clock_style: 'Kiểu đồng hồ',
    widgets_reset_pos: 'Đặt lại vị trí',
    widgets_reset: 'Reset',
    widgets_music_vol: 'Âm lượng nhạc',

    wx_desc: 'Tự động phát hiện thời tiết và hiển thị trên màn hình.',
    wx_detect_btn: '📍 Phát hiện thời tiết của tôi',
    wx_loading: 'Đang đọc vị trí…',
    wx_error: '⚠ Không thể truy cập vị trí. Cho phép GPS và thử lại.',
    wx_retry: 'Thử lại',
    wx_refresh: '↺ Làm mới',
    wx_clear: 'Xóa',
    wx_location_fallback: 'Vị trí của bạn',
    wmo_fallback: 'Thời tiết đặc biệt',

    pet_focused: '⌨️ đang tập trung',
    pet_break: '☕ đang nghỉ',
    pet_choose: 'Chọn mèo đồng hành',
    pet_show: '+ Thả mèo ra màn hình',
    pet_hide: '✕ Ẩn mèo khỏi màn hình',
    pet_hide_btn: 'Ẩn mèo',
    pet_enlarge: 'Phóng to',
    pet_shrink: 'Thu nhỏ',

    progress_achievements: 'Thành tích',

    share_desc: 'Chia sẻ vibe hiện tại qua một link embed.',
    share_copy: '📋 Sao chép link embed',
    share_copied: '✓ Đã sao chép!',
    share_hint: 'Dán vào Notion, blog, hoặc bất kỳ trang web nào',

    todo_title: 'Việc cần làm',
    todo_empty: 'Chưa có mục nào',
    todo_placeholder: 'Thêm mục…',
    todo_estimate_placeholder: '🍅',
    todo_set_active: 'Đặt làm việc đang tập trung',
    todo_active_hint: 'Nhấn vào một việc để tập trung — pomodoro hoàn thành sẽ tính cho việc đó',
    todo_active_label: 'Đang tập trung',
    todo_active_none: 'Chưa chọn việc',
    todo_remove: 'Xoá',

    cal_today: 'Hôm nay',
    cal_day_notes: 'Ghi chú ngày',
    cal_empty: 'Chưa có ghi chú cho ngày này',
    cal_placeholder: 'Ghi chú cho ngày này…',
    cal_months: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    cal_days_short: ['CN','T2','T3','T4','T5','T6','T7'],
    cal_days_long: ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'],

    progress_title: 'TIẾN TRÌNH',
    progress_days: 'ngày',
    progress_best: 'Kỷ lục',

    click_to_start: 'Nhấn để bắt đầu',
    pom_done_toast: 'Pomodoro hoàn thành!',
    switch_theme: 'Đổi giao diện',
    open_player: 'Trình phát',

    wmo: {
      0: 'Trời quang', 1: 'Ít mây', 2: 'Có mây', 3: 'Nhiều mây',
      45: 'Sương mù', 48: 'Sương đá',
      51: 'Mưa phùn nhẹ', 53: 'Mưa phùn', 55: 'Mưa phùn nặng',
      61: 'Mưa nhẹ', 63: 'Mưa vừa', 65: 'Mưa to',
      71: 'Tuyết nhẹ', 73: 'Tuyết vừa', 75: 'Tuyết to',
      80: 'Mưa rào nhẹ', 81: 'Mưa rào', 82: 'Mưa rào nặng',
      95: 'Giông bão', 96: 'Giông mưa đá', 99: 'Giông to',
    },

    ambient: {
      rain: 'Mưa rơi', wave: 'Sóng biển', cafe: 'Quán cafe',
      fire: 'Lửa trại', wind: 'Gió thổi', thunder: 'Sấm sét',
      forest: 'Rừng cây', city: 'Thành phố',
    },

    dn_labels: {
      dawn: 'Bình Minh', morning: 'Buổi Sáng', afternoon: 'Buổi Chiều',
      evening: 'Buổi Tối', night: 'Ban Đêm',
    },

    home_badge: '🌍 50K+ phiên học · Miễn phí · Không cần đăng ký',
    home_h1_prefix: 'Phòng Học Online',
    home_h1_accent: 'Miễn Phí Của Bạn',
    home_desc: 'Nhạc lofi, bộ trộn âm thanh nền, hẹn giờ Pomodoro, danh sách việc cần làm và điểm XP — tất cả trong một workspace đẹp. Nhúng vào Notion hoặc dùng độc lập.',
    home_cta_open: 'Mở Workspace →',
    home_cta_scenes: 'Xem Scenes',
    home_cta_tagline: 'Không cần tài khoản · Miễn phí mãi mãi · Nhúng vào Notion, blog & bất kỳ website nào',

    home_rooms_h2: 'Phòng Học Được Thiết Kế Sẵn',
    home_rooms_desc: 'Mở workspace được tuyển chọn chỉ với một click — bao gồm nhạc, âm thanh và hình nền.',
    home_room_labels: ['Phòng Học Online', 'Phòng Học Anime', 'Phòng Lập Trình', 'Phòng Tập Trung', 'Phòng Làm Việc Sâu'],

    home_feat_h2: 'Mọi Thứ Bạn Cần Để Tập Trung',
    home_feat_desc: 'Workspace năng suất đầy đủ trong một tab trình duyệt.',
    home_feat_items: [
      { emoji: '🎵', title: 'Trình Phát Nhạc Lofi', desc: 'Stream lofi được tuyển chọn — jazz hop, synthwave, chill beats. Không quảng cáo.' },
      { emoji: '🌧️', title: 'Bộ Trộn Âm Thanh Nền', desc: 'Kết hợp mưa, quán cafe, lửa trại, gió. Tạo không gian âm thanh hoàn hảo.' },
      { emoji: '🍅', title: 'Hẹn Giờ Pomodoro', desc: 'Hẹn giờ 25/5 tích hợp sẵn. Kiếm XP sau mỗi phiên hoàn thành.' },
      { emoji: '✅', title: 'Danh Sách Việc Cần Làm', desc: 'Thêm nhiệm vụ, đánh dấu hoàn thành. Tự động ghi vào lịch.' },
      { emoji: '⭐', title: 'XP & Thành Tích', desc: 'Lên cấp với mỗi Pomodoro. Mở khóa thành tích và duy trì chuỗi ngày.' },
      { emoji: '🌤️', title: 'Widget Thời Tiết', desc: 'Thời tiết trực tiếp theo thành phố. Cảnh nền thích nghi theo điều kiện thực tế.' },
      { emoji: '🎭', title: '15+ Scene Học Tập', desc: 'Tokyo Café Rain, Midnight Coding, Cozy Cabin và nhiều hơn — một click.' },
      { emoji: '🐱', title: 'Mèo Đồng Hành', desc: 'Người bạn hoạt hình học cùng bạn. Có thể kéo và thay đổi kích thước.' },
    ],

    home_steps_h2: 'Bắt Đầu Trong 30 Giây',
    home_steps: [
      { n: '1', title: 'Mở Workspace', desc: 'Không tài khoản. Không tải về. Click nút — xong.' },
      { n: '2', title: 'Chọn Không Khí', desc: 'Chọn cảnh có sẵn hoặc tự tạo âm thanh và hình nền riêng.' },
      { n: '3', title: 'Bắt Đầu Hẹn Giờ', desc: 'Nhấn Bắt đầu Pomodoro. Tập trung 25 phút. Kiếm XP.' },
    ],

    home_blog_h2: 'Từ Blog',
    home_blog_all: 'Tất cả bài viết →',

    home_faq_h2: 'Câu Hỏi Thường Gặp',
    home_faq: [
      { q: 'LofiSpace có miễn phí không?', a: 'Có, hoàn toàn miễn phí. Không tài khoản, không gói đăng ký, không chi phí ẩn. Mở workspace và bắt đầu ngay.' },
      { q: 'Tôi có thể nhúng workspace vào Notion không?', a: 'Có. Tùy chỉnh workspace, sao chép URL và dán vào block /embed của Notion. Toàn bộ cài đặt — nhạc, âm thanh, hình nền — được mã hóa trong URL.' },
      { q: 'Hoạt động trên thiết bị nào?', a: 'LofiSpace hoạt động trên trình duyệt máy tính, tablet và điện thoại. Tất cả widget đều hỗ trợ cảm ứng và bố cục thích nghi theo màn hình.' },
      { q: 'Hệ thống XP hoạt động như thế nào?', a: 'Bạn kiếm XP bằng cách hoàn thành phiên Pomodoro (25 XP mỗi phiên). XP lấp đầy thanh cấp độ — đạt ngưỡng để lên cấp. Thành tích mở khóa theo mốc chuỗi ngày và số phiên.' },
      { q: 'Tôi có thể chia sẻ cài đặt workspace không?', a: 'Có. URL workspace mã hóa tất cả cài đặt. Sao chép link từ thanh địa chỉ và bất kỳ ai cũng mở được đúng cấu hình của bạn.' },
      { q: 'Tổ hợp âm thanh nào tốt nhất để học?', a: 'Cổ điển: Nhạc Lofi ở 60% + Mưa ở 40% + Tiếng quán cafe ở 25%. Thử nghiệm trong bộ trộn âm thanh để tìm ra mix lý tưởng.' },
    ],

    home_cta2_h2: 'Sẵn sàng học thông minh hơn?',
    home_cta2_desc: 'Hàng ngàn học sinh và lập trình viên đang dùng LofiSpace mỗi ngày.',
    home_cta2_btn: 'Mở Workspace Miễn Phí →',
    home_cta2_tagline: 'Không tài khoản · Không thanh toán · Miễn phí mãi',
  },
}
