import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Phòng Tập Trung ADHD — Không Gian Học/Làm Việc Với Brown Noise & Lofi',
  description:
    'Phòng tập trung miễn phí cho người ADHD với brown noise, tiếng mưa, nhạc lofi và đồng hồ Pomodoro. Cấu trúc rõ ràng, không gây quá tải giác quan. Không cần đăng ký.',
  keywords: [
    'phòng tập trung adhd', 'adhd học bài', 'brown noise adhd', 'nhạc tập trung adhd',
    'pomodoro cho adhd', 'tăng động giảm chú ý học tập', 'adhd người lớn tập trung',
    'tiếng ồn nâu adhd', 'white noise adhd tiếng việt', 'adhd làm việc',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/phong-tap-trung-adhd',
    languages: {
      en: 'https://www.focusworkspace.app/adhd-focus-room',
      vi: 'https://www.focusworkspace.app/vi/phong-tap-trung-adhd',
      'x-default': 'https://www.focusworkspace.app/adhd-focus-room',
    },
  },
  openGraph: {
    title: 'Phòng Tập Trung ADHD — Brown Noise, Lofi & Pomodoro | LofiSpace',
    description: 'Không gian học/làm việc miễn phí dành cho não bộ ADHD. Brown noise, tiếng mưa, cấu trúc Pomodoro, hệ thống streak. Không cần đăng ký.',
    url: 'https://www.focusworkspace.app/vi/phong-tap-trung-adhd',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phòng Tập Trung ADHD | LofiSpace',
    description: 'Không gian miễn phí cho người ADHD — brown noise, đồng hồ Pomodoro, nhạc lofi, hình ảnh dịu mắt.',
  },
}

const FAQ = [
  {
    q: 'Vì sao brown noise (tiếng ồn nâu) lại giúp ích cho người ADHD?',
    a: 'Brown noise tạo ra một luồng kích thích giác quan ổn định, tần số thấp — đúng loại kích thích mà não bộ ADHD thường tìm kiếm. Khi không được kích thích đủ, não sẽ tự đi tìm nó ở nơi khác, dẫn đến xao nhãng. Brown noise "lấp đầy" nhu cầu đó, giúp giảm bớt việc chốc chốc lại muốn cầm điện thoại lên hay bắt chuyện.',
  },
  {
    q: 'Brown noise có tốt hơn white noise cho người ADHD không?',
    a: 'Nhiều người ADHD thấy brown noise dễ chịu hơn white noise. Brown noise có nhiều năng lượng ở tần số thấp hơn (âm trầm, ù ù), nghe "ấm" hơn và ít gây mệt tai khi nghe trong thời gian dài. So sánh dễ hình dung: white noise nghe như tiếng nhiễu ti vi cũ, còn brown noise nghe gần giống tiếng thác nước ở xa hoặc mưa lớn.',
  },
  {
    q: 'Kỹ thuật Pomodoro có thực sự hiệu quả với người ADHD không?',
    a: 'Có — Pomodoro là một trong những phương pháp được khuyến nghị nhiều nhất cho ADHD. Nó giải quyết hai khó khăn cốt lõi: khởi động nhiệm vụ (đồng hồ đếm ngược tạo ra một điểm bắt đầu rõ ràng, giúp dễ bắt tay vào việc hơn) và "mù thời gian" (đồng hồ hiển thị trực quan bù đắp cho khả năng cảm nhận thời gian trôi qua thường yếu ở người ADHD).',
  },
  {
    q: 'Nhạc lofi có giúp ích cho ADHD không?',
    a: 'Có. Nhạc lofi tạo ra kích thích nhịp điệu nhẹ nhàng, không lời, nên không cạnh tranh với vùng xử lý ngôn ngữ trong não. Tempo khoảng 65-90 BPM có thể tạo trạng thái vừa tỉnh táo vừa bình tĩnh. Nhiều người ADHD thấy có nhạc nền hiệu quả hơn im lặng hoàn toàn — miễn là nhạc không lời.',
  },
  {
    q: 'Âm thanh nào phù hợp nhất cho người ADHD?',
    a: 'Brown noise và tiếng mưa thường được báo cáo là hiệu quả nhất. Mưa lớn tạo lớp âm thanh che phủ rộng gần giống brown noise nhưng có kết cấu tự nhiên hơn. Bạn có thể thử kết hợp mưa + brown noise (nếu có) ở các mức âm lượng khác nhau trong LofiSpace để tìm ra combo phù hợp với mình.',
  },
  {
    q: 'Một phiên học/làm việc cho người ADHD nên kéo dài bao lâu?',
    a: 'Với hầu hết người ADHD, khối Pomodoro 25 phút là điểm khởi đầu tốt. Một số người thấy khối ngắn hơn (15-20 phút) dễ duy trì hơn. Số khác khi vào trạng thái hyperfocus có thể kéo dài đến 45-50 phút. Điều quan trọng là luôn có một điểm kết thúc rõ ràng — phiên học không giới hạn thời gian rất khó duy trì với não bộ ADHD.',
  },
  {
    q: 'LofiSpace có miễn phí cho học sinh, sinh viên ADHD không?',
    a: 'Hoàn toàn miễn phí. Không cần tài khoản, không có gói trả phí, không giới hạn thời gian sử dụng. Toàn bộ âm thanh, các phòng học, đồng hồ Pomodoro và bộ trộn âm thanh nền đều miễn phí cho tất cả mọi người.',
  },
]

const ADHD_TIPS = [
  {
    emoji: '🔊',
    title: 'Bắt đầu với brown noise hoặc mưa lớn',
    desc: 'Mở panel Âm Thanh. Chỉnh Mưa lên 70-80% hoặc thử Brown Noise nếu có. Đây là "điểm neo" giác quan của bạn — nó thoả mãn nhu cầu kích thích của não trước khi não kịp đi tìm xao nhãng khác.',
  },
  {
    emoji: '📝',
    title: 'Viết ĐÚNG MỘT việc trước khi bắt đầu',
    desc: 'Trong to-do list, ghi ra đúng một nhiệm vụ cho phiên Pomodoro này. Một việc thôi, không phải một danh sách. Ví dụ "Viết phần mở bài" thay vì "làm xong cả bài luận". Càng cụ thể càng dễ khởi động.',
  },
  {
    emoji: '⏱️',
    title: 'Luôn bật đồng hồ Pomodoro',
    desc: 'Bật đồng hồ ngay cả khi bạn nghĩ mình không cần. Đồng hồ đếm ngược trực quan giúp bạn cảm nhận thời gian tốt hơn. Khi chuông reo, hãy dừng lại — kể cả đang trong trạng thái hyperfocus. Phá vỡ cấu trúc phiên học sẽ làm giảm hiệu quả của những phiên sau.',
  },
  {
    emoji: '📱',
    title: 'Để điện thoại ở phòng khác',
    desc: 'Chỉ cần điện thoại nằm trên bàn thôi cũng đã làm giảm khả năng tập trung, kể cả khi bạn không động vào nó. Hiệu ứng này còn rõ rệt hơn với não bộ ADHD. Để xa hẳn hiệu quả hơn nhiều so với việc "cố không mở lên xem".',
  },
  {
    emoji: '🌡️',
    title: 'Giữ phòng hơi mát',
    desc: 'Khoảng 24-26°C là nhiệt độ lý tưởng để tập trung. Phòng quá ấm dễ gây buồn ngủ — đặc biệt là sau bữa trưa. Điều này càng quan trọng với ADHD vì mức dopamine vốn đã dao động theo năng lượng và độ tỉnh táo.',
  },
  {
    emoji: '🔄',
    title: 'Nghỉ thật sự khi hết giờ',
    desc: 'Khi chuông reo — dừng lại. Đứng dậy. Uống nước. Nhìn ra ngoài cửa sổ. Nghỉ giải lao không phải là tuỳ chọn. Nó giúp "reset" dopamine và cho vùng vỏ não trước trán được phục hồi trước phiên tiếp theo.',
  },
]

export default function PhongTapTrungAdhdPage() {
  const workspaceUrl = '/workspace?at=rain:75,cafe:15&pom=1&clk=1&note=1&ls=lofi1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Phòng Tập Trung ADHD', url: 'https://www.focusworkspace.app/vi/phong-tap-trung-adhd' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Phòng Tập Trung ADHD"
        description="Phòng tập trung miễn phí cho người ADHD với brown noise, tiếng mưa, nhạc lofi, đồng hồ Pomodoro và hình ảnh dịu mắt."
        url="https://www.focusworkspace.app/vi/phong-tap-trung-adhd"
        keywords={['phòng tập trung adhd', 'adhd học bài', 'brown noise adhd', 'pomodoro cho adhd']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Phòng Tập Trung ADHD', url: 'https://www.focusworkspace.app/vi/phong-tap-trung-adhd' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-900/30 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-500/20">
            🧠 ADHD · Brown noise · Pomodoro · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-amber-400">Phòng Tập Trung ADHD</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một không gian học/làm việc được thiết kế dựa trên cách não bộ ADHD thực sự vận hành.
            Mưa lớn hoặc brown noise để tạo điểm neo giác quan, nhạc lofi không lời gây xao nhãng,
            đồng hồ Pomodoro để cảm nhận thời gian rõ ràng hơn, và một không gian hình ảnh đủ dịu
            để bạn dễ tập trung. Miễn phí, không cần đăng ký, không giới hạn thời gian.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-900/40 hover:bg-amber-500 transition-colors"
            >
              Mở Phòng Tập Trung ADHD →
            </Link>
            <Link
              href="/vi/khong-gian-deep-work"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Không Gian Deep Work
            </Link>
          </div>
        </div>

        {/* Why sounds help ADHD */}
        <section className="mb-16 rounded-2xl border border-amber-500/15 bg-amber-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Âm Thanh Nền Có Tác Dụng Với Não Bộ ADHD</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Não bộ ADHD thường có mức dopamine nền thấp hơn ở vùng vỏ não trước trán — khu vực
              chịu trách nhiệm cho sự chú ý bền vững, trí nhớ làm việc và khả năng kiểm soát hành
              vi bốc đồng. Khi dopamine thấp, não sẽ tự bù đắp bằng cách tìm kiếm kích thích từ môi
              trường xung quanh. Đây chính là cơ chế đằng sau tình trạng dễ xao nhãng ở người ADHD.
            </p>
            <p>
              Brown noise và tiếng mưa cung cấp đúng loại kích thích bên ngoài mà não ADHD đang tìm
              kiếm — nhưng theo cách có kiểm soát, không gây xao nhãng. Luồng kích thích ổn định này
              thoả mãn nhu cầu của não mà không kích hoạt phản ứng "tìm cái mới" vốn khiến mạng xã
              hội trở nên cuốn hút đến vậy.
            </p>
            <p>
              Đồng hồ Pomodoro giải quyết thách thức lớn thứ hai của ADHD: mù thời gian. Không có
              tín hiệu thời gian từ bên ngoài, não bộ ADHD thường cảm nhận rất kém về việc thời gian
              đang trôi qua. Đồng hồ đếm ngược hiển thị rõ ràng biến thời gian thành thứ cụ thể, giảm
              cảm giác lo lắng khi né tránh nhiệm vụ ("mình chỉ cần làm việc này trong 25 phút thôi"),
              đồng thời tạo ra một điểm bắt đầu rõ ràng giúp dễ khởi động công việc hơn.
            </p>
          </div>
        </section>

        {/* Tips for ADHD */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Cách Thiết Lập Một Phiên Tập Trung Cho ADHD</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ADHD_TIPS.map(tip => (
              <div key={tip.title} className="flex gap-4 rounded-xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 text-2xl">{tip.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{tip.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended sounds */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Combo Âm Thanh Tốt Nhất Cho ADHD</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '🌧️ Mưa Lớn Tập Trung', recipe: 'Mưa lớn 80% + Nhạc lofi 50%', desc: 'Che phủ xao nhãng tối đa. Bắt đầu với combo này nếu môi trường xung quanh ồn ào hoặc bạn vừa trải qua một ngày dễ mất tập trung.' },
              { title: '🔉 Brown Noise Cho Việc Sâu', recipe: 'Brown Noise 70% + Mưa 30%', desc: 'Tạo cảm giác "neo" tần số thấp mà không có giai điệu. Phù hợp nhất với các việc cần xử lý ngôn ngữ nhiều.' },
              { title: '⛈️ Chế Độ Deadline Gấp', recipe: 'Giông bão 75% + Mưa 55% + Lofi 40%', desc: 'Mức kích thích cao. Hữu ích khi cần cảm giác gấp gáp hoặc muốn kích hoạt trạng thái hyperfocus.' },
              { title: '☕ Không Khí Quán Cà Phê', recipe: 'Mưa 50% + Quán cà phê 30% + Lofi 60%', desc: 'Mức kích thích vừa phải, cảm giác ấm áp như có người xung quanh. Phù hợp cho các việc nhẹ đến trung bình.' },
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-900/40 to-orange-900/20 border border-amber-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Mở Phòng Tập Trung ADHD</h2>
          <p className="mb-6 text-white/55">
            Mưa lớn đã bật sẵn. Đồng hồ Pomodoro đã sẵn sàng. Không cần đăng ký. Bắt đầu trong 5 giây.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-600 px-10 py-3 font-semibold text-white hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/30"
          >
            Mở Phòng Tập Trung ADHD — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/adhd-focus-room" />
      </div>
    </>
  )
}
