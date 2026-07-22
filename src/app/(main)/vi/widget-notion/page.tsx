import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Widget Lofi Cho Notion — Nhúng Góc Học Tập Miễn Phí',
  description: 'Nhúng trình phát nhạc lofi, bộ trộn âm thanh môi trường và đồng hồ Pomodoro trực tiếp vào trang Notion. Không cần đăng ký, dùng được với mọi khối /embed.',
  keywords: ['widget notion', 'widget lofi notion', 'nhúng lofi vào notion', 'notion pomodoro', 'notion embed lofi', 'góc học tập notion', 'widget năng suất notion'],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/widget-notion',
    languages: {
      en: 'https://www.focusworkspace.app/notion-widget',
      vi: 'https://www.focusworkspace.app/vi/widget-notion',
      'x-default': 'https://www.focusworkspace.app/notion-widget',
    },
  },
  openGraph: {
    title: 'Widget Lofi Cho Notion — Nhúng Góc Học Tập Miễn Phí | LofiSpace',
    description: 'Nhúng nhạc lofi, âm thanh môi trường và đồng hồ Pomodoro vào Notion. Một URL, không cần cài đặt gì thêm.',
    url: 'https://www.focusworkspace.app/vi/widget-notion',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Widget Lofi Cho Notion — Nhúng Góc Học Tập Miễn Phí',
    description: 'Nhúng widget nhạc lofi, âm thanh môi trường và Pomodoro vào Notion. Miễn phí.',
  },
}

const STEPS = [
  {
    step: '1',
    title: 'Mở LofiSpace',
    desc: 'Vào focusworkspace.app/workspace và tùy chỉnh scene của bạn — chọn hình nền, chọn kênh nhạc lofi, trộn âm thanh môi trường và bật đồng hồ Pomodoro.',
  },
  {
    step: '2',
    title: 'Sao chép URL',
    desc: 'Toàn bộ cấu hình của bạn được mã hóa trong URL. Sao chép trực tiếp từ thanh địa chỉ trình duyệt — URL sẽ có dạng focusworkspace.app/workspace?scene=...&sounds=...',
  },
  {
    step: '3',
    title: 'Dán vào Notion',
    desc: 'Trong bất kỳ trang Notion nào, gõ /embed rồi nhấn Enter. Dán URL của LofiSpace vào ô nhập và bấm "Embed link". Góc học tập của bạn sẽ hiện ngay trong trang.',
  },
  {
    step: '4',
    title: 'Chỉnh kích thước và tận hưởng',
    desc: 'Kéo khối embed đến kích thước bạn muốn. Nên để chiều cao tối thiểu 600px để trải nghiệm đầy đủ với đồng hồ Pomodoro và các nút điều khiển âm thanh.',
  },
]

const WHY = [
  { icon: '🎵', title: 'Nhạc + Âm Thanh Trong Một Widget', desc: 'Nhạc lofi và âm thanh môi trường trộn sẵn trong một widget — không cần mở thêm tab.' },
  { icon: '🍅', title: 'Đồng Hồ Pomodoro Tích Hợp', desc: 'Phiên 25/5 với vòng tiến độ trực quan, tự động báo nghỉ và thưởng XP.' },
  { icon: '⚙️', title: 'Cấu Hình Toàn Bộ Qua URL', desc: 'Mọi thiết lập đều nằm trong URL — chia sẻ đúng "vibe" của bạn cho bạn cùng lớp hoặc đồng nghiệp.' },
  { icon: '🔗', title: 'Dùng Được Với Mọi Khối Notion', desc: 'Dán như /embed — không cần API key, không cần OAuth, không cần cài extension.' },
  { icon: '📱', title: 'Thân Thiện Với Điện Thoại', desc: 'Notion hỗ trợ embed trên di động. LofiSpace tự động điều chỉnh theo kích thước khối embed.' },
  { icon: '✨', title: 'Luôn Miễn Phí', desc: 'Toàn bộ widget — mọi scene, mọi âm thanh, đồng hồ Pomodoro — miễn phí vĩnh viễn.' },
]

const FAQ = [
  {
    q: 'Làm sao để nhúng LofiSpace vào Notion?',
    a: 'Gõ /embed trong một trang Notion, nhấn Enter, rồi dán URL LofiSpace của bạn (ví dụ focusworkspace.app/workspace?scene=tokyo-cafe-rain). Widget sẽ tải ngay trong trang.',
  },
  {
    q: 'Widget nhúng trong Notion có tự phát nhạc không?',
    a: 'Trình duyệt mặc định chặn tự động phát. Bạn chỉ cần bấm một lần vào bất kỳ đâu trong khối embed để bật tiếng. Sau đó nhạc và âm thanh sẽ tự phát ở các lần truy cập sau.',
  },
  {
    q: 'Tôi có thể chia sẻ trang Notion có gắn widget LofiSpace không?',
    a: 'Có. Bất kỳ ai mở trang Notion đã chia sẻ của bạn đều có thể dùng widget này. Không bên nào cần tài khoản.',
  },
  {
    q: 'Làm sao đổi scene trong widget Notion của tôi?',
    a: 'Vào lại focusworkspace.app để cấu hình workspace mới, sao chép URL mới, rồi cập nhật link embed trong Notion. Xóa embed cũ và dán URL mới vào.',
  },
  {
    q: 'Có mẫu Notion nào đã gắn sẵn LofiSpace không?',
    a: 'Có — mở bất kỳ scene có sẵn nào qua Thư Viện Scene (focusworkspace.app/scenes), sao chép URL embed, rồi dán vào trang học tập Notion của bạn.',
  },
  {
    q: 'LofiSpace có hoạt động trong Notion trên điện thoại không?',
    a: 'Notion trên iOS và Android hiển thị iframe theo cách giới hạn. Widget vẫn tải được nhưng một số nút điều khiển tương tác có thể bị hạn chế bởi app Notion di động.',
  },
]

export default function WidgetNotionPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Widget Notion', url: 'https://www.focusworkspace.app/vi/widget-notion' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Widget Notion"
        description="Widget miễn phí gồm trình phát nhạc lofi, bộ trộn âm thanh môi trường và đồng hồ Pomodoro để nhúng vào trang Notion."
        url="https://www.focusworkspace.app/vi/widget-notion"
        keywords={['widget notion', 'nhúng lofi notion', 'notion pomodoro', 'góc học tập notion']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Widget Notion', url: 'https://www.focusworkspace.app/vi/widget-notion' },
        ]} />

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1.5 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🔗 Miễn phí · Không đăng ký · Dùng được với /embed
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Widget Nhạc Lofi{' '}
            <span className="text-violet-400">Cho Notion</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/55 leading-relaxed">
            Nhúng một góc học tập lofi miễn phí — nhạc, âm thanh môi trường và đồng hồ Pomodoro —
            trực tiếp vào bất kỳ trang Notion nào. Cấu hình một lần, dùng mãi mãi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/workspace" className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-500 transition-all hover:scale-105">
              Tùy Chỉnh Widget Của Bạn →
            </Link>
            <Link href="/scenes" className="rounded-full border border-white/15 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all">
              Xem Các Scene
            </Link>
          </div>
        </div>

        {/* How to embed */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Cách Nhúng Vào Notion Trong 4 Bước</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {STEPS.map(s => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/3 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why LofiSpace */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Vì Sao Chọn LofiSpace Cho Notion?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(w => (
              <div key={w.title} className="rounded-xl border border-white/8 bg-white/3 p-5">
                <div className="mb-2 text-2xl">{w.icon}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{w.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Câu Hỏi Thường Gặp</h2>
          <div className="space-y-4">
            {FAQ.map(f => (
              <div key={f.q} className="rounded-xl border border-white/8 bg-white/3 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{f.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-900/30 to-violet-800/10 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng xây góc học tập trong Notion?</h2>
          <p className="mb-6 text-white/50">Cấu hình đúng "vibe" của bạn trong chưa đầy 2 phút — nhạc lofi, âm thanh môi trường và đồng hồ Pomodoro — rồi dán URL vào Notion.</p>
          <Link href="/workspace" className="inline-block rounded-full bg-violet-600 px-10 py-3.5 font-semibold text-white hover:bg-violet-500 transition-all hover:scale-105">
            Mở Workspace →
          </Link>
          <p className="mt-4 text-xs text-white/25">Miễn phí vĩnh viễn · Không cần tài khoản · Dùng được với mọi khối /embed của Notion</p>
        </section>

        <RelatedPages exclude="/notion-widget" />
      </div>
    </>
  )
}
