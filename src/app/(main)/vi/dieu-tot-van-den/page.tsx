import type { Metadata } from 'next'
import { GoodThingsLanding, type GoodThingsLandingCopy } from '@/components/comehome/GoodThingsLanding'

const URL = 'https://www.focusworkspace.app/vi/dieu-tot-van-den'
const EN_URL = 'https://www.focusworkspace.app/good-things'

export const metadata: Metadata = {
  title: 'Điều Tốt Vẫn Đến — Nhật Ký Ba Điều Tốt Nhẹ Nhàng',
  description:
    'Ghi lại một điều nhỏ mà tốt hôm nay, hoặc chỉ cần được xem một điều. Phiên bản nhẹ nhàng, riêng tư của bài tập Ba Điều Tốt. Không chuỗi ngày, không tài khoản, không rời khỏi trình duyệt.',
  keywords: ['ba điều tốt', 'nhật ký biết ơn', 'điều tốt mỗi ngày', 'làm gì khi có một ngày tồi tệ', 'nhẹ lòng trước khi ngủ'],
  alternates: { canonical: URL, languages: { en: EN_URL, vi: URL, 'x-default': EN_URL } },
  openGraph: {
    title: 'Điều Tốt Vẫn Đến — Kể Cả Vào Những Ngày Không Thấy Vậy',
    description: 'Ghi lại một điều nhỏ mà tốt, hoặc chỉ cần được xem một điều. Miễn phí, riêng tư.',
    url: URL,
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Điều Tốt Vẫn Đến',
    description: 'Ghi lại một điều nhỏ mà tốt, hoặc chỉ cần được xem một điều. Miễn phí, riêng tư.',
  },
}

const COPY: GoodThingsLandingCopy = {
  lang: 'vi',
  url: URL,
  app: '/workspace?mode=home&exp=good&lang=vi',
  crumbHome: 'Trang chủ',
  crumb: 'Điều tốt vẫn đến',
  h1: 'Điều tốt vẫn đến',
  tagline: 'Kể cả vào những ngày không thấy vậy',
  intro: 'Một góc nhỏ yên tĩnh trong chế độ Về nhà. Ghi lại một điều tốt hôm nay và giữ nó thành một ngôi sao, hoặc vào những tối chẳng còn sức, chỉ cần được xem một điều.',
  cta: 'Mở Điều tốt vẫn đến',
  finePrint: 'Miễn phí · Không cần tài khoản · Chỉ lưu trong trình duyệt của bạn',
  doorsTitle: 'Hai cánh cửa, đều nhẹ nhàng',
  doors: [
    { emoji: '✦', title: 'Ghi lại một điều hôm nay', body: 'Một bữa ăn ấm, một lời tử tế, một cuộc họp không tệ như đã lo. Có gợi ý nhỏ nếu bạn chưa nghĩ ra. Một điều là đủ, nhiều nhất là ba.' },
    { emoji: '🌟', title: 'Chỉ cần cho mình xem một điều', body: 'Không cần viết gì. Xem lại điều bạn đã giữ vào một ngày dễ chịu hơn, hoặc một dòng nhỏ về đâu đó tối nay. Nếu hôm nay nặng nề, cánh cửa này sẽ được đặt lên trước.' },
  ],
  whyTitle: 'Vì sao để ý điều tốt lại có ích',
  why: 'Đầu óc chúng ta giữ lại điều tệ dễ hơn nhiều so với điều tốt. Trong một nghiên cứu năm 2005, những người viết ra ba điều tốt mỗi tối trong một tuần cho biết họ hạnh phúc hơn và ít triệu chứng trầm cảm hơn, kể cả ở các lần theo dõi đến sáu tháng sau. Các tổng quan sau này cho thấy hiệu quả trung bình ở mức vừa phải, nên hãy xem đây là một điều tử tế nhỏ với bản thân, không phải phương thuốc.',
  privacyTitle: 'Riêng tư ngay từ thiết kế',
  privacy: [
    'Những điều bạn giữ lại chỉ nằm trong trình duyệt này, dưới dạng các ngôi sao trên bầu trời của bạn.',
    'Những gì bạn viết không bao giờ được gửi lên máy chủ hay đưa vào thống kê.',
    'Không có bảng tin. Không ai thấy bạn viết gì, và các dòng "Đâu đó tối nay" do chúng tôi viết, không phải của người dùng khác.',
    'Bạn có thể buông bất kỳ ngôi sao nào, bất cứ lúc nào.',
  ],
  notTitle: 'Không chuỗi ngày. Không ép phải biết ơn.',
  not: 'Bỏ lỡ một ngày cũng không sao, và bạn không bao giờ phải biết ơn theo mệnh lệnh. Đây không phải liệu pháp tâm lý. Nếu thời gian dài bạn thấy nặng nề, hãy nói chuyện với bác sĩ hoặc người bạn tin tưởng.',
  faqTitle: 'Câu hỏi thường gặp',
  faq: [
    { q: 'Điều tốt vẫn đến là gì?', a: 'Một phần nhẹ nhàng của chế độ Về nhà, dựa trên bài tập Ba Điều Tốt. Bạn có thể ghi lại một điều nhỏ mà tốt hôm nay, hoặc được xem một điều.' },
    { q: 'Có phải viết đủ ba điều không?', a: 'Không. Một điều là đủ, và bạn cũng không nhất thiết phải viết gì.' },
    { q: 'Các dòng "Đâu đó tối nay" có phải người thật không?', a: 'Không. Chúng do chúng tôi viết, kể về những điều tốt bình thường vẫn xảy ra ở đâu đó mỗi tối.' },
    { q: 'Có miễn phí không?', a: 'Có. Miễn phí và không cần tài khoản, như phần còn lại của Focus Workspace.' },
  ],
  closing: 'Tối nay, một điều nhỏ là đủ.',
  otherLang: { href: '/good-things', hrefLang: 'en', label: 'English version' },
}

export default function DieuTotVanDenPage() {
  return <GoodThingsLanding c={COPY} />
}
