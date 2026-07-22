import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Đồng Hồ Lofi Pomodoro — Nhạc Lofi Tích Hợp Sẵn Trong Bộ Đếm Giờ',
  description:
    'Đồng hồ Pomodoro có nhạc lofi phát ngay trong widget, không cần mở tab riêng. Chu kỳ 25 phút, lớp âm thanh nền, XP và streak — miễn phí, không cần đăng ký.',
  keywords: [
    'đồng hồ lofi pomodoro', 'pomodoro nhạc lofi', 'lofi pomodoro tiếng việt', 'đếm giờ học lofi',
    'pomodoro lofi hip hop', 'timer tập trung lofi', 'lofi girl pomodoro',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro',
    languages: {
      en: 'https://www.focusworkspace.app/lofi-pomodoro',
      vi: 'https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro',
      'x-default': 'https://www.focusworkspace.app/lofi-pomodoro',
    },
  },
  openGraph: {
    title: 'Đồng Hồ Lofi Pomodoro — LofiSpace',
    description: 'Chu kỳ tập trung 25 phút với nhạc lofi tích hợp thẳng trong widget, không phải tab riêng.',
    url: 'https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đồng Hồ Lofi Pomodoro — LofiSpace',
    description: 'Chu kỳ tập trung 25 phút với nhạc lofi tích hợp thẳng trong widget, không phải tab riêng.',
  },
}

const FAQ = [
  {
    q: 'Khác gì so với một đồng hồ Pomodoro thông thường?',
    a: 'Hầu hết đồng hồ Pomodoro chỉ đếm giờ trong im lặng, bạn phải tự mở nhạc ở một tab khác. LofiSpace phát nhạc lofi và âm thanh nền ngay trong cùng widget với bộ đếm — bấm bắt đầu phiên là nhạc cũng bắt đầu luôn, không cần thao tác thêm.',
  },
  {
    q: 'Có thể tắt nhạc, chỉ dùng đồng hồ đếm giờ thôi không?',
    a: 'Được. Kênh lofi và từng lớp âm thanh nền đều có thanh chỉnh âm lượng riêng, kéo về 0 là tắt hẳn — bạn hoàn toàn có thể chạy một phiên Pomodoro im lặng nếu muốn.',
  },
  {
    q: 'Có những kênh nhạc lofi nào để chọn?',
    a: 'Một danh sách xoay vòng gồm các kênh lofi hip-hop và synthwave được tuyển chọn sẵn, ngoài ra bạn cũng có thể dán link YouTube lofi của riêng mình vào.',
  },
  {
    q: 'Hoàn thành một phiên Pomodoro thì được gì ngoài giờ nghỉ?',
    a: 'Bạn được cộng XP, streak trong ngày được nối dài, và nếu đang mở Focus Dashboard miễn phí, phiên đó cũng được thêm vào lịch sử và bản đồ nhiệt tập trung của bạn.',
  },
  {
    q: 'Có thể gắn Pomodoro với một công việc cụ thể không?',
    a: 'Có. Gắn một task đang làm vào phiên Pomodoro, mỗi lần hoàn thành số Pomodoro của task đó sẽ tự tăng lên — tiện để biết mình đã dành bao nhiêu phiên cho từng việc.',
  },
  {
    q: 'Đồng hồ Lofi Pomodoro này có mất phí không?',
    a: 'Không. Toàn bộ nhạc lofi, âm thanh nền, bộ đếm Pomodoro và hệ thống XP/streak đều miễn phí hoàn toàn, không giới hạn số phiên mỗi ngày.',
  },
]

const FEATURES = [
  { emoji: '🎧', label: 'Nhạc lofi phát liên tục, không cần mở tab riêng' },
  { emoji: '🍅', label: 'Chu kỳ Pomodoro 25/5 với vòng tiến trình trực quan' },
  { emoji: '🌧️', label: 'Thêm lớp tiếng mưa, quán cà phê hoặc đĩa than' },
  { emoji: '🔥', label: 'XP, streak và bản đồ nhiệt tập trung' },
  { emoji: '✅', label: 'Gắn task để tự động theo dõi Pomodoro theo từng việc' },
  { emoji: '🔗', label: 'Chia sẻ đúng thiết lập của bạn qua URL' },
]

export default function DongHoLofiPomodoroPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/lofi-bedroom.mp4') +
    '&bgo=40&ls=lofi1&lv=65&at=rain:35&pom=1&clk=1&ac=a78bfa'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Đồng Hồ Lofi Pomodoro', url: 'https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Đồng Hồ Lofi Pomodoro"
        description="Đồng hồ Pomodoro với nhạc lofi và âm thanh nền tích hợp trực tiếp trong widget."
        url="https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro"
        applicationCategory="ProductivityApplication"
        keywords={['đồng hồ lofi pomodoro', 'pomodoro nhạc lofi', 'lofi study timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Đồng Hồ Lofi Pomodoro', url: 'https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🎧 Lofi + Pomodoro, trong một widget
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Đồng Hồ <span className="text-violet-400">Lofi Pomodoro</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một đồng hồ Pomodoro tự bật nhạc lofi cùng lúc, thay vì bắt bạn mở thêm một tab
            khác. Phiên 25 phút, lớp âm thanh nền, XP và streak — miễn phí trọn đời.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Bắt Đầu Lofi Pomodoro →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Dashboard Của Tôi
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Điểm Khác Biệt</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Lofi Và Pomodoro Nên Đi Cùng Nhau</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Kỹ thuật Pomodoro cấu trúc thời gian của bạn; nhạc lofi cấu trúc sự chú ý. Nhịp
              điệu đều đặn và không lời của lofi tạo ra một nền âm thanh ổn định thay vì sự im
              lặng — điều mà nhiều người thấy khó duy trì tập trung hơn là có tiếng động nhẹ nhàng.
            </p>
            <p>
              Tách riêng nhạc và bộ đếm giờ ra hai ứng dụng khác nhau nghĩa là bạn phải chuẩn bị
              thêm một bước trước khi thực sự bắt đầu làm việc, và mỗi lần phải chuyển bài hay mở
              lại stream cũng là một lần bị ngắt mạch tập trung. LofiSpace giữ nhạc và đồng hồ
              trong cùng một trạng thái phiên, nên chỉ cần bấm play là cả hai cùng chạy.
            </p>
            <p>
              Mỗi Pomodoro hoàn thành cũng được cộng vào streak và Focus Dashboard miễn phí, để
              những phiên lofi bạn đã và đang làm dần trở thành một thói quen nhìn thấy được.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/30 to-fuchsia-900/20 border border-violet-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng cho một giờ tập trung?</h2>
          <p className="mb-6 text-white/55">Bấm play và để đồng hồ cùng nhạc chạy song song.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Mở Lofi Pomodoro — Miễn Phí →
          </Link>
        </div>

        <PomodoroCompare exclude="/lofi-pomodoro" lang="vi" />

        <RelatedPages exclude="/lofi-pomodoro" />
      </div>
    </>
  )
}
