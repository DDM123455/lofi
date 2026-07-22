import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Không Gian Deep Work — Nơi Tập Trung Tối Đa Để Làm Việc Sâu',
  description:
    'Không gian deep work online với tiếng mưa, giao diện tối giản và đồng hồ Pomodoro. Dành cho những phiên làm việc sâu, giải quyết vấn đề khó và viết lách cần sự liền mạch. Miễn phí.',
  keywords: [
    'deep work là gì', 'không gian deep work', 'làm việc sâu', 'không gian tập trung cao độ',
    'nhạc deep work', 'flow state khi làm việc', 'cal newport deep work', 'phòng làm việc sâu',
  ],
  openGraph: {
    title: 'Không Gian Deep Work — Tập Trung Tối Đa | LofiSpace',
    description: 'Không gian tối giản cho làm việc sâu. Tiếng mưa, đồng hồ Pomodoro, hệ thống XP. Miễn phí.',
    type: 'website',
    url: 'https://www.focusworkspace.app/vi/khong-gian-deep-work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Không Gian Deep Work — LofiSpace',
    description: 'Không gian tối giản cho làm việc sâu. Tiếng mưa, đồng hồ Pomodoro, hệ thống XP.',
  },
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/khong-gian-deep-work',
    languages: {
      en: 'https://www.focusworkspace.app/deep-work-room',
      vi: 'https://www.focusworkspace.app/vi/khong-gian-deep-work',
      'x-default': 'https://www.focusworkspace.app/deep-work-room',
    },
  },
}

const FAQ = [
  {
    q: 'Deep work là gì?',
    a: 'Deep work (làm việc sâu) là khái niệm do Cal Newport đưa ra, chỉ trạng thái làm việc chuyên môn không bị phân tán, đẩy khả năng nhận thức lên mức tối đa để tạo ra giá trị cao nhất trong thời gian ngắn nhất. Trái ngược với deep work là "shallow work" — những việc lặt vặt, dễ làm nhưng ít giá trị lâu dài như trả lời email hay lướt mạng xã hội.',
  },
  {
    q: 'Vì sao tiếng mưa lại giúp ích cho deep work?',
    a: 'Tiếng mưa là một loại âm thanh ổn định, không mang thông tin và không thể đoán trước theo kiểu gây giật mình. Não bộ con người vốn được lập trình để chú ý đến âm thanh bất ngờ (cơ chế sinh tồn), nhưng tiếng mưa đều đều nên não sẽ dần "bỏ qua" nó, dành toàn bộ băng thông nhận thức cho công việc.',
  },
  {
    q: 'Không gian deep work khác gì phòng học tập trung thông thường?',
    a: 'Phòng học tập trung thường dùng preset giông bão, phù hợp với các phiên học vừa phải, có nhịp Pomodoro rõ ràng. Không gian deep work dùng preset mưa nặng hạt hơn, giao diện tối giản hơn, được tinh chỉnh cho các khối làm việc cường độ cao kéo dài 2-4 tiếng liên tục.',
  },
  {
    q: 'Làm sao để theo dõi số giờ mình đã deep work?',
    a: 'LofiSpace tự động ghi nhận các phiên Pomodoro, chuỗi ngày làm việc liên tục và tổng số phút tập trung. Thẻ tiến độ hiển thị XP, streak hiện tại và các chấm phiên làm việc theo tuần để bạn dễ theo dõi.',
  },
  {
    q: 'Người mới bắt đầu deep work nên tập luyện thế nào?',
    a: 'Đừng ép bản thân ngồi 4 tiếng liên tục ngay từ đầu. Hãy bắt đầu với một khối 25-50 phút cố định mỗi ngày, cùng một khung giờ, cùng một không gian (ví dụ luôn mở LofiSpace với preset mưa này). Sự lặp lại giúp não hình thành phản xạ "vào việc" nhanh hơn theo thời gian.',
  },
  {
    q: 'Deep work có phù hợp với sinh viên không, hay chỉ dành cho dân công sở?',
    a: 'Rất phù hợp với sinh viên, đặc biệt khi làm khoá luận, ôn thi các môn cần tư duy liền mạch (toán, lập trình, phân tích) hoặc viết luận dài. Nguyên tắc thì như nhau: một khối thời gian không bị gián đoạn, không mạng xã hội, không thông báo, chỉ tập trung vào một việc duy nhất.',
  },
]

const PRINCIPLES = [
  { num: '01', title: 'Nghi thức lặp lại', desc: 'Cùng một loại âm thanh, cùng một cách bố trí, lặp lại mỗi lần. Việc lặp lại giúp não bộ hình thành phản xạ liên kết không gian này với sự tập trung sâu.' },
  { num: '02', title: 'Cô lập', desc: 'Một tab trình duyệt. Một nhiệm vụ. Không gian làm việc chỉ hiển thị đúng những gì bạn cần, không gì khác.' },
  { num: '03', title: 'Time-boxing', desc: 'Các phiên Pomodoro tạo cấu trúc rõ ràng cho việc làm sâu. Cường độ quan trọng hơn thời lượng.' },
  { num: '04', title: 'Đo lường', desc: 'XP, streak và nhật ký phiên làm việc giúp bạn nhìn thấy rõ thành quả. Cái gì được đo lường, cái đó mới thực sự được hoàn thành.' },
]

export default function KhongGianDeepWorkPage() {
  // Rainy Library scene — giữ nguyên preset deep focus của bản gốc
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=45&ls=lofi1&lv=55&at=rain:45,cafe:15&pom=1&clk=1&ac=c4b5fd'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Không Gian Deep Work', url: 'https://www.focusworkspace.app/vi/khong-gian-deep-work' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Không Gian Deep Work"
        description="Không gian deep work online tối giản với tiếng mưa và đồng hồ Pomodoro giúp tập trung tối đa."
        url="https://www.focusworkspace.app/vi/khong-gian-deep-work"
        keywords={['deep work là gì', 'không gian deep work', 'làm việc sâu', 'flow state']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Không Gian Deep Work', url: 'https://www.focusworkspace.app/vi/khong-gian-deep-work' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🧠 Tập trung tối đa · Tiếng mưa · Tối giản
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Không Gian <span className="text-violet-400">Deep Work</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Dành cho những bài toán khó nhất. Một môi trường tối giản, không xao nhãng, được
            tinh chỉnh cho sự tập trung sâu và bền bỉ — tiếng mưa như trong thư viện, các phiên
            Pomodoro có cấu trúc rõ ràng và theo dõi tiến độ đầy đủ.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Vào Không Gian Deep Work →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Scene
            </Link>
          </div>
        </div>

        {/* Principles */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">4 Nguyên Tắc Của Deep Work</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(p => (
              <div key={p.num} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 font-mono text-2xl font-bold text-violet-400/50">{p.num}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-white/50">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Room presets */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Cấu Hình Của Phòng</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
            {[
              ['🌧️', 'Tiếng mưa nặng hạt'],
              ['📚', 'Hình nền thư viện'],
              ['🎵', 'Nhạc lofi tempo thấp'],
              ['🍅', 'Pomodoro 25/5 phút'],
              ['📊', 'Theo dõi XP + streak'],
              ['🕐', 'Đồng hồ phiên làm việc'],
            ].map(([emoji, label]) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2">
                <span>{emoji}</span>
                <span className="text-white/65">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/35">Mọi cài đặt đều có thể tuỳ chỉnh ngay trong workspace.</p>
        </section>

        {/* Expanded content */}
        <section className="mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-white">Deep Work Là Gì Và Vì Sao Nó Quan Trọng?</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Cal Newport — nhà khoa học máy tính, tác giả cuốn sách <em>Deep Work</em> — định nghĩa
            đây là &ldquo;hoạt động chuyên môn được thực hiện trong trạng thái tập trung không bị
            phân tán, đẩy khả năng nhận thức của bạn lên đến giới hạn.&rdquo; Kết quả của những
            phiên deep work là những sản phẩm chất lượng cao, khó lòng sao chép — loại công việc
            thực sự tạo ra khác biệt.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Ngược lại, &ldquo;shallow work&rdquo; — email, họp hành, mạng xã hội, các việc vặt dễ
            làm — có thể khiến bạn cảm thấy bận rộn nhưng lại tạo ra rất ít giá trị lâu dài. Newport
            cho rằng deep work đang trở nên <strong className="text-white">ngày càng hiếm</strong> (vì
            văn phòng mở và thông báo liên tục khiến việc tập trung gần như bất khả thi) đồng thời
            lại <strong className="text-white">ngày càng có giá trị</strong> (vì những vấn đề quan
            trọng nhất đòi hỏi tư duy bền bỉ, không bị ngắt quãng).
          </p>

          <h2 className="text-2xl font-bold text-white pt-4">Làm Sao Để Rèn Luyện Thói Quen Deep Work?</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Deep work là một kỹ năng, không phải một đặc điểm tính cách bẩm sinh. Nó sẽ mai một
            nếu không luyện tập và ngày càng vững hơn nếu được rèn giũa đều đặn. Dưới đây là cách
            bắt đầu:
          </p>
          <div className="space-y-4">
            {[
              {
                title: '1. Chọn cách tiếp cận phù hợp với bạn',
                body: 'Newport chỉ ra bốn hướng: Monastic (cắt đứt hoàn toàn mọi thứ khác), Bimodal (dành riêng vài ngày liên tục cho deep work), Rhythmic (cùng một khung giờ mỗi ngày), và Journalistic (tranh thủ bất cứ lúc nào rảnh). Đa số người mới nên bắt đầu với Rhythmic — một khối 60-90 phút deep work vào một giờ cố định mỗi ngày.',
              },
              {
                title: '2. Thiết lập nghi thức "kết thúc"',
                body: 'Não bạn cần một tín hiệu rõ ràng rằng ngày làm việc đã xong. Trước khi tắt máy, hãy ghi ra 3 việc quan trọng nhất của ngày mai. Nói to "đã kết thúc công việc" nếu bạn muốn — nghe có vẻ lạ nhưng thực sự giúp não ngừng suy nghĩ vẩn vơ về công việc ngoài giờ.',
              },
              {
                title: '3. Chấp nhận sự nhàm chán',
                body: 'Sự tập trung cũng giống như một cơ bắp. Nếu mỗi lần thấy chán bạn lại cầm điện thoại lên, bạn đang huấn luyện não mình luôn khao khát kích thích liên tục — điều này khiến deep work gần như bất khả thi. Hãy tập ngồi yên với cảm giác nhàm chán khoảng 5 phút mỗi ngày.',
              },
              {
                title: '4. Hạn chế mạng xã hội',
                body: 'Không cần xoá hết mọi thứ. Nhưng việc check Facebook, TikTok hay Threads giữa các nhiệm vụ sẽ phá huỷ khả năng tập trung của bạn. Hãy gom việc lướt mạng xã hội vào một khung giờ 20 phút cố định mỗi ngày, ngoài giờ làm việc.',
              },
              {
                title: '5. Đặt một mốc kết thúc cứng',
                body: 'Định luật Parkinson: công việc luôn giãn ra để lấp đầy khoảng thời gian có sẵn. Hãy đặt một giờ kết thúc cố định cho deep work — ví dụ 17h — rồi tính ngược lại để đảm bảo việc quan trọng nhất được làm trước. Cảm giác cấp bách sẽ giúp bạn tập trung hơn.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/3 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white pt-4">Cơ Sở Khoa Học Của Tiếng Mưa Và Sự Tập Trung</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Tiếng mưa là loại âm thanh nền được nghiên cứu nhiều nhất về hiệu quả nhận thức. Một
            nghiên cứu năm 2012 đăng trên <em>Journal of Consumer Research</em> cho thấy tiếng ồn
            nền vừa phải (khoảng 70 dB) — như tiếng quán cà phê hoặc mưa nhẹ — giúp tăng khả năng
            sáng tạo so với sự im lặng hoàn toàn hoặc tiếng ồn lớn. Không Gian Deep Work của
            LofiSpace dùng preset mưa nặng hạt được căn chỉnh trong dải âm lượng này.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Tiếng mưa hiệu quả vì nó <strong className="text-white">ổn định và không mang tính báo hiệu</strong>.
            Não bạn vốn được lập trình để chú ý đến những âm thanh bất ngờ (một cơ chế sinh tồn từ
            thời nguyên thuỷ). Tiếng mưa thì không bao giờ đột ngột tăng âm lượng, không "nói"
            và không mang thông tin có ý nghĩa nào — nên hệ thống chú ý của bạn có thể yên tâm bỏ
            qua nó, dồn toàn bộ năng lực nhận thức cho công việc.
          </p>

          <h2 className="text-2xl font-bold text-white pt-4">Ai Nên Dùng Không Gian Deep Work?</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { emoji: '💻', label: 'Lập trình viên', desc: 'Giải các bài toán thuật toán khó, review code, thiết kế kiến trúc hệ thống.' },
              { emoji: '✍️', label: 'Người viết', desc: 'Viết bản thảo đầu tiên, tổng hợp tài liệu nghiên cứu, nội dung dài cần mạch tư duy liền lạc.' },
              { emoji: '🎨', label: 'Nhà thiết kế', desc: 'Lên ý tưởng sáng tạo, giải quyết vấn đề hình ảnh, các phiên tư duy UX chuyên sâu.' },
              { emoji: '📊', label: 'Chuyên viên phân tích', desc: 'Mô hình hoá dữ liệu, làm việc với bảng tính phức tạp, viết báo cáo cần sự tập trung tuyệt đối.' },
              { emoji: '🎓', label: 'Sinh viên', desc: 'Viết luận văn, ôn thi, tìm hiểu các môn học mới và khó từ đầu.' },
              { emoji: '🔬', label: 'Nhà nghiên cứu', desc: 'Đọc tài liệu tổng quan, xây dựng giả thuyết, viết bài báo khoa học.' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{item.label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white pt-4">Deep Work Hay Phòng Tập Trung: Nên Chọn Cái Nào?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left text-white/40 font-normal">Tiêu chí</th>
                  <th className="py-3 text-left text-violet-300 font-semibold">Không Gian Deep Work</th>
                  <th className="py-3 text-left text-indigo-300 font-semibold">Phòng Tập Trung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Phù hợp cho', 'Phiên làm việc cường độ cao 2-4 tiếng', 'Phiên Pomodoro 25-90 phút'],
                  ['Âm thanh', 'Mưa nặng hạt (tối giản)', 'Giông bão + mưa (đậm không khí)'],
                  ['Không khí', 'Khắc kỷ, tối giản', 'Sống động, tạo hứng khởi'],
                  ['Việc phù hợp', 'Viết lách, code phức tạp, tư duy sâu', 'Học bài thông thường, code vừa phải'],
                  ['Pomodoro', 'Không bắt buộc — khuyến khích khối dài hơn', 'Cơ chế cốt lõi'],
                ].map(([feature, deep, focus]) => (
                  <tr key={feature}>
                    <td className="py-2.5 text-white/40">{feature}</td>
                    <td className="py-2.5 text-white/70">{deep}</td>
                    <td className="py-2.5 text-white/70">{focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-indigo-900/20 border border-violet-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Làm việc quan trọng, bắt đầu ngay</h2>
          <p className="mb-6 text-white/55">Mở không gian. Bật đồng hồ. Bắt đầu.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Mở Không Gian Deep Work — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/deep-work-room" />
      </div>
    </>
  )
}
