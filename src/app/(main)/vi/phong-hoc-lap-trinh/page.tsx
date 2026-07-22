import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Phòng Học Lập Trình — Nhạc Focus & Âm Thanh Cho Dev',
  description:
    'Phòng làm việc dành riêng cho lập trình viên với nhạc synthwave, âm thanh thành phố về đêm, giao diện tối và mèo đồng hành. Không gian tập trung code, miễn phí.',
  keywords: [
    'phòng học lập trình', 'nhạc code', 'nhạc tập trung lập trình', 'phòng làm việc dev',
    'synthwave coding', 'nhạc synthwave lập trình', 'code cùng nhau', 'âm thanh nền lập trình',
  ],
  openGraph: {
    title: 'Phòng Học Lập Trình — LofiSpace',
    description: 'Nhạc synthwave, giao diện tối, mèo đồng hành. Không gian tập trung dành cho lập trình viên.',
    type: 'website',
    url: 'https://www.focusworkspace.app/vi/phong-hoc-lap-trinh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phòng Học Lập Trình — LofiSpace',
    description: 'Nhạc synthwave, giao diện tối, mèo đồng hành. Không gian tập trung dành cho lập trình viên.',
  },
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/phong-hoc-lap-trinh',
    languages: {
      en: 'https://www.focusworkspace.app/coding-room',
      vi: 'https://www.focusworkspace.app/vi/phong-hoc-lap-trinh',
      'x-default': 'https://www.focusworkspace.app/coding-room',
    },
  },
}

const FAQ = [
  {
    q: 'Nhạc nào phù hợp nhất khi lập trình?',
    a: 'Nhạc không lời — như synthwave, lofi hip hop hoặc ambient electronic — là lựa chọn tốt nhất khi code. Loại nhạc này tạo kích thích vừa đủ để giữ tỉnh táo mà không kích hoạt vùng xử lý ngôn ngữ trong não, tránh xung đột với việc đọc và viết code.',
  },
  {
    q: 'Mèo lập trình là gì?',
    a: 'Đó là một nhân vật mèo hoạt hình SVG ngồi gõ phím cùng bạn trên màn hình. Nó sẽ có phản ứng khi bạn hoàn thành một phiên Pomodoro, và bạn có thể kéo, đổi kích thước hoặc ẩn nó đi.',
  },
  {
    q: 'Có dùng được cho phiên code dài không?',
    a: 'Có. Đồng hồ Pomodoro giúp hạn chế tình trạng kiệt sức bằng cách nhắc bạn nghỉ ngơi đúng lúc. Hệ thống XP theo dõi tiến độ và chuỗi ngày code liên tục của bạn.',
  },
  {
    q: 'Có hoạt động khi không có mạng không?',
    a: 'Nhạc lofi cần kết nối internet để phát trực tuyến. Còn âm thanh nền, đồng hồ đếm giờ và các widget khác vẫn hoạt động bình thường sau khi trang đã tải xong lần đầu.',
  },
  {
    q: 'Phòng học lập trình khác gì phòng học online thông thường?',
    a: 'Phòng học lập trình được tinh chỉnh riêng cho dân dev: giao diện tối để đỡ mỏi mắt khi nhìn màn hình lâu, nhạc synthwave thay vì lofi jazz thông thường, và bối cảnh thành phố về đêm gợi cảm giác "code khuya" quen thuộc — thay vì không khí thư viện hay quán cà phê của phòng học truyền thống.',
  },
  {
    q: 'Có nên bật nhạc khi đang debug một lỗi khó không?',
    a: 'Tuỳ người, nhưng nhiều lập trình viên thấy nhạc nền ổn định (không lời, tempo đều) giúp duy trì trạng thái flow lâu hơn khi phải giữ nhiều logic phức tạp trong đầu, thay vì để sự im lặng tuyệt đối khiến tâm trí dễ trôi dạt sang việc khác.',
  },
]

const PRESET_FEATURES = [
  { emoji: '🌃', label: 'Hình nền thành phố về đêm' },
  { emoji: '🎹', label: 'Nhạc synthwave & lofi tối giản' },
  { emoji: '🌆', label: 'Âm thanh mưa thành phố' },
  { emoji: '🐱', label: 'Mèo lập trình đồng hành' },
  { emoji: '🍅', label: 'Đồng hồ Pomodoro kèm XP' },
  { emoji: '🕐', label: 'Đồng hồ & theo dõi phiên làm việc' },
]

export default function PhongHocLapTrinhPage() {
  // Midnight Coding scene params — giữ nguyên cấu hình bản gốc
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/lofi-bedroom.mp4') +
    '&bgo=50&ls=lofi2&lv=70&at=city:30,wind:20&pom=1&clk=1&ac=22d3ee'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Phòng Học Lập Trình', url: 'https://www.focusworkspace.app/vi/phong-hoc-lap-trinh' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Phòng Học Lập Trình"
        description="Phòng làm việc online cho lập trình viên với nhạc synthwave, âm thanh thành phố và mèo đồng hành."
        url="https://www.focusworkspace.app/vi/phong-hoc-lap-trinh"
        applicationCategory="DeveloperApplication"
        keywords={['phòng học lập trình', 'nhạc code', 'tập trung dev', 'synthwave coding']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Phòng Học Lập Trình', url: 'https://www.focusworkspace.app/vi/phong-hoc-lap-trinh' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            💻 Synthwave · Giao diện tối · Mèo lập trình
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Phòng Học <span className="text-cyan-400">Lập Trình</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Không gian làm việc tối giản, tối màu, được thiết kế riêng cho lập trình viên.
            Nhạc synthwave, âm thanh mưa thành phố, mèo đồng hành và đồng hồ Pomodoro —
            mọi thứ bạn cần cho một phiên code hiệu quả.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-500 transition-colors"
            >
              Vào Phòng Lập Trình →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Scene
            </Link>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Được Thiết Kế Cho Lập Trình Viên</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRESET_FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why section */}
        <section className="mb-16 rounded-2xl border border-cyan-500/15 bg-cyan-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Âm Thanh Nền Giúp Ích Khi Code</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Lập trình viên cần sự tập trung sâu — kiểu tập trung cho phép bạn giữ một khối logic
              phức tạp trong đầu suốt thời gian dài. Sự im lặng tuyệt đối đôi khi lại quá trống trải,
              còn môi trường ồn ào thì phá vỡ mạch suy nghĩ. Âm thanh nền kết hợp nhạc không lời
              chính là điểm cân bằng lý tưởng.
            </p>
            <p>
              Nhịp điệu điện tử dồn dập của synthwave giúp tăng độ tỉnh táo mà không gây xao nhãng
              bởi lời bài hát. Tiếng mưa thành phố tạo thêm một lớp âm thanh nền ổn định, che lấp
              tạp âm xung quanh văn phòng. Kết hợp cả hai tạo nên một môi trường flow-state mà
              nhiều lập trình viên kỳ cựu rất ưa chuộng.
            </p>
            <p>
              Đồng hồ Pomodoro giúp giữ cấu trúc cho từng phiên làm việc. 25 phút tập trung,
              5 phút nghỉ — đầu óc luôn tỉnh táo, tránh việc code liên tục 4 tiếng dẫn đến kiệt sức
              và dễ mắc lỗi.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-cyan-900/30 to-violet-900/20 border border-cyan-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng ship một tính năng mới?</h2>
          <p className="mb-6 text-white/55">Mở phòng lập trình và bước vào trạng thái tập trung.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-cyan-600 px-10 py-3 font-semibold text-white hover:bg-cyan-500 transition-colors"
          >
            Mở Phòng Lập Trình — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/coding-room" />
      </div>
    </>
  )
}
