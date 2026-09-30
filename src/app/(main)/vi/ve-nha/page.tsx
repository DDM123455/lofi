import Link from 'next/link'
import type { Metadata } from 'next'
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

const URL = 'https://www.focusworkspace.app/vi/ve-nha'
const EN_URL = 'https://www.focusworkspace.app/come-home'
const APP = '/workspace?mode=home&lang=vi'

export const metadata: Metadata = {
  title: 'Về Nhà — Góc Yên Tĩnh Để Thư Giãn Sau Giờ Làm',
  description:
    'Không gian yên tĩnh giữa giờ làm và giấc ngủ. Viết ra mọi suy nghĩ rồi thả trôi sông, đốt đi hay gửi theo gió; nghỉ trong căn phòng ấm, thở chậm hai phút, chuẩn bị đi ngủ. Miễn phí, không cần tài khoản.',
  keywords: [
    'thư giãn sau giờ làm', 'cách giải toả căng thẳng', 'viết ra suy nghĩ trước khi ngủ', 'suy nghĩ nhiều về đêm',
    'thói quen buổi tối', 'khó ngủ vì suy nghĩ', 'brain dump là gì', 'chuẩn bị đi ngủ',
  ],
  alternates: {
    canonical: URL,
    languages: { en: EN_URL, vi: URL, 'x-default': EN_URL },
  },
  openGraph: {
    title: 'Về Nhà — Góc Yên Tĩnh Giữa Giờ Làm Và Giấc Ngủ',
    description: 'Để ngày hôm nay lại phía sau. Viết ra rồi buông đi, nghỉ trong căn phòng ấm, nghe mưa nhẹ — miễn phí, không cần tài khoản.',
    url: URL,
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Về Nhà — Góc Yên Tĩnh Sau Giờ Làm',
    description: 'Viết ra rồi buông đi, căn phòng ấm, mưa nhẹ, chuẩn bị đi ngủ. Miễn phí.',
  },
}

const FAQ = [
  {
    q: 'Chế độ Về nhà là gì?',
    a: 'Về nhà là chế độ buổi tối bên trong Focus Workspace. Thay cho đồng hồ Pomodoro và danh sách việc, nó cho bạn một không gian yên tĩnh để xả bớt sau giờ làm: viết ra những gì đang chiếm chỗ trong đầu rồi buông đi, nghỉ trong một căn phòng ấm, thở chậm hai phút, nghe âm thanh nền nhẹ, ngắm những ô cửa sáng đèn bên kia đường, và năm phút dịu dần trước khi ngủ.',
  },
  {
    q: 'Những gì mình viết có bị lưu lại không?',
    a: 'Không. Nội dung bạn viết chỉ nằm trên thiết bị trong lúc viết và bị xoá ngay khi bạn buông nó đi. Nó không được lưu, không đồng bộ, không gửi lên máy chủ và không có trong số liệu thống kê. Chỉ những “khoảnh khắc đẹp” bạn chủ động giữ lại mới được lưu — và chỉ trong trình duyệt của chính bạn.',
  },
  {
    q: 'Có những cách “buông đi” nào?',
    a: 'Sau khi viết, bạn chọn cách buông: bay lên trời thành những ngôi sao nhỏ, gấp thành thuyền giấy thả trôi sông, đốt đi thành than hồng và tro, gửi theo gió, hoặc để mưa làm nhoè rồi rửa trôi. Lựa chọn gần nhất sẽ được nhớ cho lần sau.',
  },
  {
    q: 'Có cần tài khoản không?',
    a: 'Không. Về nhà miễn phí và dùng được ngay, giống như phần còn lại của Focus Workspace.',
  },
  {
    q: 'Về nhà có phải là liệu pháp tâm lý không?',
    a: 'Không. Đây là một không gian thư giãn, không phải công cụ y tế hay trị liệu. Nếu căng thẳng, giấc ngủ hay tâm trạng của bạn khó khăn trong thời gian dài, hãy nói chuyện với bác sĩ hoặc chuyên gia sức khoẻ tinh thần.',
  },
  {
    q: 'Âm thanh có tự phát không?',
    a: 'Không. Âm thanh luôn tắt cho tới khi bạn bật. Khi bật, nó bắt đầu thật nhẹ với tiếng mưa, và bạn có thể phối mưa, gió, lò sưởi, quán cà phê, biển, phố đêm và rừng theo âm lượng mình thích.',
  },
  {
    q: 'Làm sao quay lại không gian tập trung?',
    a: 'Bấm nút ☀️ ở góc trên (hoặc nút Tập trung ở màn hình chào). Đồng hồ, công việc, hình nền và âm thanh vẫn y nguyên như lúc bạn rời đi.',
  },
]

const STEPS = [
  { n: '1', title: 'Hôm nay thế nào?', body: 'Chọn một cảm xúc — hoặc bỏ qua. Không có câu trả lời đúng hay sai.' },
  { n: '2', title: 'Bạn cần gì lúc này?', body: 'Ba nhóm rõ ràng: Trút bỏ, Thả lỏng, Chuẩn bị ngủ. Có gợi ý nhẹ theo tâm trạng của bạn.' },
  { n: '3', title: 'Từng bước, không vội', body: 'Mỗi trải nghiệm có các bước rõ ràng và luôn kết thúc bằng lựa chọn: làm điều khác, nghỉ trong phòng, hoặc “tối nay vậy là đủ”.' },
]

const NEEDS = [
  { emoji: '💭', title: 'Gỡ rối đầu óc', body: 'Viết mọi thứ đang chiếm chỗ trong đầu, rồi chọn cách buông: bay lên trời, thả trôi sông, đốt đi, gửi theo gió hay tan vào mưa.' },
  { emoji: '✍️', title: 'Một điều hôm nay', body: 'Viết một câu về ngày của bạn. Buông điều khó khăn đi — hoặc giữ điều tốt đẹp lại thành một ngôi sao.' },
  { emoji: '🛋️', title: 'Chỉ nghỉ ngơi', body: 'Căn hộ ấm áp về đêm: đèn vàng, mưa trên cửa kính, tách trà nóng, lò sưởi. Không có gì phải làm.' },
  { emoji: '🌬️', title: 'Bình tĩnh lại', body: 'Hai phút sóng chậm và ánh sáng dịu, nhịp theo hơi thở của bạn.' },
  { emoji: '🎧', title: 'Chút yên tĩnh', body: 'Mưa, gió, lò sưởi, quán cà phê, biển, phố đêm và rừng — mỗi âm thanh một mức riêng.' },
  { emoji: '🏙️', title: 'Có người bên cạnh', body: 'Nhìn sang toà nhà bên kia đường, nơi người khác cũng đang chậm lại — đèn bật rồi tắt từng ô cửa.' },
  { emoji: '🌙', title: 'Chuẩn bị đi ngủ', body: 'Năm phút màn hình tối dần, âm thanh nhỏ dần, và ngày khép lại bằng “Chúc ngủ ngon”.' },
  { emoji: '✦', title: 'Bầu trời của bạn', body: 'Mỗi khoảnh khắc đẹp bạn giữ lại là một ngôi sao. Bạn có thể thêm sao trực tiếp bất cứ lúc nào.' },
]

export default function VeNhaPage() {
  return (
    <div lang="vi">
      <BreadcrumbJsonLd items={[
        { name: 'Trang chủ', url: 'https://www.focusworkspace.app' },
        { name: 'Về nhà', url: URL },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Về Nhà — Chế độ thư giãn buổi tối',
          description: 'Không gian yên tĩnh để thư giãn sau giờ làm: viết ra rồi buông đi, căn phòng ấm, thở chậm, âm thanh nền và chuẩn bị đi ngủ.',
          url: URL,
          inLanguage: 'vi',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          isPartOf: { '@type': 'WebApplication', name: 'Focus Workspace', url: 'https://www.focusworkspace.app/workspace' },
          publisher: { '@type': 'Organization', name: 'LofiSpace', url: 'https://www.focusworkspace.app' },
        }) }}
      />
      <FaqJsonLd items={FAQ} />

      <div className="bg-gradient-to-b from-[#1a1219] via-[#110d15] to-[#0d0d14]">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <Breadcrumb items={[
            { name: 'Trang chủ', url: 'https://www.focusworkspace.app' },
            { name: 'Về nhà', url: URL },
          ]} />

          {/* Hero */}
          <section className="mb-20 text-center">
            <div className="mb-6 text-5xl" aria-hidden>🌙</div>
            <h1 className="mb-5 text-4xl font-semibold leading-tight text-[#f6ebe0] sm:text-5xl">
              Về nhà
              <span className="mt-3 block text-2xl font-normal text-amber-100/70 sm:text-3xl">Một góc yên tĩnh giữa giờ làm và giấc ngủ</span>
            </h1>
            <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-white/60">
              Khi công việc đã xong nhưng đầu óc vẫn chưa dừng, Về nhà cho bạn một không gian yên tĩnh để chậm lại,
              gỡ bớt suy nghĩ và đơn giản là nghỉ ngơi.
            </p>
            <p className="mx-auto mb-9 max-w-xl text-white/45">Hôm nay bạn đã làm đủ rồi. Không cần giải quyết mọi thứ trong tối nay.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={APP}
                className="rounded-full bg-amber-200/90 px-8 py-3 font-semibold text-[#2a1a14] shadow-lg shadow-black/30 transition-colors hover:bg-amber-100"
              >
                Về nhà
              </Link>
              <Link href="/workspace?lang=vi" className="rounded-full border border-white/15 px-8 py-3 text-white/70 transition-colors hover:border-white/30 hover:text-white">
                ☀️ Không gian tập trung
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/35">Miễn phí · Không cần tài khoản · Âm thanh chỉ bật khi bạn chọn</p>
          </section>

          {/* Flow */}
          <section className="mb-20" aria-labelledby="flow">
            <h2 id="flow" className="mb-8 text-center text-2xl font-semibold text-white">Hoạt động thế nào</h2>
            <ol className="grid gap-4 sm:grid-cols-3">
              {STEPS.map(s => (
                <li key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-amber-200/15 text-sm font-semibold text-amber-200">{s.n}</span>
                  <h3 className="mb-1 font-medium text-white/90">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Experiences */}
          <section className="mb-20" aria-labelledby="needs">
            <h2 id="needs" className="mb-8 text-center text-2xl font-semibold text-white">Bạn có thể làm gì</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {NEEDS.map(n => (
                <div key={n.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>{n.emoji}</span>
                    <h3 className="font-medium text-white/90">{n.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{n.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-20 rounded-2xl border border-white/10 bg-white/[0.03] p-7" aria-labelledby="privacy">
            <h2 id="privacy" className="mb-3 text-xl font-semibold text-white">🔒 Riêng tư ngay từ thiết kế</h2>
            <ul className="space-y-2 text-sm leading-relaxed text-white/60">
              <li>• Những gì bạn viết không rời khỏi thiết bị và bị xoá ngay khi bạn buông đi.</li>
              <li>• Không có nội dung nào được gửi lên máy chủ hay đưa vào thống kê — chúng tôi chỉ đếm các sự kiện ẩn danh như “một phiên đã hoàn thành”.</li>
              <li>• Khoảnh khắc đẹp bạn giữ lại chỉ nằm trong bộ nhớ trình duyệt của bạn. Bạn có thể buông bất kỳ ngôi sao nào, bất cứ lúc nào.</li>
              <li>• Không tài khoản, không email, không hồ sơ.</li>
            </ul>
          </section>

          <section className="mb-20 text-center" aria-labelledby="what-not">
            <h2 id="what-not" className="mb-3 text-xl font-semibold text-white">Không áp lực. Không chấm điểm.</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/55">
              Về nhà không phải công cụ năng suất, cũng không phải liệu pháp. Không có chuỗi ngày, huy hiệu hay lời nhắc
              rằng bạn đã “lãng phí thời gian”. Đơn giản là một không gian dịu dàng để khép lại một ngày. Nếu căng thẳng hay
              giấc ngủ đã khó khăn một thời gian, hãy tìm đến bác sĩ hoặc người bạn tin tưởng — bạn xứng đáng được hỗ trợ thật sự.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-16" aria-labelledby="faq">
            <h2 id="faq" className="mb-6 text-2xl font-semibold text-white">Câu hỏi thường gặp</h2>
            <div className="space-y-3">
              {FAQ.map(f => (
                <details key={f.q} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <summary className="cursor-pointer font-medium text-white/85">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center">
            <p className="mb-5 text-lg text-white/70">Để ngày hôm nay lại phía sau.</p>
            <Link href={APP} className="inline-block rounded-full bg-amber-200/90 px-8 py-3 font-semibold text-[#2a1a14] transition-colors hover:bg-amber-100">
              🌙 Về nhà
            </Link>
            <p className="mt-6 text-xs text-white/35">
              <Link href="/come-home" hrefLang="en" className="underline underline-offset-4 hover:text-white/60">English version</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
