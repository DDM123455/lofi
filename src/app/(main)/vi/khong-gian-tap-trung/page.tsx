import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Không Gian Tập Trung Online Miễn Phí — Phòng Tập Trung Cho Deep Work',
  description:
    'Tạo không gian tập trung online miễn phí cho deep work, làm việc sâu. Giảm xao nhãng với nhạc lofi, tiếng mưa và đồng hồ Pomodoro. Dành cho freelancer, người đi làm.',
  keywords: [
    'không gian tập trung', 'phòng tập trung online', 'deep work tiếng việt', 'không gian làm việc tập trung',
    'giảm xao nhãng', 'focus room tiếng việt', 'không gian làm việc sâu',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/khong-gian-tap-trung',
    languages: {
      'en': 'https://www.focusworkspace.app/focus-room',
      'vi': 'https://www.focusworkspace.app/vi/khong-gian-tap-trung',
      'x-default': 'https://www.focusworkspace.app/focus-room',
    },
  },
  openGraph: {
    title: 'Không Gian Tập Trung Online Miễn Phí | LofiSpace',
    description: 'Không gian deep work với nhạc lofi, tiếng mưa và Pomodoro, giúp giảm xao nhãng khi làm việc sâu.',
    url: 'https://www.focusworkspace.app/vi/khong-gian-tap-trung',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Không Gian Tập Trung Online Miễn Phí | LofiSpace',
    description: 'Không gian deep work miễn phí, kết hợp nhạc lofi, tiếng mưa và đồng hồ Pomodoro.',
  },
}

const FAQ = [
  {
    q: '"Không gian tập trung" nghĩa là gì?',
    a: 'Không gian tập trung là một môi trường (vật lý hoặc trên trình duyệt) được thiết kế để tối thiểu hoá xao nhãng và hỗ trợ trạng thái "deep work" — làm việc sâu, không bị ngắt quãng. Với LofiSpace, đó là một workspace trên web gồm hình nền tĩnh lặng, nhạc nền lofi/tiếng mưa và đồng hồ Pomodoro, tất cả gói gọn trong một tab trình duyệt duy nhất.',
  },
  {
    q: 'Deep work là gì và vì sao cần một không gian riêng cho nó?',
    a: 'Deep work (thuật ngữ do Cal Newport phổ biến) là trạng thái làm việc tập trung cao độ, không bị gián đoạn, cho phép bạn xử lý những nhiệm vụ đòi hỏi tư duy phức tạp — viết, lập trình, phân tích, thiết kế. Việc chuyển đổi liên tục giữa các tab, thông báo, tin nhắn khiến não bộ khó đạt được trạng thái này. Một không gian tập trung riêng biệt — về cả thị giác lẫn thính giác — giúp giảm số lần bị "kéo" ra khỏi mạch suy nghĩ.',
  },
  {
    q: 'Vì sao giảm xao nhãng lại quan trọng đến vậy?',
    a: 'Mỗi lần bị gián đoạn (một thông báo, một tiếng động, một tab mới mở), não bộ cần thời gian để quay lại đúng mạch suy nghĩ trước đó — nghiên cứu cho thấy có thể mất tới hơn 20 phút để lấy lại sự tập trung sâu sau một lần bị ngắt. Vì vậy, việc chủ động tạo ra một không gian ít xao nhãng ngay từ đầu quan trọng hơn nhiều so với việc cố "kéo" sự tập trung quay lại sau khi đã mất.',
  },
  {
    q: 'Làm sao để tạo không gian tập trung online?',
    a: 'Bắt đầu bằng việc đóng các tab không cần thiết, tắt thông báo điện thoại, rồi mở một môi trường có kiểm soát như LofiSpace: chọn hình nền tĩnh lặng, bật nhạc nền (lofi hoặc tiếng mưa) ở mức vừa phải, và dùng đồng hồ Pomodoro để chia công việc thành từng phiên rõ ràng. Sự kết hợp của thị giác (hình nền) và thính giác (âm thanh nền) giúp não bộ nhận diện rõ ràng "đây là lúc để tập trung".',
  },
  {
    q: 'Không gian tập trung có phù hợp với freelancer, người đi làm không?',
    a: 'Rất phù hợp. Freelancer và người làm remote thường thiếu ranh giới rõ ràng giữa "giờ làm việc" và "giờ nghỉ" vì làm việc tại nhà. Một không gian tập trung riêng — dù chỉ là một tab trình duyệt — giúp tạo tín hiệu tâm lý rõ ràng để bắt đầu và kết thúc một phiên làm việc sâu, tương tự việc đi đến văn phòng.',
  },
  {
    q: 'Không gian tập trung của LofiSpace có mất phí không?',
    a: 'Không. Toàn bộ hình nền, nhạc lofi, âm thanh nền và đồng hồ Pomodoro đều miễn phí, không giới hạn thời gian sử dụng, không cần tạo tài khoản.',
  },
]

export default function KhongGianTapTrungPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=60&ls=lofi1&lv=50&at=thunder:60,rain:70&pom=1&clk=1&ac=818cf8'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Không Gian Tập Trung', url: 'https://www.focusworkspace.app/vi/khong-gian-tap-trung' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Không Gian Tập Trung"
        description="Không gian tập trung online miễn phí cho deep work, kết hợp nhạc lofi, tiếng mưa và đồng hồ Pomodoro."
        url="https://www.focusworkspace.app/vi/khong-gian-tap-trung"
        keywords={['không gian tập trung', 'phòng tập trung online', 'deep work', 'giảm xao nhãng']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-900/30 px-4 py-1 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
            🎯 Deep work · Giảm xao nhãng · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-emerald-400">Không Gian Tập Trung</span> Cho Deep Work
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một không gian làm việc tối giản, ít xao nhãng, với nhạc lofi, tiếng mưa
            và đồng hồ Pomodoro tích hợp sẵn — được thiết kế cho những phiên làm việc
            sâu, đòi hỏi sự tập trung cao độ và liền mạch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-colors"
            >
              Mở Không Gian Tập Trung →
            </Link>
            <Link
              href="/vi/dong-ho-pomodoro"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Đồng Hồ Pomodoro
            </Link>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-16 rounded-2xl border border-emerald-500/15 bg-emerald-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">&ldquo;Không gian tập trung&rdquo; nghĩa là gì trong deep work?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Deep work — làm việc sâu — là trạng thái tập trung cao độ, không bị gián đoạn, cần
              thiết cho những nhiệm vụ đòi hỏi tư duy phức tạp như viết, lập trình, phân tích số
              liệu hay thiết kế. Vấn đề là môi trường làm việc hiện đại (đặc biệt khi làm tại nhà)
              đầy rẫy những thứ kéo sự chú ý đi: thông báo, mạng xã hội, tiếng ồn xung quanh, và cả
              chính cảm giác &ldquo;không biết bắt đầu từ đâu&rdquo; khi ngồi trước một không gian trống trải.
            </p>
            <p>
              Một không gian tập trung — dù chỉ là một tab trình duyệt — giải quyết phần nào vấn đề
              này bằng cách tạo ra ranh giới rõ ràng: khi mở nó lên, đó là tín hiệu &ldquo;bây giờ là lúc
              làm việc sâu&rdquo;. Hình nền tĩnh lặng loại bỏ nhiễu thị giác, âm thanh nền (lofi, tiếng mưa)
              che tiếng ồn xung quanh, còn đồng hồ Pomodoro chia công việc thành từng khối thời gian
              có kỷ luật rõ ràng.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Vì sao giảm xao nhãng lại quan trọng đến vậy?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '⏳ Chi phí quay lại mạch suy nghĩ', desc: 'Mỗi lần bị gián đoạn, bạn cần thời gian đáng kể để lấy lại đúng luồng suy nghĩ trước đó — không phải cứ quay lại là tập trung ngay được.' },
              { title: '🧩 Công việc phức tạp cần sự liền mạch', desc: 'Những nhiệm vụ như viết code, phân tích hay thiết kế cần giữ nhiều thông tin trong đầu cùng lúc — bị ngắt quãng dễ khiến bạn phải làm lại từ đầu.' },
              { title: '📵 Thông báo là kẻ thù thầm lặng', desc: 'Không cần phải thực sự trả lời tin nhắn — chỉ riêng việc nhìn thấy thông báo hiện lên cũng đủ kéo một phần sự chú ý ra khỏi công việc.' },
              { title: '🎯 Ranh giới rõ ràng giúp bắt đầu dễ hơn', desc: 'Một không gian riêng cho deep work giúp não bộ nhanh chóng chuyển sang “chế độ tập trung” thay vì mất thời gian khởi động mỗi lần.' },
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
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Cách tạo không gian tập trung cho người đi làm, freelancer</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            <p>
              Với người làm remote hay freelancer, ranh giới giữa &ldquo;giờ làm&rdquo; và &ldquo;giờ nghỉ&rdquo; thường mờ
              nhạt vì không có văn phòng để phân định. Mở một không gian tập trung riêng — với hình
              nền, <Link href="/vi/nhac-lofi-hoc-bai" className="text-emerald-300 hover:text-emerald-200">nhạc lofi</Link> hoặc <Link href="/vi/tieng-mua-hoc-bai" className="text-emerald-300 hover:text-emerald-200">tiếng mưa</Link> làm
              nền — có thể đóng vai trò như một &ldquo;văn phòng ảo&rdquo; tạo tín hiệu bắt đầu và kết thúc phiên làm việc.
            </p>
            <p>
              Gợi ý cụ thể: chọn hình nền yên tĩnh, bật nhạc nền ở mức thấp vừa đủ để có mặt mà không
              chiếm sự chú ý, rồi dùng <Link href="/vi/dong-ho-pomodoro" className="text-emerald-300 hover:text-emerald-200">đồng hồ Pomodoro</Link> với
              chu kỳ dài hơn (50/10) cho các phiên deep work — vì công việc phức tạp thường cần thời
              gian liền mạch dài hơn 25 phút để thực sự đi vào guồng.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-teal-900/20 border border-emerald-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bắt đầu phiên làm việc sâu ngay bây giờ</h2>
          <p className="mb-6 text-white/55">Miễn phí, không giới hạn, kèm nhạc lofi, tiếng mưa và Pomodoro.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-emerald-600 px-10 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30"
          >
            Mở Không Gian Làm Việc →
          </Link>
        </div>

        <RelatedPages exclude="/focus-room" />
      </div>
    </>
  )
}
