import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Âm Thanh Mưa Bão Miễn Phí — Ngủ Ngon & Tập Trung Sâu',
  description:
    'Nghe âm thanh mưa bão miễn phí để ngủ ngon, tập trung sâu và thư giãn. Mưa lớn cùng tiếng sấm xa kết hợp nhạc lofi. Không cần đăng ký.',
  keywords: [
    'âm thanh mưa bão', 'tiếng mưa bão để ngủ', 'tiếng sấm sét thư giãn', 'mưa bão tập trung',
    'thunderstorm sounds tiếng việt', 'âm thanh giông bão', 'tiếng mưa và sấm', 'mưa bão online',
    'âm thanh mưa bão miễn phí', 'tiếng mưa to có sấm',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/am-thanh-mua-bao',
    languages: {
      en: 'https://www.focusworkspace.app/thunderstorm-sounds',
      vi: 'https://www.focusworkspace.app/vi/am-thanh-mua-bao',
      'x-default': 'https://www.focusworkspace.app/thunderstorm-sounds',
    },
  },
  openGraph: {
    title: 'Âm Thanh Mưa Bão Miễn Phí | LofiSpace',
    description: 'Mưa lớn và tiếng sấm xa giúp ngủ ngon hoặc tập trung sâu. Kết hợp nhạc lofi. Miễn phí.',
    url: 'https://www.focusworkspace.app/vi/am-thanh-mua-bao',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Âm Thanh Mưa Bão Miễn Phí | LofiSpace',
    description: 'Mưa lớn và sấm sét trực tuyến — cho giấc ngủ sâu hoặc tập trung cao độ.',
  },
}

const FAQ = [
  {
    q: 'Vì sao âm thanh mưa bão lại giúp ngủ ngon?',
    a: 'Âm thanh mưa bão kết hợp hai yếu tố hỗ trợ giấc ngủ mạnh mẽ: tiếng ồn phổ rộng (mưa) che đi các tiếng động môi trường xung quanh, và âm ù tần số thấp (sấm) có tác dụng làm dịu về mặt sinh lý. Kiểu âm thanh liên tục này, xét theo góc độ tiến hoá, gắn liền với việc trú ẩn an toàn — tổ tiên chúng ta có thể ngừng cảnh giác khi trời đang mưa lớn bên ngoài. Đây là lý do vì sao âm thanh ASMR mưa bão lại hiệu quả đến vậy cho giấc ngủ.',
  },
  {
    q: 'Âm thanh mưa bão có tốt cho việc tập trung và học tập không?',
    a: 'Có — đặc biệt hiệu quả cho công việc cần tập trung sâu hoặc chạy deadline gấp. Cường độ mạnh mẽ, đầy kịch tính của một cơn mưa bão vừa tạo cảm giác cấp bách, vừa che đi các yếu tố gây xao nhãng. Mưa lớn cho khả năng che phủ gần như tiếng ồn trắng, trong khi tiếng sấm xa thêm một lớp "neo" tần số thấp mà nhiều người thấy rất có ích cho việc duy trì tập trung lâu dài.',
  },
  {
    q: 'Âm thanh mưa bão có giúp ích cho người ADHD không?',
    a: 'Nhiều người ADHD chia sẻ rằng âm thanh mưa bão hiệu quả hơn cả tiếng mưa thông thường. Sự kết hợp giữa tiếng ồn phổ rộng (che xao nhãng) và nội dung tần số thấp (kích thích nền tương tự tiếng ồn nâu) đáp ứng đúng nhu cầu kích thích của não bộ ADHD mà không tạo ra nội dung dễ hiểu hoặc gây phân tâm.',
  },
  {
    q: 'Nên chọn tiếng mưa thường hay mưa bão để ngủ?',
    a: 'Cả hai đều hiệu quả, nhưng âm thanh mưa bão thường phù hợp hơn với những người thấy tiếng mưa đơn thuần chưa đủ để che tiếng ồn xung quanh. Năng lượng tần số thấp bổ sung từ tiếng sấm bao phủ nhiều hơn dải âm, tạo hiệu ứng che tiếng ồn sâu hơn. Với người ngủ nhạy, dễ tỉnh giấc trong môi trường ồn ào, âm thanh mưa bão ở mức âm lượng vừa phải thường hiệu quả hơn.',
  },
  {
    q: 'Có thể kết hợp âm thanh mưa bão với nhạc không?',
    a: 'Có, nhưng nên để âm lượng nhạc thấp hơn bình thường một chút. Một tổ hợp được nhiều người ưa thích: Mưa lớn 70% + Sấm 55% + Nhạc lofi 45%. Nhạc tạo cấu trúc nhưng không khí giông bão vẫn là chủ đạo. Nhiều người thích nghe mưa bão không có nhạc khi ngủ, nhưng thêm một chút lofi âm lượng thấp khi cần tập trung làm việc.',
  },
  {
    q: 'Nghe âm thanh mưa bão trên LofiSpace có mất phí không?',
    a: 'Không. Hoàn toàn miễn phí, không cần tài khoản, không cần tải ứng dụng. Âm thanh mưa bão cùng toàn bộ bộ trộn âm thanh chạy trên mọi trình duyệt, không giới hạn thời gian.',
  },
]

const TYPES = [
  { emoji: '⛈️', label: 'Bão lớn dữ dội', desc: 'Mưa mạnh cùng tiếng sấm gần, dồn dập. Khả năng che tiếng ồn tối đa — tốt nhất cho công việc deadline và môi trường rất ồn.' },
  { emoji: '🌩️', label: 'Sấm sét xa', desc: 'Mưa nhẹ với tiếng sấm rền từ xa. Không khí kịch tính nhưng không quá mạnh — phù hợp cho công việc sáng tạo.' },
  { emoji: '🌧️', label: 'Mưa kèm sấm thỉnh thoảng', desc: 'Chủ yếu là mưa, thỉnh thoảng có tiếng sấm vọng lại. Cân bằng — phù hợp cả khi ngủ lẫn học tập.' },
  { emoji: '🏠', label: 'Mưa bão nghe từ trong nhà', desc: 'Tiếng bão nghe từ bên trong — bị tường và cửa sổ làm mờ bớt. An toàn, ấm cúng. Âm thanh ngủ kinh điển.' },
  { emoji: '🌲', label: 'Mưa bão trong rừng', desc: 'Bão giữa rừng cây — mưa rơi trên lá, sấm xa, gió luồn qua tán cây. Âm thanh thiên nhiên sống động, cuốn hút.' },
  { emoji: '🎧', label: 'Mưa bão + lofi', desc: 'Mưa bão hoà cùng nhạc lofi hip-hop. Sự tương phản mạnh mẽ tạo ra môi trường tập trung cường độ cao.' },
]

export default function AmThanhMuaBaoPage() {
  const workspaceUrl = '/workspace?at=thunder:60,rain:75&ls=lofi1&lv=45&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Âm Thanh Mưa Bão', url: 'https://www.focusworkspace.app/vi/am-thanh-mua-bao' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Âm Thanh Mưa Bão"
        description="Nghe âm thanh mưa bão miễn phí để ngủ ngon, tập trung sâu và thư giãn. Mưa lớn và sấm sét trong bộ trộn âm thanh tương tác."
        url="https://www.focusworkspace.app/vi/am-thanh-mua-bao"
        keywords={['âm thanh mưa bão', 'tiếng mưa bão để ngủ', 'thunderstorm sounds', 'tiếng sấm sét']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Âm Thanh Mưa Bão', url: 'https://www.focusworkspace.app/vi/am-thanh-mua-bao' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            ⛈️ Mưa lớn · Sấm sét · Bộ trộn âm thanh · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Âm Thanh Mưa Bão Cho <span className="text-indigo-400">Giấc Ngủ & Tập Trung Sâu</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Âm thanh mưa bão miễn phí — mưa lớn hoà cùng tiếng sấm xa — tạo thành một &ldquo;kén
            âm thanh&rdquo; mạnh mẽ cho giấc ngủ hoặc những phiên làm việc cần tập trung cao độ.
            Kết hợp cơn bão với nhạc lofi trong bộ trộn tương tác. Không cần đăng ký.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-indigo-700 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-600 transition-colors"
            >
              Nghe Mưa Bão Ngay →
            </Link>
            <Link
              href="/vi/tieng-mua-hoc-bai"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Tiếng Mưa Thường
            </Link>
          </div>
        </div>

        {/* Types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Các Kiểu Âm Thanh Mưa Bão</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TYPES.map(t => (
              <div key={t.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{t.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{t.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Vì Sao Mưa Bão Mạnh Mẽ Cho Cả Giấc Ngủ Lẫn Tập Trung</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Che tiếng ồn phổ rộng từ mưa</h3>
              <p>Mưa lớn phủ toàn bộ dải tần số — từ tiếng ù trầm của xe cộ xa đến tiếng bíp cao của thông báo điện thoại. Đây là một trong những âm thanh tự nhiên có khả năng che tiếng ồn mạnh nhất, có thể sánh ngang các máy tạo tiếng ồn chuyên dụng.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Cảm giác &ldquo;neo&rdquo; tần số thấp từ tiếng sấm</h3>
              <p>Các thành phần hạ âm và tần số thấp của tiếng sấm có tác dụng làm dịu sinh lý có thể đo lường được, tương tự tiếng ồn nâu. Âm ù trầm này được cơ thể xử lý như một dạng rung động, không chỉ đơn thuần là âm thanh — điều này có thể giải thích cho hiệu ứng thư giãn đặc biệt của nó.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Tín hiệu an toàn từ nơi trú ẩn</h3>
              <p>Xét theo góc độ tiến hoá, ở trong nhà lúc trời bão có nghĩa là bạn đang an toàn và có thể yên tâm thư giãn. Âm thanh bão nghe từ bên trong kích hoạt &ldquo;phản ứng trú ẩn&rdquo; này — một cảm giác an toàn sâu sắc, mang tính bản năng, giúp hạ thấp mức độ cảnh giác và chuẩn bị cơ thể cho việc nghỉ ngơi.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Cảm giác cấp bách cho công việc sâu</h3>
              <p>Cường độ kịch tính của một cơn mưa bão tạo ra cảm giác cấp bách về mặt tâm lý mà nhiều người thấy hữu ích cho công việc chạy deadline. Không khí xung quanh khớp với trạng thái cảm xúc của sự tập trung cao độ, căng thẳng tích cực — tạo thành một vòng lặp tự củng cố sự tập trung.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Những Tổ Hợp Âm Thanh Mưa Bão Tốt Nhất</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '😴 Mix ngủ ngon', combo: 'Mưa lớn 75% + Sấm 60%', best: 'Dễ ngủ, mất ngủ, môi trường ồn ào' },
              { label: '⚡ Mix tập trung sâu', combo: 'Sấm 60% + Mưa 75% + Lofi 45%', best: 'Deadline, bài toán khó, học tập cường độ cao' },
              { label: '✍️ Mix viết lách sáng tạo', combo: 'Sấm xa 45% + Mưa 65% + Lofi 60%', best: 'Viết lách, viết nhật ký, công việc sáng tạo' },
              { label: '🧘 Mix thư giãn', combo: 'Bão trong nhà 55% + Mưa 50%', best: 'Thư giãn, thiền định, giảm lo âu' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-indigo-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-violet-900/20 border border-indigo-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Để cơn bão đưa bạn vào trạng thái tập trung</h2>
          <p className="mb-6 text-white/55">Miễn phí mãi mãi. Không cần tài khoản. Chạy trên mọi trình duyệt. Mở trong 10 giây.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-indigo-700 px-10 py-3 font-semibold text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-900/30"
          >
            Nghe Mưa Bão — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/thunderstorm-sounds" />
      </div>
    </>
  )
}
