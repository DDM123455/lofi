import Link from 'next/link'

interface ClusterItem {
  enHref: string
  viHref: string
  emoji: string
  enLabel: string
  viLabel: string
  enDesc: string
  viDesc: string
}

const CLUSTER: ClusterItem[] = [
  {
    enHref: '/pomodoro-timer', viHref: '/vi/dong-ho-pomodoro', emoji: '⏱️',
    enLabel: 'Pomodoro Timer', viLabel: 'Đồng Hồ Pomodoro',
    enDesc: 'The core timer — start here for a straightforward 25/5 Pomodoro clock.',
    viDesc: 'Đồng hồ Pomodoro cơ bản — bắt đầu ở đây nếu bạn chỉ cần đồng hồ 25/5 đơn giản.',
  },
  {
    enHref: '/lofi-pomodoro', viHref: '/vi/dong-ho-lofi-pomodoro', emoji: '🎧',
    enLabel: 'Lofi Pomodoro', viLabel: 'Lofi Pomodoro',
    enDesc: 'Lofi music mixed directly into the timer widget, not a separate tab.',
    viDesc: 'Nhạc lofi tích hợp sẵn trong widget đồng hồ, không cần mở tab riêng.',
  },
  {
    enHref: '/notion-pomodoro-widget', viHref: '/vi/widget-pomodoro-notion', emoji: '📝',
    enLabel: 'Notion Pomodoro Widget', viLabel: 'Widget Pomodoro Notion',
    enDesc: 'Embed a real, running timer directly inside a Notion page.',
    viDesc: 'Nhúng một đồng hồ thật, chạy thật ngay trong trang Notion.',
  },
  {
    enHref: '/pomodoro-streak-tracker', viHref: '/vi/theo-doi-chuoi-pomodoro', emoji: '🔥',
    enLabel: 'Pomodoro Streak Tracker', viLabel: 'Theo Dõi Chuỗi Pomodoro',
    enDesc: 'Daily streaks, a weekly chart and a 90-day focus heatmap.',
    viDesc: 'Chuỗi ngày liên tục, biểu đồ tuần và bản đồ nhiệt 90 ngày.',
  },
  {
    enHref: '/ambient-focus-timer', viHref: '/vi/dong-ho-tap-trung-am-thanh', emoji: '🌿',
    enLabel: 'Ambient Focus Timer', viLabel: 'Đồng Hồ Tập Trung Âm Thanh',
    enDesc: 'Ambient sound first, music optional — built for work, not just study.',
    viDesc: 'Âm thanh nền là chính, nhạc chỉ là tuỳ chọn — dành cho công việc, không chỉ học tập.',
  },
  {
    enHref: '/lofi-timer-for-studying', viHref: '/vi/dong-ho-lofi-hoc-bai', emoji: '📚',
    enLabel: 'Lofi Timer for Studying', viLabel: 'Đồng Hồ Lofi Học Bài',
    enDesc: 'Built for students — link tasks to sessions, track time per subject.',
    viDesc: 'Dành cho học sinh, sinh viên — gắn task theo từng môn học để theo dõi thời gian.',
  },
]

interface Props {
  /** English href of the current page, used both to exclude it and to match language pairs regardless of which language the current page is in. */
  exclude: string
  lang?: 'en' | 'vi'
}

export function PomodoroCompare({ exclude, lang = 'en' }: Props) {
  const items = CLUSTER.filter(c => c.enHref !== exclude)
  const heading = lang === 'vi' ? 'So Sánh Các Đồng Hồ Pomodoro Khác' : 'Compare the Other Pomodoro Timers'
  const sub = lang === 'vi'
    ? 'Cùng là đồng hồ Pomodoro nhưng mỗi trang tối ưu cho một nhu cầu khác nhau — chọn đúng trang cho việc bạn đang làm.'
    : 'All Pomodoro timers, each tuned for a different need — pick the one that matches what you’re doing.'

  return (
    <section className="mb-16 rounded-2xl border border-white/8 bg-white/3 p-6">
      <h2 className="mb-1 text-center text-lg font-bold text-white">{heading}</h2>
      <p className="mb-6 text-center text-xs text-white/40">{sub}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(item => (
          <Link
            key={item.enHref}
            href={lang === 'vi' ? item.viHref : item.enHref}
            className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 p-4 hover:border-violet-500/30 hover:bg-white/6 transition-all"
          >
            <span className="text-xl">{item.emoji}</span>
            <div>
              <p className="font-semibold text-white text-sm">{lang === 'vi' ? item.viLabel : item.enLabel}</p>
              <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{lang === 'vi' ? item.viDesc : item.enDesc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
