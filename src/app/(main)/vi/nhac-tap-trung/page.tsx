import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Nhạc Tập Trung Miễn Phí — Không Lời, Không Xao Nhãng',
  description:
    'Nghe nhạc tập trung miễn phí: lofi, chillhop, synthwave, ambient — chọn theo thể loại và mức năng lượng phù hợp với công việc. Không quảng cáo, không cần đăng ký.',
  keywords: [
    'nhạc tập trung', 'nhạc không lời tập trung', 'nhạc giúp tập trung học tập',
    'nhạc concentration', 'nhạc nền làm việc', 'nhạc ambient tập trung',
    'nhạc instrumental', 'nhạc tăng năng suất',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/vi/nhac-tap-trung',
    languages: {
      en: 'https://www.focusworkspace.app/focus-music',
      vi: 'https://www.focusworkspace.app/vi/nhac-tap-trung',
      'x-default': 'https://www.focusworkspace.app/focus-music',
    },
  },
  openGraph: {
    title: 'Nhạc Tập Trung Miễn Phí | LofiSpace',
    description: 'Nghe nhạc không lời giúp tập trung — lofi, chillhop, synthwave, ambient. Miễn phí, không quảng cáo.',
    url: 'https://www.focusworkspace.app/vi/nhac-tap-trung',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhạc Tập Trung Miễn Phí | LofiSpace',
    description: 'Nhạc không lời cho học tập, làm việc sâu — chọn theo mức năng lượng phù hợp.',
  },
}

const MUSIC_TYPES = [
  {
    emoji: '🎵',
    genre: 'Lofi Hip Hop',
    why: 'Ấm áp, lặp đều, không đòi hỏi chú ý',
    best: 'Bài tập về nhà, đọc sách, học tập nói chung',
    energy: '●●○○○',
  },
  {
    emoji: '🎷',
    genre: 'Chillhop',
    why: 'Chất jazz, giai điệu rõ hơn một chút',
    best: 'Công việc sáng tạo, viết nhẹ, thiết kế',
    energy: '●●●○○',
  },
  {
    emoji: '🌆',
    genre: 'Synthwave',
    why: 'Điện tử, nhịp dồn, năng lượng cao hơn',
    best: 'Code, xử lý dữ liệu, việc gấp deadline',
    energy: '●●●●○',
  },
  {
    emoji: '🌊',
    genre: 'Ambient',
    why: 'Lớp âm thanh trải dài, gần như không nhịp',
    best: 'Suy nghĩ sâu, thiền, đọc tài liệu khó',
    energy: '●○○○○',
  },
]

const HOW_IT_AFFECTS_BRAIN = [
  {
    title: 'Điều tiết mức độ hưng phấn',
    body: 'Nhạc điều chỉnh mức độ kích hoạt của não bộ. Nhạc chậm, đều giúp làm dịu một bộ não đang quá tải; nhịp nhanh hơn một chút lại giúp tỉnh táo khi bạn mệt mỏi. Dải 65-90 BPM của lofi nằm đúng vùng tối ưu cho công việc trí óc kéo dài.',
  },
  {
    title: 'Che lấp tiếng ồn gây xao nhãng',
    body: 'Tiếng ồn nền — người nói chuyện, xe cộ, máy điều hòa — kích hoạt phản xạ chú ý ngoài ý muốn. Nhạc tập trung phủ lên những gián đoạn âm thanh này, giảm số lần bạn bị kéo khỏi công việc.',
  },
  {
    title: 'Phản xạ có điều kiện',
    body: 'Nếu bạn luôn học cùng một loại nhạc, não bộ dần liên kết bản nhạc đó với trạng thái tập trung. Sau 2-3 tuần, chỉ cần bật nhạc lên là bạn đã có thể vào guồng làm việc mà không cần gồng ý chí.',
  },
  {
    title: 'Cải thiện tâm trạng',
    body: 'Âm nhạc kích hoạt hệ thống phần thưởng của não, giải phóng dopamine. Tâm trạng tốt hơn một chút giúp tăng hiệu suất sáng tạo và giảm sự trì hoãn khi bắt đầu việc khó — tách biệt với hiệu ứng che tiếng ồn, đây là lý do nhạc vẫn hữu ích ngay cả trong không gian yên tĩnh.',
  },
]

const FAQ = [
  {
    q: 'Loại nhạc nào tốt nhất để tập trung?',
    a: 'Nhạc không lời gần như luôn hiệu quả hơn cho công việc trí óc, vì lời bài hát cạnh tranh trực tiếp với vùng xử lý ngôn ngữ mà bạn dùng để đọc và viết. Trong nhóm nhạc không lời, lofi hip hop và ambient là hai thể loại được nhắc đến nhiều nhất cho sự tập trung bền vững, nhờ tempo ổn định và cấu trúc giai điệu không đòi hỏi chú ý.',
  },
  {
    q: 'Nhạc tập trung có thực sự cải thiện năng suất không?',
    a: 'Với đa số người và đa số công việc thì có. Các nghiên cứu cho thấy nhạc không lời ở tempo vừa phải cải thiện hiệu suất trong công việc sáng tạo, ghi nhớ và các tác vụ lặp lại. Với công việc cần xử lý ngôn ngữ nặng (soạn thảo, viết, biên tập), nhạc có lời có thể gây phản tác dụng. Mức lý tưởng là nhạc nền không lời ở khoảng 50-65 dB.',
  },
  {
    q: 'Có nên nghe nhạc khi học bài không?',
    a: 'Tùy vào loại công việc. Với đọc, ghi chú hay giải bài tập: nhạc lofi hoặc ambient không lời sẽ có ích. Với việc cần diễn đạt ngôn ngữ trong đầu (viết luận, biên tập, soạn văn bản): sự yên tĩnh hoặc âm thanh môi trường không giai điệu (mưa, brown noise) sẽ tốt hơn. Bạn có thể chuyển qua lại giữa nhạc và âm thanh thuần trong LofiSpace tùy theo việc đang làm.',
  },
  {
    q: 'Hiệu ứng Mozart là gì?',
    a: '"Hiệu ứng Mozart" xuất phát từ một nghiên cứu năm 1993 cho rằng nghe nhạc Mozart tạm thời cải thiện khả năng tư duy không gian. Hiệu ứng thực tế rất nhỏ và đặc thù — về sau phần lớn bị bác bỏ khi bị diễn giải rộng thành "nghe nhạc cổ điển sẽ thông minh hơn". Nguyên lý rộng hơn vẫn đúng: âm nhạc phù hợp điều chỉnh mức hưng phấn và tạo điều kiện tập trung tốt hơn — quan trọng là môi trường âm thanh, không phải nhà soạn nhạc cụ thể nào.',
  },
  {
    q: 'Nhạc lofi có phải là nhạc tập trung không?',
    a: 'Lofi hip hop là thể loại phổ biến nhất trong nhóm nhạc tập trung, nhưng nhạc tập trung là một phạm trù rộng hơn. LofiSpace cung cấp lofi hip hop, chillhop, synthwave và nhạc ambient — tất cả đều không lời và được thiết kế để hỗ trợ công việc cần tập trung. Mỗi thể loại có mức năng lượng khác nhau, phù hợp với từng loại việc.',
  },
  {
    q: 'Nhạc tập trung trên LofiSpace có miễn phí không?',
    a: 'Có, hoàn toàn miễn phí. Không cần tài khoản, không giới hạn thời gian. Tất cả thể loại nhạc và bộ trộn âm thanh môi trường đều miễn phí vĩnh viễn.',
  },
]

export default function NhacTapTrungPage() {
  const workspaceUrl = '/workspace?ls=lofi1&at=rain:40&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Nhạc Tập Trung', url: 'https://www.focusworkspace.app/vi/nhac-tap-trung' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Nhạc Tập Trung"
        description="Nghe nhạc tập trung miễn phí — lofi, chillhop, synthwave, ambient, chọn theo mức năng lượng phù hợp với công việc."
        url="https://www.focusworkspace.app/vi/nhac-tap-trung"
        keywords={['nhạc tập trung', 'nhạc không lời', 'nhạc concentration', 'nhạc học tập']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Nhạc Tập Trung', url: 'https://www.focusworkspace.app/vi/nhac-tap-trung' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            🎧 Nhạc tập trung · Không lời · Không quảng cáo · Miễn phí
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Nhạc <span className="text-cyan-400">Tập Trung</span> Miễn Phí Cho Học Tập &amp; Làm Việc
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Nhạc không lời giúp tập trung, không quảng cáo, không cần tài khoản. Lofi hip hop,
            chillhop, synthwave và nhạc ambient — chọn theo mức năng lượng phù hợp với việc bạn
            đang làm. Trộn thêm tiếng mưa và âm thanh môi trường để có không gian hoàn chỉnh.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-500 transition-colors"
            >
              Nghe Nhạc Tập Trung →
            </Link>
            <Link
              href="/vi/nhac-lofi-hoc-bai"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Nhạc Lofi Học Bài
            </Link>
          </div>
        </div>

        {/* Music types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Thể Loại Nhạc Tập Trung — Chọn Theo Công Việc</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-4 text-left text-white/50 font-medium">Thể loại</th>
                  <th className="py-3 pr-4 text-left text-white/50 font-medium">Vì sao hiệu quả</th>
                  <th className="py-3 pr-4 text-left text-white/50 font-medium">Phù hợp nhất với</th>
                  <th className="py-3 text-left text-white/50 font-medium">Năng lượng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MUSIC_TYPES.map(m => (
                  <tr key={m.genre}>
                    <td className="py-4 pr-4">
                      <span className="mr-2">{m.emoji}</span>
                      <span className="font-semibold text-white">{m.genre}</span>
                    </td>
                    <td className="py-4 pr-4 text-white/50">{m.why}</td>
                    <td className="py-4 pr-4 text-white/50">{m.best}</td>
                    <td className="py-4 text-cyan-400 font-mono text-xs">{m.energy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How music affects the brain */}
        <section className="mb-16 rounded-2xl border border-cyan-500/15 bg-cyan-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Nhạc Tập Trung Ảnh Hưởng Đến Não Bộ Như Thế Nào</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {HOW_IT_AFFECTS_BRAIN.map(item => (
              <div key={item.title}>
                <h3 className="mb-2 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-blue-900/20 border border-cyan-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Sẵn sàng tập trung?</h2>
          <p className="mb-6 text-white/55">
            Nhạc tập trung miễn phí, không quảng cáo. Mở workspace và bắt đầu ngay.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-cyan-600 px-10 py-3 font-semibold text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/30"
          >
            Nghe Nhạc Tập Trung — Miễn Phí →
          </Link>
        </div>

        <RelatedPages exclude="/focus-music" />
      </div>
    </>
  )
}
