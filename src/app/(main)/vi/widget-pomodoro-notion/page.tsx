import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Widget Pomodoro Cho Notion — Nhúng Đồng Hồ Đếm Giờ Thật Vào Trang Notion',
  description:
    'Nhúng một đồng hồ Pomodoro hoạt động thật — có nhạc lofi và âm thanh nền — thẳng vào trang Notion của bạn. Tuỳ chỉnh thời lượng, âm thanh, màu sắc rồi dán một đoạn iframe.',
  keywords: [
    'widget pomodoro notion', 'pomodoro notion', 'nhúng pomodoro vào notion', 'notion timer',
    'notion pomodoro tiếng việt', 'embed pomodoro notion', 'notion focus timer',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/widget-pomodoro-notion',
    languages: {
      en: 'https://www.focusworkspace.app/notion-pomodoro-widget',
      vi: 'https://www.focusworkspace.app/vi/widget-pomodoro-notion',
      'x-default': 'https://www.focusworkspace.app/notion-pomodoro-widget',
    },
  },
  openGraph: {
    title: 'Widget Pomodoro Cho Notion — LofiSpace',
    description: 'Một đồng hồ Pomodoro thật, chạy được, nhúng thẳng vào Notion — kèm nhạc lofi tích hợp sẵn.',
    url: 'https://www.focusworkspace.app/vi/widget-pomodoro-notion',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Widget Pomodoro Cho Notion — LofiSpace',
    description: 'Một đồng hồ Pomodoro thật, chạy được, nhúng thẳng vào Notion — kèm nhạc lofi tích hợp sẵn.',
  },
}

const FAQ = [
  {
    q: 'Đây là template Notion hay một đồng hồ thật sự chạy được?',
    a: 'Đây là đồng hồ Pomodoro thật, đếm ngược trực tiếp — không phải template Notion tĩnh có gif đếm giờ. Nó đếm ngược thời gian thực, phát nhạc lofi, và tự chuyển sang giờ nghỉ ngay trong iframe được nhúng.',
  },
  {
    q: 'Làm sao để thêm widget này vào trang Notion?',
    a: 'Tạo link nhúng bằng công cụ tạo embed trên trang Notion Widget của LofiSpace, gõ /embed trong bất kỳ trang Notion nào, rồi dán link vào. Đồng hồ, nhạc và hình nền sẽ hiện ngay trong trang.',
  },
  {
    q: 'Có thể đặt thời lượng tập trung/nghỉ theo ý mình không?',
    a: 'Có. Công cụ tạo embed cho phép bạn đặt số phút tập trung và nghỉ trước khi sao chép mã nhúng — không bị khoá cứng ở mức 25/5.',
  },
  {
    q: 'Nhúng vào Notion thì có được tính streak không?',
    a: 'Có, miễn là sau đó bạn mở Focus Dashboard trên cùng trình duyệt — các phiên hoàn thành trong widget nhúng ở Notion được lưu vào cùng lịch sử phiên với workspace chính.',
  },
  {
    q: 'Widget này có làm chậm trang Notion không?',
    a: 'Không — nó chỉ tải dưới dạng một iframe nhẹ và chỉ bắt đầu phát âm thanh khi bạn tương tác với nó, giống như bất kỳ video nhúng nào khác.',
  },
]

const STEPS = [
  { step: '1', title: 'Cấu hình', desc: 'Chọn hình nền, kênh lofi, màu nhấn và thời lượng Pomodoro trong công cụ tạo embed.' },
  { step: '2', title: 'Sao chép iframe', desc: 'Một cú nhấp để sao chép đoạn <iframe> sẵn sàng dán — không cần API key hay OAuth.' },
  { step: '3', title: 'Dán vào Notion', desc: 'Gõ /embed trong bất kỳ trang Notion nào, dán link, đồng hồ sẽ hiện trực tiếp ngay trong trang.' },
  { step: '4', title: 'Tập trung', desc: 'Nhấp một lần để bật tiếng, rồi bắt đầu đếm giờ. Phiên hoàn thành sẽ tự lưu vào Focus Dashboard.' },
]

export default function WidgetPomodoroNotionPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Widget Pomodoro Cho Notion', url: 'https://www.focusworkspace.app/vi/widget-pomodoro-notion' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Widget Pomodoro Cho Notion"
        description="Một đồng hồ Pomodoro có thể tuỳ chỉnh, nhúng được, kèm nhạc lofi cho trang Notion."
        url="https://www.focusworkspace.app/vi/widget-pomodoro-notion"
        applicationCategory="ProductivityApplication"
        keywords={['widget pomodoro notion', 'notion timer embed', 'notion focus timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Widget Pomodoro Cho Notion', url: 'https://www.focusworkspace.app/vi/widget-pomodoro-notion' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            📝 Notion · Pomodoro · Lofi
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Widget <span className="text-indigo-400">Pomodoro Cho Notion</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Một đồng hồ Pomodoro thật, chạy được — kèm nhạc lofi, âm thanh nền và thời lượng
            tuỳ chỉnh — nằm ngay trong trang Notion của bạn dưới dạng một khối nhúng duy nhất.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/notion-widget"
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500 transition-colors"
            >
              Tạo Widget Nhúng →
            </Link>
            <Link
              href="/workspace?pom=1"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Thử Đồng Hồ Trước
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">4 Bước Để Có Đồng Hồ Chạy Được Trong Notion</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {STEPS.map(s => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/3 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Vì Sao Nên Chạy Đồng Hồ Ngay Trong Notion?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Nếu công việc, ghi chú và kế hoạch học tập của bạn đã nằm sẵn trong Notion, việc
              chuyển sang một app đếm giờ riêng là một bước chuyển ngữ cảnh không cần thiết.
              Nhúng đồng hồ giữ phiên tập trung của bạn ngay trong cùng trang với công việc đang
              được tính giờ.
            </p>
            <p>
              Khác với một template gif đếm ngược tĩnh, đây là một iframe sống — đồng hồ thật sự
              đếm ngược, nhạc lofi thật sự phát, và một Pomodoro hoàn thành thật sự được ghi vào
              streak và Focus Dashboard của bạn, y hệt như khi chạy workspace đầy đủ.
            </p>
            <p>
              Widget hoạt động trong trang Notion cá nhân, wiki nhóm dùng chung, hay một trang
              Notion công khai — bất cứ đâu Notion cho phép chèn khối /embed.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-violet-900/20 border border-indigo-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Nhúng widget Pomodoro lofi này vào Notion</h2>
          <p className="mb-6 text-white/55">Cấu hình một lần trên trang Notion Widget, rồi dán ở bất cứ đâu.</p>
          <Link
            href="/notion-widget"
            className="inline-block rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Mở Công Cụ Tạo Embed →
          </Link>
        </div>

        <PomodoroCompare exclude="/notion-pomodoro-widget" lang="vi" />

        <RelatedPages exclude="/notion-pomodoro-widget" />
      </div>
    </>
  )
}
