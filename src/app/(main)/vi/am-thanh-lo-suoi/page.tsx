import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Âm Thanh Lò Sưởi Miễn Phí — Ấm Cúng Cho Học Tập & Thư Giãn',
  description:
    'Nghe âm thanh lò sưởi miễn phí — tiếng lửa nổ lách tách ấm áp cho học tập và thư giãn. Kết hợp nhạc lofi. Không cần đăng ký.',
  keywords: [
    'âm thanh lò sưởi', 'tiếng lửa nổ lách tách', 'âm thanh lửa trại ấm cúng',
    'fireplace sounds tiếng việt', 'âm thanh lò sưởi học bài', 'tiếng lửa cháy thư giãn',
    'âm thanh lò sưởi miễn phí', 'âm thanh mùa đông ấm cúng',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/am-thanh-lo-suoi',
    languages: {
      en: 'https://www.focusworkspace.app/fireplace-sounds',
      vi: 'https://www.focusworkspace.app/vi/am-thanh-lo-suoi',
      'x-default': 'https://www.focusworkspace.app/fireplace-sounds',
    },
  },
  openGraph: {
    title: 'Âm Thanh Lò Sưởi Miễn Phí | LofiSpace',
    description: 'Tiếng lửa nổ lách tách ấm áp tạo không gian học tập ấm cúng. Kết hợp nhạc lofi. Miễn phí.',
    url: 'https://www.focusworkspace.app/vi/am-thanh-lo-suoi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Âm Thanh Lò Sưởi Miễn Phí | LofiSpace',
    description: 'Âm thanh lò sưởi trực tuyến — lửa nổ lách tách cho những phiên học ấm cúng.',
  },
}

const FAQ = [
  {
    q: 'Vì sao âm thanh lò sưởi lại thư giãn đến vậy?',
    a: 'Âm thanh lò sưởi đánh thức nhiều giác quan và bản năng tiến hoá sâu xa cùng lúc. Các nhà nhân chủng học tin rằng con người đã quây quần bên đống lửa suốt khoảng 400.000 năm — đây là một trong những nghi thức xã hội cổ xưa nhất của loài người. Tiếng lửa nổ lách tách, kể cả khi chỉ là bản ghi âm, cũng kích hoạt một "phản ứng bên bếp lửa": hạ huyết áp, thư giãn cơ bắp và tăng cảm giác kết nối xã hội. Đây là một trong những âm thanh mang tính xoa dịu phổ quát nhất trong trải nghiệm của con người.',
  },
  {
    q: 'Âm thanh lò sưởi có giúp ích cho việc học tập không?',
    a: 'Có — đặc biệt hiệu quả cho công việc sáng tạo, đọc sách và viết lách. Tiếng lửa nổ lách tách ấm áp, đều đặn tạo ra lớp che tiếng ồn nhẹ nhàng đồng thời mang lại cảm giác ấm cúng về mặt tâm lý, giúp giảm lo âu. Nhiều học sinh, sinh viên nhận thấy âm thanh lò sưởi khiến việc học trở nên dễ chịu và ít căng thẳng hơn — điều này trực tiếp cải thiện thời lượng học tập và khả năng ghi nhớ.',
  },
  {
    q: 'Âm thanh lò sưởi có tốt cho giấc ngủ không?',
    a: 'Âm thanh lò sưởi rất tốt cho giấc ngủ vì chúng kết hợp tiếng ồn phổ rộng ổn định (che các âm thanh bên ngoài) với những tín hiệu an ủi mang tính bản năng, quen thuộc sâu sắc. Kiểu mẫu lửa nổ lách tách — không đều nhưng vẫn có thể đoán trước — đủ phức tạp để giữ hệ thống thính giác hoạt động, ngăn nó bị cuốn theo các âm thanh khác, nhưng lại đủ an toàn để cho phép thư giãn hoàn toàn.',
  },
  {
    q: 'Tổ hợp âm thanh nào kết hợp tốt nhất với lò sưởi?',
    a: 'Những tổ hợp phổ biến nhất: Lửa + gió (cabin mùa đông), Lửa + mưa (đêm bão ở nhà), Lửa + nhạc lofi (phiên học ấm cúng), Lửa + tiếng quán cà phê (không khí xã hội ấm áp). Cảnh Cabin Ấm Cúng Mùa Đông trên LofiSpace kết hợp lửa ở mức 65% với gió 30% và nhạc lofi — đây là một trong những cảnh được sử dụng nhiều nhất trên nền tảng.',
  },
  {
    q: 'Âm thanh lò sưởi có giúp giảm lo âu không?',
    a: 'Có. Nghiên cứu cho thấy âm thanh lửa cụ thể (không chỉ âm thanh thiên nhiên nói chung) giúp giảm lo âu hiệu quả hơn cả sự im lặng hay tiếng ồn đô thị. Những liên tưởng an ủi nguyên thuỷ, kết hợp với việc che các âm thanh bất ngờ, tạo ra một môi trường tâm lý an toàn. Một số ứng dụng chăm sóc sức khoẻ tinh thần đã đưa âm thanh lò sưởi vào riêng cho mục đích quản lý lo âu.',
  },
  {
    q: 'Nghe âm thanh lò sưởi trên LofiSpace có mất phí không?',
    a: 'Không. Hoàn toàn miễn phí, không cần tài khoản, không cần tải ứng dụng. Mở trình duyệt và bắt đầu phiên học ấm cúng của bạn ngay lập tức.',
  },
]

const VIBES = [
  { emoji: '🏔️', label: 'Cabin trên núi', desc: 'Lửa nổ lách tách cùng tiếng gió gào bên ngoài. Không khí học tập mùa đông kinh điển — ấm bên trong, hoang dại bên ngoài.' },
  { emoji: '🌧️', label: 'Buổi tối mưa', desc: 'Lửa cùng tiếng mưa trên cửa sổ. Hai âm thanh ấm áp kinh điển hoà quyện thành một tổ hợp cực kỳ thư giãn.' },
  { emoji: '📚', label: 'Lò sưởi thư viện', desc: 'Tiếng nổ nhẹ nhàng, âm thanh nền tối thiểu. Phòng đọc sách kiểu cổ điển — tập trung và tinh tế.' },
  { emoji: '☕', label: 'Lò sưởi quán cà phê', desc: 'Lửa nhẹ nhàng cùng tiếng rì rào quán cà phê xa xa. Ấm áp xã hội mà không gây xao nhãng.' },
  { emoji: '🎄', label: 'Đêm mùa đông', desc: 'Lửa nổ lách tách cùng tuyết rơi nhẹ bên ngoài. Ấm cúng thuần khiết — đọc sách, viết nhật ký, những buổi tối chậm rãi.' },
  { emoji: '🌙', label: 'Lửa đêm khuya', desc: 'Nhà yên tĩnh, chỉ còn tiếng lửa. Thiền định và tập trung — hoàn hảo cho công việc sáng tạo lúc khuya.' },
]

export default function AmThanhLoSuoiPage() {
  const workspaceUrl = '/workspace?at=fire:70,wind:30&ls=lofi4&lv=55&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Âm Thanh Lò Sưởi', url: 'https://www.focusworkspace.app/vi/am-thanh-lo-suoi' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Âm Thanh Lò Sưởi"
        description="Nghe âm thanh lò sưởi miễn phí — tiếng lửa nổ lách tách ấm cúng cho học tập, thư giãn và giấc ngủ."
        url="https://www.focusworkspace.app/vi/am-thanh-lo-suoi"
        keywords={['âm thanh lò sưởi', 'tiếng lửa nổ lách tách', 'fireplace sounds', 'âm thanh ấm cúng']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Âm Thanh Lò Sưởi', url: 'https://www.focusworkspace.app/vi/am-thanh-lo-suoi' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-orange-900/30 px-4 py-1 text-sm text-orange-300 ring-1 ring-orange-500/20">
            🔥 Lửa nổ lách tách · Ấm cúng · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Âm Thanh Lò Sưởi Cho <span className="text-orange-400">Tập Trung & Thư Giãn</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Âm thanh lò sưởi nổ lách tách miễn phí, tạo không gian học tập ấm cúng dù bạn
            ở đâu. Kết hợp lửa với gió, mưa và nhạc lofi trong bộ trộn âm thanh của chúng
            tôi. Không cần đăng ký, không cần tải ứng dụng, miễn phí mãi mãi.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-orange-700 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-600 transition-colors"
            >
              Nghe Âm Thanh Lò Sưởi →
            </Link>
            <Link
              href="/vi/am-thanh-nen"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Âm Thanh Nền
            </Link>
          </div>
        </div>

        {/* Vibes */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Không Khí Lò Sưởi — Chọn Bối Cảnh Ấm Cúng</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIBES.map(v => (
              <div key={v.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{v.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{v.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-orange-500/15 bg-orange-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Vì Sao Âm Thanh Lò Sưởi Có Sức Mạnh Đặc Biệt</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">400.000 năm tiến hoá cùng lửa</h3>
              <p>Con người đã quây quần bên đống lửa gần nửa triệu năm. Không có âm thanh nào khác gắn liền một cách nhất quán với sự an toàn, ấm áp và kết nối xã hội như vậy. Âm thanh lửa kích hoạt những phản ứng thoải mái tiền nhận thức sâu sắc mà ít âm thanh nào khác có thể sánh được.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Hạ huyết áp</h3>
              <p>Một nghiên cứu của Đại học Alabama phát hiện rằng việc nhìn lửa (hoặc nghe tiếng lửa) giúp hạ huyết áp và thúc đẩy hành vi thân thiện xã hội. Các nhà nghiên cứu xác định &ldquo;sự đắm chìm&rdquo; — trạng thái chú ý thư giãn, không gắng sức — là cơ chế chính, tương tự như thiền nhẹ.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Kiểu mẫu không đều giúp tránh nhàm chán</h3>
              <p>Tiếng lửa nổ lách tách đủ không đều để hệ thống thính giác của bạn không bao giờ hoàn toàn "lờ đi" nó, nhưng lại đủ dễ đoán để không gây xao nhãng. Điều này giữ nhận thức nền vừa đủ hoạt động để tránh cảm giác khó chịu của sự im lặng, mà không cạnh tranh với dòng suy nghĩ tập trung.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Liên tưởng ấm áp cải thiện tâm trạng</h3>
              <p>Khái niệm &ldquo;ấm áp&rdquo; trong tâm lý học được mượn trực tiếp từ sự ấm áp vật lý. Âm thanh lửa kích hoạt các liên tưởng về sự ấm áp trong não bộ, từ đó kích hoạt các mạng lưới thần kinh xã hội và cảm xúc — tăng cảm giác thuộc về, an toàn và bình yên.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Những Tổ Hợp Âm Thanh Lò Sưởi Tốt Nhất</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '🏠 Học tập trong cabin ấm cúng', combo: 'Lửa 70% + Gió 30% + Lofi 60%', best: 'Đọc sách, học tập, những phiên dài' },
              { label: '🌧️ Đêm giông bão', combo: 'Lửa 65% + Mưa 55% + Gió 25%', best: 'Viết lách, công việc sáng tạo, viết nhật ký' },
              { label: '😴 Ngủ bên lò sưởi', combo: 'Lửa 75% + Gió 20%', best: 'Dễ ngủ, thư giãn sâu' },
              { label: '☕ Lò sưởi quán cà phê', combo: 'Lửa 50% + Quán cà phê 35% + Lofi 65%', best: 'Học nhẹ nhàng, phiên học buổi sáng' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-orange-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-orange-900/40 to-amber-900/20 border border-orange-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ngồi ấm cúng và bắt đầu tập trung</h2>
          <p className="mb-6 text-white/55">Miễn phí mãi mãi. Không cần tài khoản. Chạy trên mọi trình duyệt. Mở trong 10 giây.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-orange-700 px-10 py-3 font-semibold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/30"
          >
            Nghe Âm Thanh Lò Sưởi — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/fireplace-sounds" />
      </div>
    </>
  )
}
