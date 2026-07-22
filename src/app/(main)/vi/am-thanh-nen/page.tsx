import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Bộ Trộn Âm Thanh Nền Miễn Phí — Học Tập, Tập Trung & Thư Giãn',
  description:
    'Trộn âm thanh nền miễn phí online: mưa, quán cà phê, lửa trại, biển, rừng và nhiều hơn nữa. Kết hợp với nhạc lofi, tự chỉnh âm lượng từng lớp. Không cần đăng ký.',
  keywords: [
    'âm thanh nền', 'âm thanh nền tập trung', 'âm thanh nền học tập', 'bộ trộn âm thanh',
    'âm thanh thiên nhiên', 'âm thanh nền miễn phí', 'âm thanh nền online', 'ambient sounds tiếng việt',
    'âm thanh nền làm việc', 'âm thanh nền thư giãn',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/am-thanh-nen',
    languages: {
      en: 'https://www.focusworkspace.app/ambient-sounds',
      vi: 'https://www.focusworkspace.app/vi/am-thanh-nen',
      'x-default': 'https://www.focusworkspace.app/ambient-sounds',
    },
  },
  openGraph: {
    title: 'Bộ Trộn Âm Thanh Nền Miễn Phí | LofiSpace',
    description: 'Trộn mưa, quán cà phê, lửa trại, biển, rừng và nhạc lofi trong cùng một bộ trộn âm thanh. Miễn phí, không quảng cáo.',
    url: 'https://www.focusworkspace.app/vi/am-thanh-nen',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bộ Trộn Âm Thanh Nền Miễn Phí | LofiSpace',
    description: 'Trộn nhiều lớp âm thanh nền với nhạc lofi để tạo không gian học tập, làm việc của riêng bạn.',
  },
}

const SOUNDS = [
  { emoji: '🌧️', name: 'Mưa', desc: 'Mưa nhẹ hoặc mưa lớn — âm thanh hiệu quả nhất để che tiếng ồn và đi vào trạng thái tập trung sâu.' },
  { emoji: '☕', name: 'Quán cà phê', desc: 'Tiếng rì rào của quán cà phê — mức ồn vừa phải, được chứng minh giúp tăng khả năng sáng tạo.' },
  { emoji: '🔥', name: 'Lửa trại', desc: 'Tiếng lửa nổ lách tách ấm áp — hoàn hảo cho những buổi học buổi tối cần cảm giác dễ chịu.' },
  { emoji: '🌊', name: 'Sóng biển', desc: 'Nhịp sóng vỗ đều đặn — cực kỳ thư giãn, phù hợp cho công việc sáng tạo và thiền định.' },
  { emoji: '🌿', name: 'Rừng', desc: 'Tiếng chim hót, lá xào xạc, gió nhẹ — âm thanh thiên nhiên giúp giảm cortisol mà vẫn giữ được sự tỉnh táo.' },
  { emoji: '⛈️', name: 'Mưa bão', desc: 'Mưa lớn kèm sấm sét từ xa — khả năng che tiếng ồn mạnh, phù hợp làm việc sâu trong môi trường ồn ào.' },
  { emoji: '🌬️', name: 'Gió', desc: 'Gió nhẹ hoặc gió mạnh — thêm một lớp chuyển động tinh tế vào bức tranh âm thanh của bạn.' },
  { emoji: '🌃', name: 'Thành phố về đêm', desc: 'Tiếng xe cộ xa xa, thỉnh thoảng có tiếng người — nhịp sống đô thị mà nhiều người thấy tràn năng lượng.' },
]

const FAQ = [
  {
    q: 'Âm thanh nền là gì?',
    a: 'Âm thanh nền (ambient sounds) là các âm thanh môi trường xung quanh — mưa, gió, tiếng quán cà phê, lửa nổ lách tách, sóng biển — tạo ra một lớp âm thanh ổn định, liên tục. Khác với âm nhạc, chúng không mang thông tin cụ thể nào, nên não bộ có thể "lọc bỏ" chúng một cách tự nhiên mà vẫn duy trì được sự tập trung vào công việc.',
  },
  {
    q: 'Âm thanh nền có phải là tiếng ồn trắng hay tiếng ồn nâu không?',
    a: 'Không hẳn. "Âm thanh nền" là tên gọi chung cho rất nhiều loại âm thanh môi trường khác nhau — mưa, biển, rừng, quán cà phê, lửa trại... Còn tiếng ồn trắng và tiếng ồn nâu là hai loại âm thanh tổng hợp cụ thể, có phổ tần số được định nghĩa rõ ràng (đều ở mọi tần số với tiếng ồn trắng, tập trung ở tần số thấp với tiếng ồn nâu). Bộ trộn âm thanh nền trên LofiSpace cho phép bạn kết hợp nhiều loại âm thanh tự nhiên cùng lúc, thay vì chỉ nghe một loại tiếng ồn đơn lẻ.',
  },
  {
    q: 'Âm thanh nền giúp tập trung như thế nào?',
    a: 'Những âm thanh bất ngờ (chuông điện thoại, tiếng cửa đóng, tiếng người nói lớn) khiến não bộ phản xạ tự động — dừng việc đang làm để kiểm tra xem có nguy hiểm hay không, dù chỉ trong tích tắc. Âm thanh nền loại bỏ các "cú giật mình" này bằng cách cung cấp một lớp âm thanh nền ổn định, dễ đoán. Hệ thống chú ý của bạn có thể yên tâm bỏ qua nó, dành toàn bộ năng lượng nhận thức cho công việc.',
  },
  {
    q: 'Âm thanh nền nào tốt nhất để học tập?',
    a: 'Tuỳ vào loại công việc. Với công việc cần tập trung sâu: mưa hoặc tiếng ồn nâu. Với công việc sáng tạo: tiếng quán cà phê ở mức âm lượng vừa phải. Với việc đọc sách: âm thanh thiên nhiên nhẹ nhàng như tiếng rừng. Với người dễ mất tập trung: tiếng ồn nâu hoặc mưa lớn thường hiệu quả hơn. Cách tốt nhất là thử nghiệm trực tiếp trong bộ trộn của LofiSpace để tìm ra tổ hợp phù hợp với bạn.',
  },
  {
    q: 'Tôi có thể trộn nhiều âm thanh nền cùng lúc không?',
    a: 'Có. Bộ trộn âm thanh của LofiSpace cho phép bạn bật nhiều loại âm thanh cùng lúc, mỗi loại có thanh chỉnh âm lượng riêng. Bạn có thể kết hợp mưa + quán cà phê + lửa trại theo tỉ lệ tuỳ ý, tổ hợp đó sẽ được lưu ngay trong đường dẫn (URL) để chia sẻ lại cho người khác hoặc mở lại sau này.',
  },
  {
    q: 'Bộ trộn âm thanh nền trên LofiSpace có mất phí không?',
    a: 'Không. Hoàn toàn miễn phí, không cần tài khoản, không giới hạn thời gian sử dụng. Toàn bộ 8 loại âm thanh nền cùng nhạc lofi đều mở cho mọi người sử dụng.',
  },
]

export default function AmThanhNenPage() {
  const workspaceUrl = '/workspace?at=rain:50,cafe:30&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Âm Thanh Nền', url: 'https://www.focusworkspace.app/vi/am-thanh-nen' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Bộ Trộn Âm Thanh Nền"
        description="Bộ trộn âm thanh nền miễn phí online. Kết hợp mưa, quán cà phê, lửa trại, biển, rừng với nhạc lofi để học tập và tập trung."
        url="https://www.focusworkspace.app/vi/am-thanh-nen"
        keywords={['âm thanh nền', 'âm thanh nền tập trung', 'bộ trộn âm thanh', 'ambient sounds']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Âm Thanh Nền', url: 'https://www.focusworkspace.app/vi/am-thanh-nen' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-teal-900/30 px-4 py-1 text-sm text-teal-300 ring-1 ring-teal-500/20">
            🎚️ 8+ âm thanh nền · Tự do phối trộn · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Bộ Trộn <span className="text-teal-400">Âm Thanh Nền</span> Miễn Phí
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Trộn mưa, tiếng quán cà phê, lửa nổ lách tách, sóng biển, tiếng rừng và nhiều
            âm thanh khác — mỗi loại có thanh âm lượng riêng. Kết hợp cùng nhạc lofi để
            xây dựng không gian học tập hoặc làm việc của riêng bạn. Miễn phí mãi mãi, không cần tài khoản.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-900/40 hover:bg-teal-500 transition-colors"
            >
              Mở Bộ Trộn Âm Thanh →
            </Link>
            <Link
              href="/vi/tieng-mua-hoc-bai"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Chỉ Nghe Tiếng Mưa
            </Link>
          </div>
        </div>

        {/* Available sounds */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Các Âm Thanh Nền Có Sẵn</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOUNDS.map(s => (
              <div key={s.name} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{s.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How the mixer works */}
        <section className="mb-16 rounded-2xl border border-teal-500/15 bg-teal-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Bộ Trộn Âm Thanh Hoạt Động Như Thế Nào?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Trong không gian làm việc của LofiSpace, bảng điều khiển Âm thanh cho bạn một
              thanh trượt riêng cho từng loại âm thanh nền. Bật mưa ở mức 60%, thêm tiếng
              quán cà phê ở 30%, rồi thêm lớp lửa nổ lách tách ở 20% — tất cả phát cùng lúc, theo thời gian thực.
            </p>
            <p>
              Âm thanh được trộn ngay trong trình duyệt của bạn nên không có độ trễ hay giật
              lag giữa các lớp. Tổng âm lượng luôn được kiểm soát, vì vậy bạn sẽ không bị
              &ldquo;ù tai&rdquo; khi bật nhiều âm thanh cùng lúc.
            </p>
            <p>
              Tổ hợp âm thanh bạn chọn được <strong className="text-white">lưu ngay trong đường dẫn URL</strong>.
              Chỉ cần sao chép link và gửi cho bất kỳ ai — họ sẽ mở đúng không gian âm thanh
              y hệt, kể cả loại âm thanh và âm lượng của từng lớp.
            </p>
          </div>
        </section>

        {/* Best combinations */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Những Tổ Hợp Âm Thanh Nền Được Yêu Thích</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '📚 Mix học tập kinh điển', sounds: 'Mưa 60% + Quán cà phê 30% + Nhạc lofi 70%', desc: 'Công thức quen thuộc nhất. Mưa che tiếng ồn, quán cà phê thêm chút ấm áp, lofi tạo nhịp điệu nhẹ nhàng.' },
              { title: '🧠 Mix tập trung sâu', sounds: 'Mưa lớn 80% + Nhạc lofi 50%', desc: 'Tối giản nhưng mạnh mẽ. Không có yếu tố xã hội gây xao nhãng — chỉ có bạn và công việc.' },
              { title: '🔥 Mix tối ấm cúng', sounds: 'Lửa trại 50% + Mưa 35% + Lofi 60%', desc: 'Ấm áp, gần gũi, hoàn hảo cho việc viết nhật ký, đọc sách hoặc viết lách sáng tạo.' },
              { title: '💻 Mix lập trình', sounds: 'Thành phố đêm 40% + Mưa 30% + Synthwave 70%', desc: 'Năng lượng đô thị pha lẫn tiếng mưa nền — phù hợp cho những đêm code muộn.' },
              { title: '🌿 Mix thiên nhiên tĩnh lặng', sounds: 'Rừng 50% + Biển 30% + Lofi 65%', desc: 'Âm thanh thiên nhiên giúp giảm cortisol. Rất hợp những ngày đầu óc căng thẳng.' },
              { title: '⛈️ Mix bão deadline', sounds: 'Mưa bão 70% + Mưa 60%', desc: 'Cường độ tối đa. Dành cho những đêm chỉ còn vài tiếng trước deadline.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs font-mono text-teal-300/70 mb-2">{item.sounds}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-teal-900/40 to-blue-900/20 border border-teal-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Xây dựng không gian âm thanh của riêng bạn</h2>
          <p className="mb-6 text-white/55">Miễn phí mãi mãi. 8+ âm thanh. Tự chỉnh âm lượng từng lớp. Mở trên mọi trình duyệt.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-teal-600 px-10 py-3 font-semibold text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/30"
          >
            Mở Bộ Trộn Âm Thanh — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/ambient-sounds" />
      </div>
    </>
  )
}
