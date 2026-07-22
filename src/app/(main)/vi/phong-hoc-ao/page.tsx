import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Phòng Học Ảo — Không Gian Học Online Miễn Phí Cùng Nhạc Lofi',
  description:
    'Phòng học ảo miễn phí với nhạc lofi, âm thanh nền, đồng hồ Pomodoro và hệ thống streak XP. Nhiều hình nền động — anime, phòng ấm cúng, không gian lập trình. Không cần đăng ký.',
  keywords: [
    'phòng học ảo', 'phòng học online', 'không gian học ảo', 'study room ảo',
    'phòng học ảo miễn phí', 'thư viện ảo học bài', 'phòng học có nhạc', 'virtual study room tiếng việt',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/phong-hoc-ao',
    languages: {
      en: 'https://www.focusworkspace.app/virtual-study-room',
      vi: 'https://www.focusworkspace.app/vi/phong-hoc-ao',
      'x-default': 'https://www.focusworkspace.app/virtual-study-room',
    },
  },
  openGraph: {
    title: 'Phòng Học Ảo — Không Gian Học Online Miễn Phí | LofiSpace',
    description: 'Phòng học ảo miễn phí với nhạc lofi, đồng hồ Pomodoro, streak XP và hình nền động đẹp mắt.',
    url: 'https://www.focusworkspace.app/vi/phong-hoc-ao',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phòng Học Ảo Miễn Phí | LofiSpace',
    description: 'Học trong một phòng ảo đẹp mắt cùng nhạc lofi, âm thanh nền và đồng hồ Pomodoro. Không cần đăng ký.',
  },
}

const ROOMS = [
  {
    href: '/vi/phong-hoc-online',
    emoji: '📚',
    title: 'Phòng Học Online',
    vibe: 'Ấm áp · Cổ điển · Bất biến',
    desc: 'Một bàn học ấm cúng dưới ánh đèn lofi, có sách, cây xanh và tiếng mưa ngoài cửa sổ. Phòng học ảo phổ biến nhất trên LofiSpace. Đã tích hợp nhạc lofi hip hop + tiếng mưa.',
    badge: 'Phổ biến nhất',
  },
  {
    href: '/vi/phong-hoc-anime',
    emoji: '🌸',
    title: 'Phòng Học Anime',
    vibe: 'Nhật Bản · Aesthetic · Mộng mơ',
    desc: 'Hoa anh đào, chiếu tatami, ánh nắng dịu xuyên qua cửa shoji. Nhạc lofi city-pop. Lấy cảm hứng từ những khung cảnh học bài quen thuộc trong phim hoạt hình Nhật.',
    badge: 'Được yêu thích',
  },
  {
    href: '/vi/phong-hoc-lap-trinh',
    emoji: '💻',
    title: 'Phòng Học Lập Trình',
    vibe: 'Tối màu · Điện tử · Tập trung',
    desc: 'Hai màn hình, giao diện tối, mưa neon thành phố. Nhạc synthwave cho những đêm code muộn. Phòng học ảo dành riêng cho lập trình viên.',
    badge: null,
  },
  {
    href: '/focus-room',
    emoji: '🎯',
    title: 'Focus Room',
    vibe: 'Tối giản · Cường độ cao · Tĩnh tâm',
    desc: 'Lược bỏ mọi thứ thừa thãi. Không chi tiết hình ảnh rườm rà — chỉ có một bàn học, một khung cảnh và tiếng giông bão. Được xây dựng cho hiệu suất nhận thức tối đa.',
    badge: null,
  },
  {
    href: '/vi/khong-gian-deep-work',
    emoji: '🧠',
    title: 'Không Gian Deep Work',
    vibe: 'Mưa nặng hạt · Đắm chìm',
    desc: 'Mưa lớn, giao diện tối giản, nhịp điệu êm dịu. Dành cho những phiên làm việc tập trung kéo dài trên 2 tiếng. Dựa trên nguyên tắc deep work của Cal Newport.',
    badge: null,
  },
]

const FEATURES = [
  {
    emoji: '🎵',
    title: 'Nhạc lofi trực tuyến',
    desc: 'Lofi hip hop, chillhop, synthwave và nhạc ambient — được chọn lọc kỹ càng cho việc tập trung. Không quảng cáo, không bị gián đoạn.',
  },
  {
    emoji: '🎚️',
    title: 'Bộ trộn âm thanh nền',
    desc: 'Kết hợp tiếng mưa, quán cà phê, lửa trại, biển, rừng và nhiều âm thanh khác với thanh chỉnh âm lượng riêng cho từng loại.',
  },
  {
    emoji: '⏱️',
    title: 'Đồng hồ Pomodoro tích hợp',
    desc: 'Các khối tập trung 25 phút kèm nhắc nghỉ tự động. Có thể tuỳ chỉnh theo chu kỳ bạn thích.',
  },
  {
    emoji: '🔥',
    title: 'Streak hàng ngày & XP',
    desc: 'Nhận XP mỗi phiên học. Xây dựng chuỗi ngày học liên tục. Theo dõi số giờ học của bạn theo thời gian.',
  },
  {
    emoji: '✅',
    title: 'Danh sách việc cần làm theo phiên',
    desc: 'Ghi ra nhiệm vụ cần tập trung khi bắt đầu mỗi phiên Pomodoro. Đánh dấu hoàn thành khi xong. Luôn có chủ đích rõ ràng.',
  },
  {
    emoji: '📤',
    title: 'Link phòng có thể chia sẻ',
    desc: 'Toàn bộ cài đặt phòng của bạn — nhạc, âm thanh, âm lượng, đồng hồ — đều được mã hoá trong URL. Chia sẻ cho bất kỳ ai.',
  },
]

const FAQ = [
  {
    q: 'Phòng học ảo là gì?',
    a: 'Phòng học ảo là một môi trường trực tuyến được thiết kế để mô phỏng không khí và lợi ích tập trung của một không gian học tập thực tế — có nhạc lofi, âm thanh nền và một bối cảnh hình ảnh đẹp mắt. Nó mang lại cho người học từ xa những tín hiệu môi trường kích hoạt sự tập trung giống như ở thư viện hay quán cà phê, mà không cần rời khỏi nhà.',
  },
  {
    q: 'LofiSpace khác gì so với video "study with me" trên YouTube?',
    a: 'Video study with me trên YouTube mang tính thụ động — bạn không thể điều chỉnh nhạc, âm thanh hay thời lượng. LofiSpace thì tương tác trực tiếp: bạn tự chọn khung cảnh và thể loại nhạc, tự trộn âm thanh nền theo ý mình, đặt chu kỳ đồng hồ Pomodoro, theo dõi streak hàng ngày và ghi nhiệm vụ cho từng phiên. Mọi thứ đều sống động và phản hồi ngay lập tức, không phải một video quay sẵn.',
  },
  {
    q: 'Phòng học ảo có miễn phí không?',
    a: 'Hoàn toàn miễn phí. Không cần tài khoản, không có gói trả phí, không giới hạn thời gian sử dụng. Tất cả các phòng học, mọi thể loại nhạc, bộ trộn âm thanh nền đầy đủ và đồng hồ Pomodoro đều miễn phí vĩnh viễn.',
  },
  {
    q: 'Có cần tạo tài khoản không?',
    a: 'Không cần. Mở bất kỳ phòng học nào và bắt đầu ngay lập tức. Cài đặt của bạn (âm thanh, âm lượng, tuỳ chọn đồng hồ) được lưu trực tiếp trong URL thay vì cần đăng nhập.',
  },
  {
    q: 'Có thể nhúng phòng học ảo vào Notion hoặc một trang web không?',
    a: 'Có. LofiSpace hỗ trợ chế độ embed — một phiên bản thu gọn của workspace được thiết kế để nhúng vào trang Notion, website hoặc dashboard cá nhân. Chỉ cần thêm ?embed=1 vào cuối URL workspace.',
  },
  {
    q: 'Phòng học ảo hoạt động trên những thiết bị nào?',
    a: 'LofiSpace chạy tốt trên máy tính bàn, laptop, máy tính bảng và điện thoại di động. Giao diện responsive hoàn toàn. Đồng hồ Pomodoro và bộ trộn âm thanh đều dễ thao tác bằng cảm ứng trên di động.',
  },
  {
    q: 'Người bị ADHD có dùng phòng học ảo được không?',
    a: 'Rất nhiều người ADHD thấy LofiSpace hiệu quả. Âm thanh nền (đặc biệt là tiếng mưa và brown noise) cung cấp đúng loại kích thích giác quan mà não bộ ADHD thường tìm kiếm, giúp giảm nhu cầu tìm xao nhãng ở nơi khác. Cấu trúc của đồng hồ Pomodoro cũng hỗ trợ việc khởi động nhiệm vụ và cảm nhận thời gian — hai khó khăn phổ biến ở người ADHD.',
  },
]

export default function PhongHocAoPage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1&ls=lofi1&at=rain:50,cafe:25'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Phòng Học Ảo', url: 'https://www.focusworkspace.app/vi/phong-hoc-ao' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Phòng Học Ảo"
        description="Phòng học ảo miễn phí với nhạc lofi, đồng hồ Pomodoro, âm thanh nền, streak XP và hình nền động đẹp mắt."
        url="https://www.focusworkspace.app/vi/phong-hoc-ao"
        keywords={['phòng học ảo', 'phòng học online', 'study room ảo', 'không gian học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Phòng Học Ảo', url: 'https://www.focusworkspace.app/vi/phong-hoc-ao' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            🏠 Phòng học ảo · Nhạc lofi · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-indigo-400">Phòng Học Ảo</span> Miễn Phí
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Chọn cho mình một phòng học ảo được thiết kế đẹp mắt — anime, bàn học ấm cúng, không
            gian lập trình và nhiều lựa chọn khác. Mỗi phòng đều có nhạc lofi, bộ trộn âm thanh nền,
            đồng hồ Pomodoro, streak XP hàng ngày và danh sách việc cần làm theo phiên. Miễn phí,
            không cần đăng ký, dùng được ở mọi nơi.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500 transition-colors"
            >
              Vào Phòng Học Ảo →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Xem Tất Cả Scene
            </Link>
          </div>
        </div>

        {/* Rooms */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Chọn Phòng Học Ảo Của Bạn</h2>
          <div className="space-y-4">
            {ROOMS.map(room => (
              <Link
                key={room.href}
                href={room.href}
                className="flex gap-5 rounded-2xl border border-white/8 bg-white/4 p-6 hover:border-indigo-500/30 hover:bg-white/6 transition-all"
              >
                <span className="text-4xl mt-1">{room.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{room.title}</h3>
                    {room.badge && (
                      <span className="rounded-full bg-indigo-600/20 px-2 py-0.5 text-xs text-indigo-300">
                        {room.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/35 mb-2">{room.vibe}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{room.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Mọi Phòng Đều Có Đầy Đủ</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-2xl">{f.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to set up */}
        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Cách Thiết Lập Phòng Học Ảo Của Bạn</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Chọn phòng phù hợp với việc bạn đang làm', body: 'Bài tập nhẹ nhàng? Thử Phòng Học Anime. Dự án lập trình? Phòng Học Lập Trình. Viết luận hay nghiên cứu sâu? Không Gian Deep Work. Mỗi phòng đều tạo đúng không khí cho mục đích riêng của nó.' },
              { step: '2', title: 'Tuỳ chỉnh âm thanh của bạn', body: 'Mở panel Âm Thanh và kết hợp tiếng mưa, quán cà phê, lửa trại hoặc các âm thanh nền khác cùng nhạc. Chỉnh âm lượng đến khi cảm thấy vừa ý. Cài đặt của bạn sẽ ngay lập tức được lưu vào URL.' },
              { step: '3', title: 'Ghi nhiệm vụ cho phiên học', body: 'Trước khi bấm Start, hãy gõ nhiệm vụ cần tập trung vào to-do list. Một nhiệm vụ cụ thể ("hoàn thành tóm tắt chương 4") luôn hiệu quả hơn một mục tiêu mơ hồ ("học bài").' },
              { step: '4', title: 'Bắt đầu đồng hồ Pomodoro', body: '25 phút, không gì khác. Sau mỗi phiên bạn nhận XP và streak tăng lên. Sau 4 phiên Pomodoro, hãy nghỉ dài hơn khoảng 20 phút.' },
              { step: '5', title: 'Lưu và chia sẻ phòng của bạn', body: 'Sao chép URL bất cứ lúc nào để lưu lại đúng cấu hình phòng — thể loại nhạc, âm thanh, âm lượng, cài đặt đồng hồ. Gửi cho bạn bè để cùng học đồng bộ.' },
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-violet-900/20 border border-indigo-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Mở phòng học ảo của bạn</h2>
          <p className="mb-6 text-white/55">
            Không cần tài khoản. Không cần tải app. Chọn phòng, bật đồng hồ, và tập trung.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/30"
          >
            Vào Phòng Học Ảo — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/virtual-study-room" />
      </div>
    </>
  )
}
