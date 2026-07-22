import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Đồng Hồ Lofi Học Bài — Đếm Giờ Học Kèm Nhạc Lofi Và Theo Dõi Môn Học',
  description:
    'Đồng hồ học bài dành riêng cho học sinh, sinh viên: nhạc lofi, âm thanh nền, chu kỳ Pomodoro và danh sách việc cần làm theo dõi số phiên mỗi môn học. Miễn phí.',
  keywords: [
    'đồng hồ lofi học bài', 'timer học bài', 'đếm giờ học lofi', 'đồng hồ học bài có nhạc',
    'pomodoro cho học sinh sinh viên', 'nhạc lofi học bài', 'timer học bài online',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/dong-ho-lofi-hoc-bai',
    languages: {
      en: 'https://www.focusworkspace.app/lofi-timer-for-studying',
      vi: 'https://www.focusworkspace.app/vi/dong-ho-lofi-hoc-bai',
      'x-default': 'https://www.focusworkspace.app/lofi-timer-for-studying',
    },
  },
  openGraph: {
    title: 'Đồng Hồ Lofi Học Bài — LofiSpace',
    description: 'Đồng hồ học bài kết hợp nhạc lofi, âm thanh nền và danh sách việc cần làm dành cho học sinh, sinh viên.',
    url: 'https://www.focusworkspace.app/vi/dong-ho-lofi-hoc-bai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đồng Hồ Lofi Học Bài — LofiSpace',
    description: 'Đồng hồ học bài kết hợp nhạc lofi, âm thanh nền và danh sách việc cần làm dành cho học sinh, sinh viên.',
  },
}

const FAQ = [
  {
    q: 'Đồng hồ này có thiết kế riêng cho học sinh, sinh viên không?',
    a: 'Có — nó kết hợp những thứ học sinh, sinh viên thường tìm kiếm nhất ở một app đếm giờ học bài: nhạc lofi bật sẵn theo mặc định, danh sách việc cần làm có thể gắn với từng phiên Pomodoro, và một streak hiển thị rõ để việc ôn bài không bị gián đoạn quá lâu.',
  },
  {
    q: 'Có thể theo dõi thời gian học theo từng môn hoặc từng bài tập không?',
    a: 'Có — thêm mỗi môn học hoặc bài tập như một task riêng, đánh dấu task đang làm, và mỗi Pomodoro hoàn thành sẽ tự động cộng vào số đếm của task đó. Focus Dashboard sau đó sẽ xếp hạng các task theo tổng thời gian đã dành.',
  },
  {
    q: 'Nếu cần học liên tục hơn 25 phút cho một buổi ôn thi thì sao?',
    a: 'Công cụ tạo embed trên trang Notion Widget của LofiSpace cho phép đặt thời lượng tập trung tuỳ chỉnh lên tới 60 phút, nếu bạn thích những khối thời gian dài kiểu ôn thi hơn là chu kỳ Pomodoro tiêu chuẩn.',
  },
  {
    q: 'Dùng được cho học nhóm hay chỉ học một mình?',
    a: 'Đồng hồ này được xây cho việc học một mình, tập trung cao độ. Nếu muốn học cùng người khác mà không cần bật video, bạn có thể xem trang Study With Me của LofiSpace.',
  },
  {
    q: 'Có mất phí không?',
    a: 'Không. Nhạc lofi, âm thanh nền, danh sách việc cần làm, chu kỳ Pomodoro và hệ thống streak đều hoàn toàn miễn phí, không giới hạn số phiên mỗi ngày.',
  },
]

const FEATURES = [
  { emoji: '📚', label: 'Nhạc lofi + âm thanh mưa/quán cà phê' },
  { emoji: '✅', label: 'Danh sách việc cần làm gắn với phiên Pomodoro' },
  { emoji: '🔥', label: 'Streak hàng ngày để việc ôn bài không bị đứt quãng' },
  { emoji: '📈', label: 'Bảng thống kê xếp hạng môn học theo thời gian' },
  { emoji: '🍅', label: 'Thời lượng tập trung/nghỉ tuỳ chỉnh' },
  { emoji: '📱', label: 'Dùng được trên điện thoại, tablet và máy tính' },
]

export default function DongHoLofiHocBaiPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=40&ls=lofi1&lv=60&at=rain:35,cafe:15&pom=1&clk=1&ac=db2777'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Đồng Hồ Lofi Học Bài', url: 'https://www.focusworkspace.app/vi/dong-ho-lofi-hoc-bai' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Đồng Hồ Lofi Học Bài"
        description="Đồng hồ học bài dành cho học sinh, sinh viên với nhạc lofi, theo dõi task và streak hàng ngày."
        url="https://www.focusworkspace.app/vi/dong-ho-lofi-hoc-bai"
        applicationCategory="EducationalApplication"
        keywords={['đồng hồ lofi học bài', 'timer học bài', 'pomodoro cho học sinh sinh viên']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Đồng Hồ Lofi Học Bài', url: 'https://www.focusworkspace.app/vi/dong-ho-lofi-hoc-bai' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-pink-900/30 px-4 py-1 text-sm text-pink-300 ring-1 ring-pink-500/20">
            📚 Xây Dựng Cho Buổi Học Bài
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Đồng Hồ Lofi <span className="text-pink-400">Học Bài</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một đồng hồ học bài kết hợp nhạc lofi với danh sách việc cần làm — để bạn thấy rõ mỗi
            môn học hay bài tập thực sự đã tốn bao nhiêu phiên tập trung.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-900/40 hover:bg-pink-500 transition-colors"
            >
              Bắt Đầu Học →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tiến Độ Của Tôi
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Xây Dựng Riêng Cho Việc Học</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-pink-500/15 bg-pink-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Học Sinh, Sinh Viên Dùng Đồng Hồ Lofi Học Bài</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Một đồng hồ đếm ngược trơn không nói cho bạn biết thời gian ôn bài của mình thực sự
              đi đâu. Gắn mỗi môn học vào đồng hồ như một task nghĩa là mỗi phiên hoàn thành sẽ tự
              cộng dồn — không cần bảng tính riêng, không cần ghi chép thủ công.
            </p>
            <p>
              Nhạc lofi cùng tiếng mưa hoặc quán cà phê nhẹ nhàng che đi những tiếng động nhỏ hay
              làm gián đoạn sự tập trung trong những buổi học dài ở thư viện hay trong phòng,
              nhưng không kéo sự chú ý đi như nhạc có lời.
            </p>
            <p>
              Và vì streak sẽ reset nếu bạn bỏ lỡ trọn một ngày, nó hoạt động như một lời nhắc nhẹ
              nhàng để quay lại vào ngày mai — gần với một thói quen học tập hơn là một buổi cày
              đêm trước ngày thi.
            </p>
          </div>
        </section>

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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-pink-900/30 to-rose-900/20 border border-pink-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng ôn bài chưa?</h2>
          <p className="mb-6 text-white/55">Thêm các môn học hôm nay như task và bắt đầu phiên đầu tiên.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-pink-600 px-10 py-3 font-semibold text-white hover:bg-pink-500 transition-colors"
          >
            Mở Đồng Hồ Học Bài — Miễn Phí →
          </Link>
        </div>

        <PomodoroCompare exclude="/lofi-timer-for-studying" lang="vi" />

        <RelatedPages exclude="/lofi-timer-for-studying" />
      </div>
    </>
  )
}
