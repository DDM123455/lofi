import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Bảng Thống Kê Học Tập — Theo Dõi Chuỗi Ngày Tập Trung',
  description:
    'Theo dõi thời gian tập trung mỗi ngày, chuỗi ngày Pomodoro, tiến độ theo tuần và bản đồ nhiệt 90 ngày. Hoàn toàn miễn phí, không cần đăng ký, lưu ngay trên thiết bị.',
  keywords: [
    'bảng thống kê học tập', 'theo dõi chuỗi ngày pomodoro', 'thống kê pomodoro',
    'heatmap tập trung', 'theo dõi thời gian học', 'dashboard năng suất',
    'chuỗi ngày học tập', 'thống kê thời gian tập trung',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap',
    languages: {
      en: 'https://www.focusworkspace.app/dashboard',
      vi: 'https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap',
      'x-default': 'https://www.focusworkspace.app/dashboard',
    },
  },
  openGraph: {
    title: 'Bảng Thống Kê Học Tập — Theo Dõi Chuỗi Ngày Tập Trung | LofiSpace',
    description: 'Theo dõi thời gian tập trung, chuỗi ngày, tiến độ theo tuần và bản đồ nhiệt tập trung. Miễn phí, không đăng ký.',
    url: 'https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bảng Thống Kê Học Tập — Theo Dõi Chuỗi Ngày Tập Trung',
    description: 'Theo dõi thời gian tập trung, chuỗi ngày và bản đồ nhiệt 90 ngày. Miễn phí, không đăng ký.',
  },
}

const FEATURES = [
  { emoji: '⏱️', title: 'Thời Gian Tập Trung Hôm Nay', desc: 'Tổng thời gian và số Pomodoro bạn đã hoàn thành trong ngày, cập nhật ngay sau mỗi phiên.' },
  { emoji: '🔥', title: 'Chuỗi Ngày Hiện Tại & Kỷ Lục', desc: 'Chuỗi ngày liên tục hoàn thành ít nhất một Pomodoro, cùng kỷ lục chuỗi dài nhất bạn từng đạt được.' },
  { emoji: '📊', title: 'Tiến Độ Theo Tuần', desc: 'Biểu đồ cột thể hiện số Pomodoro hoàn thành từng ngày trong 7 ngày gần nhất — dễ dàng thấy ngày nào bạn tập trung tốt nhất.' },
  { emoji: '🗓️', title: 'Bản Đồ Nhiệt 90 Ngày', desc: 'Lưới ô vuông kiểu GitHub — ô càng đậm màu nghĩa là bạn hoàn thành càng nhiều Pomodoro trong ngày đó.' },
  { emoji: '📌', title: 'Công Việc Tập Trung Nhiều Nhất', desc: 'Xếp hạng các công việc bạn đã gắn với Pomodoro theo tổng thời gian tập trung đã bỏ ra.' },
  { emoji: '🕓', title: 'Lịch Sử Phiên Gần Đây', desc: 'Danh sách 10 phiên tập trung gần nhất, kèm thời lượng và thời điểm hoàn thành.' },
]

const FAQ = [
  {
    q: 'Tôi có cần tài khoản để dùng bảng thống kê học tập không?',
    a: 'Không. Các phiên Pomodoro, chuỗi ngày và số liệu thống kê của bạn được lưu trực tiếp trong trình duyệt — không cần đăng ký, không cần đăng nhập, không đồng bộ qua máy chủ.',
  },
  {
    q: 'Chuỗi ngày được tính như thế nào?',
    a: 'Chuỗi ngày của bạn tăng thêm một mỗi ngày dương lịch bạn hoàn thành ít nhất một phiên Pomodoro, và sẽ về 0 nếu bạn bỏ lỡ trọn một ngày.',
  },
  {
    q: 'Bản đồ nhiệt hiển thị điều gì?',
    a: 'Đây là lịch dạng bản đồ nhiệt kiểu GitHub cho 90 ngày gần nhất — ô càng đậm màu nghĩa là bạn hoàn thành càng nhiều Pomodoro trong ngày đó. Nhìn vào bản đồ này bạn sẽ thấy ngay những giai đoạn mình học đều và những giai đoạn bị đứt quãng.',
  },
  {
    q: 'Nếu tôi xóa dữ liệu trình duyệt thì có mất thống kê không?',
    a: 'Có — vì mọi dữ liệu được lưu trong localStorage trên thiết bị của bạn, việc xóa dữ liệu trang web hoặc đổi sang trình duyệt/thiết bị khác sẽ làm mất lịch sử đã lưu.',
  },
  {
    q: 'Bảng thống kê có hoạt động trên điện thoại không?',
    a: 'Có. Bảng thống kê responsive và hiển thị tốt trên điện thoại, tuy phần bản đồ nhiệt sẽ dễ xem hơn trên màn hình rộng như máy tính hoặc tablet.',
  },
  {
    q: 'Làm sao để bảng thống kê bắt đầu có dữ liệu?',
    a: 'Chỉ cần mở workspace, bật đồng hồ Pomodoro và hoàn thành phiên tập trung đầu tiên. Ngay khi đó, bảng thống kê sẽ tự động hiển thị chuỗi ngày, biểu đồ tuần và bản đồ nhiệt của bạn.',
  },
]

export default function BangThongKeHocTapPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Bảng Thống Kê Học Tập', url: 'https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Bảng Thống Kê Học Tập"
        description="Theo dõi chuỗi ngày Pomodoro, tiến độ theo tuần và bản đồ nhiệt tập trung 90 ngày."
        url="https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap"
        keywords={['bảng thống kê học tập', 'chuỗi ngày pomodoro', 'heatmap tập trung']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Bảng Thống Kê Học Tập', url: 'https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📊 Miễn phí · Không cần tài khoản · Lưu trên trình duyệt
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Bảng Thống Kê Học Tập — <span className="text-violet-400">Theo Dõi Chuỗi Ngày Tập Trung</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Mỗi lần bạn hoàn thành một phiên Pomodoro trong LofiSpace, dữ liệu sẽ tự động đổ vào
            bảng thống kê cá nhân: thời gian tập trung hôm nay, chuỗi ngày liên tục, tiến độ theo
            tuần và bản đồ nhiệt 90 ngày kiểu GitHub. Không cần đăng ký — mọi thứ lưu ngay trên
            trình duyệt của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Xem Bảng Thống Kê Của Bạn →
            </Link>
            <Link
              href="/workspace?pom=1"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Bắt Đầu Phiên Tập Trung
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/30">
            Lưu ý: bảng thống kê thực tế hiện hiển thị nhãn bằng tiếng Anh (Today Focus, Weekly Progress...) vì đây là giao diện động cập nhật theo thời gian thực.
          </p>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Bảng Thống Kê Hiển Thị Những Gì?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{f.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data storage explanation */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Dữ Liệu Của Bạn Được Lưu Ở Đâu?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              LofiSpace không yêu cầu tài khoản, vì vậy toàn bộ lịch sử Pomodoro, chuỗi ngày và
              thống kê của bạn được lưu cục bộ trong trình duyệt (localStorage) — không có máy
              chủ nào lưu trữ dữ liệu cá nhân của bạn.
            </p>
            <p>
              Điều này có nghĩa là dữ liệu chỉ tồn tại trên đúng trình duyệt và thiết bị bạn đang
              dùng để học. Nếu bạn xóa dữ liệu trang web, dùng chế độ ẩn danh, hoặc chuyển sang
              máy khác, bảng thống kê sẽ bắt đầu lại từ đầu. Đổi lại, bạn có toàn quyền kiểm soát
              dữ liệu của mình mà không cần đăng ký hay chia sẻ thông tin cá nhân.
            </p>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/10 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Giữ chuỗi ngày của bạn không bị gián đoạn</h2>
          <p className="mb-6 text-white/55">Quay lại workspace và ghi thêm một phiên tập trung nữa.</p>
          <Link
            href="/workspace?pom=1"
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Bắt Đầu Một Phiên Pomodoro →
          </Link>
        </div>

        <RelatedPages exclude="/dashboard" />
      </div>
    </>
  )
}
