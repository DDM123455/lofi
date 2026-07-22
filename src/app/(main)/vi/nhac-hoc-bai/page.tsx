import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Nhạc Học Bài Giúp Giảm Căng Thẳng, Tăng Tập Trung',
  description:
    'Nhạc học bài miễn phí giúp giảm lo âu thi cử và tập trung lâu hơn. Lofi hip-hop, chillhop, nhạc ambient theo từng dạng bài — kết hợp sẵn Pomodoro. Không quảng cáo.',
  keywords: [
    'nhạc học bài', 'nhạc học bài tập trung', 'nhạc học bài giảm căng thẳng',
    'nhạc ôn thi', 'nhạc học bài không lời', 'nhạc lofi học bài',
    'nhạc nền học tập', 'nhạc study miễn phí',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/nhac-hoc-bai',
    languages: {
      en: 'https://www.focusworkspace.app/study-music',
      vi: 'https://www.focusworkspace.app/vi/nhac-hoc-bai',
      'x-default': 'https://www.focusworkspace.app/study-music',
    },
  },
  openGraph: {
    title: 'Nhạc Học Bài Giúp Giảm Căng Thẳng, Tăng Tập Trung | LofiSpace',
    description: 'Nhạc học bài miễn phí — giảm lo âu thi cử, tăng tập trung, kết hợp sẵn Pomodoro. Không quảng cáo.',
    url: 'https://www.focusworkspace.app/vi/nhac-hoc-bai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhạc Học Bài Giúp Giảm Căng Thẳng, Tăng Tập Trung | LofiSpace',
    description: 'Nhạc học bài miễn phí, chọn theo từng dạng bài — đọc, viết luận, toán, code.',
  },
}

const SCIENCE = [
  { title: 'Giảm lo âu và căng thẳng', body: 'Nhạc quen thuộc, dễ chịu giúp hạ nồng độ cortisol. Học sinh nghe nhạc không lời êm dịu trước và trong khi học thường báo cáo mức lo âu thi cử thấp hơn và khả năng ghi nhớ tốt hơn.' },
  { title: 'Tăng động lực và tâm trạng', body: 'Nhạc yêu thích kích hoạt dopamine, giúp bạn có động lực hơn và cảm thấy việc học "dễ chịu" hơn. Kết quả là bạn dễ ngồi vào bàn học hơn, ngồi lâu hơn, và quay lại vào ngày hôm sau.' },
  { title: 'Tạo "mỏ neo" cho việc học', body: 'Nếu bạn luôn dùng cùng một playlist khi học, não bộ dần hình thành liên kết: nghe nhạc đó là tín hiệu để vào trạng thái học tập. Đây là lý do nhiều bạn thấy dễ tập trung hơn với "nhạc học bài" cố định thay vì playlist ngẫu nhiên.' },
  { title: 'Che tiếng ồn xung quanh', body: 'Khi kết hợp với âm thanh môi trường, nhạc lofi phủ lên dải tần của những tiếng ồn gây xao nhãng — tiếng nói chuyện, xe cộ, tiếng gõ bàn phím — tạo thành một lớp "kén âm thanh" riêng cho bạn.' },
]

const COMBOS = [
  { label: '📖 Đọc sách, ôn thi', combo: 'Lofi 70% + Mưa 45% + Cà phê 25%', best: 'Đọc tài liệu, ôn bài, ghi chú' },
  { label: '💻 Học lập trình', combo: 'Synthwave lofi 70% + Thành phố 30%', best: 'Code, viết kỹ thuật, debug' },
  { label: '✍️ Viết luận, sáng tạo', combo: 'Lofi 65% + Cà phê 40% + Mưa 30%', best: 'Viết luận, brainstorm, nhật ký' },
  { label: '🧮 Toán và bài tập logic', combo: 'Lofi 55% + Mưa 50%', best: 'Toán, lý, các bài phân tích' },
]

const FAQ = [
  {
    q: 'Nghe nhạc có giúp học bài không?',
    a: 'Còn tùy loại nhạc và loại bài. Nhạc không lời — đặc biệt là lofi hip-hop, nhạc cổ điển và ambient — thường cải thiện tâm trạng và giảm lo âu khi học mà không cạnh tranh với việc xử lý ngôn ngữ. Nhạc nhiều lời dễ ảnh hưởng đến khả năng đọc hiểu và viết, vì ca từ "chen ngang" giọng nói nội tâm khi bạn đang suy nghĩ.',
  },
  {
    q: 'Nhạc nào tốt nhất để học bài?',
    a: 'Phần lớn nghiên cứu ủng hộ nhạc không lời ở âm lượng vừa phải (60-70 dB): lofi hip-hop, piano cổ điển, ambient điện tử. Các đặc điểm quan trọng: không lời, tempo ổn định (80-120 BPM là phổ biến cho playlist tập trung), và độ phức tạp vừa đủ — đủ để "giữ tai" bạn nhưng không đòi hỏi chú ý.',
  },
  {
    q: 'Nhạc lofi có tốt cho việc học không?',
    a: 'Có — lofi hip-hop là thể loại phổ biến nhất để học bài không phải ngẫu nhiên. Các đặc điểm của nó phù hợp với sự tập trung: tempo khoảng 60-90 BPM (gần với nhịp tim khi thư giãn), hòa âm chịu ảnh hưởng jazz đủ thú vị để không nhàm chán, và chất âm "mộc" đặc trưng mà nhiều người thấy dễ chịu, không gây mệt mỏi khi nghe lâu.',
  },
  {
    q: 'Hiệu ứng Mozart là gì?',
    a: 'Hiệu ứng Mozart là quan niệm phổ biến rằng nghe nhạc Mozart tạm thời tăng khả năng tư duy không gian. Nghiên cứu gốc (Rauscher và cộng sự, 1993) có phạm vi rất hẹp và chưa được tái lặp một cách đáng tin cậy. Điều rút ra rộng hơn: nhạc mà bạn thấy dễ chịu có thể tăng tâm trạng và động lực, từ đó gián tiếp cải thiện kết quả học tập — chứ không có thể loại nhạc "thần kỳ" nào khiến bạn thông minh hơn.',
  },
  {
    q: 'Nên dùng tai nghe hay loa khi học bài?',
    a: 'Tai nghe thường tốt hơn khi học ở không gian chung — chặn tiếng ồn bên ngoài và giúp bạn kiểm soát môi trường âm thanh của riêng mình. Tai nghe chụp tai (over-ear) đỡ mỏi hơn tai nghe nhét tai khi dùng lâu. Nên giữ âm lượng ở mức 65-70 dB trở xuống (tương đương một cuộc trò chuyện bình thường) để bảo vệ thính giác trong những buổi học dài.',
  },
  {
    q: 'Nhạc học bài trên LofiSpace có miễn phí không?',
    a: 'Có, hoàn toàn miễn phí. Không cần tài khoản, không trả phí, không cần tải về. LofiSpace phát các playlist lofi được chọn lọc và cho phép bạn trộn cùng âm thanh môi trường — tất cả ngay trên trình duyệt.',
  },
]

export default function NhacHocBaiPage() {
  const workspaceUrl = '/workspace?ls=lofi1&lv=70&at=rain:40,cafe:25&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Nhạc Học Bài', url: 'https://www.focusworkspace.app/vi/nhac-hoc-bai' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Nhạc Học Bài"
        description="Nhạc học bài miễn phí giúp giảm lo âu thi cử và tăng tập trung. Lofi hip-hop, chillhop, ambient theo từng dạng bài."
        url="https://www.focusworkspace.app/vi/nhac-hoc-bai"
        keywords={['nhạc học bài', 'nhạc ôn thi', 'nhạc lofi học bài', 'nhạc học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Nhạc Học Bài', url: 'https://www.focusworkspace.app/vi/nhac-hoc-bai' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🎧 Nhạc lofi · Trộn âm thanh · Miễn phí · Không đăng ký
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Nhạc Học Bài Giúp <span className="text-violet-400">Giảm Căng Thẳng &amp; Tăng Tập Trung</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Lofi hip-hop và chill beats được chọn lọc, giúp tăng tập trung và giảm lo âu khi học.
            Trộn nhạc với âm thanh môi trường — tiếng mưa, tiếng quán cà phê — trong bộ trộn tương
            tác miễn phí. Không quảng cáo, không đăng ký, không cần tải về.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Nghe Nhạc Học Bài Ngay →
            </Link>
            <Link
              href="/vi/nhac-lofi-hoc-bai"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Toàn Bộ Nhạc Lofi
            </Link>
          </div>
        </div>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Vì Sao Nhạc Học Bài Giúp Giảm Lo Âu Và Tăng Tập Trung</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SCIENCE.map(s => (
              <div key={s.title}>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Combos */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Combo Nhạc Học Bài Theo Từng Dạng Bài</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMBOS.map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-violet-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/10 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng học bài với nhạc phù hợp?</h2>
          <p className="mb-6 text-white/55">Miễn phí mãi mãi. Không cần tài khoản. Mở trong 10 giây.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Nghe Nhạc Học Bài — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/study-music" />
      </div>
    </>
  )
}
