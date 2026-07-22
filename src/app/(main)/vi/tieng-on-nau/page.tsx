import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Tiếng Ồn Nâu Miễn Phí — Tập Trung, ADHD & Làm Việc Sâu',
  description:
    'Nghe tiếng ồn nâu (brown noise) miễn phí, giúp tập trung cho người dễ mất tập trung (ADHD), giảm lo âu và làm việc sâu. Kết hợp sẵn nhạc lofi. Không quảng cáo.',
  keywords: [
    'tiếng ồn nâu', 'brown noise tiếng việt', 'tiếng ồn nâu adhd', 'tiếng ồn nâu tập trung',
    'tiếng ồn nâu miễn phí', 'âm thanh trầm tập trung', 'brown noise online', 'tiếng ồn nâu ngủ',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/tieng-on-nau',
    languages: {
      en: 'https://www.focusworkspace.app/brown-noise',
      vi: 'https://www.focusworkspace.app/vi/tieng-on-nau',
      'x-default': 'https://www.focusworkspace.app/brown-noise',
    },
  },
  openGraph: {
    title: 'Tiếng Ồn Nâu Miễn Phí | LofiSpace',
    description: 'Tiếng ồn nâu trầm ấm giúp tập trung cho người ADHD, giảm lo âu và làm việc sâu. Kết hợp sẵn nhạc lofi. Miễn phí.',
    url: 'https://www.focusworkspace.app/vi/tieng-on-nau',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiếng Ồn Nâu Miễn Phí | LofiSpace',
    description: 'Tiếng ồn nâu trầm ấm cho ADHD và làm việc sâu, kết hợp sẵn nhạc lofi.',
  },
}

const FAQ = [
  {
    q: 'Tiếng ồn nâu (brown noise) là gì?',
    a: 'Tiếng ồn nâu (còn gọi là Brownian noise hay red noise) là một dạng âm thanh ngẫu nhiên có năng lượng tập trung nhiều hơn ở dải tần số thấp. Kết quả là một âm thanh trầm, dày và ù ù đều đặn — thường được mô tả giống tiếng thác nước lớn, tiếng sấm ở xa, hoặc tiếng quạt công suất cao. Khác với tiếng ồn trắng vốn có năng lượng đều ở mọi tần số, tiếng ồn nâu giảm mạnh ở tần số cao, tạo ra cảm giác âm thanh ấm và trầm hơn hẳn.',
  },
  {
    q: 'Vì sao tiếng ồn nâu được nhiều người ADHD ưa chuộng?',
    a: 'Tiếng ồn nâu cung cấp một lớp kích thích tần số thấp liên tục, dường như đáp ứng đúng nhu cầu kích thích cảm giác nền của não bộ ADHD mà không tạo ra sự mới lạ gây xao nhãng. Khi não bộ ADHD bị "thiếu kích thích", nó có xu hướng tự tìm kích thích từ môi trường xung quanh — dẫn đến mất tập trung. Tiếng ồn nâu cung cấp đúng loại kích thích đó theo cách có kiểm soát, không gây xao nhãng. Nhiều người ADHD chia sẻ rằng tiếng ồn nâu hiệu quả hơn rõ rệt so với tiếng ồn trắng khi cần duy trì sự tập trung.',
  },
  {
    q: 'Tiếng ồn nâu khác tiếng ồn trắng ở điểm nào?',
    a: 'Tiếng ồn trắng có năng lượng đều ở mọi tần số (nghe sáng, đều, hơi "gắt"). Tiếng ồn nâu tập trung phần lớn năng lượng ở tần số thấp (nghe trầm, ấm, như tiếng ù). Về lâu dài, tiếng ồn nâu thường được đánh giá dễ chịu hơn khi nghe liên tục, vì các tần số cao gay gắt của tiếng ồn trắng dễ gây mỏi tai hơn. Tiếng ồn nâu cũng nghe tự nhiên hơn — gần giống tiếng thác nước, tiếng mưa lớn hoặc tiếng gió mạnh.',
  },
  {
    q: 'Tiếng ồn nâu khác tiếng ồn hồng (pink noise) ra sao?',
    a: 'Tiếng ồn hồng nằm giữa trắng và nâu — nhiều năng lượng tần số thấp hơn tiếng ồn trắng nhưng ít hơn tiếng ồn nâu. Tiếng ồn hồng nghe giống mưa rơi đều, vừa phải. Tiếng ồn nâu nghe trầm và mạnh hơn — như mưa lớn hoặc gió giật mạnh. Tiếng ồn hồng thường được ưa chuộng cho giấc ngủ; tiếng ồn nâu thường được ưa chuộng cho việc tập trung sâu và hỗ trợ ADHD.',
  },
  {
    q: 'Tiếng ồn nâu có giúp giảm lo âu không?',
    a: 'Nhiều người cho biết tiếng ồn nâu giúp giảm lo âu và những suy nghĩ dồn dập trong đầu. Âm thanh trầm, đều đặn tạo ra hiệu ứng giống như một "cái kén" bao bọc — một môi trường âm thanh dễ chịu giúp giảm xu hướng của não bộ luôn phải "quét" tìm nguy hiểm xung quanh. Điều này có thể một phần vì âm thanh tần số thấp, xét theo góc độ tiến hoá, thường gắn liền với những không gian kín, an toàn (hang động, trong nhà) hơn là không gian trống trải.',
  },
  {
    q: 'Có thể dùng tiếng ồn nâu để ngủ không?',
    a: 'Có. Tiếng ồn nâu thường được dùng để hỗ trợ giấc ngủ, đặc biệt với những người thấy tiếng ồn trắng quá gắt hoặc khó chịu. Âm ù trầm hơn ít gây mỏi tai hơn khi nghe suốt cả đêm. Nhiều chuyên gia về giấc ngủ khuyên dùng tiếng ồn nâu hoặc hồng thay vì tiếng ồn trắng vì lý do này.',
  },
  {
    q: 'Nghe tiếng ồn nâu trên LofiSpace có mất phí không?',
    a: 'Không. Hoàn toàn miễn phí, không quảng cáo, không giới hạn thời gian. Bộ trộn âm thanh (bao gồm mưa lớn, có tính chất gần giống tiếng ồn nâu) cùng toàn bộ nhạc lofi đều miễn phí mãi mãi.',
  },
]

const COMPARISON = [
  { label: 'Chất âm', white: 'Sáng, đều, giống tiếng "xì"', brown: 'Trầm, ấm, ù đều' },
  { label: 'Tần số cao', white: 'Mạnh', brown: 'Rất ít' },
  { label: 'Tần số thấp', white: 'Bằng với tần số cao', brown: 'Chiếm ưu thế' },
  { label: 'Mỏi tai khi nghe lâu', white: 'Cao hơn', brown: 'Thấp hơn' },
  { label: 'Hỗ trợ ADHD', white: 'Tốt', brown: 'Thường tốt hơn' },
  { label: 'Hỗ trợ giấc ngủ', white: 'Hiệu quả', brown: 'Thường tự nhiên hơn' },
  { label: 'Gần giống với', white: 'Tiếng tivi mất sóng', brown: 'Thác nước, gió mạnh' },
]

export default function TiengOnNauPage() {
  const workspaceUrl = '/workspace?at=rain:80,wind:30&pom=1&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Tiếng Ồn Nâu', url: 'https://www.focusworkspace.app/vi/tieng-on-nau' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Tiếng Ồn Nâu"
        description="Nghe tiếng ồn nâu miễn phí, giúp tập trung cho người ADHD, giảm lo âu và hỗ trợ làm việc sâu."
        url="https://www.focusworkspace.app/vi/tieng-on-nau"
        keywords={['tiếng ồn nâu', 'brown noise', 'tiếng ồn nâu adhd', 'tiếng ồn nâu tập trung']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Tiếng Ồn Nâu', url: 'https://www.focusworkspace.app/vi/tieng-on-nau' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-950/40 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-700/30">
            🟤 Tiếng ồn nâu · ADHD · Làm việc sâu · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-amber-400">Tiếng Ồn Nâu</span> Miễn Phí Online
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Âm thanh trầm, ấm giúp tập trung cho người dễ mất tập trung (ADHD), hỗ trợ
            làm việc sâu, giảm lo âu và cải thiện giấc ngủ. Kết hợp với mưa lớn, nhạc lofi
            và các âm thanh khác trong bộ trộn của chúng tôi — không quảng cáo, không cần đăng ký.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-950/40 hover:bg-amber-600 transition-colors"
            >
              Nghe Tiếng Ồn Nâu →
            </Link>
            <Link
              href="/adhd-focus-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Phòng Tập Trung ADHD
            </Link>
          </div>
        </div>

        {/* What makes brown noise different */}
        <section className="mb-16 rounded-2xl border border-amber-700/20 bg-amber-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Điều Gì Khiến Tiếng Ồn Nâu Khác Biệt</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Các loại &ldquo;tiếng ồn màu&rdquo; (trắng, hồng, nâu) đều là âm thanh ngẫu nhiên nhưng khác
              nhau ở cách năng lượng phân bổ theo tần số. Tiếng ồn trắng: năng lượng bằng nhau ở mọi
              tần số. Tiếng ồn hồng: hơi nghiêng nhiều hơn về tần số thấp. Tiếng ồn nâu: phần lớn
              năng lượng tập trung ở dải tần số thấp nhất.
            </p>
            <p>
              Sự khác biệt này tạo ra cảm nhận rất rõ rệt khi nghe. Tiếng ồn trắng nghe giống tiếng
              tivi mất sóng — sáng, sắc, đều. Tiếng ồn nâu nghe giống tiếng thác nước ở xa, gió lớn,
              hoặc tiếng ù trầm của động cơ máy bay. Chất âm ấm, trầm này khiến tiếng ồn nâu dễ chịu
              hơn rõ rệt khi nghe trong thời gian dài.
            </p>
            <p>
              Yếu tố &ldquo;dễ chịu&rdquo; này rất quan trọng. Âm thanh dùng để tập trung cần hoạt động tốt
              trong những phiên kéo dài 1-4 tiếng. Tiếng ồn trắng có thể gây mỏi tai, khiến bạn dễ
              cáu gắt hơn và giảm hiệu quả theo thời gian. Tiếng ồn nâu giữ được sự dễ chịu ngay cả
              trong các phiên dài — điều này phần nào lý giải vì sao nó được ưa chuộng cả cho tập
              trung ADHD lẫn giấc ngủ.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Tiếng Ồn Nâu So Với Tiếng Ồn Trắng</h2>
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/4">
                  <th className="py-3 px-5 text-left text-white/50 font-medium">Đặc điểm</th>
                  <th className="py-3 px-5 text-left text-white/50 font-medium">Tiếng ồn trắng</th>
                  <th className="py-3 px-5 text-left text-amber-300/80 font-medium">Tiếng ồn nâu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON.map(row => (
                  <tr key={row.label}>
                    <td className="py-3 px-5 text-white/60">{row.label}</td>
                    <td className="py-3 px-5 text-white/45">{row.white}</td>
                    <td className="py-3 px-5 text-amber-300/80">{row.brown}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-white/40 max-w-xl mx-auto leading-relaxed">
            Không loại nào &ldquo;tốt hơn&rdquo; tuyệt đối — nếu tiếng ồn trắng khiến bạn khó chịu khi
            nghe lâu, tiếng ồn nâu trầm ấm hơn là lựa chọn đáng thử.
          </p>
        </section>

        {/* Best uses */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Tổ Hợp Tiếng Ồn Nâu Tốt Nhất</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '🧠 Tập trung ADHD tối đa', recipe: 'Mưa lớn 80% + Gió 25% + Lofi 45%', desc: 'Kích thích tần số thấp tối đa cho não bộ ADHD cần "neo" cảm giác mạnh. Mưa cho độ phủ tần số rộng nhất.' },
              { title: '🎯 Kén làm việc sâu', recipe: 'Mưa lớn 90% + Gió 35%', desc: 'Thuần âm thanh nền, không nhạc. Dành cho công việc cần xử lý ngôn ngữ nhiều. Âm ù trầm tạo cảm giác như một bong bóng cách ly.' },
              { title: '😴 Mix ngủ sâu', recipe: 'Mưa 65% + Gió 45%', desc: 'Tương đương tiếng ồn nâu tự nhiên, không có cảm giác "máy móc" như tiếng ồn tổng hợp. Rất hiệu quả để dễ ngủ và ngủ sâu suốt đêm.' },
              { title: '😰 Mix giảm lo âu', recipe: 'Mưa 60% + Lửa trại 30% + Lofi 50%', desc: 'Không gian âm thanh ấm áp, bao bọc, giúp giảm trạng thái cảnh giác quá mức. Lửa trại thêm sự ấm áp, gần gũi cho hiệu ứng an toàn của mưa.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs font-mono text-amber-300/70 mb-2">{item.recipe}</p>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-950/50 to-orange-950/30 border border-amber-700/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Trải nghiệm tập trung với tiếng ồn nâu</h2>
          <p className="mb-6 text-white/55">
            Mưa lớn dựng sẵn (tương đương tiếng ồn nâu). Miễn phí mãi mãi. Không cần đăng ký.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-700 px-10 py-3 font-semibold text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-950/40"
          >
            Nghe Tiếng Ồn Nâu — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/brown-noise" />
      </div>
    </>
  )
}
