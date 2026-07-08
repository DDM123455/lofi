import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Đồng Hồ Pomodoro Online Miễn Phí — Bộ Đếm Pomodoro Cho Học Tập & Công Việc',
  description:
    'Đồng hồ Pomodoro online miễn phí, kết hợp nhạc lofi và tiếng mưa. Chu kỳ 25/5, 50/10 tuỳ chỉnh, có XP và streak để theo dõi tiến độ học tập, làm việc.',
  keywords: [
    'đồng hồ pomodoro', 'bộ đếm pomodoro', 'pomodoro học tập', 'pomodoro timer tiếng việt',
    'kỹ thuật pomodoro', 'đếm giờ học bài', 'pomodoro online miễn phí',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/dong-ho-pomodoro',
    languages: {
      'en': 'https://www.focusworkspace.app/pomodoro-timer',
      'vi': 'https://www.focusworkspace.app/vi/dong-ho-pomodoro',
      'x-default': 'https://www.focusworkspace.app/pomodoro-timer',
    },
  },
  openGraph: {
    title: 'Đồng Hồ Pomodoro Online Miễn Phí | LofiSpace',
    description: 'Bộ đếm Pomodoro kết hợp nhạc lofi và tiếng mưa, có XP và streak theo dõi tiến độ.',
    url: 'https://www.focusworkspace.app/vi/dong-ho-pomodoro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đồng Hồ Pomodoro Online Miễn Phí | LofiSpace',
    description: 'Bộ đếm Pomodoro với nhạc lofi, tiếng mưa và hệ thống XP/streak.',
  },
}

const FAQ = [
  {
    q: 'Kỹ thuật Pomodoro là gì?',
    a: 'Pomodoro là phương pháp quản lý thời gian do Francesco Cirillo phát triển: bạn học/làm việc tập trung trong một khoảng thời gian cố định (thường là 25 phút), sau đó nghỉ ngắn 5 phút. Sau 4 chu kỳ như vậy, bạn nghỉ dài hơn khoảng 15-30 phút. Cách chia nhỏ này giúp não bộ dễ bắt đầu và duy trì sự tập trung hơn là cố học liên tục nhiều giờ không nghỉ.',
  },
  {
    q: 'Nên dùng chu kỳ 25/5 hay 50/10?',
    a: 'Chu kỳ 25/5 phù hợp khi bạn mới làm quen với Pomodoro, hoặc khi làm những việc dễ mất tập trung như học từ vựng, làm bài tập nhỏ lẻ. Chu kỳ 50/10 phù hợp với công việc cần sự liền mạch như viết luận, code, đọc tài liệu chuyên sâu — vì việc bị ngắt giữa chừng sau 25 phút đôi khi làm gãy mạch suy nghĩ. LofiSpace cho phép bạn tự chỉnh thời lượng theo ý muốn.',
  },
  {
    q: 'Khi nào nên dùng Pomodoro cho học tập, khi nào cho công việc?',
    a: 'Với học tập (ôn thi, làm bài tập), Pomodoro giúp chia nhỏ khối lượng kiến thức lớn thành từng phần dễ tiêu hoá, tránh cảm giác quá tải. Với công việc, Pomodoro hữu ích nhất khi bạn cần hoàn thành nhiều đầu việc nhỏ trong ngày hoặc muốn tránh trì hoãn. Với các task cần "deep work" kéo dài (thiết kế, viết code phức tạp), có thể kéo dài chu kỳ lên 50-90 phút.',
  },
  {
    q: 'Có thể kết hợp Pomodoro với nhạc lofi và tiếng mưa không?',
    a: 'Có, và đây là cách nhiều người dùng LofiSpace hiệu quả nhất: bật nhạc lofi hoặc tiếng mưa ở mức âm lượng vừa phải trong lúc chạy Pomodoro. Âm thanh nền giúp che tiếng ồn xung quanh và tạo nhịp điệu ổn định, còn bộ đếm Pomodoro giữ bạn có kỷ luật thời gian rõ ràng — hai thứ bổ trợ cho nhau rất tốt.',
  },
  {
    q: 'Hệ thống XP và streak của LofiSpace hoạt động ra sao?',
    a: 'Mỗi phiên Pomodoro hoàn thành sẽ cộng XP cho bạn, và nếu bạn học liên tục nhiều ngày, hệ thống sẽ ghi nhận streak (chuỗi ngày liên tiếp). Đây là cách tạo động lực nhỏ để bạn duy trì thói quen học tập đều đặn, tương tự các app học ngôn ngữ. Bạn có thể xem lại tiến độ này trong dashboard tổng quan.',
  },
  {
    q: 'Đồng hồ Pomodoro của LofiSpace có mất phí không?',
    a: 'Không. Đồng hồ Pomodoro, nhạc lofi, âm thanh nền và hệ thống XP/streak đều miễn phí hoàn toàn, không giới hạn số phiên, không cần tạo tài khoản.',
  },
]

export default function DongHoPomodoroPage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Đồng Hồ Pomodoro', url: 'https://www.focusworkspace.app/vi/dong-ho-pomodoro' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Đồng Hồ Pomodoro"
        description="Đồng hồ Pomodoro online miễn phí, kết hợp nhạc lofi và tiếng mưa, có hệ thống XP và streak."
        url="https://www.focusworkspace.app/vi/dong-ho-pomodoro"
        keywords={['đồng hồ pomodoro', 'bộ đếm pomodoro', 'pomodoro học tập', 'pomodoro online']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-rose-900/30 px-4 py-1 text-sm text-rose-300 ring-1 ring-rose-500/20">
            🍅 Chu kỳ 25/5 · XP & streak · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-rose-400">Đồng Hồ Pomodoro</span> Online — Tập Trung Từng Phiên
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Bộ đếm Pomodoro miễn phí, tuỳ chỉnh chu kỳ theo ý bạn, kết hợp sẵn nhạc lofi
            và tiếng mưa. Mỗi phiên hoàn thành đều được ghi nhận XP và streak để bạn
            theo dõi thói quen học tập, làm việc mỗi ngày.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-900/40 hover:bg-rose-500 transition-colors"
            >
              Bắt Đầu Pomodoro →
            </Link>
            <Link
              href="/vi/nhac-lofi-hoc-bai"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Nghe Nhạc Lofi Học Bài
            </Link>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-16 rounded-2xl border border-rose-500/15 bg-rose-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Kỹ thuật Pomodoro là gì và vì sao nó hiệu quả?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Ý tưởng cốt lõi của Pomodoro rất đơn giản: thay vì ép bản thân &ldquo;học liên tục 3 tiếng&rdquo;
              — điều gần như không ai làm được với sự tập trung trọn vẹn — bạn chia thời gian thành
              từng phiên ngắn (thường 25 phút), giữa mỗi phiên có một khoảng nghỉ ngắn (5 phút).
              Sau 4 phiên, bạn nghỉ dài hơn để não bộ thực sự phục hồi.
            </p>
            <p>
              Cơ chế này hiệu quả vì hai lý do: thứ nhất, biết mình chỉ cần tập trung trong 25 phút
              khiến việc bắt đầu học bớt &ldquo;đáng sợ&rdquo; hơn nhiều so với một buổi học không giới hạn thời
              gian. Thứ hai, những khoảng nghỉ đều đặn giúp duy trì sự tỉnh táo thay vì để bản thân
              kiệt sức rồi mất tập trung hoàn toàn sau 1-2 tiếng.
            </p>
          </div>
        </section>

        {/* Section 2 - cycles */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Chọn chu kỳ Pomodoro phù hợp</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '⏱️ 25/5 — Cổ điển', desc: 'Phù hợp học từ vựng, làm bài tập nhỏ, ôn thi trắc nghiệm. Dễ bắt đầu, dễ duy trì mỗi ngày.' },
              { title: '⏱️ 50/10 — Deep work', desc: 'Phù hợp viết luận, code, đọc tài liệu chuyên sâu — công việc cần mạch suy nghĩ liền mạch, không muốn bị ngắt sớm.' },
              { title: '⏱️ 15/3 — Khởi động', desc: 'Dành cho ngày khó tập trung, giúp bạn "vào việc" dần dần trước khi chuyển sang chu kỳ dài hơn.' },
              { title: '⏱️ Tuỳ chỉnh', desc: 'LofiSpace cho phép tự đặt số phút học và nghỉ theo đúng nhu cầu cá nhân, lưu lại cho lần sau.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - combine */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Kết hợp Pomodoro với nhạc lofi và tiếng mưa</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            <p>
              Đồng hồ đếm giờ đơn thuần đôi khi vẫn chưa đủ để giữ bạn tập trung — phòng quá yên
              tĩnh dễ khiến bạn phân tâm bởi tiếng động bất chợt, còn phòng quá ồn thì khó vào việc
              ngay từ đầu. Đó là lý do LofiSpace tích hợp sẵn <Link href="/vi/nhac-lofi-hoc-bai" className="text-rose-300 hover:text-rose-200">nhạc lofi</Link> và <Link href="/vi/tieng-mua-hoc-bai" className="text-rose-300 hover:text-rose-200">tiếng mưa</Link> ngay
              trong cùng một workspace với bộ đếm Pomodoro.
            </p>
            <p>
              Một combo nhiều người dùng thấy hiệu quả: nhạc lofi ở mức 40-50%, tiếng mưa nhẹ khoảng
              20-30%, chu kỳ Pomodoro 25/5. Âm thanh nền giúp che lấp tiếng ồn xung quanh, còn bộ đếm
              giờ giữ kỷ luật — cả hai cộng lại tạo ra một trạng thái tập trung dễ đạt được hơn nhiều
              so với việc chỉ ngồi im lặng đặt hẹn giờ trên điện thoại.
            </p>
            <p>
              Sau mỗi phiên hoàn thành, hệ thống XP và streak của LofiSpace sẽ ghi nhận lại, giúp bạn
              nhìn thấy tiến độ học tập tích luỹ theo ngày — một cách tạo động lực nhỏ nhưng khá hiệu
              quả để duy trì thói quen lâu dài.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-rose-900/40 to-amber-900/20 border border-rose-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bắt đầu phiên Pomodoro đầu tiên</h2>
          <p className="mb-6 text-white/55">Miễn phí, không giới hạn phiên, kèm nhạc lofi và tiếng mưa sẵn có.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-rose-600 px-10 py-3 font-semibold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-900/30"
          >
            Mở Không Gian Làm Việc →
          </Link>
        </div>

        <RelatedPages exclude="/pomodoro-timer" />
      </div>
    </>
  )
}
