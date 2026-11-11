// Copy for "My rooms", "Scene of the week" and the Notion embed shortcut, in every UI language.
// Kept beside the components (like retention/copy.ts) so the main i18n bundle doesn't grow.

import type { Lang } from '@/lib/i18n'

export interface RoomsCopy {
  rooms_title: string
  rooms_empty: string
  rooms_save: string
  rooms_name_ph: string
  rooms_saved: string
  rooms_full: string
  rooms_delete: string
  rooms_start: string
  sow_title: string
  sow_new: string
  sow_try: string
  sow_on: string
  embed_notion: string
  embed_copied: string
  embed_how: string
  yt_tip_title: string
  yt_tip_body: string
}

const en: RoomsCopy = {
  rooms_title: 'My rooms',
  rooms_empty: 'Save your favourite mix of scene, music and sounds, then reopen it in one tap.',
  rooms_save: 'Save this room',
  rooms_name_ph: 'Name it, e.g. Late-night coding',
  rooms_saved: 'Saved',
  rooms_full: 'You have 6 rooms. Delete one to save another.',
  rooms_delete: 'Delete room',
  rooms_start: 'Or jump into one of your rooms',
  sow_title: 'Scene of the week',
  sow_new: 'New',
  sow_try: 'Try it',
  sow_on: 'On now',
  embed_notion: 'Embed in Notion',
  embed_copied: 'Link copied. Paste it into a Notion /embed block.',
  embed_how: 'How?',  yt_tip_title: "Listen to any YouTube link",
  yt_tip_body: "Tap YouTube in the dock and paste a link.",
}

const vi: RoomsCopy = {
  rooms_title: 'Phòng của tôi',
  rooms_empty: 'Lưu combo cảnh, nhạc và âm thanh bạn thích, lần sau mở lại chỉ với một chạm.',
  rooms_save: 'Lưu phòng này',
  rooms_name_ph: 'Đặt tên, ví dụ: Code đêm khuya',
  rooms_saved: 'Đã lưu',
  rooms_full: 'Bạn đã có 6 phòng. Xoá bớt một phòng để lưu thêm.',
  rooms_delete: 'Xoá phòng',
  rooms_start: 'Hoặc vào thẳng một phòng của bạn',
  sow_title: 'Cảnh của tuần',
  sow_new: 'Mới',
  sow_try: 'Thử ngay',
  sow_on: 'Đang dùng',
  embed_notion: 'Nhúng vào Notion',
  embed_copied: 'Đã sao chép link. Dán vào một block /embed trong Notion.',
  embed_how: 'Cách làm?',  yt_tip_title: "Nghe bất kỳ link YouTube nào",
  yt_tip_body: "Bấm YouTube ở thanh dưới rồi dán link vào.",
}

const es: RoomsCopy = {
  rooms_title: 'Mis salas',
  rooms_empty: 'Guarda tu combinación favorita de escena, música y sonidos y vuelve a abrirla con un toque.',
  rooms_save: 'Guardar esta sala',
  rooms_name_ph: 'Ponle nombre, p. ej. Programar de noche',
  rooms_saved: 'Guardada',
  rooms_full: 'Tienes 6 salas. Borra una para guardar otra.',
  rooms_delete: 'Borrar sala',
  rooms_start: 'O entra directamente en una de tus salas',
  sow_title: 'Escena de la semana',
  sow_new: 'Nueva',
  sow_try: 'Probar',
  sow_on: 'Activa',
  embed_notion: 'Insertar en Notion',
  embed_copied: 'Enlace copiado. Pégalo en un bloque /embed de Notion.',
  embed_how: '¿Cómo?',  yt_tip_title: "Escucha cualquier enlace de YouTube",
  yt_tip_body: "Toca YouTube en la barra y pega un enlace.",
}

const pt: RoomsCopy = {
  rooms_title: 'Minhas salas',
  rooms_empty: 'Salve sua combinação favorita de cena, música e sons e abra de novo com um toque.',
  rooms_save: 'Salvar esta sala',
  rooms_name_ph: 'Dê um nome, ex.: Programar de madrugada',
  rooms_saved: 'Salva',
  rooms_full: 'Você tem 6 salas. Apague uma para salvar outra.',
  rooms_delete: 'Apagar sala',
  rooms_start: 'Ou entre direto em uma das suas salas',
  sow_title: 'Cena da semana',
  sow_new: 'Nova',
  sow_try: 'Experimentar',
  sow_on: 'Em uso',
  embed_notion: 'Incorporar no Notion',
  embed_copied: 'Link copiado. Cole em um bloco /embed do Notion.',
  embed_how: 'Como?',  yt_tip_title: "Ouça qualquer link do YouTube",
  yt_tip_body: "Toque em YouTube na barra e cole um link.",
}

const fr: RoomsCopy = {
  rooms_title: 'Mes salles',
  rooms_empty: 'Enregistrez votre combinaison préférée de décor, musique et sons, puis rouvrez-la en un geste.',
  rooms_save: 'Enregistrer cette salle',
  rooms_name_ph: 'Donnez un nom, ex. : Code de nuit',
  rooms_saved: 'Enregistrée',
  rooms_full: 'Vous avez 6 salles. Supprimez-en une pour en enregistrer une autre.',
  rooms_delete: 'Supprimer la salle',
  rooms_start: "Ou entrez directement dans l'une de vos salles",
  sow_title: 'Décor de la semaine',
  sow_new: 'Nouveau',
  sow_try: 'Essayer',
  sow_on: 'Actif',
  embed_notion: 'Intégrer dans Notion',
  embed_copied: 'Lien copié. Collez-le dans un bloc /embed de Notion.',
  embed_how: 'Comment ?',  yt_tip_title: "Écoutez n'importe quel lien YouTube",
  yt_tip_body: "Touchez YouTube dans la barre et collez un lien.",
}

const de: RoomsCopy = {
  rooms_title: 'Meine Räume',
  rooms_empty: 'Speichere deine Lieblingskombination aus Szene, Musik und Klängen und öffne sie mit einem Tipp wieder.',
  rooms_save: 'Diesen Raum speichern',
  rooms_name_ph: 'Gib ihm einen Namen, z. B. Nachts coden',
  rooms_saved: 'Gespeichert',
  rooms_full: 'Du hast 6 Räume. Lösche einen, um einen neuen zu speichern.',
  rooms_delete: 'Raum löschen',
  rooms_start: 'Oder geh direkt in einen deiner Räume',
  sow_title: 'Szene der Woche',
  sow_new: 'Neu',
  sow_try: 'Ausprobieren',
  sow_on: 'Aktiv',
  embed_notion: 'In Notion einbetten',
  embed_copied: 'Link kopiert. Füge ihn in einen Notion-/embed-Block ein.',
  embed_how: 'Wie?',  yt_tip_title: "Hör jeden beliebigen YouTube-Link",
  yt_tip_body: "Tippe unten auf YouTube und füge einen Link ein.",
}

const ru: RoomsCopy = {
  rooms_title: 'Мои комнаты',
  rooms_empty: 'Сохраните любимое сочетание сцены, музыки и звуков и открывайте его одним касанием.',
  rooms_save: 'Сохранить комнату',
  rooms_name_ph: 'Назовите, например: Ночной код',
  rooms_saved: 'Сохранено',
  rooms_full: 'У вас уже 6 комнат. Удалите одну, чтобы сохранить новую.',
  rooms_delete: 'Удалить комнату',
  rooms_start: 'Или сразу откройте одну из своих комнат',
  sow_title: 'Сцена недели',
  sow_new: 'Новое',
  sow_try: 'Попробовать',
  sow_on: 'Включена',
  embed_notion: 'Встроить в Notion',
  embed_copied: 'Ссылка скопирована. Вставьте её в блок /embed в Notion.',
  embed_how: 'Как?',  yt_tip_title: "Слушайте любую ссылку с YouTube",
  yt_tip_body: "Нажмите YouTube на панели и вставьте ссылку.",
}

const ja: RoomsCopy = {
  rooms_title: 'マイルーム',
  rooms_empty: 'お気に入りの景色・音楽・環境音の組み合わせを保存して、ワンタップで開き直せます。',
  rooms_save: 'このルームを保存',
  rooms_name_ph: '名前をつける（例：深夜のコーディング）',
  rooms_saved: '保存しました',
  rooms_full: 'ルームは6つまでです。新しく保存するには1つ削除してください。',
  rooms_delete: 'ルームを削除',
  rooms_start: 'または、保存したルームからすぐに始める',
  sow_title: '今週の景色',
  sow_new: '新着',
  sow_try: '試してみる',
  sow_on: '使用中',
  embed_notion: 'Notionに埋め込む',
  embed_copied: 'リンクをコピーしました。Notionの /embed ブロックに貼り付けてください。',
  embed_how: '方法は？',  yt_tip_title: "好きなYouTubeリンクを聴けます",
  yt_tip_body: "下のバーの「YouTube」をタップしてリンクを貼り付け。",
}

const ko: RoomsCopy = {
  rooms_title: '내 공간',
  rooms_empty: '좋아하는 장면·음악·소리 조합을 저장하고 한 번에 다시 열어 보세요.',
  rooms_save: '이 공간 저장',
  rooms_name_ph: '이름 붙이기 (예: 새벽 코딩)',
  rooms_saved: '저장됨',
  rooms_full: '공간은 6개까지예요. 새로 저장하려면 하나를 지워 주세요.',
  rooms_delete: '공간 삭제',
  rooms_start: '또는 저장한 공간으로 바로 들어가기',
  sow_title: '이번 주의 장면',
  sow_new: '새로움',
  sow_try: '써 보기',
  sow_on: '사용 중',
  embed_notion: 'Notion에 임베드',
  embed_copied: '링크를 복사했어요. Notion의 /embed 블록에 붙여 넣으세요.',
  embed_how: '방법은?',  yt_tip_title: "원하는 유튜브 링크를 들어 보세요",
  yt_tip_body: "아래 바에서 YouTube를 누르고 링크를 붙여 넣으세요.",
}

const zh: RoomsCopy = {
  rooms_title: '我的房间',
  rooms_empty: '保存你最喜欢的场景、音乐和环境音组合，下次一键打开。',
  rooms_save: '保存这个房间',
  rooms_name_ph: '取个名字，例如：深夜写代码',
  rooms_saved: '已保存',
  rooms_full: '最多保存 6 个房间。删除一个后才能再保存。',
  rooms_delete: '删除房间',
  rooms_start: '或直接进入你保存的房间',
  sow_title: '本周场景',
  sow_new: '新',
  sow_try: '试试看',
  sow_on: '使用中',
  embed_notion: '嵌入到 Notion',
  embed_copied: '链接已复制。粘贴到 Notion 的 /embed 块中。',
  embed_how: '怎么做？',  yt_tip_title: "收听任意 YouTube 链接",
  yt_tip_body: "点击底栏的 YouTube，粘贴链接即可。",
}

const id: RoomsCopy = {
  rooms_title: 'Ruanganku',
  rooms_empty: 'Simpan kombinasi pemandangan, musik, dan suara favoritmu, lalu buka lagi dengan sekali ketuk.',
  rooms_save: 'Simpan ruangan ini',
  rooms_name_ph: 'Beri nama, mis. Ngoding tengah malam',
  rooms_saved: 'Tersimpan',
  rooms_full: 'Kamu sudah punya 6 ruangan. Hapus satu untuk menyimpan yang baru.',
  rooms_delete: 'Hapus ruangan',
  rooms_start: 'Atau langsung masuk ke salah satu ruanganmu',
  sow_title: 'Pemandangan minggu ini',
  sow_new: 'Baru',
  sow_try: 'Coba',
  sow_on: 'Dipakai',
  embed_notion: 'Sematkan di Notion',
  embed_copied: 'Tautan disalin. Tempel ke blok /embed di Notion.',
  embed_how: 'Caranya?',  yt_tip_title: "Dengarkan link YouTube apa saja",
  yt_tip_body: "Ketuk YouTube di bilah bawah lalu tempel link.",
}

const th: RoomsCopy = {
  rooms_title: 'ห้องของฉัน',
  rooms_empty: 'บันทึกชุดฉาก เพลง และเสียงที่ชอบ แล้วเปิดกลับมาได้ในแตะเดียว',
  rooms_save: 'บันทึกห้องนี้',
  rooms_name_ph: 'ตั้งชื่อ เช่น เขียนโค้ดตอนดึก',
  rooms_saved: 'บันทึกแล้ว',
  rooms_full: 'มีครบ 6 ห้องแล้ว ลบสักห้องเพื่อบันทึกห้องใหม่',
  rooms_delete: 'ลบห้อง',
  rooms_start: 'หรือเข้าห้องที่บันทึกไว้ได้เลย',
  sow_title: 'ฉากประจำสัปดาห์',
  sow_new: 'ใหม่',
  sow_try: 'ลองเลย',
  sow_on: 'กำลังใช้',
  embed_notion: 'ฝังใน Notion',
  embed_copied: 'คัดลอกลิงก์แล้ว วางในบล็อก /embed ของ Notion ได้เลย',
  embed_how: 'ทำอย่างไร?',  yt_tip_title: "ฟังลิงก์ YouTube ไหนก็ได้",
  yt_tip_body: "แตะ YouTube ที่แถบด้านล่าง แล้ววางลิงก์",
}

export const ROOMS_COPY: Record<Lang, RoomsCopy> = { en, vi, es, pt, fr, de, ru, ja, ko, zh, id, th }
