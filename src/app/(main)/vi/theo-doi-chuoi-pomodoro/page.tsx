import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Theo Dõi Chuỗi Ngày Pomodoro — Streak & Bản Đồ Nhiệt Tập Trung',
  description:
    'Theo dõi chuỗi ngày Pomodoro liên tục với bảng thống kê miễn phí: streak hiện tại, streak dài nhất, tiến độ theo tuần và bản đồ nhiệt 90 ngày. Không cần đăng ký.',
  keywords: [
    'theo dõi chuỗi pomodoro', 'streak pomodoro', 'chuỗi ngày học tập', 'bản đồ nhiệt pomodoro',
    'streak tập trung hàng ngày', 'theo dõi thói quen học tập', 'pomodoro streak tiếng việt',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro',
    languages: {
      en: 'https://www.focusworkspace.app/pomodoro-streak-tracker',
      vi: 'https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro',
      'x-default': 'https://www.focusworkspace.app/pomodoro-streak-tracker',
    },
  },
  openGraph: {
    title: 'Theo Dõi Chuỗi Ngày Pomodoro — LofiSpace',
    description: 'Streak hiện tại, streak dài nhất, tiến độ theo tuần và bản đồ nhiệt tập trung 90 ngày. Miễn phí.',
    url: 'https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theo Dõi Chuỗi Ngày Pomodoro — LofiSpace',
    description: 'Streak hiện tại, streak dài nhất, tiến độ theo tuần và bản đồ nhiệt tập trung 90 ngày. Miễn phí.',
  },
}

const FAQ = [
  {
    q: 'Chuỗi ngày Pomodoro (streak) hoạt động như thế nào?',
    a: 'Streak của bạn tăng thêm một mỗi ngày dương lịch mà bạn hoàn thành ít nhất một phiên Pomodoro. Nếu bỏ lỡ trọn một ngày, streak sẽ reset về 0 vào lần bắt đầu phiên tiếp theo.',
  },
  {
    q: 'Xem streak của mình ở đâu?',
    a: 'Mở Focus Dashboard miễn phí — nơi hiển thị streak hiện tại, streak dài nhất từ trước tới nay, biểu đồ cột 7 ngày và bản đồ nhiệt 90 ngày cho mọi phiên bạn đã ghi nhận.',
  },
  {
    q: 'Có cần tạo tài khoản để theo dõi streak không?',
    a: 'Không. Mọi thứ được lưu cục bộ ngay trên trình duyệt của bạn. Không có gì để đăng ký và không có dữ liệu nào được đồng bộ lên server.',
  },
  {
    q: 'Nếu đổi thiết bị hoặc trình duyệt thì sao?',
    a: 'Dữ liệu streak nằm trong bộ nhớ cục bộ (local storage) của trình duyệt đó, nên sẽ không theo bạn sang thiết bị khác. Hãy dùng cố định một trình duyệt nếu muốn giữ lịch sử streak liên tục.',
  },
  {
    q: 'Có thể xem mình dành nhiều thời gian nhất cho việc nào không?',
    a: 'Có — mục Top Tasks trên bảng thống kê xếp hạng các công việc bạn đã gắn theo tổng thời gian tập trung và số Pomodoro đã hoàn thành.',
  },
]

const FEATURES = [
  { emoji: '🔥', label: 'Streak hiện tại + streak dài nhất mọi thời điểm' },
  { emoji: '📊', label: 'Biểu đồ cột Pomodoro 7 ngày' },
  { emoji: '🟪', label: 'Bản đồ nhiệt tập trung 90 ngày kiểu GitHub' },
  { emoji: '✅', label: 'Xếp hạng công việc theo thời gian tập trung' },
  { emoji: '🕐', label: 'Lịch sử các phiên gần đây' },
  { emoji: '🔒', label: 'Riêng tư — chỉ lưu trên thiết bị của bạn' },
]

export default function TheoDoiChuoiPomodoroPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=45&ls=lofi1&lv=60&at=rain:30&pom=1&clk=1&ac=fb923c'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Theo Dõi Chuỗi Ngày Pomodoro', url: 'https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Theo Dõi Chuỗi Ngày Pomodoro"
        description="Công cụ theo dõi streak Pomodoro miễn phí với biểu đồ tuần, bản đồ nhiệt 90 ngày và xếp hạng công việc."
        url="https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro"
        applicationCategory="ProductivityApplication"
        keywords={['theo dõi chuỗi pomodoro', 'streak tập trung', 'chuỗi ngày học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Theo Dõi Chuỗi Ngày Pomodoro', url: 'https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-orange-900/30 px-4 py-1 text-sm text-orange-300 ring-1 ring-orange-500/20">
            🔥 Streak · Bản đồ nhiệt · Không cần đăng ký
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Theo Dõi <span className="text-orange-400">Chuỗi Ngày Pomodoro</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Mỗi phiên tập trung bạn hoàn thành đều nối dài thêm streak. Theo dõi trên một bảng
            thống kê miễn phí với biểu đồ tuần, bản đồ nhiệt 90 ngày và những công việc bạn dành
            nhiều thời gian nhất — tất cả lưu ngay trên thiết bị của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-500 transition-colors"
            >
              Mở Bảng Thống Kê →
            </Link>
            <Link
              href={workspaceUrl}
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Bắt Đầu Một Pomodoro Trước
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Bảng Thống Kê Theo Dõi Những Gì</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-orange-500/15 bg-orange-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Streak Có Hiệu Quả</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Một streak biến suy nghĩ &ldquo;hôm nay nên tập trung&rdquo; thành &ldquo;mình không muốn làm đứt
              chuỗi.&rdquo; Đó là một hình thức tự chịu trách nhiệm nhỏ, không cần ai giám sát — chỉ cần
              một con số hiển thị tăng lên khi bạn thực sự làm, và về 0 khi bạn không làm.
            </p>
            <p>
              Bản đồ nhiệt giúp bạn nhìn thấy quy luật đó ngay lập tức: một mảng ô màu đậm cho
              biết chính xác tuần nào bạn làm việc hiệu quả, tuần nào bị đứt quãng — giống hệt
              cách một habit tracker hay biểu đồ đóng góp trên GitHub hoạt động.
            </p>
            <p>
              Vì bảng thống kê này gắn liền với chính bộ đếm Pomodoro bạn đã dùng trong workspace,
              không có gì cần thiết lập thêm — streak của bạn bắt đầu tính ngay từ phiên đầu tiên
              hoàn thành.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-orange-900/30 to-amber-900/20 border border-orange-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Đừng để đứt chuỗi</h2>
          <p className="mb-6 text-white/55">Kiểm tra streak của bạn, hoặc bắt đầu ngay phiên Pomodoro hôm nay.</p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-orange-600 px-10 py-3 font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            Xem Bảng Thống Kê →
          </Link>
        </div>

        <PomodoroCompare exclude="/pomodoro-streak-tracker" lang="vi" />

        <RelatedPages exclude="/pomodoro-streak-tracker" />
      </div>
    </>
  )
}
