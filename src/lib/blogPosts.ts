export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  publishedAt: string
  coverGradient: [string, string]
  emoji: string
  content: string // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'trang-tri-notion-widget-lofi',
    title: 'Cách trang trí Notion đẹp với Widget Âm thanh Lofi',
    excerpt: 'Hướng dẫn chi tiết cách nhúng widget lofi vào Notion để biến không gian làm việc trở nên aesthetic và tập trung hơn.',
    category: 'Notion Tips',
    readTime: 5,
    publishedAt: '2024-12-01',
    coverGradient: ['#1a1a2e', '#16213e'],
    emoji: '📓',
    content: `
<p>Notion là công cụ ghi chú và quản lý công việc cực kỳ phổ biến. Nhưng ít người biết rằng bạn có thể biến trang Notion của mình thành một <strong>không gian làm việc âm nhạc thực sự</strong> chỉ với vài thao tác đơn giản.</p>

<h2>Tại sao cần Widget âm thanh trong Notion?</h2>
<p>Nghiên cứu từ Đại học Cambridge cho thấy nhạc nền nhẹ nhàng (đặc biệt là lofi) giúp tăng khả năng tập trung lên đến <strong>40%</strong> khi làm việc với các tác vụ lặp lại. Thêm vào đó, âm thanh môi trường như tiếng mưa hay quán cafe tạo ra hiệu ứng "white noise" che lấp tiếng ồn xung quanh.</p>

<h2>Bước 1: Tạo widget tại LofiSpace</h2>
<ol>
  <li>Truy cập <a href="/workspace">LofiSpace Workspace</a></li>
  <li>Chọn luồng nhạc Lofi yêu thích</li>
  <li>Bật các âm thanh môi trường: thử kết hợp Mưa + Cafe để có hiệu quả tập trung tốt nhất</li>
  <li>Chọn hình nền GIF aesthetic</li>
  <li>Nhấn <strong>"Sao chép Link"</strong></li>
</ol>

<h2>Bước 2: Nhúng vào Notion</h2>
<p>Trong trang Notion của bạn, gõ <code>/embed</code> và paste link vừa copy. Notion sẽ tự động render widget thành một khung tương tác ngay trong trang.</p>
<p><em>Mẹo:</em> Kéo viền khung embed để điều chỉnh kích thước. Chiều cao lý tưởng là khoảng 300-400px.</p>

<h2>Bước 3: Tùy chỉnh layout Notion</h2>
<p>Đặt widget ở <strong>cột bên phải</strong> của trang, cạnh task list hoặc lịch học. Sử dụng Notion Columns để tạo layout 2 cột: bên trái là nội dung, bên phải là widget âm thanh.</p>

<h2>Các combo âm thanh được yêu thích nhất</h2>
<ul>
  <li>🌧 <strong>Rain + Cafe</strong>: hoàn hảo cho buổi sáng làm việc tại nhà</li>
  <li>🔥 <strong>Fire + Wind nhẹ</strong>: cảm giác đọc sách mùa đông</li>
  <li>🌊 <strong>Waves + Lofi chill</strong>: ideal cho buổi chiều sáng tạo</li>
  <li>⛈️ <strong>Thunder + Rain</strong>: tập trung sâu cho deadline gấp</li>
</ul>

<h2>Kết luận</h2>
<p>Việc tích hợp ambient sound vào Notion không chỉ đẹp mà còn thực sự nâng cao hiệu suất làm việc. Thử ngay và cảm nhận sự khác biệt sau 1 tuần sử dụng!</p>
    `.trim(),
  },
  {
    slug: 'nhac-lofi-hoc-bai-hieu-qua',
    title: 'Top 8 Kênh Nhạc Lofi Học Bài Hiệu Quả Nhất 2024',
    excerpt: 'Tổng hợp các kênh nhạc lofi tốt nhất cho việc học và làm việc, kèm phân tích tại sao lofi giúp tăng tập trung.',
    category: 'Music',
    readTime: 7,
    publishedAt: '2024-11-20',
    coverGradient: ['#16213e', '#0f3460'],
    emoji: '🎵',
    content: `
<p>Lofi hip hop đã trở thành thể loại nhạc được sinh viên và dân văn phòng yêu thích nhất để học bài và làm việc. Nhưng không phải kênh lofi nào cũng như nhau.</p>

<h2>Tại sao nhạc Lofi giúp học bài?</h2>
<p>Nhạc lofi thường có <strong>BPM (nhịp độ) từ 70-90</strong> — vừa đủ để kích thích não bộ nhưng không gây phân tâm. Các yếu tố quan trọng:</p>
<ul>
  <li><strong>Không có lời</strong>: tránh kích hoạt vùng xử lý ngôn ngữ trong não</li>
  <li><strong>Tiếng vinyl crackle</strong>: tạo cảm giác ấm áp, an toàn</li>
  <li><strong>Âm bass nhẹ</strong>: kích thích dopamine ở mức vừa phải</li>
</ul>

<h2>Top 8 kênh Lofi tốt nhất</h2>

<h3>1. Lofi Girl</h3>
<p>Kênh nổi tiếng nhất thế giới với mascot cô gái học bài iconic. Live stream 24/7, chất lượng âm thanh ổn định, BPM lý tưởng cho study session.</p>

<h3>2. Chillhop Music</h3>
<p>Focus vào jazz-hop và nu-jazz, âm thanh phong phú hơn Lofi Girl. Phù hợp cho công việc sáng tạo như thiết kế, viết lách.</p>

<h3>3. Synthwave Radio</h3>
<p>Nếu bạn thích vibe retro 80s, kênh này là lựa chọn hoàn hảo. BPM nhanh hơn một chút, tốt cho lập trình và deadline gấp.</p>

<h3>4. Tokyo Lo-fi Jazz</h3>
<p>Âm thanh mang hơi hướng Japanese City Pop, nhẹ nhàng và tập trung. Đặc biệt tốt cho buổi tối muộn.</p>

<h2>Kết hợp nhạc Lofi với Ambient Sound</h2>
<p>Bí quyết của các productivity guru: đừng chỉ dùng nhạc lofi đơn thuần. Hãy kết hợp với <strong>ambient sound mixer</strong> để tạo ra môi trường âm thanh hoàn chỉnh.</p>
<p>Công thức được khuyến nghị: <em>Lofi volume 60% + Rain 40% + Cafe murmur 25%</em></p>
<p>Thử ngay với <a href="/workspace">LofiSpace Sound Mixer</a> miễn phí!</p>
    `.trim(),
  },
  {
    slug: 'setup-ban-lam-viec-aesthetic',
    title: 'Setup Bàn Làm Việc Aesthetic 2024 — Từ A đến Z',
    excerpt: 'Hướng dẫn tạo góc làm việc aesthetic tại nhà: từ chọn đèn LED, cây xanh, đến tích hợp ambient sound widget.',
    category: 'Lifestyle',
    readTime: 8,
    publishedAt: '2024-11-05',
    coverGradient: ['#2d1b69', '#11062d'],
    emoji: '🖥️',
    content: `
<p>Một chiếc bàn làm việc đẹp không chỉ là để chụp ảnh Instagram — nó thực sự ảnh hưởng đến mood và năng suất của bạn mỗi ngày. Đây là hướng dẫn đầy đủ từ A đến Z.</p>

<h2>1. Ánh sáng — Yếu tố quan trọng nhất</h2>
<p>Đặt màn hình tránh ánh sáng trực tiếp từ cửa sổ. Thêm:</p>
<ul>
  <li><strong>Đèn LED ambient</strong> phía sau màn hình (màu 4000K neutral white)</li>
  <li><strong>Đèn để bàn arm</strong> chiếu từ trên xuống, không tạo bóng</li>
  <li><strong>LED strip RGB</strong> phía sau bàn để tạo vibe gaming/aesthetic</li>
</ul>

<h2>2. Cây xanh — Không khí và màu sắc</h2>
<p>Các loại cây dễ trồng, không cần nhiều nắng cho bàn làm việc:</p>
<ul>
  <li>🌿 Pothos (Kim tiền, lan chi): siêu dễ sống, lá xanh đẹp</li>
  <li>🌵 Xương rồng nhỏ: không cần tưới thường xuyên</li>
  <li>🍃 ZZ Plant: chịu được môi trường ít ánh sáng</li>
</ul>

<h2>3. Màn hình và vị trí</h2>
<p>Màn hình đặt cách mắt <strong>50-70cm</strong>, phần trên màn hình ngang tầm mắt. Nếu dùng laptop, thêm laptop stand + bàn phím rời để tránh đau cổ.</p>

<h2>4. Âm thanh môi trường — Thường bị bỏ qua</h2>
<p>Đây là yếu tố nhiều người setup bàn làm việc bỏ qua nhất. Một góc làm việc hoàn chỉnh cần có <strong>âm thanh phù hợp</strong>:</p>
<ul>
  <li>Dùng loa nhỏ chất lượng tốt thay vì tai nghe suốt ngày</li>
  <li>Kết hợp nhạc lofi với ambient sound mixer</li>
  <li>Nhúng <a href="/workspace">LofiSpace Widget</a> vào Notion để có âm thanh ngay khi mở trang làm việc</li>
</ul>

<h2>5. Sắp xếp và cabling</h2>
<p>Dây điện lộn xộn phá vỡ toàn bộ aesthetic. Dùng:</p>
<ul>
  <li>Cable management box ẩn ổ cắm phía sau bàn</li>
  <li>Velcro cable ties gom dây thành bó gọn</li>
  <li>Cable clips gắn dây theo mép bàn</li>
</ul>

<h2>Budget tham khảo</h2>
<ul>
  <li>Đèn LED strip: 150,000 – 300,000đ</li>
  <li>Laptop stand: 200,000 – 500,000đ</li>
  <li>Cây xanh nhỏ: 30,000 – 80,000đ/cây</li>
  <li>Widget âm thanh LofiSpace: <strong>Miễn phí</strong> ✓</li>
</ul>
    `.trim(),
  },
  {
    slug: 'pomodoro-technique-hoc-bai',
    title: 'Kỹ thuật Pomodoro: Cách học 4 tiếng bằng người khác học 8 tiếng',
    excerpt: 'Hướng dẫn áp dụng Pomodoro Technique kết hợp ambient sound để tăng tối đa hiệu quả học tập và làm việc.',
    category: 'Productivity',
    readTime: 6,
    publishedAt: '2024-10-15',
    coverGradient: ['#3d0000', '#7c1e00'],
    emoji: '🍅',
    content: `
<p>Kỹ thuật Pomodoro được phát triển bởi Francesco Cirillo vào cuối những năm 1980. Nguyên tắc cực kỳ đơn giản nhưng hiệu quả đáng kinh ngạc.</p>

<h2>Nguyên tắc cơ bản</h2>
<ol>
  <li>Chọn một task cần làm</li>
  <li>Đặt timer <strong>25 phút</strong></li>
  <li>Làm việc tập trung hoàn toàn cho đến khi timer kêu</li>
  <li>Nghỉ <strong>5 phút</strong></li>
  <li>Sau 4 pomodoro, nghỉ dài <strong>15-30 phút</strong></li>
</ol>

<h2>Tại sao Pomodoro hoạt động?</h2>
<p>Não người không thể duy trì sự tập trung cao độ quá 30 phút liên tục. Pomodoro tận dụng chu kỳ tự nhiên của não, tạo ra <strong>deadline nhỏ</strong> kích thích dopamine và tránh mental fatigue.</p>

<h2>Kết hợp với Ambient Sound</h2>
<p>Nghiên cứu cho thấy âm thanh môi trường nhất quán giúp não "nhận ra" đây là thời gian tập trung. Hãy bật cùng một playlist lofi + ambient mỗi lần bắt đầu pomodoro để tạo điều kiện phản xạ Pavlov.</p>

<h2>Dùng Pomodoro Timer trong LofiSpace</h2>
<p>Widget LofiSpace có tích hợp Pomodoro timer ngay trong màn hình ambient sound. Bạn có thể:</p>
<ul>
  <li>Xem countdown ngay trên nền GIF aesthetic</li>
  <li>Âm thanh ambient tự động đóng vai trò white noise trong suốt session</li>
  <li>Nhúng toàn bộ vào Notion để có một trang học bài hoàn chỉnh</li>
</ul>
<p>Thử ngay: <a href="/workspace">Tạo Widget Pomodoro miễn phí</a></p>
    `.trim(),
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
