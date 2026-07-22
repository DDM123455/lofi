import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Âm Thanh Rừng Miễn Phí — Tập Trung & Thư Giãn Cùng Thiên Nhiên',
  description:
    'Nghe âm thanh rừng miễn phí — tiếng chim hót, lá xào xạc, gió qua tán cây. Âm thanh thiên nhiên cho học tập, thư giãn và giấc ngủ. Không cần đăng ký.',
  keywords: [
    'âm thanh rừng', 'âm thanh thiên nhiên tập trung', 'tiếng chim hót thư giãn',
    'forest sounds tiếng việt', 'âm thanh rừng online', 'tiếng rừng học bài',
    'âm thanh rừng miễn phí', 'tiếng lá xào xạc', 'âm thanh thiên nhiên online',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/am-thanh-rung',
    languages: {
      en: 'https://www.focusworkspace.app/forest-sounds',
      vi: 'https://www.focusworkspace.app/vi/am-thanh-rung',
      'x-default': 'https://www.focusworkspace.app/forest-sounds',
    },
  },
  openGraph: {
    title: 'Âm Thanh Rừng Miễn Phí | LofiSpace',
    description: 'Tiếng chim hót, lá xào xạc và âm thanh thiên nhiên giúp phục hồi sự tập trung và giảm căng thẳng.',
    url: 'https://www.focusworkspace.app/vi/am-thanh-rung',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Âm Thanh Rừng Miễn Phí | LofiSpace',
    description: 'Âm thanh rừng trực tuyến — thiên nhiên cho học tập, thư giãn và giấc ngủ.',
  },
}

const FAQ = [
  {
    q: 'Vì sao âm thanh rừng lại tốt cho việc học tập?',
    a: 'Âm thanh rừng hoạt động theo hai cơ chế. Thứ nhất, chúng che đi các yếu tố gây xao nhãng bất ngờ bằng một lớp âm thanh thiên nhiên ổn định. Thứ hai, chúng kích hoạt hiệu ứng của Thuyết Phục Hồi Sự Chú Ý (Attention Restoration Theory) — việc tiếp xúc với không gian âm thanh thiên nhiên, kể cả khi chỉ là bản ghi âm, đã được chứng minh giúp giảm mệt mỏi tinh thần và phục hồi khả năng tập trung có chủ đích. Đây là lý do vì sao một buổi đi dạo trong rừng luôn khiến ta cảm thấy sảng khoái — môi trường tự nhiên cho hệ thống chú ý chủ động của bạn một khoảng nghỉ.',
  },
  {
    q: 'Thuyết Phục Hồi Sự Chú Ý (Attention Restoration Theory) là gì?',
    a: 'Thuyết này, do Rachel và Stephen Kaplan phát triển, cho rằng môi trường tự nhiên giúp phục hồi khả năng chú ý có chủ đích. Âm thanh thiên nhiên — tiếng chim hót, tiếng gió, tiếng nước — tạo ra trạng thái "cuốn hút nhẹ nhàng" (soft fascination), cho phép hệ thống chú ý chủ động được nghỉ ngơi và hồi phục. Nhiều nghiên cứu cho thấy chỉ cần tiếp xúc ngắn với âm thanh thiên nhiên đã ghi âm cũng đủ để giảm căng thẳng và cải thiện khả năng tập trung sau đó.',
  },
  {
    q: 'Âm thanh rừng có tốt cho giấc ngủ không?',
    a: 'Có. Âm thanh rừng nằm trong nhóm âm thanh thiên nhiên hỗ trợ giấc ngủ hiệu quả nhất. Đặc biệt, tiếng chim hót được não bộ xử lý như một tín hiệu an toàn — chim chỉ hót khi môi trường an toàn, không có kẻ săn mồi rình rập. Gió nhẹ và tiếng lá xào xạc tạo lớp che tiếng ồn phổ rộng, dịu nhẹ. Để hỗ trợ giấc ngủ, hãy dùng âm thanh rừng không kèm nhạc, ở mức âm lượng thấp đến vừa.',
  },
  {
    q: 'Âm thanh thiên nhiên có giúp giảm căng thẳng thật không?',
    a: 'Nhiều nghiên cứu xác nhận âm thanh thiên nhiên giúp hạ mức cortisol, giảm nhịp tim và giảm hoạt động ở hạch hạnh nhân (trung tâm phát hiện đe doạ của não bộ). Một nghiên cứu của Đại học Sussex cho thấy âm thanh thiên nhiên làm dịch chuyển kết nối não bộ từ trạng thái lo lắng hướng nội sang xử lý hướng ngoại — giúp giảm hiệu quả việc suy nghĩ luẩn quẩn và lo âu.',
  },
  {
    q: 'Âm thanh thiên nhiên nào tốt nhất để học tập?',
    a: 'Riêng cho việc học, âm thanh rừng với tiếng chim hót và dòng suối nhỏ thường hiệu quả hơn âm thanh biển (biến đổi nhiều hơn) và sự im lặng tuyệt đối (không có khả năng che tiếng ồn). Kết hợp âm thanh rừng với nhạc lofi ở âm lượng thấp hơn sẽ tạo ra một không gian nhiều lớp, vừa có lợi ích che tiếng ồn của âm thanh nền, vừa có lợi ích tạo động lực nhẹ nhàng từ âm nhạc.',
  },
  {
    q: 'Nghe âm thanh rừng trên LofiSpace có mất phí không?',
    a: 'Không. Hoàn toàn miễn phí, không cần tài khoản, không cần tải ứng dụng. Âm thanh rừng cùng toàn bộ bộ trộn âm thanh nền chạy trên mọi trình duyệt.',
  },
]

const SCENES = [
  { emoji: '🌅', label: 'Rừng buổi sớm', desc: 'Dàn hợp xướng bình minh, lá còn ướt sương, tiếng chim hót nhẹ nhàng. Tràn năng lượng — hoàn hảo cho buổi học sáng sớm.' },
  { emoji: '🌿', label: 'Rừng sâu rậm rạp', desc: 'Tán lá dày, tiếng chim xa, gió nhẹ. Cảm giác chiều sâu và đắm chìm. Rất hợp cho những phiên đọc dài.' },
  { emoji: '🏞️', label: 'Suối trong rừng', desc: 'Tiếng suối róc rách hoà cùng âm thanh rừng. Nước thêm khả năng che tiếng ồn và tạo kết cấu nhịp nhàng.' },
  { emoji: '🌧️', label: 'Mưa trong rừng', desc: 'Mưa rơi trên lá — một kết cấu độc đáo khi mưa được tán lá làm dịu bớt. Cực kỳ êm dịu.' },
  { emoji: '🦅', label: 'Rừng núi cao', desc: 'Gió luồn qua rừng thông, thỉnh thoảng có tiếng chim gọi. Thưa và thoáng — gợi cảm giác hoang dã vùng núi cao.' },
  { emoji: '🌙', label: 'Rừng đêm', desc: 'Tiếng dế, gió nhẹ, thỉnh thoảng có tiếng cú. Năng lượng đối lập với buổi sáng — dịu dàng và thiền định.' },
]

export default function AmThanhRungPage() {
  const workspaceUrl = '/workspace?at=forest:70,wind:30&ls=lofi4&lv=55&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Âm Thanh Rừng', url: 'https://www.focusworkspace.app/vi/am-thanh-rung' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Âm Thanh Rừng"
        description="Nghe âm thanh rừng miễn phí để học tập, thư giãn và ngủ ngon. Âm thanh thiên nhiên — chim hót, gió, lá xào xạc."
        url="https://www.focusworkspace.app/vi/am-thanh-rung"
        keywords={['âm thanh rừng', 'âm thanh thiên nhiên', 'forest sounds', 'tiếng chim hót']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Âm Thanh Rừng', url: 'https://www.focusworkspace.app/vi/am-thanh-rung' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-green-900/30 px-4 py-1 text-sm text-green-300 ring-1 ring-green-500/20">
            🌿 Âm thanh rừng · Thiên nhiên · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Âm Thanh Rừng Cho <span className="text-green-400">Tập Trung & Thư Giãn</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Không gian âm thanh rừng sống động — tiếng chim, lá xào xạc, gió luồn qua tán cây —
            được khoa học chứng minh giúp phục hồi sự tập trung và giảm căng thẳng.
            Kết hợp với nhạc lofi trong bộ trộn miễn phí của chúng tôi. Không cần đăng ký.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-green-700 px-8 py-3 font-semibold text-white shadow-lg shadow-green-900/40 hover:bg-green-600 transition-colors"
            >
              Nghe Âm Thanh Rừng →
            </Link>
            <Link
              href="/vi/am-thanh-nen"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Âm Thanh Nền
            </Link>
          </div>
        </div>

        {/* Scene types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Không Gian Rừng — Chọn Môi Trường Của Bạn</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCENES.map(s => (
              <div key={s.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{s.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ART section */}
        <section className="mb-16 rounded-2xl border border-green-500/15 bg-green-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Khoa Học: Vì Sao Âm Thanh Thiên Nhiên Phục Hồi Sự Tập Trung</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Thuyết Phục Hồi Sự Chú Ý (ART)</h3>
              <p>Môi trường tự nhiên tạo ra trạng thái &ldquo;cuốn hút nhẹ nhàng&rdquo; — sự chú ý không cần cố gắng, cho phép hệ thống chú ý chủ động được nghỉ ngơi. Ngay cả âm thanh rừng đã ghi âm cũng kích hoạt một phần lợi ích của ART, giúp giảm mệt mỏi tinh thần trong những phiên học dài.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Tiếng chim hót như tín hiệu an toàn</h3>
              <p>Chim chỉ hót khi chúng cảm thấy an toàn. Tâm lý học tiến hoá cho rằng não bộ diễn giải tiếng chim hót như một xác nhận rằng không có nguy hiểm gần đó — giúp giảm sự cảnh giác nền và giải phóng nguồn lực nhận thức cho công việc tập trung.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Giảm cortisol</h3>
              <p>Nhiều nghiên cứu cho thấy nghe âm thanh thiên nhiên giúp giảm cortisol (hormone căng thẳng) hiệu quả hơn so với âm thanh đô thị. Cortisol thấp hơn đồng nghĩa với lo âu ít hơn và trí nhớ làm việc tốt hơn — lợi ích trực tiếp cho việc học.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Che tiếng ồn ổn định mà không đơn điệu</h3>
              <p>Khác với tiếng ồn trắng thuần tuý, âm thanh rừng có những biến đổi nhỏ — một tiếng chim gọi ở đây, một cơn gió thoảng ở kia — giúp tránh cảm giác mỏi mệt khi nghe lâu mà vẫn duy trì khả năng che tiếng ồn ổn định. Điều này khiến chúng bền vững hơn cho những phiên học kéo dài.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Những Tổ Hợp Âm Thanh Rừng Tốt Nhất</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '📚 Mix học tập trong rừng', combo: 'Rừng 70% + Gió 25% + Lofi 55%', best: 'Đọc sách, ôn bài, học tập nói chung' },
              { label: '😴 Mix ngủ trong rừng', combo: 'Rừng 65% + Gió 35%', best: 'Dễ ngủ, thiền định, thư giãn' },
              { label: '🌧️ Mix rừng mưa', combo: 'Rừng 60% + Mưa 50% + Lofi 50%', best: 'Viết lách, viết nhật ký, công việc sáng tạo' },
              { label: '🧘 Nghỉ giải lao phục hồi', combo: 'Rừng 80% + Gió 30%', best: 'Giải lao giữa buổi học, chánh niệm, giảm căng thẳng' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-green-300/70 font-mono mb-2">{item.combo}</p>
                <p className="text-xs text-white/40">Phù hợp nhất: {item.best}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-green-900/40 to-green-800/10 border border-green-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bước vào khu rừng — ngay từ bàn học của bạn</h2>
          <p className="mb-6 text-white/55">Miễn phí mãi mãi. Không cần tài khoản. Chạy trên mọi trình duyệt. Mở trong 10 giây.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-green-700 px-10 py-3 font-semibold text-white hover:bg-green-600 transition-colors shadow-lg shadow-green-900/30"
          >
            Nghe Âm Thanh Rừng — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/forest-sounds" />
      </div>
    </>
  )
}
