import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Phòng Học Anime — Không Gian Học Bài Phong Cách Nhật Bản',
  description:
    'Phòng học phong cách anime với nhạc lofi city-pop, tiếng mưa và hình nền hoa anh đào. Cảm giác như đang ngồi học trong một khung hình phim hoạt hình Nhật. Miễn phí.',
  keywords: [
    'phòng học anime', 'không gian học anime', 'lofi anime học bài', 'study room anime',
    'phòng học phong cách nhật bản', 'nhạc lofi city pop', 'study with me anime', 'phòng học aesthetic',
  ],
  openGraph: {
    title: 'Phòng Học Anime — LofiSpace',
    description: 'Không gian học phong cách Nhật Bản với nhạc lofi city-pop, tiếng mưa và đồng hồ Pomodoro. Miễn phí.',
    type: 'website',
    url: 'https://www.focusworkspace.app/vi/phong-hoc-anime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phòng Học Anime — LofiSpace',
    description: 'Không gian học phong cách Nhật Bản với nhạc lofi city-pop, tiếng mưa và đồng hồ Pomodoro.',
  },
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/phong-hoc-anime',
    languages: {
      en: 'https://www.focusworkspace.app/anime-study-room',
      vi: 'https://www.focusworkspace.app/vi/phong-hoc-anime',
      'x-default': 'https://www.focusworkspace.app/anime-study-room',
    },
  },
}

const FAQ = [
  {
    q: 'Phòng học anime là gì?',
    a: 'Là một không gian học ảo được thiết kế theo phong cách thẩm mỹ Nhật Bản — hình nền ấm cúng, nhạc lofi city-pop và tiếng mưa nhẹ — gợi nhớ đến những khung cảnh học bài quen thuộc trong các bộ anime như Kimi no Na wa (Your Name) hay Kotonoha no Niwa (The Garden of Words).',
  },
  {
    q: 'Nhạc trong phòng học anime là loại nhạc gì?',
    a: 'Chủ yếu là lofi hip hop pha trộn với city-pop Nhật những năm 80-90 — giai điệu nhẹ nhàng, không lời, tempo vừa phải, đủ dễ chịu để nghe nền mà không kéo sự chú ý khỏi việc học.',
  },
  {
    q: 'Có thể đổi hình nền không?',
    a: 'Có. Trong workspace bạn có thể chọn từ hơn 15 hình nền động, bao gồm các cảnh mang hơi hướng anime, cửa sổ trời mưa, phòng học ấm cúng và nhiều khung cảnh khác.',
  },
  {
    q: 'Có đồng hồ Pomodoro không?',
    a: 'Có, chu kỳ 25/5 phút được tích hợp sẵn. Hoàn thành mỗi phiên sẽ nhận XP và cộng dồn vào chuỗi ngày học liên tục của bạn.',
  },
  {
    q: 'Phòng học anime có phù hợp để ôn thi không?',
    a: 'Rất phù hợp. Nhiều bạn học sinh, sinh viên dùng phòng này khi ôn thi vào buổi tối vì không khí nhẹ nhàng, ít gây căng thẳng hơn so với ngồi học trong im lặng tuyệt đối, đồng thời nhạc city-pop không lời không làm phân tán tư duy khi đọc tài liệu.',
  },
  {
    q: 'Vì sao lại chọn thẩm mỹ anime thay vì một phòng học bình thường?',
    a: 'Thẩm mỹ anime — vốn được biết đến rộng rãi qua Lo-fi Girl và hàng triệu video "study with me" — tạo cảm giác hoài niệm, ấm áp và dễ chịu hơn một không gian học khô khan. Với nhiều người, cảm giác "đang ngồi học trong một cảnh phim" giúp việc ngồi vào bàn học bớt nặng nề hơn.',
  },
]

const PRESET_FEATURES = [
  { emoji: '🌸', label: 'Hình nền hoa anh đào & mưa' },
  { emoji: '🎵', label: 'Nhạc lofi city-pop Nhật Bản' },
  { emoji: '🌧️', label: 'Tiếng mưa nhẹ + âm thanh quán cà phê' },
  { emoji: '🍅', label: 'Đồng hồ Pomodoro kèm thưởng XP' },
  { emoji: '🐱', label: 'Bạn đồng hành mèo lập trình' },
  { emoji: '✅', label: 'To-do list & lịch hàng ngày' },
]

export default function PhongHocAnimePage() {
  // Tokyo Cafe Rain scene params — giữ nguyên cấu hình bản gốc
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/lofi-bedroom.mp4') +
    '&bgo=40&ls=lofi1&lv=65&at=rain:55,cafe:35&pom=1&clk=1&ac=a78bfa'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Phòng Học Anime', url: 'https://www.focusworkspace.app/vi/phong-hoc-anime' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Phòng Học Anime"
        description="Phòng học phong cách Nhật Bản với nhạc lofi, tiếng mưa và đồng hồ Pomodoro."
        url="https://www.focusworkspace.app/vi/phong-hoc-anime"
        keywords={['phòng học anime', 'phong cách nhật bản', 'lofi anime', 'study with me']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Phòng Học Anime', url: 'https://www.focusworkspace.app/vi/phong-hoc-anime' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-pink-900/30 px-4 py-1 text-sm text-pink-300 ring-1 ring-pink-500/20">
            🌸 Phong cách Nhật Bản · Tiếng mưa · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Phòng Học <span className="text-pink-400">Anime</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Bước vào một không gian học ấm cúng mang phong cách Nhật Bản với nhạc lofi nhẹ nhàng,
            tiếng mưa êm dịu và hình nền đậm chất anime. Học tập trung hơn nhờ đồng hồ Pomodoro
            và nhận XP cho mỗi phiên học.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-900/40 hover:bg-pink-500 transition-colors"
            >
              Vào Phòng Học Anime →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Scene
            </Link>
          </div>
        </div>

        {/* Preset features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Có Gì Trong Phòng Này
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRESET_FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section className="mb-16 rounded-2xl border border-pink-500/15 bg-pink-950/15 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Nên Học Trong Phòng Học Anime?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Thẩm mỹ phòng học anime — nổi tiếng nhờ kênh Lo-fi Girl và hàng triệu video
              &ldquo;study with me&rdquo; trên YouTube — tạo ra một môi trường bình yên, cuốn hút,
              gửi tín hiệu đến não bộ rằng đã đến lúc tập trung học bài.
            </p>
            <p>
              Tiếng mưa nhẹ hoạt động như một lớp âm thanh nền che lấp những tạp âm gây xao nhãng.
              Nhạc lofi city-pop Nhật thường có tempo 70-90 BPM — mức nhịp đã được chứng minh giúp
              hỗ trợ tập trung mà không kích hoạt vùng xử lý ngôn ngữ trong não.
            </p>
            <p>
              Đồng hồ Pomodoro tích hợp sẵn trong LofiSpace biến mỗi phiên 25 phút thành một mục
              tiêu nhỏ, dễ đạt được. Hệ thống XP và chuỗi ngày học liên tục cho bạn thêm động lực
              để quay lại học mỗi ngày.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-pink-900/30 to-violet-900/20 border border-pink-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bắt đầu học ngay</h2>
          <p className="mb-6 text-white/55">Không cần tài khoản. Không cần tải app. Mở lên là học được.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-pink-600 px-10 py-3 font-semibold text-white hover:bg-pink-500 transition-colors"
          >
            Mở Phòng Học Anime — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/anime-study-room" />
      </div>
    </>
  )
}
