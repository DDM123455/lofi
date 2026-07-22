import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Tiếng Mưa Học Bài Miễn Phí — Âm Thanh Mưa Rơi Giúp Tập Trung, Thư Giãn',
  description:
    'Nghe tiếng mưa học bài trực tuyến, miễn phí. Kết hợp tiếng mưa với nhạc lofi và đồng hồ Pomodoro để tập trung sâu hơn, thư giãn tinh thần khi học và làm việc.',
  keywords: [
    'tiếng mưa học bài', 'tiếng mưa tập trung', 'âm thanh mưa rơi', 'tiếng mưa thư giãn',
    'nghe tiếng mưa online', 'tiếng mưa để ngủ', 'rain sounds tiếng việt',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/tieng-mua-hoc-bai',
    languages: {
      'en': 'https://www.focusworkspace.app/rain-sounds',
      'vi': 'https://www.focusworkspace.app/vi/tieng-mua-hoc-bai',
      'x-default': 'https://www.focusworkspace.app/rain-sounds',
    },
  },
  openGraph: {
    title: 'Tiếng Mưa Học Bài Miễn Phí | LofiSpace',
    description: 'Nghe tiếng mưa rơi kết hợp nhạc lofi và Pomodoro để tập trung học bài, thư giãn tinh thần.',
    url: 'https://www.focusworkspace.app/vi/tieng-mua-hoc-bai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiếng Mưa Học Bài Miễn Phí | LofiSpace',
    description: 'Âm thanh mưa rơi kết hợp nhạc lofi và đồng hồ Pomodoro. Miễn phí, không quảng cáo.',
  },
}

const FAQ = [
  {
    q: 'Vì sao tiếng mưa lại giúp tập trung học bài?',
    a: 'Tiếng mưa thuộc nhóm âm thanh có phổ tần đều và ổn định (gần giống white noise), nên nó có khả năng "che" những tiếng động bất ngờ xung quanh — tiếng cửa đóng, tiếng xe cộ, tiếng người nói chuyện. Não bộ vốn rất nhạy với âm thanh đột ngột (đó là bản năng sinh tồn), nhưng lại dễ dàng "lờ đi" một âm thanh liên tục, đều đặn như tiếng mưa rơi. Nhờ vậy, bạn ít bị giật mình mất tập trung hơn khi có lớp âm thanh mưa làm nền.',
  },
  {
    q: 'Tiếng mưa có giúp thư giãn không hay chỉ để tập trung?',
    a: 'Cả hai. Với nhiều người, tiếng mưa còn gắn với cảm giác an toàn, ấm cúng (như ngồi trong nhà nhìn mưa rơi ngoài cửa sổ), nên ngoài tác dụng che tiếng ồn, nó còn giúp hạ nhịp tim, giảm căng thẳng — rất phù hợp để thư giãn sau giờ học hoặc trước khi ngủ.',
  },
  {
    q: 'Khi nào nên dùng tiếng mưa?',
    a: 'Tiếng mưa phù hợp khi bạn cần tập trung sâu trong môi trường có nhiều tiếng ồn không kiểm soát được (ở nhà đông người, quán cà phê ồn, phòng trọ sát đường lớn), khi đọc sách cần sự yên tĩnh có kiểm soát, hoặc đơn giản là khi muốn thư giãn, giảm căng thẳng trước khi ngủ.',
  },
  {
    q: 'Nên kết hợp tiếng mưa với gì để học hiệu quả hơn?',
    a: 'Combo phổ biến nhất là tiếng mưa + nhạc lofi + đồng hồ Pomodoro. Tiếng mưa che tiếng ồn, nhạc lofi tạo giai điệu nhẹ nhàng dễ chịu, còn Pomodoro giữ kỷ luật thời gian học. Bạn có thể chỉnh mưa ở mức 50-70%, lofi khoảng 40-50%, rồi bật Pomodoro chu kỳ 25/5 để bắt đầu.',
  },
  {
    q: 'Tiếng mưa và tiếng ồn trắng (white noise) khác nhau thế nào khi đọc sách?',
    a: 'Tiếng mưa có kết cấu tự nhiên hơn — âm lượng lên xuống nhẹ theo từng cơn, nên dễ chịu và ít gây "mệt tai" khi nghe lâu. Tiếng ồn trắng đều tuyệt đối, che tiếng ồn mạnh hơn nhưng với một số người nghe lâu có thể hơi đơn điệu. Khi đọc sách trong không gian yên tĩnh, nhiều người thích mưa nhẹ hơn; khi cần che tiếng ồn lớn (xây dựng, giao thông), tiếng ồn trắng hoặc kết hợp cả hai sẽ hiệu quả hơn.',
  },
  {
    q: 'Nghe tiếng mưa học bài trên LofiSpace có mất phí không?',
    a: 'Không. Âm thanh mưa và toàn bộ các âm thanh nền khác trên LofiSpace đều miễn phí, phát liên tục, không quảng cáo, không cần đăng ký tài khoản.',
  },
]

export default function TiengMuaHocBaiPage() {
  const workspaceUrl = '/workspace?at=rain:70&pom=1&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Tiếng Mưa Học Bài', url: 'https://www.focusworkspace.app/vi/tieng-mua-hoc-bai' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Tiếng Mưa Học Bài"
        description="Nghe tiếng mưa học bài miễn phí, kết hợp nhạc lofi và đồng hồ Pomodoro để tập trung sâu hơn."
        url="https://www.focusworkspace.app/vi/tieng-mua-hoc-bai"
        keywords={['tiếng mưa học bài', 'tiếng mưa tập trung', 'âm thanh mưa rơi', 'rain sounds']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Tiếng Mưa Học Bài', url: 'https://www.focusworkspace.app/vi/tieng-mua-hoc-bai' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-teal-900/30 px-4 py-1 text-sm text-teal-300 ring-1 ring-teal-500/20">
            🌧️ Âm thanh mưa rơi · Che tiếng ồn · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-teal-400">Tiếng Mưa Học Bài</span> — Tập Trung & Thư Giãn
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Nghe tiếng mưa rơi trực tuyến, kết hợp sẵn nhạc lofi và đồng hồ Pomodoro
            trong cùng một không gian. Tiếng mưa che lấp tiếng ồn xung quanh, giúp bạn
            tập trung học bài sâu hơn và thư giãn tinh thần sau mỗi phiên học.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-900/40 hover:bg-teal-500 transition-colors"
            >
              Nghe Tiếng Mưa Ngay →
            </Link>
            <Link
              href="/vi/am-thanh-trang-tap-trung"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Thử Tiếng Ồn Trắng
            </Link>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-16 rounded-2xl border border-teal-500/15 bg-teal-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì sao tiếng mưa giúp tập trung và thư giãn?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Não bộ con người phản ứng rất nhạy với những âm thanh bất ngờ — đó là bản năng cảnh
              giác còn sót lại từ tổ tiên. Mỗi lần có tiếng động lạ (cửa đóng, chuông điện thoại,
              tiếng người nói lớn), một phần sự chú ý của bạn bị &ldquo;kéo&rdquo; ra khỏi việc đang làm để kiểm
              tra xem có nguy hiểm gì không, dù chỉ trong tích tắc.
            </p>
            <p>
              Tiếng mưa có phổ âm thanh đều và liên tục, tương tự tiếng ồn trắng, nên nó tạo ra một
              lớp &ldquo;nền&rdquo; ổn định giúp che lấp những tiếng động bất ngờ đó. Khi tiếng ồn đột ngột bị
              làm mờ đi trong lớp tiếng mưa, não bộ ít bị giật mình hơn, nhờ vậy duy trì được trạng
              thái tập trung lâu hơn. Ngoài ra, tiếng mưa còn gắn với cảm giác an toàn, ấm cúng quen
              thuộc, nên nó vừa giúp tập trung vừa giúp thư giãn — một sự kết hợp khá hiếm ở các loại âm thanh nền khác.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Khi nào nên dùng tiếng mưa?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '🏠 Học ở nhà đông người', desc: 'Tiếng mưa che tiếng TV, tiếng nói chuyện của người thân, giúp bạn tập trung dù không ở một mình.' },
              { title: '📚 Đọc sách cần sự yên tĩnh', desc: 'Mưa nhẹ tạo không gian tĩnh lặng có kiểm soát, dễ chịu hơn sự im lặng tuyệt đối dễ gây buồn ngủ.' },
              { title: '🌆 Ở gần đường lớn, công trình xây dựng', desc: 'Kết hợp mưa với tiếng ồn trắng để che hiệu quả các âm thanh lớn, không đều từ bên ngoài.' },
              { title: '😴 Thư giãn, chuẩn bị ngủ', desc: 'Sau một buổi học căng thẳng, tiếng mưa nhẹ giúp hạ nhịp tim và tinh thần dễ chịu hơn trước khi nghỉ ngơi.' },
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
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Gợi ý setup mưa + lofi + Pomodoro</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            <p>
              Một trong những combo được dùng nhiều nhất trong workspace của LofiSpace là: tiếng mưa
              ở mức 60-70%, <Link href="/vi/nhac-lofi-hoc-bai" className="text-teal-300 hover:text-teal-200">nhạc lofi</Link> khoảng
              40-50%, sau đó bật <Link href="/vi/dong-ho-pomodoro" className="text-teal-300 hover:text-teal-200">đồng hồ Pomodoro</Link> theo
              chu kỳ 25/5. Mưa lo phần che tiếng ồn, lofi tạo giai điệu nhẹ nhàng, còn Pomodoro giữ
              bạn có kỷ luật thời gian rõ ràng.
            </p>
            <p>
              Nếu môi trường xung quanh quá ồn (gần đường lớn, công trình xây dựng), bạn có thể tăng
              thêm lớp <Link href="/vi/am-thanh-trang-tap-trung" className="text-teal-300 hover:text-teal-200">tiếng ồn trắng</Link> song
              song với mưa để tăng hiệu quả che tiếng ồn — cả hai đều có sẵn trong cùng một bảng điều
              khiển âm thanh của LofiSpace, không cần mở thêm ứng dụng khác.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-teal-900/40 to-blue-900/20 border border-teal-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bật tiếng mưa và bắt đầu tập trung</h2>
          <p className="mb-6 text-white/55">Miễn phí, kết hợp sẵn nhạc lofi và đồng hồ Pomodoro.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-teal-600 px-10 py-3 font-semibold text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/30"
          >
            Mở Không Gian Làm Việc →
          </Link>
        </div>

        <RelatedPages exclude="/rain-sounds" />
      </div>
    </>
  )
}
