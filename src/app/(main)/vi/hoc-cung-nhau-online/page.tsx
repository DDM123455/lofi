import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Học Cùng Nhau Online — Không Gian Study With Me Miễn Phí',
  description:
    'Học cùng nhau online trong một phòng học ảo miễn phí. Nhạc lofi, âm thanh nền, đồng hồ Pomodoro, streak XP và không khí ấm cúng. Không cần đăng ký.',
  keywords: [
    'học cùng nhau online', 'study with me tiếng việt', 'học nhóm online không camera',
    'bạn học ảo', 'body doubling tiếng việt', 'học chung online', 'phòng học đồng hành',
    'học cùng người lạ online', 'accountability học tập',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/hoc-cung-nhau-online',
    languages: {
      en: 'https://www.focusworkspace.app/study-with-me',
      vi: 'https://www.focusworkspace.app/vi/hoc-cung-nhau-online',
      'x-default': 'https://www.focusworkspace.app/study-with-me',
    },
  },
  openGraph: {
    title: 'Học Cùng Nhau Online — Không Gian Study With Me Miễn Phí | LofiSpace',
    description: 'Học cùng nhau online trong phòng ảo miễn phí với nhạc lofi, đồng hồ Pomodoro và streak XP. Không cần đăng ký.',
    url: 'https://www.focusworkspace.app/vi/hoc-cung-nhau-online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Học Cùng Nhau Online | LofiSpace',
    description: 'Phòng học ảo miễn phí với nhạc lofi, đồng hồ Pomodoro và streak XP. Không cần đăng ký.',
  },
}

const FAQ = [
  {
    q: '"Học cùng nhau online" (study with me) là gì?',
    a: '"Học cùng nhau" là một phương pháp học tập trong đó bạn học song song với người khác — gặp trực tiếp, gọi video, hoặc học ảo — để tạo động lực và trách nhiệm với chính mình. Việc chia sẻ không gian học tập khiến bạn khó trì hoãn hơn và dễ tập trung hơn.',
  },
  {
    q: 'Body doubling (học có "người đồng hành") là gì?',
    a: 'Body doubling là kỹ thuật làm việc/học tập với sự hiện diện của một người khác bên cạnh để tăng khả năng tập trung. Ban đầu đây là kỹ thuật dành cho người ADHD, nhưng nghiên cứu cho thấy nó có ích với hầu hết mọi người. Sự hiện diện của người khác — kể cả ảo — kích hoạt một dạng nhận thức xã hội nhẹ giúp giảm trì hoãn.',
  },
  {
    q: 'LofiSpace thay thế "bạn học" như thế nào nếu không có ai online cùng?',
    a: 'LofiSpace tạo ra các điều kiện môi trường của một phiên "học cùng nhau": âm thanh nền mô phỏng một không gian chung, đồng hồ Pomodoro tạo cấu trúc phiên học chung, và hệ thống XP theo dõi tiến độ của bạn giống như một người bạn đồng hành thực sự sẽ làm. Nhiều người dùng thấy cách này hiệu quả không kém gì học cùng người thật.',
  },
  {
    q: 'Có thể học cùng bạn bè thật bằng LofiSpace không?',
    a: 'Có. Gửi link workspace của bạn cho một người bạn, cả hai có thể mở cùng một khung cảnh, âm thanh và cài đặt — tạo ra một không gian học ảo đồng bộ. Kết hợp thêm cuộc gọi video song song với LofiSpace để có trải nghiệm "học cùng nhau" trọn vẹn.',
  },
  {
    q: 'Có miễn phí không?',
    a: 'Hoàn toàn miễn phí. Không cần tài khoản, không có gói trả phí, không giới hạn thời gian. Mở workspace lên là học được ngay.',
  },
  {
    q: 'Phòng học nào phù hợp nhất cho việc học cùng nhau?',
    a: 'Phòng Học Online và Phòng Học Anime là hai lựa chọn phổ biến nhất — chúng có không khí ấm áp, gần gũi nhất. Phòng Học Lập Trình được nhiều lập trình viên ưa chuộng khi làm các phiên "pair focus" cùng đồng nghiệp.',
  },
]

const BENEFITS = [
  {
    emoji: '🎯',
    title: 'Trách nhiệm mang tính xã hội',
    desc: '"Sự hiện diện" của một không gian học — dù chỉ là ảo — cũng kích hoạt nhận thức xã hội tương tự như khi học cùng một người bạn thật ngoài đời.',
  },
  {
    emoji: '⏱️',
    title: 'Cấu trúc phiên học chung',
    desc: 'Đồng hồ Pomodoro tạo ra các khối làm việc 25 phút rõ ràng, giống như một phiên study with me có cấu trúc trên YouTube — chỉ khác là bạn tự kiểm soát toàn bộ không gian của mình.',
  },
  {
    emoji: '🔥',
    title: 'Động lực từ streak',
    desc: 'Bộ đếm streak hàng ngày và hệ thống XP thay thế cho động lực bên ngoài thường đến từ một người bạn học. Bỏ lỡ một ngày là chuỗi ngày liên tục bị đứt gãy.',
  },
  {
    emoji: '🌸',
    title: 'Không gian đẹp mắt',
    desc: 'Cùng lý do khiến hàng triệu người xem video "study with me": không khí hình ảnh và âm thanh của một không gian học đẹp giúp não bộ chuyển sang chế độ học tập.',
  },
]

const ROOMS = [
  { href: '/vi/phong-hoc-online', emoji: '📚', label: 'Phòng Học Online', desc: 'Không gian học cùng nhau kinh điển. Nhạc lofi, tiếng mưa, đồng hồ Pomodoro.' },
  { href: '/vi/phong-hoc-anime', emoji: '🌸', label: 'Phòng Học Anime', desc: 'Không gian học phong cách Nhật Bản — gần giống nhất với một buổi học trong phim hoạt hình.' },
  { href: '/vi/phong-hoc-lap-trinh', emoji: '💻', label: 'Phòng Học Lập Trình', desc: 'Học cùng nhau dành cho dân lập trình. Nhạc synthwave và tiếng mưa thành phố.' },
  { href: '/focus-room', emoji: '🎯', label: 'Focus Room', desc: 'Tối giản, không xao nhãng. Dành cho các phiên học đòi hỏi tập trung tuyệt đối.' },
]

export default function HocCungNhauOnlinePage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1&ls=lofi1&at=rain:50,cafe:25'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Học Cùng Nhau Online', url: 'https://www.focusworkspace.app/vi/hoc-cung-nhau-online' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Học Cùng Nhau Online"
        description="Không gian học cùng nhau online miễn phí với nhạc lofi, đồng hồ Pomodoro, streak XP và âm thanh nền."
        url="https://www.focusworkspace.app/vi/hoc-cung-nhau-online"
        keywords={['học cùng nhau online', 'study with me', 'body doubling', 'phòng học ảo']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Học Cùng Nhau Online', url: 'https://www.focusworkspace.app/vi/hoc-cung-nhau-online' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-green-900/30 px-4 py-1 text-sm text-green-300 ring-1 ring-green-500/20">
            📚 Học cùng nhau · Body doubling · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-green-400">Học Cùng Nhau</span> Online — Miễn Phí
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một không gian học ảo miễn phí tái tạo lại động lực và sự tập trung của việc học cùng
            bạn bè. Nhạc lofi, âm thanh nền, đồng hồ Pomodoro, streak XP hàng ngày và một không
            gian đẹp mắt — mọi thứ bạn cần để ngừng trì hoãn và bắt đầu học.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-lg shadow-green-900/40 hover:bg-green-500 transition-colors"
            >
              Bắt Đầu Học Ngay →
            </Link>
            <Link
              href="/vi/phong-hoc-online"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Các Phòng Học
            </Link>
          </div>
        </div>

        {/* Why it works */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Vì Sao &ldquo;Học Cùng Nhau&rdquo; Online Thực Sự Có Hiệu Quả
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFITS.map(b => (
              <div key={b.title} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 text-2xl">{b.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{b.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Body doubling explained */}
        <section className="mb-16 rounded-2xl border border-green-500/15 bg-green-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Body Doubling Là Gì?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Body doubling là một kỹ thuật giúp tăng năng suất bằng cách làm việc trong sự hiện
              diện của một người khác — không nhất thiết phải cùng làm chung một việc, chỉ cần
              cùng ở trong một không gian. Kỹ thuật này ban đầu được phát triển cho người ADHD,
              nhưng nghiên cứu cho thấy nó có lợi cho gần như tất cả mọi người.
            </p>
            <p>
              Cơ chế hoạt động: con người vốn là sinh vật xã hội. Khi có người khác hiện diện,
              chúng ta kích hoạt một dạng nhận thức xã hội ở mức thấp khiến bản thân luôn &ldquo;ở
              trạng thái sẵn sàng&rdquo; và hạn chế xu hướng trôi dạt sang xao nhãng. Cảm giác được
              quan sát — dù người đó không thực sự nhìn bạn — cũng giúp giảm sự trì hoãn.
            </p>
            <p>
              Body doubling ảo cũng hoạt động theo nguyên lý tương tự. Hàng triệu người xem video
              &ldquo;study with me&rdquo; trên YouTube không phải vì nội dung, mà vì cảm giác có sự
              hiện diện xung quanh mà chúng tạo ra. LofiSpace xây dựng trực tiếp không gian đó, mà
              không cần tìm hay hẹn lịch với một bạn học cụ thể nào.
            </p>
          </div>
        </section>

        {/* Choose your room */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Chọn Phòng Học Cùng Nhau Của Bạn
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ROOMS.map(room => (
              <Link
                key={room.href}
                href={room.href}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 hover:border-green-500/30 hover:bg-white/6 transition-all"
              >
                <span className="text-3xl">{room.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{room.label}</h3>
                  <p className="text-sm text-white/50">{room.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Cách Có Một Phiên Học Cùng Nhau Hiệu Quả</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Mở phòng học của bạn', body: 'Chọn phòng phù hợp với tâm trạng — phòng anime, phòng lập trình hoặc phòng học online kinh điển. Không cần đăng ký.' },
              { step: '2', title: 'Xác định mục tiêu rõ ràng', body: 'Trước khi bật đồng hồ Pomodoro, hãy viết nhiệm vụ cần tập trung cho phiên này vào to-do list. Mục tiêu cụ thể hiệu quả hơn mục tiêu mơ hồ gấp nhiều lần.' },
              { step: '3', title: 'Bắt đầu đếm giờ', body: '25 phút, tập trung tuyệt đối. Không điện thoại, không tab khác, không email. Âm thanh nền và nhạc tự động chạy song song.' },
              { step: '4', title: 'Nghỉ đúng nghĩa', body: 'Khi chuông reo — dừng lại thật sự. Đứng dậy, vươn vai, rời mắt khỏi màn hình. 5 phút rời khỏi bàn giúp phiên Pomodoro tiếp theo hiệu quả hơn.' },
              { step: '5', title: 'Theo dõi streak của bạn', body: 'Sau 4 phiên Pomodoro là bạn đã có 2 tiếng tập trung thực sự. XP tăng lên, streak nối dài. Hẹn gặp lại vào ngày mai.' },
            ].map(s => (
              <div key={s.step} className="flex gap-4 rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
                </div>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-green-900/40 to-violet-900/20 border border-green-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng học cùng nhau chưa?</h2>
          <p className="mb-6 text-white/55">
            Không cần tài khoản. Không cần đăng ký. Mở lên, tập trung, và xây dựng thói quen.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-green-600 px-10 py-3 font-semibold text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-900/30"
          >
            Bắt Đầu Học Ngay — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/study-with-me" />
      </div>
    </>
  )
}
