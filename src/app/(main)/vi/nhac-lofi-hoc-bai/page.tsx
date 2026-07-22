import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Nhạc Lofi Học Bài Miễn Phí — Nghe Trực Tuyến Giúp Tập Trung',
  description:
    'Nghe nhạc lofi học bài miễn phí, không quảng cáo. Kết hợp sẵn tiếng mưa, tiếng quán cà phê và đồng hồ Pomodoro để tập trung học tập, làm việc hiệu quả hơn.',
  keywords: [
    'nhạc lofi học bài', 'nhạc lofi tập trung', 'lofi hip hop tiếng việt', 'nhạc không lời học bài',
    'nhạc study lofi', 'nghe nhạc lofi online', 'nhạc nền học tập',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai',
    languages: {
      'en': 'https://www.focusworkspace.app/lofi-music',
      'vi': 'https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai',
      'x-default': 'https://www.focusworkspace.app/lofi-music',
    },
  },
  openGraph: {
    title: 'Nhạc Lofi Học Bài Miễn Phí | LofiSpace',
    description: 'Nghe nhạc lofi học bài trực tuyến, kết hợp tiếng mưa và đồng hồ Pomodoro. Miễn phí, không quảng cáo.',
    url: 'https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhạc Lofi Học Bài Miễn Phí | LofiSpace',
    description: 'Nghe nhạc lofi, tiếng mưa và Pomodoro trong cùng một không gian học tập.',
  },
}

const FAQ = [
  {
    q: 'Nhạc lofi là gì?',
    a: 'Lofi (viết tắt của "low fidelity") là dòng nhạc có nhịp điệu chậm rãi, âm thanh hơi "mộc", thường không lời hoặc chỉ có tiếng hát mờ nhạt ở nền, kèm theo tiếng nhiễu vinyl đặc trưng. Beat lofi thường lặp lại đều đặn, không có cao trào bất ngờ — chính đặc điểm này khiến nó trở thành nhạc nền lý tưởng để học bài, làm việc mà không bị cuốn theo giai điệu.',
  },
  {
    q: 'Vì sao nhạc lofi giúp tập trung học bài tốt hơn nhạc có lời?',
    a: 'Khi nghe nhạc có lời, một phần não bộ của bạn (đặc biệt là vùng xử lý ngôn ngữ) buộc phải xử lý ca từ, điều này cạnh tranh trực tiếp với việc đọc hoặc viết — vốn cũng cần vùng ngôn ngữ đó. Nhạc lofi không lời (hoặc lời rất mờ) tránh được xung đột này, đồng thời tempo chậm và đều giúp nhịp tim, nhịp thở ổn định hơn, hỗ trợ trạng thái tập trung kéo dài.',
  },
  {
    q: 'Khi nào nên nghe nhạc lofi?',
    a: 'Lofi phù hợp nhất với các công việc cần sự tập trung ổn định trong thời gian dài: đọc sách, làm bài tập, viết luận, code, hoặc ôn thi. Với công việc cần sáng tạo đột phá (brainstorm, viết content), một số người lại thấy im lặng hoàn toàn hoặc nhạc không có nhịp cố định phù hợp hơn — bạn nên thử để tìm ra cách hợp với mình.',
  },
  {
    q: 'Có thể kết hợp nhạc lofi với âm thanh khác không?',
    a: 'Có. Trong LofiSpace, bạn có thể phát nhạc lofi cùng lúc với tiếng mưa, tiếng quán cà phê hoặc tiếng lửa cháy, mỗi loại có thanh trượt âm lượng riêng. Combo phổ biến nhất là nhạc lofi 50-60% kết hợp tiếng mưa nhẹ 20-30% — vừa có giai điệu, vừa có lớp âm thanh nền che tiếng ồn xung quanh.',
  },
  {
    q: 'Nghe nhạc lofi học bài có mất phí không?',
    a: 'Không, nhạc lofi trên LofiSpace hoàn toàn miễn phí, phát liên tục không quảng cáo chen ngang, không cần đăng nhập.',
  },
  {
    q: 'Có nên vừa nghe lofi vừa dùng Pomodoro không?',
    a: 'Rất nên. Nhạc lofi giữ không khí học bài dễ chịu trong suốt phiên, còn đồng hồ Pomodoro giữ kỷ luật thời gian. Hai công cụ này bổ trợ nhau: bạn tập trung 25 phút với nhạc lofi làm nền, sau đó nghỉ 5 phút, lặp lại. Đây cũng chính là cách workspace của LofiSpace được thiết kế để dùng.',
  },
]

export default function NhacLofiHocBaiPage() {
  const workspaceUrl = '/workspace?ls=lofi1&at=rain:45,cafe:20&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Nhạc Lofi Học Bài', url: 'https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Nhạc Lofi Học Bài"
        description="Nghe nhạc lofi học bài miễn phí, kết hợp tiếng mưa, tiếng quán cà phê và đồng hồ Pomodoro."
        url="https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai"
        keywords={['nhạc lofi học bài', 'nhạc lofi tập trung', 'lofi hip hop', 'nhạc học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Nhạc Lofi Học Bài', url: 'https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-900/30 px-4 py-1 text-sm text-blue-300 ring-1 ring-blue-500/20">
            🎵 Nhạc lofi 24/7 · Không quảng cáo · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-blue-400">Nhạc Lofi Học Bài</span> — Tập Trung Ngay Từ Phút Đầu
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Nghe nhạc lofi hip hop chill trực tuyến, kết hợp sẵn tiếng mưa, tiếng quán
            cà phê và đồng hồ Pomodoro trong cùng một không gian — giúp bạn học bài,
            làm việc tập trung mà không bị phân tâm bởi lời bài hát hay quảng cáo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-colors"
            >
              Nghe Nhạc Lofi Ngay →
            </Link>
            <Link
              href="/vi/dong-ho-pomodoro"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Kết Hợp Với Pomodoro
            </Link>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-16 rounded-2xl border border-blue-500/15 bg-blue-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Nhạc lofi là gì và vì sao nó giúp tập trung?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              &ldquo;Lofi&rdquo; là viết tắt của &ldquo;low fidelity&rdquo; — dòng nhạc có âm thanh hơi mộc, nhịp beat
              chậm rãi và lặp lại đều đặn, thường không lời hoặc chỉ có giọng hát rất mờ ở tầng nền.
              Đặc trưng dễ nhận ra nhất là tiếng &ldquo;rè&rdquo; nhẹ như đĩa than, tạo cảm giác ấm áp, hoài niệm.
            </p>
            <p>
              Về mặt nhận thức, nhạc có lời khiến não bộ phải xử lý ngôn ngữ song song với việc đọc
              hoặc viết — hai tác vụ này dùng chung một vùng não nên dễ gây xung đột, khiến bạn đọc
              đi đọc lại một câu mà không hiểu. Nhạc lofi vì không lời (hoặc lời quá mờ để nghe rõ)
              nên tránh được xung đột này, trong khi tempo đều đặn của nó vẫn tạo ra nhịp điệu giúp
              não bộ duy trì trạng thái tỉnh táo, không bị &ldquo;trôi&rdquo; vào sự tĩnh lặng tuyệt đối dễ gây buồn ngủ.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Khi nào nên nghe nhạc lofi?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '📖 Đọc sách, ôn thi', desc: 'Lofi giúp duy trì nhịp đọc ổn định trong thời gian dài mà không gây xao nhãng như nhạc có lời.' },
              { title: '✍️ Viết luận, làm báo cáo', desc: 'Nhịp điệu đều đặn của lofi hỗ trợ dòng suy nghĩ liền mạch, tránh bị ngắt quãng bởi cao trào âm nhạc.' },
              { title: '💻 Code, làm việc máy tính', desc: 'Nhiều lập trình viên chọn lofi vì nó "nền" đủ để lấp khoảng lặng nhưng không đòi hỏi sự chú ý.' },
              { title: '🌙 Học khuya, làm việc muộn', desc: 'Âm lượng vừa phải, giai điệu nhẹ nhàng phù hợp với không gian yên tĩnh ban đêm.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Kết hợp lofi với tiếng mưa, tiếng cà phê và to-do list</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            <p>
              Nhạc lofi một mình đã tốt, nhưng ghép thêm một lớp âm thanh môi trường như <Link href="/vi/tieng-mua-hoc-bai" className="text-blue-300 hover:text-blue-200">tiếng mưa</Link> hoặc
              tiếng quán cà phê thường tạo hiệu quả tập trung cao hơn — vì lớp âm thanh nền này giúp
              che lấp những tiếng động bất ngờ xung quanh nhà (tiếng cửa đóng, tiếng người nói chuyện)
              mà bản thân nhạc lofi không xử lý được.
            </p>
            <p>
              Trong workspace của LofiSpace, bạn có thể phát nhạc lofi cùng lúc với tiếng mưa và tiếng
              cà phê, mỗi loại chỉnh âm lượng riêng, rồi ghi ra danh sách việc cần làm và bật <Link href="/vi/dong-ho-pomodoro" className="text-blue-300 hover:text-blue-200">đồng hồ Pomodoro</Link> để
              chia nhỏ buổi học thành từng phiên 25 phút. Đây là bộ công cụ đầy đủ nhất để bắt đầu một
              buổi học tập trung mà không cần mở thêm bất kỳ tab hay app nào khác.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-blue-900/40 to-violet-900/20 border border-blue-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bật nhạc lofi và bắt đầu học ngay</h2>
          <p className="mb-6 text-white/55">Miễn phí, không quảng cáo, phát liên tục cùng tiếng mưa và Pomodoro.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-blue-600 px-10 py-3 font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
          >
            Mở Không Gian Làm Việc →
          </Link>
        </div>

        <RelatedPages exclude="/lofi-music" />
      </div>
    </>
  )
}
