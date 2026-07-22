import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Phòng Học Online Miễn Phí — Không Gian Học Ảo Cùng Nhạc Lofi & Pomodoro',
  description:
    'Phòng học online miễn phí với nhạc lofi, tiếng mưa và đồng hồ Pomodoro. Tạo không gian học ảo giúp bạn tập trung học bài dù học một mình ở nhà. Không cần đăng ký.',
  keywords: [
    'phòng học online', 'phòng học ảo', 'học bài online cùng nhau', 'không gian học tập online',
    'study room online tiếng việt', 'phòng học nhóm online', 'học online tập trung',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/phong-hoc-online',
    languages: {
      'en': 'https://www.focusworkspace.app/online-study-room',
      'vi': 'https://www.focusworkspace.app/vi/phong-hoc-online',
      'x-default': 'https://www.focusworkspace.app/online-study-room',
    },
  },
  openGraph: {
    title: 'Phòng Học Online Miễn Phí — Nhạc Lofi & Pomodoro | LofiSpace',
    description: 'Tạo không gian học ảo với nhạc lofi, tiếng mưa và đồng hồ Pomodoro. Học bài tập trung hơn, hoàn toàn miễn phí.',
    url: 'https://www.focusworkspace.app/vi/phong-hoc-online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phòng Học Online Miễn Phí | LofiSpace',
    description: 'Không gian học ảo với nhạc lofi, tiếng mưa và Pomodoro. Miễn phí, không cần đăng ký.',
  },
}

const FAQ = [
  {
    q: 'Phòng học online là gì?',
    a: 'Phòng học online (hay còn gọi là study room ảo) là một không gian trên trình duyệt mô phỏng cảm giác ngồi học ở thư viện hoặc quán cà phê, thường có nhạc nền, hình ảnh động và bộ đếm thời gian học tập. LofiSpace là một dạng phòng học online: bạn mở trang web lên là có ngay khung cảnh, nhạc lofi, tiếng mưa và đồng hồ Pomodoro để bắt đầu học ngay.',
  },
  {
    q: 'Phòng học online khác gì phòng Zoom học nhóm?',
    a: 'Phòng Zoom hay Google Meet chủ yếu để nhìn thấy mặt nhau, phù hợp khi cần trao đổi bài trực tiếp. Còn phòng học online kiểu LofiSpace không cần camera, không cần tài khoản, tập trung vào việc tạo không khí học bài — nhạc nền dễ chịu, hình nền đẹp mắt, đồng hồ đếm giờ — để bạn tự học một mình mà vẫn có cảm giác "đang ở trong một không gian học tập" chứ không phải ngồi một mình giữa bốn bức tường trống.',
  },
  {
    q: 'Học một mình ở nhà thì tạo không gian ảo có tác dụng gì?',
    a: 'Rất nhiều bạn học ở nhà bị xao nhãng vì phòng quá yên tĩnh (dễ buồn ngủ, dễ nghĩ lung tung) hoặc quá ồn (tiếng gia đình, tiếng xe cộ). Một phòng học ảo với nhạc lofi và âm thanh nền như tiếng mưa giúp "lấp" khoảng trống đó, tạo nhịp điệu ổn định để não bộ dễ vào trạng thái tập trung hơn, giống như hiệu ứng bạn hay thấy khi ngồi học ở quán cà phê.',
  },
  {
    q: 'Ai nên dùng phòng học online?',
    a: 'Học sinh ôn thi, sinh viên làm bài tập lớn, người tự học ngoại ngữ hoặc kỹ năng mới, hoặc bất kỳ ai cần một không gian yên tĩnh có kiểm soát để ngồi vào bàn học mà không bị phân tâm bởi mạng xã hội hay tiếng ồn xung quanh.',
  },
  {
    q: 'Có cần cài đặt app hay đăng ký tài khoản không?',
    a: 'Không. LofiSpace chạy thẳng trên trình duyệt, không cần tải app, không cần tạo tài khoản. Bạn chỉ cần mở link là có thể bắt đầu học ngay lập tức.',
  },
  {
    q: 'Làm sao để setup một buổi học hiệu quả trong phòng học online?',
    a: 'Gợi ý đơn giản: bật nhạc lofi ở mức vừa phải, thêm chút tiếng mưa hoặc tiếng quán cà phê, đặt đồng hồ Pomodoro theo chu kỳ 25/5, rồi ghi ra 2-3 việc cần làm trong to-do list. Sau mỗi phiên Pomodoro, đứng dậy nghỉ ngắn rồi quay lại — lặp lại cho đến khi xong việc.',
  },
]

export default function PhongHocOnlinePage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Phòng Học Online', url: 'https://www.focusworkspace.app/vi/phong-hoc-online' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Phòng Học Online"
        description="Phòng học online miễn phí với nhạc lofi, tiếng mưa và đồng hồ Pomodoro giúp bạn tập trung học bài."
        url="https://www.focusworkspace.app/vi/phong-hoc-online"
        keywords={['phòng học online', 'phòng học ảo', 'học bài online', 'không gian học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Phòng Học Online', url: 'https://www.focusworkspace.app/vi/phong-hoc-online' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📚 Phòng học ảo · Nhạc lofi + Pomodoro · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-violet-400">Phòng Học Online</span> — Học Bài Tập Trung Mọi Lúc
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một không gian học ảo với nhạc lofi, âm thanh nền và đồng hồ Pomodoro —
            mở trình duyệt lên là có ngay không khí học bài, dù bạn đang tự học một mình
            ở nhà lúc nửa đêm hay giữa giờ nghỉ trên thư viện.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Mở Phòng Học Ngay →
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
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Phòng học online khác gì học nhóm qua Zoom?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Khi nhắc đến &ldquo;học online cùng nhau&rdquo;, nhiều người nghĩ ngay đến việc bật camera
              gọi video với bạn bè để cùng ngồi học im lặng. Cách này hiệu quả với một số người,
              nhưng cũng có nhược điểm: phải hẹn giờ, cần mạng ổn định, và đôi khi việc nhìn thấy
              người khác lại gây xao nhãng thay vì giúp tập trung.
            </p>
            <p>
              Phòng học online kiểu LofiSpace đi theo hướng khác: không cần ai khác tham gia,
              không cần camera. Thay vào đó, không gian được xây dựng bằng hình nền động (mưa rơi,
              quán cà phê, phòng học ấm cúng), nhạc lofi phát liên tục và đồng hồ đếm giờ Pomodoro
              chạy song song. Bạn có cảm giác &ldquo;đang ở trong một nơi để học&rdquo; mà không phụ thuộc vào
              lịch trình của ai khác — mở ra là học được ngay, đóng lại là nghỉ.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Vì sao không gian ảo giúp tập trung hơn khi học một mình?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '🎧 Nhạc nền ổn định', desc: 'Nhạc lofi không lời, tempo đều đặn giúp não bộ dễ "khóa" vào nhịp làm việc thay vì bị cuốn theo lời bài hát.' },
              { title: '🌧️ Âm thanh che lấp tiếng ồn', desc: 'Tiếng mưa hoặc tiếng quán cà phê giúp lấp những tiếng động bất ngờ xung quanh nhà — nguyên nhân chính khiến bạn giật mình mất tập trung.' },
              { title: '⏱️ Đồng hồ Pomodoro tạo áp lực tích cực', desc: 'Biết mình chỉ cần tập trung trong 25 phút giúp não bớt "sợ" nhiệm vụ dài, dễ bắt đầu hơn là ngồi học vô thời hạn.' },
              { title: '🖼️ Hình ảnh gợi không khí học tập', desc: 'Một khung cảnh học tập đẹp mắt (dù chỉ là hình động trên màn hình) tạo tín hiệu tâm lý "đây là lúc mình học", giống như việc thay đổi bàn học tạo cảm giác mới.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - setup */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Gợi ý setup phòng học online cho từng đối tượng</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            <p>
              <strong className="text-white">Học sinh ôn thi:</strong> Bật <Link href="/vi/nhac-lofi-hoc-bai" className="text-violet-300 hover:text-violet-200">nhạc lofi học bài</Link> ở
              mức nhẹ, dùng chu kỳ Pomodoro 25/5, ghi rõ môn học cần ôn trong to-do list để tránh học lan man.
            </p>
            <p>
              <strong className="text-white">Sinh viên làm đồ án, tiểu luận:</strong> Kết hợp <Link href="/vi/tieng-mua-hoc-bai" className="text-violet-300 hover:text-violet-200">tiếng mưa học bài</Link> với
              nhạc lofi, dùng chu kỳ dài hơn (50/10) cho các phiên deep work cần sự liền mạch.
            </p>
            <p>
              <strong className="text-white">Người tự học ngoại ngữ, kỹ năng mới:</strong> Ưu tiên <Link href="/vi/khong-gian-tap-trung" className="text-violet-300 hover:text-violet-200">không gian tập trung</Link> yên
              tĩnh, âm lượng nhạc nền thấp để không lấn át phần nghe hoặc đọc tài liệu.
            </p>
            <p>
              Tất cả các tuỳ chỉnh này đều có sẵn trong workspace của LofiSpace — bạn chỉ cần kéo
              thanh trượt âm lượng cho từng loại âm thanh, chọn playlist lofi yêu thích, và bật
              đồng hồ Pomodoro là có ngay một phòng học riêng theo đúng ý mình.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-blue-900/20 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bắt đầu buổi học tập trung ngay bây giờ</h2>
          <p className="mb-6 text-white/55">Miễn phí hoàn toàn. Không cần đăng ký. Mở trình duyệt là học được.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Mở Không Gian Làm Việc →
          </Link>
        </div>

        <RelatedPages exclude="/online-study-room" />
      </div>
    </>
  )
}
