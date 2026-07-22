import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Âm Thanh Quán Cà Phê Học Bài Miễn Phí — Tập Trung Như Ở Quán',
  description:
    'Nghe âm thanh quán cà phê miễn phí để học tập, làm việc, tập trung. Tiếng rì rào chân thực kết hợp nhạc lofi. Không cần đăng ký, chạy trên mọi trình duyệt.',
  keywords: [
    'âm thanh quán cà phê', 'tiếng quán cà phê học bài', 'âm thanh cafe tập trung',
    'coffee shop sounds tiếng việt', 'tiếng ồn quán cà phê', 'âm thanh quán cafe online',
    'âm thanh quán cà phê miễn phí', 'hiệu ứng quán cà phê',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/am-thanh-quan-cafe',
    languages: {
      en: 'https://www.focusworkspace.app/coffee-shop-sounds',
      vi: 'https://www.focusworkspace.app/vi/am-thanh-quan-cafe',
      'x-default': 'https://www.focusworkspace.app/coffee-shop-sounds',
    },
  },
  openGraph: {
    title: 'Âm Thanh Quán Cà Phê Học Bài Miễn Phí | LofiSpace',
    description: 'Tiếng rì rào quán cà phê, tiếng máy pha cà phê, kết hợp nhạc lofi cho không gian học tập lý tưởng.',
    url: 'https://www.focusworkspace.app/vi/am-thanh-quan-cafe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Âm Thanh Quán Cà Phê Học Bài Miễn Phí | LofiSpace',
    description: 'Âm thanh quán cà phê trực tuyến kết hợp nhạc lofi cho không gian học tập lý tưởng.',
  },
}

const FAQ = [
  {
    q: 'Vì sao âm thanh quán cà phê lại giúp học tập tốt hơn?',
    a: 'Tiếng ồn quán cà phê thường ở mức khoảng 65-70 dB — đúng vùng "tiếng ồn vừa phải" mà nhiều nghiên cứu tâm lý học cho thấy giúp kích thích tư duy sáng tạo và khả năng giải quyết vấn đề linh hoạt hơn. Tiếng rì rào không rõ lời của quán cà phê che đi những tiếng động bất ngờ, đồng thời cung cấp vừa đủ kích thích để não bộ không bị "chìm" vào sự đơn điệu. Đây chính là nền tảng của cái gọi là "hiệu ứng quán cà phê".',
  },
  {
    q: '"Hiệu ứng quán cà phê" là gì?',
    a: 'Hiệu ứng quán cà phê nói đến việc tiếng ồn môi trường ở mức vừa phải (khoảng 70 dB) — giống mức âm thanh trong một quán cà phê đông khách — giúp tăng khả năng sáng tạo và tư duy trừu tượng, tốt hơn cả sự im lặng tuyệt đối lẫn tiếng ồn quá lớn. Tiếng rì rào nền ngăn bạn bị phân tâm bởi chính suy nghĩ của mình, nhưng vẫn chưa đủ mạnh để lấn át sự tập trung.',
  },
  {
    q: 'Tiếng ồn quán cà phê có tốt hơn sự im lặng khi học bài không?',
    a: 'Với đa số mọi người thì có. Sự im lặng tuyệt đối trong những phiên học dài đôi khi lại gây khó chịu — mọi tiếng động nhỏ đều trở nên dễ gây xao nhãng, và tâm trí dễ đi lang thang hơn. Âm thanh nền của quán cà phê tạo ra một lớp âm thanh ổn định giúp "neo" sự tập trung của bạn lại. Đặc biệt hiệu quả với việc đọc hiểu và viết lách.',
  },
  {
    q: 'Có thể kết hợp âm thanh quán cà phê với nhạc không?',
    a: 'Có — đây thực ra là cách dùng được khuyến khích nhất. Trong LofiSpace, hãy đặt tiếng quán cà phê ở mức 40-50%, kết hợp nhạc lofi ở khoảng 60-70%. Nhạc tạo nhịp điệu và cấu trúc nhẹ nhàng, còn tiếng quán cà phê thêm cảm giác ấm áp, gần gũi và che các tiếng ồn bên ngoài. Sự kết hợp này tái tạo gần như trọn vẹn không khí quán cà phê lý tưởng mà không cần rời khỏi bàn học.',
  },
  {
    q: 'Âm thanh quán cà phê có giúp ích cho người dễ mất tập trung (ADHD) không?',
    a: 'Nhiều người ADHD thấy âm thanh quán cà phê hiệu quả vì nó tạo cảm giác kích thích liên tục nhưng không mang tính đe doạ, đáp ứng nhu cầu "có gì đó đang diễn ra" của não bộ. Không khí xã hội trong nền cũng giúp giảm cảm giác cô lập hoàn toàn khi làm việc một mình. Kết hợp âm thanh quán cà phê với tiếng ồn nâu hoặc mưa ở mức nhẹ để tối ưu hiệu quả tập trung cho ADHD.',
  },
  {
    q: 'Nghe âm thanh quán cà phê trên LofiSpace có mất phí không?',
    a: 'Không. Hoàn toàn miễn phí, không cần tài khoản, không cần tải ứng dụng. Mở trình duyệt và bắt đầu học ngay lập tức.',
  },
]

const VIBES = [
  { emoji: '☕', label: 'Giờ cao điểm buổi sáng', desc: 'Tiếng nói chuyện rộn ràng, hơi nước espresso, tiếng cốc chạm nhau. Tràn năng lượng, phù hợp học buổi sáng.' },
  { emoji: '🌧️', label: 'Quán cà phê mưa', desc: 'Tiếng rì rào nhẹ hoà cùng tiếng mưa ngoài cửa sổ. Không khí lofi kinh điển — ấm áp và dễ chịu.' },
  { emoji: '📖', label: 'Góc quán yên tĩnh', desc: 'Tiếng ồn nền xa xa, thỉnh thoảng có tiếng cốc va nhẹ. Ít xao nhãng, tập trung tối đa.' },
  { emoji: '🎷', label: 'Quán cà phê nhạc jazz', desc: 'Tiếng quán cà phê hoà cùng chút jazz nền. Tinh tế và cổ điển — rất hợp cho công việc sáng tạo.' },
  { emoji: '🌅', label: 'Quán cà phê buổi chiều', desc: 'Không khí chậm rãi, ít khách hơn. Lý tưởng để đọc sách, ôn bài, làm việc sáng tạo nhẹ nhàng.' },
  { emoji: '🌙', label: 'Quán cà phê đêm khuya', desc: 'Quán gần như vắng khách, âm thanh nền rất nhẹ. Chế độ tập trung sâu cho những đêm sát deadline.' },
]

const MIXES = [
  { combo: 'Quán cà phê 50% + Nhạc lofi 70% + Mưa 30%', label: '☕ Mix học tập kinh điển', best: 'Đọc sách, làm bài tập, học tập nói chung' },
  { combo: 'Quán cà phê 60% + Mưa 50%', label: '🌧️ Mix quán cà phê mưa', best: 'Viết lách, công việc sáng tạo, brainstorm' },
  { combo: 'Quán cà phê 40% + Lofi 75% + Pomodoro', label: '⏱️ Mix tập trung cao độ', best: 'Làm việc sâu, bài toán khó, ôn thi' },
  { combo: 'Quán cà phê 35% + Lửa trại 25% + Lofi 60%', label: '🔥 Mix ấm cúng', best: 'Buổi tối, những phiên đọc sách dài' },
]

export default function AmThanhQuanCafePage() {
  const workspaceUrl = '/workspace?at=cafe:60,rain:35&ls=lofi1&lv=65&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Âm Thanh Quán Cà Phê', url: 'https://www.focusworkspace.app/vi/am-thanh-quan-cafe' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Âm Thanh Quán Cà Phê"
        description="Nghe âm thanh quán cà phê miễn phí để học tập, làm việc, tập trung. Kết hợp tiếng cà phê với nhạc lofi trong bộ trộn âm thanh."
        url="https://www.focusworkspace.app/vi/am-thanh-quan-cafe"
        keywords={['âm thanh quán cà phê', 'tiếng quán cà phê học bài', 'coffee shop sounds', 'âm thanh cafe tập trung']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Âm Thanh Quán Cà Phê', url: 'https://www.focusworkspace.app/vi/am-thanh-quan-cafe' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-900/30 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-500/20">
            ☕ Âm thanh quán cà phê · Nhạc lofi · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Âm Thanh Quán Cà Phê Để <span className="text-amber-400">Học Bài & Tập Trung</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Tái hiện &ldquo;hiệu ứng quán cà phê&rdquo; ngay tại bàn học của bạn — hoàn toàn miễn phí.
            Kết hợp tiếng rì rào quán cà phê, mưa và nhạc lofi trong bộ trộn âm thanh
            tương tác — không cần đăng ký, không cần tải ứng dụng.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-900/40 hover:bg-amber-600 transition-colors"
            >
              Nghe Âm Thanh Quán Cà Phê →
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
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Chọn Không Khí Quán Cà Phê Của Bạn</h2>
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

        {/* Coffee shop effect */}
        <section className="mb-16 rounded-2xl border border-amber-500/15 bg-amber-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Hiệu Ứng Quán Cà Phê — Góc Nhìn Khoa Học</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Tiếng ồn vừa phải kích thích sáng tạo</h3>
              <p>Một nghiên cứu đăng trên Journal of Consumer Research cho thấy tiếng ồn môi trường ở mức khoảng 70 dB — mức âm thanh điển hình của một quán cà phê đông khách — giúp tăng khả năng tư duy sáng tạo và trừu tượng. Sự im lặng thường quá tĩnh; tiếng ồn lớn thì lại gây quá tải. Mức âm thanh quán cà phê nằm đúng ở giữa.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Cảm giác ấm áp xã hội giảm cô lập</h3>
              <p>Làm việc một mình trong im lặng đôi khi gây cảm giác cô lập và tăng lo âu. Âm thanh quán cà phê tạo ra cảm giác có người xung quanh — đủ để cảm thấy kết nối nhưng không đủ để gây xao nhãng bởi những cuộc trò chuyện thực sự.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Tiếng nói không rõ lời giúp che xao nhãng</h3>
              <p>Tiếng rì rào của quán cà phê chỉ rõ vừa đủ để không gây cảm giác đe doạ, nhưng lại không đủ rõ để có thể theo dõi được nội dung. Não bộ xếp nó vào loại &ldquo;âm thanh nền an toàn&rdquo; và ngừng theo dõi nó — nhờ vậy giải phóng sự chú ý cho công việc của bạn.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Môi trường quen thuộc tạo thói quen</h3>
              <p>Việc sử dụng lặp lại cùng một không gian âm thanh có thể tạo ra một trạng thái tập trung có điều kiện. Sau vài lần sử dụng, chỉ cần nghe âm thanh quán cà phê là não bộ đã tự động chuyển sang chế độ học tập nhờ cơ chế phản xạ có điều kiện.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Những Tổ Hợp Âm Thanh Quán Cà Phê Tốt Nhất</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MIXES.map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-amber-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-900/40 to-amber-800/10 border border-amber-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Mang không khí quán cà phê về bàn học</h2>
          <p className="mb-6 text-white/55">
            Miễn phí mãi mãi. Không cần tài khoản. Chạy trên mọi trình duyệt. Mở trong 10 giây.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-700 px-10 py-3 font-semibold text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-900/30"
          >
            Nghe Âm Thanh Quán Cà Phê — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/coffee-shop-sounds" />
      </div>
    </>
  )
}
