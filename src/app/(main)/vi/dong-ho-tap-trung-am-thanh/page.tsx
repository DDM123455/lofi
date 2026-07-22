import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Đồng Hồ Tập Trung Với Âm Thanh Nền — Pomodoro Kết Hợp Âm Thanh Đa Lớp',
  description:
    'Đồng hồ tập trung xây quanh âm thanh nền — mưa, rừng, quán cà phê, lửa trại, sấm sét — kết hợp cùng chu kỳ Pomodoro. Cho công việc, không chỉ học tập. Miễn phí.',
  keywords: [
    'đồng hồ tập trung âm thanh', 'âm thanh nền tập trung', 'timer âm thanh nền', 'pomodoro âm thanh',
    'đồng hồ làm việc tập trung', 'âm thanh trắng tập trung', 'deep work timer tiếng việt',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh',
    languages: {
      en: 'https://www.focusworkspace.app/ambient-focus-timer',
      vi: 'https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh',
      'x-default': 'https://www.focusworkspace.app/ambient-focus-timer',
    },
  },
  openGraph: {
    title: 'Đồng Hồ Tập Trung Với Âm Thanh Nền — LofiSpace',
    description: 'Kết hợp mưa, rừng, quán cà phê hoặc lửa trại cùng chu kỳ Pomodoro, xây riêng cho công việc.',
    url: 'https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đồng Hồ Tập Trung Với Âm Thanh Nền — LofiSpace',
    description: 'Kết hợp mưa, rừng, quán cà phê hoặc lửa trại cùng chu kỳ Pomodoro, xây riêng cho công việc.',
  },
}

const FAQ = [
  {
    q: 'Có những âm thanh nền nào để chọn?',
    a: 'Mưa, sóng biển, tiếng người trò chuyện ở quán cà phê, lửa trại, gió, sấm sét, rừng và âm thanh thành phố — mỗi loại có thanh chỉnh âm lượng riêng để bạn kết hợp nhiều lớp cùng lúc.',
  },
  {
    q: 'Trang này có chỉ dành cho người thích nhạc lofi không?',
    a: 'Không — kênh nhạc lofi hoàn toàn là tuỳ chọn. Bạn có thể chạy đồng hồ Pomodoro chỉ với âm thanh nền, không cần nhạc, điều mà nhiều người thấy hợp hơn khi làm việc và cảm thấy nhạc gây xao nhãng.',
  },
  {
    q: 'Có thể dùng cho các phiên deep work dài hơn, không chỉ Pomodoro 25 phút?',
    a: 'Được. Đặt thời lượng tập trung dài hơn qua công cụ tạo embed, hoặc đơn giản là để đồng hồ chạy tiếp qua một chu kỳ 25 phút — âm thanh nền vẫn phát liên tục xuyên suốt.',
  },
  {
    q: 'Âm thanh nền có thực sự giúp tập trung không?',
    a: 'Tiếng ồn nền ổn định giúp che đi những âm thanh đột ngột dễ gây chú ý — tiếng cửa đóng, tiếng thông báo, ai đó nói chuyện gần đó — thứ thường phá vỡ sự tập trung hơn cả sự im lặng.',
  },
]

const FEATURES = [
  { emoji: '🌧️', label: '8 lớp âm thanh nền, chỉnh âm lượng độc lập' },
  { emoji: '🍅', label: 'Chu kỳ Pomodoro với thời lượng tuỳ chỉnh' },
  { emoji: '🎵', label: 'Nhạc lofi tuỳ chọn — không bắt buộc' },
  { emoji: '🔥', label: 'Streak + bản đồ nhiệt trên Focus Dashboard' },
  { emoji: '🖥️', label: 'Dùng được cho công việc văn phòng, không chỉ học tập' },
  { emoji: '🔗', label: 'Lưu đúng tổ hợp âm thanh của bạn qua link chia sẻ' },
]

export default function DongHoTapTrungAmThanhPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/forest.mp4') +
    '&bgo=35&ls=lofi1&lv=40&at=forest:50,rain:30,wind:20&pom=1&clk=1&ac=34d399'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Đồng Hồ Tập Trung Với Âm Thanh', url: 'https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Đồng Hồ Tập Trung Với Âm Thanh Nền"
        description="Đồng hồ Pomodoro xây quanh âm thanh nền đa lớp cho công việc và học tập."
        url="https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh"
        applicationCategory="ProductivityApplication"
        keywords={['đồng hồ tập trung âm thanh', 'âm thanh nền tập trung', 'deep work timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Đồng Hồ Tập Trung Với Âm Thanh', url: 'https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-900/30 px-4 py-1 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
            🌿 Âm thanh nền · Nhạc tuỳ chọn · Timer tuỳ chỉnh
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Đồng Hồ <span className="text-emerald-400">Tập Trung Với Âm Thanh</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Mưa, rừng, quán cà phê, lửa trại, sấm sét — kết hợp bất kỳ tổ hợp âm thanh nền nào
            cùng đồng hồ Pomodoro. Nhạc là tuỳ chọn. Xây dựng cho công việc cũng như học tập.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-colors"
            >
              Bắt Đầu Tập Trung →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Âm Thanh
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Xây Dựng Quanh Âm Thanh, Không Phải Sự Im Lặng</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-emerald-500/15 bg-emerald-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Lại Là Âm Thanh Nền, Cụ Thể</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Hầu hết các app đồng hồ tập trung mặc định dùng nhạc. Một số người thấy nhạc — kể cả
              lofi — kéo sự chú ý đi thay vì giữ nó lại, nhất là khi viết hoặc làm việc phân tích
              chi tiết. Âm thanh nền tạo ra một nền âm ổn định mà không có giai điệu cạnh tranh sự
              chú ý của bạn.
            </p>
            <p>
              Việc kết hợp nhiều lớp cũng quan trọng: một âm thanh đơn lẻ (như chỉ có mưa) có thể
              trở nên đơn điệu trong một phiên dài, trong khi hai hoặc ba lớp chồng lên nhau ở âm
              lượng thấp — chẳng hạn tiếng rừng cộng thêm chút gió — cho cảm giác gần với một môi
              trường thực và đa dạng hơn.
            </p>
            <p>
              Chu kỳ Pomodoro giữ cho các phiên có cấu trúc rõ ràng, nhưng tổ hợp âm thanh nền
              không bị reset giữa lúc tập trung và nghỉ — nên môi trường âm thanh vẫn liên tục
              ngay cả khi đồng hồ chuyển giai đoạn.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Câu Hỏi Thường Gặp</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{q}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Xây tổ hợp âm thanh của riêng bạn</h2>
          <p className="mb-6 text-white/55">Chọn âm thanh, đặt giờ, và bắt tay vào việc.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-emerald-600 px-10 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Mở Đồng Hồ Tập Trung — Miễn Phí →
          </Link>
        </div>

        <PomodoroCompare exclude="/ambient-focus-timer" lang="vi" />

        <RelatedPages exclude="/ambient-focus-timer" />
      </div>
    </>
  )
}
