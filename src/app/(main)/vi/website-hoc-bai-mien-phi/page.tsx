import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Website Học Bài Miễn Phí — Góc Học Tập Có Nhạc Lofi',
  description:
    'LofiSpace là website học bài miễn phí tốt nhất online. Nhạc lofi, âm thanh môi trường, đồng hồ Pomodoro và hơn 15 scene học tập — tất cả trong một tab. Không đăng ký.',
  keywords: [
    'website học bài', 'website học bài miễn phí', 'trang web học bài',
    'phòng học online', 'công cụ học tập online', 'học bài với nhạc lofi',
    'website tập trung', 'website năng suất cho học sinh sinh viên',
    'app học bài online', 'website học bài lofi', 'không gian học tập online',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/website-hoc-bai-mien-phi',
    languages: {
      en: 'https://www.focusworkspace.app/website-for-studying',
      vi: 'https://www.focusworkspace.app/vi/website-hoc-bai-mien-phi',
      'x-default': 'https://www.focusworkspace.app/website-for-studying',
    },
  },
  openGraph: {
    title: 'Website Học Bài Miễn Phí Tốt Nhất | LofiSpace',
    description: 'Nhạc lofi, âm thanh môi trường, đồng hồ Pomodoro và hơn 15 scene học tập — miễn phí trong một tab trình duyệt.',
    url: 'https://www.focusworkspace.app/vi/website-hoc-bai-mien-phi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Học Bài Miễn Phí Tốt Nhất | LofiSpace',
    description: 'Nhạc lofi, âm thanh môi trường, Pomodoro và các scene học tập — miễn phí, không đăng ký.',
  },
}

const FEATURES = [
  {
    emoji: '🎧',
    title: 'Trình Phát Nhạc Lofi',
    desc: 'Nhiều kênh lofi và synthwave được chọn lọc — chuyển đổi tức thì. Điều chỉnh âm lượng, tự động phát.',
  },
  {
    emoji: '🌊',
    title: 'Bộ Trộn Âm Thanh Môi Trường',
    desc: 'Trộn tiếng mưa, quán cà phê, rừng, lửa, biển và nhiều hơn nữa. Điều chỉnh âm lượng riêng cho từng loại. Hơn 10 âm thanh môi trường.',
  },
  {
    emoji: '⏱️',
    title: 'Đồng Hồ Pomodoro',
    desc: 'Tùy chỉnh thời gian làm việc và nghỉ. Có tín hiệu hình ảnh và âm thanh. Theo dõi chuỗi ngày để xây thói quen học tập.',
  },
  {
    emoji: '✅',
    title: 'Danh Sách Việc Cần Làm',
    desc: 'Danh sách việc cho phiên học nằm ngay trong không gian làm việc — không cần chuyển tab. Đánh dấu hoàn thành khi đang học.',
  },
  {
    emoji: '🌤️',
    title: 'Widget Thời Tiết',
    desc: 'Dữ liệu thời tiết trực tiếp. LofiSpace tự động chọn scene học tập phù hợp với thời tiết nơi bạn ở.',
  },
  {
    emoji: '🏆',
    title: 'XP & Thành Tựu',
    desc: 'Gamification cho việc tập trung. Nhận XP khi hoàn thành Pomodoro, duy trì chuỗi ngày, mở khóa thành tựu.',
  },
  {
    emoji: '🎬',
    title: 'Hơn 15 Scene Học Tập',
    desc: 'Hình nền động từ Tokyo Café Rain đến Midnight Coding. Mỗi scene là một không khí trọn vẹn.',
  },
  {
    emoji: '📎',
    title: 'Nhúng Vào Notion',
    desc: 'Nhúng không gian học tập trực tiếp vào trang Notion. Học cùng ghi chú của bạn trong cùng một màn hình.',
  },
]

const COMPARE = [
  { feature: 'Nhạc lofi', lofi: '✅', others: '✅' },
  { feature: 'Bộ trộn âm thanh môi trường', lofi: '✅', others: '⚠️ Hạn chế' },
  { feature: 'Đồng hồ Pomodoro', lofi: '✅', others: '⚠️ App riêng' },
  { feature: 'Scene / hình nền học tập', lofi: '✅ 15+', others: '❌' },
  { feature: 'Nhúng vào Notion', lofi: '✅', others: '❌' },
  { feature: 'Không cần đăng ký', lofi: '✅', others: '⚠️ Tùy trang' },
  { feature: 'Chọn scene theo thời tiết', lofi: '✅', others: '❌' },
  { feature: 'Hệ thống XP & thành tựu', lofi: '✅', others: '❌' },
  { feature: 'Miễn phí vĩnh viễn', lofi: '✅', others: '⚠️ Freemium' },
]

const FAQ = [
  {
    q: 'Một website học bài tốt cần những gì?',
    a: 'Một website học bài tốt loại bỏ mọi rào cản giữa bạn và việc tập trung học. Nó cần khởi động ngay lập tức (không tải app, không cần tài khoản), có môi trường âm thanh phù hợp (nhạc và âm thanh môi trường che tiếng ồn), có sẵn công cụ hỗ trợ chứ không làm gián đoạn quy trình học (đồng hồ Pomodoro, to-do list), và không dội thông báo hay các tính năng "gây nghiện" vào bạn. LofiSpace được xây dựng đúng theo những nguyên tắc này.',
  },
  {
    q: 'LofiSpace có miễn phí không?',
    a: 'Có, hoàn toàn miễn phí. Không cần tài khoản, không trả phí, không cần tải về. Mọi tính năng — các kênh nhạc lofi, bộ trộn âm thanh môi trường, đồng hồ Pomodoro, to-do list, lịch, hệ thống XP, hơn 15 scene học tập — đều dùng được ngay khi bạn mở trang.',
  },
  {
    q: 'Tôi có thể dùng LofiSpace mà không cần đăng ký không?',
    a: 'Có. Bạn có thể mở LofiSpace và bắt đầu một phiên học ngay lập tức, không cần tài khoản. Thiết lập workspace của bạn được lưu trong trình duyệt. Việc tạo tài khoản (khi có) sẽ thêm tính năng đồng bộ và theo dõi chuỗi ngày, nhưng hoàn toàn tùy chọn.',
  },
  {
    q: 'LofiSpace có những công cụ học tập nào?',
    a: 'LofiSpace bao gồm: trình phát nhạc lofi với nhiều kênh có sẵn, bộ trộn âm thanh môi trường (mưa, quán cà phê, rừng, lửa, biển, và nhiều hơn nữa) với âm lượng điều chỉnh riêng, đồng hồ Pomodoro tùy chỉnh thời gian làm/nghỉ, to-do list quản lý công việc, tích hợp lịch, đồng hồ trực tiếp, widget thời tiết tự động chọn scene, hệ thống XP và thành tựu, cùng hơn 15 hình nền scene học tập động.',
  },
  {
    q: 'Tôi có thể nhúng LofiSpace vào Notion không?',
    a: 'Có. LofiSpace có chế độ nhúng riêng dành cho Notion, Obsidian và bất kỳ trang nào hỗ trợ iframe. Dán URL embed vào khối /embed của Notion là không gian học tập của bạn sẽ hiện ngay trong ghi chú. Bản nhúng bao gồm trình phát nhạc, bộ trộn âm thanh và đồng hồ Pomodoro.',
  },
  {
    q: 'Những scene học tập nào phổ biến nhất trên LofiSpace?',
    a: 'Các scene được yêu thích nhất là: Tokyo Café Rain (mưa, tiếng quán cà phê, nhạc lofi), Thunderstorm Focus (mưa to và sấm cho các phiên chạy deadline), Cozy Cabin Winter (lò sưởi và gió — hoàn hảo cho tối mùa đông), và Study Corner (tối giản, sạch sẽ — nhạc và mưa nhẹ). Xem toàn bộ 15 scene trong Thư Viện Scene và mở bất kỳ scene nào chỉ với một cú click.',
  },
]

export default function WebsiteHocBaiMienPhiPage() {
  const workspaceUrl = '/workspace?ls=lofi1&lv=65&at=rain:45,cafe:25&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Website Học Bài Miễn Phí', url: 'https://www.focusworkspace.app/vi/website-hoc-bai-mien-phi' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace — Website Học Bài"
        description="Website học bài miễn phí với nhạc lofi, âm thanh môi trường, đồng hồ Pomodoro, to-do list và hơn 15 scene học tập động."
        url="https://www.focusworkspace.app/vi/website-hoc-bai-mien-phi"
        keywords={['website học bài', 'phòng học online', 'trang web học bài', 'website học bài lofi']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Website Học Bài Miễn Phí', url: 'https://www.focusworkspace.app/vi/website-hoc-bai-mien-phi' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📚 Miễn phí · Không đăng ký · Mọi công cụ trong một tab
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Website <span className="text-violet-400">Học Bài Miễn Phí</span> Tốt Nhất
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            LofiSpace là website học bài miễn phí, tất cả trong một: nhạc lofi, bộ trộn âm
            thanh môi trường, đồng hồ Pomodoro, to-do list và hơn 15 scene học tập động —
            mọi thứ bạn cần để tập trung, trong một tab trình duyệt duy nhất. Không đăng ký,
            không cần tải về.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Mở Góc Học Tập →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Các Scene Học Tập
            </Link>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Mọi Thứ Bạn Cần Để Học — Trong Một Tab</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{f.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">LofiSpace So Với Các Website Học Bài Khác</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left font-semibold text-white/50">Tính năng</th>
                  <th className="pb-3 text-center font-semibold text-violet-300">LofiSpace</th>
                  <th className="pb-3 text-center font-semibold text-white/30">Trang khác</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(row => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="py-2.5 text-white/55">{row.feature}</td>
                    <td className="py-2.5 text-center text-violet-300 font-medium">{row.lofi}</td>
                    <td className="py-2.5 text-center text-white/35">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng học thông minh hơn?</h2>
          <p className="mb-6 text-white/55">
            Miễn phí mãi mãi. Không cần tài khoản. Mọi công cụ trong một tab. Mở trong 10 giây.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
            >
              Mở Góc Học Tập Miễn Phí →
            </Link>
            <Link
              href="/scenes"
              className="inline-block rounded-full border border-violet-500/30 bg-violet-900/20 px-8 py-3 font-semibold text-violet-300 hover:bg-violet-900/40 transition-colors"
            >
              Xem Hơn 15 Scene
            </Link>
          </div>
        </div>

        <RelatedPages exclude="/website-for-studying" />
      </div>
    </>
  )
}
