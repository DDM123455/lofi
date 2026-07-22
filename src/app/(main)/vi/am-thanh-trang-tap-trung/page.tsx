import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Tiếng Ồn Trắng Tập Trung Miễn Phí — White Noise Học Tập Online',
  description:
    'Nghe tiếng ồn trắng (white noise) miễn phí để tập trung học tập, làm việc. So sánh với tiếng ồn nâu, kết hợp sẵn đồng hồ Pomodoro. Không quảng cáo, không cần đăng ký.',
  keywords: [
    'tiếng ồn trắng tập trung', 'white noise học tập', 'tiếng ồn trắng online', 'âm thanh trắng tập trung',
    'white noise miễn phí', 'tiếng ồn nâu', 'white noise tiếng việt',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/am-thanh-trang-tap-trung',
    languages: {
      'en': 'https://www.focusworkspace.app/white-noise',
      'vi': 'https://www.focusworkspace.app/vi/am-thanh-trang-tap-trung',
      'x-default': 'https://www.focusworkspace.app/white-noise',
    },
  },
  openGraph: {
    title: 'Tiếng Ồn Trắng Tập Trung Miễn Phí | LofiSpace',
    description: 'White noise online giúp che tiếng ồn, tập trung sâu hơn. Kết hợp sẵn Pomodoro. Miễn phí.',
    url: 'https://www.focusworkspace.app/vi/am-thanh-trang-tap-trung',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiếng Ồn Trắng Tập Trung Miễn Phí | LofiSpace',
    description: 'White noise online để tập trung, kết hợp sẵn đồng hồ Pomodoro.',
  },
}

const FAQ = [
  {
    q: 'Tiếng ồn trắng (white noise) là gì?',
    a: 'Tiếng ồn trắng là âm thanh chứa đều tất cả các tần số mà tai người nghe được, phát ra cùng cường độ — nghe giống tiếng "xì" đều đặn như tivi mất sóng hoặc quạt máy chạy. Vì phổ tần trải đều và không đổi, nó có khả năng "che" hầu hết các âm thanh khác trong môi trường, từ tiếng nói chuyện đến tiếng xe cộ.',
  },
  {
    q: 'Khi nào nên dùng tiếng ồn trắng thay vì tiếng mưa hay nhạc lofi?',
    a: 'Tiếng ồn trắng phù hợp nhất khi bạn cần che tiếng ồn mạnh và không đều — công trình xây dựng gần nhà, hàng xóm ồn ào, phòng trọ sát đường lớn. So với tiếng mưa hay lofi (vốn có giai điệu và nhịp lên xuống), tiếng ồn trắng "phẳng" hơn nên khả năng che tiếng ồn đột ngột cũng mạnh hơn, dù nghe lâu có thể hơi đơn điệu với một số người.',
  },
  {
    q: 'Tiếng ồn trắng khác tiếng ồn nâu (brown noise) thế nào?',
    a: 'Tiếng ồn trắng có năng lượng đều ở mọi tần số nên nghe hơi "gắt" và cao hơn. Tiếng ồn nâu (brown noise) tập trung năng lượng nhiều hơn ở tần số thấp, nghe trầm và "ấm" hơn, giống tiếng thác nước hoặc tiếng sấm xa — nhiều người thấy dễ chịu hơn khi nghe trong thời gian dài. Nếu tiếng ồn trắng khiến bạn hơi khó chịu, hãy thử tiếng ồn nâu để xem có phù hợp hơn không.',
  },
  {
    q: 'Tiếng ồn trắng có phù hợp cho người dễ mất tập trung (ADHD) không?',
    a: 'Có, nhiều nghiên cứu và trải nghiệm thực tế cho thấy tiếng ồn trắng hoặc nâu có thể giúp người dễ mất tập trung duy trì sự chú ý tốt hơn, vì nó cung cấp một mức kích thích nền ổn định, giảm bớt việc não bộ "tìm kiếm" kích thích khác từ môi trường xung quanh.',
  },
  {
    q: 'Nên kết hợp tiếng ồn trắng với gì khi học tập?',
    a: 'Kết hợp với đồng hồ Pomodoro là lựa chọn phổ biến nhất — tiếng ồn trắng lo phần che tiếng ồn xung quanh, còn Pomodoro giữ kỷ luật thời gian học. Một số người cũng thích thêm một lớp mưa nhẹ để giảm bớt cảm giác "phẳng" của tiếng ồn trắng thuần tuý.',
  },
  {
    q: 'Nghe tiếng ồn trắng trên LofiSpace có mất phí không?',
    a: 'Không. Tiếng ồn trắng cùng các âm thanh nền khác trên LofiSpace đều miễn phí hoàn toàn, phát liên tục không quảng cáo, không cần tạo tài khoản.',
  },
]

export default function AmThanhTrangTapTrungPage() {
  const workspaceUrl = '/workspace?at=rain:70,wind:30&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Tiếng Ồn Trắng Tập Trung', url: 'https://www.focusworkspace.app/vi/am-thanh-trang-tap-trung' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Tiếng Ồn Trắng"
        description="Nghe tiếng ồn trắng (white noise) miễn phí để tập trung học tập, làm việc, kết hợp sẵn đồng hồ Pomodoro."
        url="https://www.focusworkspace.app/vi/am-thanh-trang-tap-trung"
        keywords={['tiếng ồn trắng', 'white noise', 'tiếng ồn trắng tập trung', 'white noise học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Tiếng Ồn Trắng Tập Trung', url: 'https://www.focusworkspace.app/vi/am-thanh-trang-tap-trung' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-900/30 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-500/20">
            ⚪ White noise · Che tiếng ồn hiệu quả · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-amber-400">Tiếng Ồn Trắng</span> Tập Trung — White Noise Online
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Nghe tiếng ồn trắng trực tuyến để che tiếng ồn xung quanh và tập trung sâu
            hơn khi học tập, làm việc. Kết hợp sẵn đồng hồ Pomodoro trong cùng một
            không gian, hoàn toàn miễn phí, không quảng cáo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-900/40 hover:bg-amber-500 transition-colors"
            >
              Nghe Tiếng Ồn Trắng →
            </Link>
            <Link
              href="/vi/tieng-mua-hoc-bai"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Thử Tiếng Mưa
            </Link>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-16 rounded-2xl border border-amber-500/15 bg-amber-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Tiếng ồn trắng là gì và khi nào nên dùng?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Tiếng ồn trắng là âm thanh chứa đều tất cả các tần số nghe được, phát cùng cường độ —
              nghe giống tiếng &ldquo;xì&rdquo; liên tục của quạt máy hoặc tivi không có sóng. Vì phổ âm thanh
              trải đều và không thay đổi theo thời gian, nó có khả năng che lấp gần như mọi âm thanh
              khác xen vào, kể cả những tiếng động lớn và bất ngờ.
            </p>
            <p>
              Đây là lý do tiếng ồn trắng phù hợp nhất trong những môi trường có tiếng ồn mạnh và
              không thể kiểm soát: nhà gần công trình xây dựng, phòng trọ sát đường lớn, ký túc xá
              đông người. Trong những trường hợp mà tiếng mưa hay nhạc lofi (vốn nhẹ nhàng hơn) không
              đủ sức che tiếng ồn, tiếng ồn trắng thường phát huy tác dụng tốt hơn.
            </p>
          </div>
        </section>

        {/* Section 2 - white vs brown */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">So sánh nhanh: tiếng ồn trắng và tiếng ồn nâu</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '⚪ Tiếng ồn trắng', desc: 'Năng lượng đều ở mọi tần số, nghe hơi cao và “gắt”. Che tiếng ồn mạnh rất hiệu quả, phù hợp môi trường nhiều tạp âm.' },
              { title: '🟤 Tiếng ồn nâu', desc: 'Tập trung năng lượng ở tần số thấp, nghe trầm và ấm hơn, giống tiếng thác nước. Dễ chịu hơn khi nghe trong thời gian dài.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-white/40 max-w-xl mx-auto leading-relaxed">
            Không có loại nào &ldquo;tốt hơn&rdquo; tuyệt đối — hãy thử cả hai trong workspace để xem loại nào
            giúp bạn tập trung dễ chịu hơn với môi trường học tập của mình.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Kết hợp tiếng ồn trắng với Pomodoro</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            <p>
              Tiếng ồn trắng phát huy tác dụng tốt nhất khi đi cùng một khung thời gian rõ ràng.
              Bật tiếng ồn trắng ở mức đủ để che tiếng ồn xung quanh (thường 50-70% tuỳ môi trường),
              sau đó chạy <Link href="/vi/dong-ho-pomodoro" className="text-amber-300 hover:text-amber-200">đồng hồ Pomodoro</Link> theo
              chu kỳ 25/5 — tiếng ồn trắng lo phần &ldquo;cách âm&rdquo;, Pomodoro lo phần kỷ luật thời gian.
            </p>
            <p>
              Nếu bạn thấy tiếng ồn trắng thuần tuý hơi đơn điệu, có thể thử pha thêm một chút <Link href="/vi/tieng-mua-hoc-bai" className="text-amber-300 hover:text-amber-200">tiếng mưa</Link> ở
              mức nhẹ để tạo cảm giác tự nhiên hơn, hoặc chuyển hẳn sang tiếng ồn nâu — tất cả các
              tuỳ chọn này đều nằm trong cùng một bảng điều khiển âm thanh của LofiSpace.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-900/40 to-rose-900/20 border border-amber-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Che tiếng ồn và tập trung ngay</h2>
          <p className="mb-6 text-white/55">Miễn phí, kết hợp sẵn đồng hồ Pomodoro để giữ kỷ luật thời gian.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-600 px-10 py-3 font-semibold text-white hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/30"
          >
            Mở Không Gian Làm Việc →
          </Link>
        </div>

        <RelatedPages exclude="/white-noise" />
      </div>
    </>
  )
}
