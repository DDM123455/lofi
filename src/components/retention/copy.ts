// Copy for the retention helpers (install nudge, calendar reminder, welcome back), in every UI
// language. Kept in its own lazily-loaded chunk so neither the focus bundle nor the Come Home
// strings grow. `{n}` / `{m}` / `{key}` are filled in at render time. Wording is deliberately
// plural-free ("Streak: 3") so one form works in every language, and never guilt-tripping.

import type { Lang } from '@/lib/i18n'

export interface RetentionCopy {
  nudge_focus: string
  nudge_home: string
  install_btn: string
  install_desc: string
  ios_step1: string
  ios_step2: string
  menu_hint: string
  bookmark_hint: string
  not_now: string
  close: string

  cal_title_focus: string
  cal_title_home: string
  cal_time: string
  cal_google: string
  cal_ics: string
  cal_added: string
  cal_open: string
  cal_home_link: string

  ev_title_focus: string
  ev_title_home: string
  ev_desc_focus: string
  ev_desc_home: string

  wb_hello: string
  wb_yesterday: string
  wb_last: string
  wb_streak: string
  wb_todos: string
  wb_focus_plain: string
  wb_home_stars: string
  wb_home_plain: string
}

const en: RetentionCopy = {
  nudge_focus: 'Nice session. Keep this room one tap away?',
  nudge_home: 'Want this quiet place close by?',
  install_btn: 'Install app',
  install_desc: 'Opens in its own window, free and offline-friendly.',
  ios_step1: 'Tap the Share button in Safari',
  ios_step2: 'Choose “Add to Home Screen”',
  menu_hint: 'Open your browser menu ⋮ and choose “Add to Home screen”.',
  bookmark_hint: 'Press {key} to bookmark this page.',
  not_now: 'Not now',
  close: 'Close',

  cal_title_focus: 'Daily focus reminder',
  cal_title_home: 'Evening reminder',
  cal_time: 'Time',
  cal_google: 'Google Calendar',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Added. See you then.',
  cal_open: 'Daily reminder',
  cal_home_link: 'Remind me tomorrow evening',

  ev_title_focus: 'Focus session · LofiSpace',
  ev_title_home: 'Come Home · unwind',
  ev_desc_focus: 'Your calm room with lofi music and a Pomodoro timer is ready:',
  ev_desc_home: 'Time to put the day down. A quiet room is waiting:',

  wb_hello: 'Welcome back',
  wb_yesterday: 'Yesterday’s focus: {m} min',
  wb_last: 'Last focus: {m} min',
  wb_streak: 'Streak: {n}',
  wb_todos: 'To-dos saved: {n}',
  wb_focus_plain: 'Your desk is just how you left it.',
  wb_home_stars: 'Stars in your sky: {n}',
  wb_home_plain: 'Nice to see you again.',
}

const vi: RetentionCopy = {
  nudge_focus: 'Phiên tập trung tốt lắm. Giữ căn phòng này chỉ cách một chạm nhé?',
  nudge_home: 'Muốn giữ góc yên tĩnh này ở gần bên?',
  install_btn: 'Cài ứng dụng',
  install_desc: 'Mở trong cửa sổ riêng, miễn phí.',
  ios_step1: 'Chạm nút Chia sẻ trong Safari',
  ios_step2: 'Chọn “Thêm vào MH chính”',
  menu_hint: 'Mở menu trình duyệt ⋮ và chọn “Thêm vào màn hình chính”.',
  bookmark_hint: 'Nhấn {key} để đánh dấu trang này.',
  not_now: 'Để sau',
  close: 'Đóng',

  cal_title_focus: 'Nhắc tập trung mỗi ngày',
  cal_title_home: 'Nhắc nhở buổi tối',
  cal_time: 'Giờ',
  cal_google: 'Google Calendar',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Đã thêm. Hẹn gặp lại nhé.',
  cal_open: 'Nhắc nhở hằng ngày',
  cal_home_link: 'Nhắc mình tối mai',

  ev_title_focus: 'Phiên tập trung · LofiSpace',
  ev_title_home: 'Về nhà · thư giãn',
  ev_desc_focus: 'Căn phòng yên tĩnh với nhạc lofi và Pomodoro đã sẵn sàng:',
  ev_desc_home: 'Đến lúc đặt ngày hôm nay xuống. Một căn phòng yên tĩnh đang chờ:',

  wb_hello: 'Chào mừng trở lại',
  wb_yesterday: 'Hôm qua tập trung: {m} phút',
  wb_last: 'Lần trước tập trung: {m} phút',
  wb_streak: 'Chuỗi ngày: {n}',
  wb_todos: 'Việc đã lưu: {n}',
  wb_focus_plain: 'Góc làm việc vẫn y như lúc bạn rời đi.',
  wb_home_stars: 'Số sao trên bầu trời của bạn: {n}',
  wb_home_plain: 'Thật vui được gặp lại bạn.',
}

const es: RetentionCopy = {
  nudge_focus: 'Buena sesión. ¿Tener esta sala a un toque?',
  nudge_home: '¿Quieres tener este lugar tranquilo cerca?',
  install_btn: 'Instalar app',
  install_desc: 'Se abre en su propia ventana, gratis.',
  ios_step1: 'Toca el botón Compartir en Safari',
  ios_step2: 'Elige “Añadir a pantalla de inicio”',
  menu_hint: 'Abre el menú del navegador ⋮ y elige “Añadir a pantalla de inicio”.',
  bookmark_hint: 'Pulsa {key} para guardar esta página en marcadores.',
  not_now: 'Ahora no',
  close: 'Cerrar',

  cal_title_focus: 'Recordatorio diario de enfoque',
  cal_title_home: 'Recordatorio de la noche',
  cal_time: 'Hora',
  cal_google: 'Google Calendar',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Añadido. Nos vemos entonces.',
  cal_open: 'Recordatorio diario',
  cal_home_link: 'Recuérdamelo mañana por la noche',

  ev_title_focus: 'Sesión de enfoque · LofiSpace',
  ev_title_home: 'Volver a casa · desconectar',
  ev_desc_focus: 'Tu sala tranquila con música lofi y temporizador Pomodoro está lista:',
  ev_desc_home: 'Hora de soltar el día. Una sala tranquila te espera:',

  wb_hello: 'Bienvenido de nuevo',
  wb_yesterday: 'Enfoque de ayer: {m} min',
  wb_last: 'Último enfoque: {m} min',
  wb_streak: 'Racha: {n}',
  wb_todos: 'Tareas guardadas: {n}',
  wb_focus_plain: 'Tu escritorio está tal como lo dejaste.',
  wb_home_stars: 'Estrellas en tu cielo: {n}',
  wb_home_plain: 'Qué bueno verte de nuevo.',
}

const pt: RetentionCopy = {
  nudge_focus: 'Boa sessão. Quer esta sala a um toque?',
  nudge_home: 'Quer este lugar tranquilo sempre por perto?',
  install_btn: 'Instalar app',
  install_desc: 'Abre em uma janela própria, grátis.',
  ios_step1: 'Toque no botão Compartilhar no Safari',
  ios_step2: 'Escolha “Adicionar à Tela de Início”',
  menu_hint: 'Abra o menu do navegador ⋮ e escolha “Adicionar à tela inicial”.',
  bookmark_hint: 'Pressione {key} para salvar esta página nos favoritos.',
  not_now: 'Agora não',
  close: 'Fechar',

  cal_title_focus: 'Lembrete diário de foco',
  cal_title_home: 'Lembrete da noite',
  cal_time: 'Horário',
  cal_google: 'Google Agenda',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Adicionado. Até lá.',
  cal_open: 'Lembrete diário',
  cal_home_link: 'Me lembre amanhã à noite',

  ev_title_focus: 'Sessão de foco · LofiSpace',
  ev_title_home: 'Voltar pra casa · relaxar',
  ev_desc_focus: 'Sua sala tranquila com música lofi e timer Pomodoro está pronta:',
  ev_desc_home: 'Hora de deixar o dia de lado. Uma sala tranquila espera por você:',

  wb_hello: 'Bem-vindo de volta',
  wb_yesterday: 'Foco de ontem: {m} min',
  wb_last: 'Último foco: {m} min',
  wb_streak: 'Sequência: {n}',
  wb_todos: 'Tarefas salvas: {n}',
  wb_focus_plain: 'Sua mesa está do jeito que você deixou.',
  wb_home_stars: 'Estrelas no seu céu: {n}',
  wb_home_plain: 'Que bom te ver de novo.',
}

const fr: RetentionCopy = {
  nudge_focus: 'Belle session. Garder cette pièce à portée de main ?',
  nudge_home: 'Garder ce coin calme tout près ?',
  install_btn: 'Installer l’app',
  install_desc: 'S’ouvre dans sa propre fenêtre, gratuitement.',
  ios_step1: 'Touchez le bouton Partager dans Safari',
  ios_step2: 'Choisissez « Sur l’écran d’accueil »',
  menu_hint: 'Ouvrez le menu du navigateur ⋮ et choisissez « Ajouter à l’écran d’accueil ».',
  bookmark_hint: 'Appuyez sur {key} pour ajouter cette page aux favoris.',
  not_now: 'Plus tard',
  close: 'Fermer',

  cal_title_focus: 'Rappel de concentration quotidien',
  cal_title_home: 'Rappel du soir',
  cal_time: 'Heure',
  cal_google: 'Google Agenda',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Ajouté. À tout à l’heure.',
  cal_open: 'Rappel quotidien',
  cal_home_link: 'Me le rappeler demain soir',

  ev_title_focus: 'Session de concentration · LofiSpace',
  ev_title_home: 'Rentrer chez soi · décompresser',
  ev_desc_focus: 'Votre pièce calme avec musique lofi et minuteur Pomodoro est prête :',
  ev_desc_home: 'C’est le moment de poser la journée. Une pièce calme vous attend :',

  wb_hello: 'Bon retour',
  wb_yesterday: 'Concentration d’hier : {m} min',
  wb_last: 'Dernière session : {m} min',
  wb_streak: 'Série : {n}',
  wb_todos: 'Tâches gardées : {n}',
  wb_focus_plain: 'Votre bureau est tel que vous l’avez laissé.',
  wb_home_stars: 'Étoiles dans votre ciel : {n}',
  wb_home_plain: 'Ça fait plaisir de vous revoir.',
}

const de: RetentionCopy = {
  nudge_focus: 'Schöne Einheit. Diesen Raum immer griffbereit haben?',
  nudge_home: 'Diesen ruhigen Ort in der Nähe behalten?',
  install_btn: 'App installieren',
  install_desc: 'Öffnet sich im eigenen Fenster, kostenlos.',
  ios_step1: 'Tippe in Safari auf „Teilen“',
  ios_step2: 'Wähle „Zum Home-Bildschirm“',
  menu_hint: 'Öffne das Browsermenü ⋮ und wähle „Zum Startbildschirm hinzufügen“.',
  bookmark_hint: 'Drücke {key}, um ein Lesezeichen zu setzen.',
  not_now: 'Nicht jetzt',
  close: 'Schließen',

  cal_title_focus: 'Tägliche Fokus-Erinnerung',
  cal_title_home: 'Abendliche Erinnerung',
  cal_time: 'Uhrzeit',
  cal_google: 'Google Kalender',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Hinzugefügt. Bis dann.',
  cal_open: 'Tägliche Erinnerung',
  cal_home_link: 'Morgen Abend erinnern',

  ev_title_focus: 'Fokus-Einheit · LofiSpace',
  ev_title_home: 'Nach Hause · runterkommen',
  ev_desc_focus: 'Dein ruhiger Raum mit Lofi-Musik und Pomodoro-Timer ist bereit:',
  ev_desc_home: 'Zeit, den Tag abzulegen. Ein ruhiger Raum wartet:',

  wb_hello: 'Willkommen zurück',
  wb_yesterday: 'Fokus gestern: {m} Min.',
  wb_last: 'Letzter Fokus: {m} Min.',
  wb_streak: 'Serie: {n}',
  wb_todos: 'Gespeicherte Aufgaben: {n}',
  wb_focus_plain: 'Dein Schreibtisch ist so, wie du ihn verlassen hast.',
  wb_home_stars: 'Sterne an deinem Himmel: {n}',
  wb_home_plain: 'Schön, dich wiederzusehen.',
}

const ru: RetentionCopy = {
  nudge_focus: 'Хорошая сессия. Держать эту комнату под рукой?',
  nudge_home: 'Оставить это тихое место поблизости?',
  install_btn: 'Установить',
  install_desc: 'Открывается в отдельном окне, бесплатно.',
  ios_step1: 'Нажмите «Поделиться» в Safari',
  ios_step2: 'Выберите «На экран „Домой“»',
  menu_hint: 'Откройте меню браузера ⋮ и выберите «Добавить на главный экран».',
  bookmark_hint: 'Нажмите {key}, чтобы добавить страницу в закладки.',
  not_now: 'Не сейчас',
  close: 'Закрыть',

  cal_title_focus: 'Ежедневное напоминание о фокусе',
  cal_title_home: 'Вечернее напоминание',
  cal_time: 'Время',
  cal_google: 'Google Календарь',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Добавлено. До встречи.',
  cal_open: 'Ежедневное напоминание',
  cal_home_link: 'Напомнить завтра вечером',

  ev_title_focus: 'Сессия фокуса · LofiSpace',
  ev_title_home: 'Домой · отдохнуть',
  ev_desc_focus: 'Ваша тихая комната с lofi-музыкой и таймером Pomodoro готова:',
  ev_desc_home: 'Пора отпустить этот день. Тихая комната ждёт:',

  wb_hello: 'С возвращением',
  wb_yesterday: 'Фокус вчера: {m} мин',
  wb_last: 'Последний фокус: {m} мин',
  wb_streak: 'Серия: {n}',
  wb_todos: 'Сохранённых задач: {n}',
  wb_focus_plain: 'Ваш стол такой же, каким вы его оставили.',
  wb_home_stars: 'Звёзд на вашем небе: {n}',
  wb_home_plain: 'Рады видеть вас снова.',
}

const ja: RetentionCopy = {
  nudge_focus: 'おつかれさま。この部屋をワンタップで開けるようにしますか？',
  nudge_home: 'この静かな場所をすぐそばに置いておきますか？',
  install_btn: 'アプリをインストール',
  install_desc: '専用ウィンドウで開きます。無料です。',
  ios_step1: 'Safari の共有ボタンをタップ',
  ios_step2: '「ホーム画面に追加」を選択',
  menu_hint: 'ブラウザのメニュー ⋮ から「ホーム画面に追加」を選んでください。',
  bookmark_hint: '{key} でこのページをブックマークできます。',
  not_now: '今はしない',
  close: '閉じる',

  cal_title_focus: '毎日の集中リマインダー',
  cal_title_home: '夜のリマインダー',
  cal_time: '時刻',
  cal_google: 'Google カレンダー',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: '追加しました。またそのときに。',
  cal_open: '毎日のリマインダー',
  cal_home_link: '明日の夜にお知らせ',

  ev_title_focus: '集中タイム · LofiSpace',
  ev_title_home: 'おかえりモード · ひと息',
  ev_desc_focus: 'lofi 音楽とポモドーロタイマーのある静かな部屋が待っています：',
  ev_desc_home: '今日をそっと置く時間です。静かな部屋が待っています：',

  wb_hello: 'おかえりなさい',
  wb_yesterday: '昨日の集中：{m} 分',
  wb_last: '前回の集中：{m} 分',
  wb_streak: '連続日数：{n}',
  wb_todos: '保存中のタスク：{n}',
  wb_focus_plain: 'デスクはあなたが離れたときのままです。',
  wb_home_stars: 'あなたの空の星：{n}',
  wb_home_plain: 'また会えてうれしいです。',
}

const ko: RetentionCopy = {
  nudge_focus: '좋은 세션이었어요. 이 방을 한 번에 열 수 있게 할까요?',
  nudge_home: '이 조용한 공간을 가까이에 둘까요?',
  install_btn: '앱 설치',
  install_desc: '별도의 창에서 열려요. 무료예요.',
  ios_step1: 'Safari에서 공유 버튼을 누르세요',
  ios_step2: '“홈 화면에 추가”를 선택하세요',
  menu_hint: '브라우저 메뉴 ⋮ 를 열고 “홈 화면에 추가”를 선택하세요.',
  bookmark_hint: '{key} 를 눌러 이 페이지를 북마크하세요.',
  not_now: '나중에',
  close: '닫기',

  cal_title_focus: '매일 집중 알림',
  cal_title_home: '저녁 알림',
  cal_time: '시간',
  cal_google: 'Google 캘린더',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: '추가했어요. 그때 만나요.',
  cal_open: '매일 알림',
  cal_home_link: '내일 저녁에 알려 주세요',

  ev_title_focus: '집중 세션 · LofiSpace',
  ev_title_home: '집으로 · 쉬어 가기',
  ev_desc_focus: 'lofi 음악과 뽀모도로 타이머가 있는 조용한 방이 준비됐어요:',
  ev_desc_home: '오늘을 내려놓을 시간이에요. 조용한 방이 기다리고 있어요:',

  wb_hello: '다시 오셨네요',
  wb_yesterday: '어제 집중: {m}분',
  wb_last: '지난 집중: {m}분',
  wb_streak: '연속: {n}일',
  wb_todos: '저장된 할 일: {n}',
  wb_focus_plain: '책상은 떠날 때 그대로예요.',
  wb_home_stars: '내 하늘의 별: {n}',
  wb_home_plain: '다시 만나서 반가워요.',
}

const zh: RetentionCopy = {
  nudge_focus: '这次专注很棒。要把这个房间放在一键可达的地方吗？',
  nudge_home: '想把这个安静的地方留在身边吗？',
  install_btn: '安装应用',
  install_desc: '在独立窗口中打开，完全免费。',
  ios_step1: '点按 Safari 中的“分享”按钮',
  ios_step2: '选择“添加到主屏幕”',
  menu_hint: '打开浏览器菜单 ⋮，选择“添加到主屏幕”。',
  bookmark_hint: '按 {key} 将此页面加入书签。',
  not_now: '以后再说',
  close: '关闭',

  cal_title_focus: '每日专注提醒',
  cal_title_home: '晚间提醒',
  cal_time: '时间',
  cal_google: 'Google 日历',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: '已添加，到时见。',
  cal_open: '每日提醒',
  cal_home_link: '明晚提醒我',

  ev_title_focus: '专注时段 · LofiSpace',
  ev_title_home: '回家 · 放松一下',
  ev_desc_focus: '有 lofi 音乐和番茄钟的安静房间已经准备好了：',
  ev_desc_home: '是时候放下今天了。一个安静的房间在等你：',

  wb_hello: '欢迎回来',
  wb_yesterday: '昨日专注：{m} 分钟',
  wb_last: '上次专注：{m} 分钟',
  wb_streak: '连续天数：{n}',
  wb_todos: '已保存的待办：{n}',
  wb_focus_plain: '你的书桌还是离开时的样子。',
  wb_home_stars: '你天空中的星星：{n}',
  wb_home_plain: '很高兴再次见到你。',
}

const id: RetentionCopy = {
  nudge_focus: 'Sesi yang bagus. Simpan ruangan ini agar tinggal sekali ketuk?',
  nudge_home: 'Mau tempat tenang ini selalu dekat?',
  install_btn: 'Pasang aplikasi',
  install_desc: 'Terbuka di jendela sendiri, gratis.',
  ios_step1: 'Ketuk tombol Bagikan di Safari',
  ios_step2: 'Pilih “Tambah ke Layar Utama”',
  menu_hint: 'Buka menu browser ⋮ lalu pilih “Tambahkan ke layar utama”.',
  bookmark_hint: 'Tekan {key} untuk menandai halaman ini.',
  not_now: 'Nanti saja',
  close: 'Tutup',

  cal_title_focus: 'Pengingat fokus harian',
  cal_title_home: 'Pengingat malam',
  cal_time: 'Waktu',
  cal_google: 'Google Kalender',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'Ditambahkan. Sampai nanti.',
  cal_open: 'Pengingat harian',
  cal_home_link: 'Ingatkan aku besok malam',

  ev_title_focus: 'Sesi fokus · LofiSpace',
  ev_title_home: 'Pulang · rehat sejenak',
  ev_desc_focus: 'Ruang tenangmu dengan musik lofi dan timer Pomodoro sudah siap:',
  ev_desc_home: 'Saatnya meletakkan hari ini. Ruang yang tenang menunggumu:',

  wb_hello: 'Selamat datang kembali',
  wb_yesterday: 'Fokus kemarin: {m} mnt',
  wb_last: 'Fokus terakhir: {m} mnt',
  wb_streak: 'Runtunan: {n}',
  wb_todos: 'Tugas tersimpan: {n}',
  wb_focus_plain: 'Mejamu masih seperti saat kamu tinggalkan.',
  wb_home_stars: 'Bintang di langitmu: {n}',
  wb_home_plain: 'Senang bertemu lagi.',
}

const th: RetentionCopy = {
  nudge_focus: 'เซสชันนี้ดีมาก เก็บห้องนี้ไว้ให้เปิดได้ในแตะเดียวไหม?',
  nudge_home: 'อยากเก็บมุมสงบนี้ไว้ใกล้ ๆ ไหม?',
  install_btn: 'ติดตั้งแอป',
  install_desc: 'เปิดในหน้าต่างของตัวเอง ฟรี',
  ios_step1: 'แตะปุ่มแชร์ใน Safari',
  ios_step2: 'เลือก “เพิ่มไปยังหน้าจอโฮม”',
  menu_hint: 'เปิดเมนูเบราว์เซอร์ ⋮ แล้วเลือก “เพิ่มลงในหน้าจอหลัก”',
  bookmark_hint: 'กด {key} เพื่อบุ๊กมาร์กหน้านี้',
  not_now: 'ไว้ทีหลัง',
  close: 'ปิด',

  cal_title_focus: 'เตือนโฟกัสทุกวัน',
  cal_title_home: 'เตือนตอนค่ำ',
  cal_time: 'เวลา',
  cal_google: 'Google ปฏิทิน',
  cal_ics: 'Apple / Outlook (.ics)',
  cal_added: 'เพิ่มแล้ว แล้วพบกันนะ',
  cal_open: 'เตือนทุกวัน',
  cal_home_link: 'เตือนฉันพรุ่งนี้ตอนค่ำ',

  ev_title_focus: 'เซสชันโฟกัส · LofiSpace',
  ev_title_home: 'กลับบ้าน · พักใจ',
  ev_desc_focus: 'ห้องสงบพร้อมเพลง lofi และตัวจับเวลา Pomodoro พร้อมแล้ว:',
  ev_desc_home: 'ถึงเวลาวางวันนี้ลง ห้องเงียบสงบกำลังรออยู่:',

  wb_hello: 'ยินดีต้อนรับกลับ',
  wb_yesterday: 'โฟกัสเมื่อวาน: {m} นาที',
  wb_last: 'โฟกัสครั้งล่าสุด: {m} นาที',
  wb_streak: 'ต่อเนื่อง: {n} วัน',
  wb_todos: 'งานที่บันทึกไว้: {n}',
  wb_focus_plain: 'โต๊ะของคุณยังเหมือนตอนที่คุณจากไป',
  wb_home_stars: 'ดาวบนท้องฟ้าของคุณ: {n}',
  wb_home_plain: 'ดีใจที่ได้เจอกันอีก',
}

export const RETENTION_COPY: Record<Lang, RetentionCopy> = { en, vi, es, pt, fr, de, ru, ja, ko, zh, id, th }

export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
