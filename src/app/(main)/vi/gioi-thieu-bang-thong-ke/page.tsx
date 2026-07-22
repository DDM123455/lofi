import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Giới Thiệu Bảng Thống Kê Tập Trung — Xem Thời Gian, Streak Và Thói Quen',
  description:
    'Bảng thống kê tập trung miễn phí: tổng thời gian tập trung hôm nay, streak hiện tại, biểu đồ Pomodoro theo tuần, bản đồ nhiệt 90 ngày và các task chiếm nhiều thời gian nhất. Không cần đăng ký.',
  keywords: [
    'bảng thống kê tập trung', 'dashboard năng suất', 'dashboard pomodoro', 'theo dõi thời gian tập trung',
    'thống kê học tập', 'phân tích thói quen tập trung', 'theo dõi phiên làm việc',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/gioi-thieu-bang-thong-ke',
    languages: {
      en: 'https://www.focusworkspace.app/focus-dashboard',
      vi: 'https://www.focusworkspace.app/vi/gioi-thieu-bang-thong-ke',
      'x-default': 'https://www.focusworkspace.app/focus-dashboard',
    },
  },
  openGraph: {
    title: 'Giới Thiệu Bảng Thống Kê Tập Trung — LofiSpace',
    description: 'Thời gian tập trung hôm nay, streak, biểu đồ tuần, bản đồ nhiệt và các task chiếm nhiều thời gian nhất. Miễn phí, không cần đăng ký.',
    url: 'https://www.focusworkspace.app/vi/gioi-thieu-bang-thong-ke',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới Thiệu Bảng Thống Kê Tập Trung — LofiSpace',
    description: 'Thời gian tập trung hôm nay, streak, biểu đồ tuần, bản đồ nhiệt và các task chiếm nhiều thời gian nhất. Miễn phí, không cần đăng ký.',
  },
}

const FAQ = [
  {
    q: 'Bảng thống kê tập trung hiển thị chính xác những gì?',
    a: 'Tổng thời gian tập trung và số Pomodoro hôm nay, streak hiện tại và streak dài nhất, biểu đồ cột 7 ngày, bản đồ nhiệt 90 ngày, các task xếp hạng theo thời gian tập trung, và danh sách các phiên gần đây.',
  },
  {
    q: 'Dữ liệu này lấy từ đâu?',
    a: 'Mỗi Pomodoro bạn hoàn thành trong workspace của LofiSpace (hoặc một widget nhúng) đều được lưu tự động — không có gì cần bật thêm.',
  },
  {
    q: 'Dữ liệu của tôi có riêng tư không?',
    a: 'Có. Mọi thứ được lưu trong bộ nhớ cục bộ (local storage) của trình duyệt bạn đang dùng. Không có gì được gửi lên server, và không cần tài khoản để xem.',
  },
  {
    q: 'Có xem được thống kê cho từng task riêng lẻ không?',
    a: 'Có — gắn một việc cần làm vào phiên Pomodoro đang chạy, và mục Top Tasks trên bảng thống kê sẽ xếp hạng nó theo tổng số Pomodoro và thời gian tập trung.',
  },
]

const FEATURES = [
  { emoji: '⏱️', label: 'Tổng thời gian tập trung & số phiên hôm nay' },
  { emoji: '🔥', label: 'Streak hiện tại + kỷ lục mọi thời điểm' },
  { emoji: '📊', label: 'Biểu đồ cột Pomodoro 7 ngày' },
  { emoji: '🟪', label: 'Bản đồ nhiệt tập trung 90 ngày' },
  { emoji: '✅', label: 'Xếp hạng task theo thời gian tập trung' },
  { emoji: '🕐', label: 'Lịch sử các phiên gần đây' },
]

export default function GioiThieuBangThongKePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Giới Thiệu Bảng Thống Kê', url: 'https://www.focusworkspace.app/vi/gioi-thieu-bang-thong-ke' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Bảng Thống Kê Tập Trung"
        description="Một bảng thống kê tập trung miễn phí với streak, biểu đồ tuần, bản đồ nhiệt và xếp hạng task."
        url="https://www.focusworkspace.app/vi/gioi-thieu-bang-thong-ke"
        applicationCategory="ProductivityApplication"
        keywords={['bảng thống kê tập trung', 'dashboard năng suất', 'theo dõi thời gian tập trung']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Giới Thiệu Bảng Thống Kê', url: 'https://www.focusworkspace.app/vi/gioi-thieu-bang-thong-ke' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📊 Miễn phí · Không cần đăng ký · Lưu cục bộ
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Bảng <span className="text-violet-400">Thống Kê Tập Trung</span> Của Bạn
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Mỗi Pomodoro bạn hoàn thành đều trở thành dữ liệu: hôm nay bạn tập trung bao lâu,
            streak của bạn dài bao nhiêu ngày, và task nào thực sự chiếm nhiều thời gian nhất.
            Xem tất cả ở một nơi duy nhất.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Mở Bảng Thống Kê →
            </Link>
            <Link
              href="/workspace?pom=1"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Bắt Đầu Một Phiên Trước
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Những Gì Có Trên Bảng Thống Kê</h2>
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
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Cần Một Bảng Thống Kê Thay Vì Chỉ Một Đồng Hồ</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Một đồng hồ chỉ cho bạn biết một phiên diễn ra thế nào. Một bảng thống kê cho bạn
              biết cả quy luật — liệu tuần này bạn có thực sự tập trung nhiều hơn tuần trước
              không, streak của bạn có đang giữ vững không, và task nào đang âm thầm chiếm phần
              lớn thời gian của bạn.
            </p>
            <p>
              Bản đồ nhiệt đặc biệt làm rõ những khoảng trống mà một con số đếm hàng ngày không
              làm được: một chuỗi ô trống nổi bật ngay lập tức, giống hệt cách nó hiển thị trên
              một habit tracker hay biểu đồ đóng góp GitHub.
            </p>
            <p>
              Vì bảng thống kê đọc trực tiếp từ chính lịch sử phiên mà đồng hồ Pomodoro của bạn
              đã ghi lại, không có bước theo dõi riêng nào cả — nó chỉ là một góc nhìn trên những
              gì bạn vốn đã làm.
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
          <h2 className="mb-3 text-2xl font-bold text-white">Xem thời gian tập trung của bạn đi về đâu</h2>
          <p className="mb-6 text-white/55">Một cú nhấp, và mọi thứ bạn đã làm đã được theo dõi sẵn.</p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Mở Bảng Thống Kê Tập Trung →
          </Link>
        </div>

        <RelatedPages exclude="/focus-dashboard" />
      </div>
    </>
  )
}
