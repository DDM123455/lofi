import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Nhạc Lập Trình Cho Dev — Synthwave Giữ Flow Cả Buổi',
  description:
    'Nhạc lập trình miễn phí cho dev. Synthwave, lofi hip-hop, chillhop giúp giữ flow state khi code. Không quảng cáo, không cần đăng ký, chạy trên mọi trình duyệt.',
  keywords: [
    'nhạc lập trình', 'nhạc code', 'nhạc cho dev', 'nhạc synthwave',
    'nhạc lofi lập trình', 'playlist code', 'nhạc giúp flow state',
    'nhạc nền lập trình', 'nhạc tập trung cho developer',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/nhac-lap-trinh',
    languages: {
      en: 'https://www.focusworkspace.app/coding-music',
      vi: 'https://www.focusworkspace.app/vi/nhac-lap-trinh',
      'x-default': 'https://www.focusworkspace.app/coding-music',
    },
  },
  openGraph: {
    title: 'Nhạc Lập Trình Cho Dev — Synthwave Giữ Flow Cả Buổi | LofiSpace',
    description: 'Nhạc lập trình miễn phí — synthwave và lofi giúp dev giữ flow state khi code. Không quảng cáo.',
    url: 'https://www.focusworkspace.app/vi/nhac-lap-trinh',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhạc Lập Trình Cho Dev | LofiSpace',
    description: 'Nhạc lập trình miễn phí — synthwave và lofi beats giữ bạn trong flow state khi code.',
  },
}

const MOODS = [
  { emoji: '🌃', label: 'Synthwave / Retrowave', desc: 'Nhịp điện tử ánh neon. Năng lượng code đêm khuya kinh điển. Tập trung cao, hơi điện ảnh.' },
  { emoji: '🎧', label: 'Lofi hip-hop', desc: 'Nhẹ nhàng, chất jazz. Phù hợp nhất cho việc lặp lại, fix bug, và các phiên code dài không mệt.' },
  { emoji: '🌌', label: 'Space ambient', desc: 'Không gian, tối giản. Không nhịp cố định, chỉ có texture. Lý tưởng khi thiết kế kiến trúc hệ thống.' },
  { emoji: '⚡', label: 'Chillstep', desc: 'Lai giữa lofi và điện tử. Nhịp đều kèm lớp âm thanh ambient. Rất hợp khi debug hoặc review code.' },
  { emoji: '🎷', label: 'Jazz fusion', desc: 'Phức tạp, tinh tế. Giữ não bộ "có việc để làm" mà không đòi hỏi chú ý. Phù hợp công việc senior dev.' },
  { emoji: '🔥', label: 'Dark techno', desc: 'Cho những đợt chạy deadline. Nhịp dồn dập giúp bạn tiếp tục khi đang chiến đấu với bug production lúc 2 giờ sáng.' },
]

const FLOW_SCIENCE = [
  {
    title: 'Flow state cần khoảng 23 phút để vào',
    body: 'Nghiên cứu về gián đoạn nhận thức cho thấy trung bình cần 23 phút để lấy lại hoàn toàn sự tập trung sâu sau khi bị ngắt quãng. Nhạc giữ được không khí ổn định giúp giảm số lần gián đoạn, khiến việc vào và duy trì flow state dễ hơn.',
  },
  {
    title: 'Không lời = không tranh chấp bộ nhớ ngôn ngữ',
    body: 'Đọc và viết code sử dụng bộ nhớ làm việc ngôn ngữ — cùng hệ thống nhận thức xử lý lời bài hát. Nhạc không lời tránh hoàn toàn xung đột này, để bạn phân tích cú pháp và viết logic mà không bị nhiễu.',
  },
  {
    title: 'BPM ổn định giữ mức hưng phấn phù hợp',
    body: 'Nhạc trong khoảng 80-100 BPM giữ mức kích hoạt sinh lý ở vùng "tập trung nhưng vẫn bình tĩnh". Quá chậm sẽ buồn ngủ, quá nhanh sẽ căng thẳng. Phần lớn playlist lofi và synthwave tự nhiên rơi vào khoảng này.',
  },
  {
    title: 'Âm thanh môi trường che tiếng gõ phím',
    body: 'Kết hợp nhạc với tiếng thành phố hoặc quán cà phê giúp che cả tiếng gõ bàn phím của chính bạn — một nguồn xao nhãng bất ngờ khi giải quyết vấn đề phức tạp. Tổng thể tạo ra một môi trường âm thanh sạch sẽ.',
  },
]

const FAQ = [
  {
    q: 'Nhạc nào tốt nhất khi lập trình?',
    a: 'Nhạc không lời là lựa chọn được khuyên dùng phổ biến nhất cho việc code. Synthwave và lofi hip-hop là hai thể loại được dev ưa chuộng nhất vì: giữ BPM ổn định phù hợp với trạng thái tập trung (80-120 BPM), đủ không khí để che tiếng ồn bên ngoài, và không có nội dung lời bài hát cạnh tranh với việc đọc/viết code.',
  },
  {
    q: 'Nghe nhạc có giúp code tốt hơn không?',
    a: 'Với đa số lập trình viên là có, nhưng có ngoại lệ. Nhạc hữu ích nhất khi làm việc thường quy (fix bug nhỏ, refactor, viết boilerplate) và ít hữu ích hơn khi giải quyết vấn đề phức tạp cần tư duy chủ động. Khi bí một thuật toán khó, âm thanh môi trường thuần túy có thể có ích hơn nhạc. Hãy thử để biết cách nào hợp với từng loại việc.',
  },
  {
    q: 'Synthwave có phù hợp để code không?',
    a: 'Synthwave là một trong những thể loại được dev yêu thích nhất vì thẩm mỹ của nó khớp với tinh thần lập trình: hoài cổ tương lai, tập trung, hơi kịch tính. Nhạc cụ điện tử không có nội dung ngôn ngữ, BPM giữ năng lượng mà không gây xao nhãng, và không khí tạo cảm giác "hacker" nhập tâm mà nhiều dev thấy có động lực.',
  },
  {
    q: 'Nên để âm lượng bao nhiêu khi code?',
    a: 'Các nghiên cứu và kinh nghiệm thực tế của dev đồng thuận ở mức 50-65 dB là âm lượng tối ưu cho nhạc lập trình — tương đương một cuộc trò chuyện nhỏ. Nhạc quá to (trên 75 dB) làm giảm hiệu suất khi giải quyết việc phức tạp. Mục tiêu là có nhạc làm nền, không phải "chìm" trong nhạc.',
  },
  {
    q: 'Nên dùng tai nghe hay loa khi lập trình?',
    a: 'Tai nghe được khuyên dùng cho nhạc lập trình, đặc biệt ở văn phòng mở hoặc không gian chung. Tai nghe chụp tai khử ồn giúp cách âm vật lý thêm ngoài lớp nhạc. Kết hợp này — nhạc cộng cách âm vật lý — là thiết lập hiệu quả nhất cho dev làm việc trong môi trường dễ xao nhãng.',
  },
  {
    q: 'Nhạc lập trình trên LofiSpace có miễn phí không?',
    a: 'Có, hoàn toàn miễn phí. Không cần tài khoản, không trả phí, không cần tải về. LofiSpace phát playlist lofi và synthwave được chọn lọc cùng bộ trộn âm thanh môi trường, tất cả ngay trên trình duyệt.',
  },
]

export default function NhacLapTrinhPage() {
  const workspaceUrl = '/workspace?ls=lofi2&lv=70&at=city:25,wind:20&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Nhạc Lập Trình', url: 'https://www.focusworkspace.app/vi/nhac-lap-trinh' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Nhạc Lập Trình"
        description="Nhạc lập trình miễn phí cho dev. Synthwave, lofi hip-hop và chillhop giúp giữ flow state khi code."
        url="https://www.focusworkspace.app/vi/nhac-lap-trinh"
        keywords={['nhạc lập trình', 'nhạc code', 'nhạc synthwave', 'nhạc cho dev']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Nhạc Lập Trình', url: 'https://www.focusworkspace.app/vi/nhac-lap-trinh' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            💻 Synthwave · Nhạc lofi · Miễn phí · Không đăng ký
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Nhạc Lập Trình Cho <span className="text-cyan-400">Dev Giữ Flow Cả Buổi</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Synthwave và lofi beats được chọn lọc, giúp bạn giữ flow state suốt phiên code.
            Trộn nhạc với âm thanh thành phố và âm thanh môi trường trong bộ trộn tương tác
            miễn phí. Không quảng cáo, không đăng ký, không cần tải về.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-cyan-700 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-600 transition-colors"
            >
              Bắt Đầu Phiên Code →
            </Link>
            <Link
              href="/coding-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Phòng Code
            </Link>
          </div>
        </div>

        {/* Moods */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Tâm Trạng Nhạc Lập Trình — Chọn Vibe Của Bạn</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOODS.map(m => (
              <div key={m.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{m.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{m.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Flow science */}
        <section className="mb-16 rounded-2xl border border-cyan-500/15 bg-cyan-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Flow State Của Dev — Khoa Học Nói Gì</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            {FLOW_SCIENCE.map(item => (
              <div key={item.title}>
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-violet-900/20 border border-cyan-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Vào flow — bắt đầu phiên code của bạn</h2>
          <p className="mb-6 text-white/55">Miễn phí mãi mãi. Không cần tài khoản. Mở trong 10 giây.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-cyan-700 px-10 py-3 font-semibold text-white hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-900/30"
          >
            Nghe Nhạc Lập Trình — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/coding-music" />
      </div>
    </>
  )
}
