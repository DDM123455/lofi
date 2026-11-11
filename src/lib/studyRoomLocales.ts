/**
 * Localized "online study room" landing pages — one per UI language that had no SEO page yet.
 * Each targets what people actually search in that language (自習室, 독서실, 自习室, sala de
 * estudio…), not a literal translation of the English page. All share one hreflang cluster
 * with /online-study-room (en) and /vi/phong-hoc-online (vi).
 */

const SITE = 'https://www.focusworkspace.app'

export interface StudyRoomLocale {
  lang: 'es' | 'pt' | 'fr' | 'de' | 'ru' | 'ja' | 'ko' | 'zh' | 'id' | 'th'
  path: string
  ogLocale: string
  metaTitle: string
  metaDesc: string
  keywords: string[]
  crumbHome: string
  crumb: string
  h1: string
  tagline: string
  intro: string
  cta: string
  fine: string
  featuresTitle: string
  features: { emoji: string; title: string; desc: string }[]
  stepsTitle: string
  steps: { title: string; desc: string }[]
  faqTitle: string
  faq: { q: string; a: string }[]
  closing: string
}

const F = (a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string, i: string, j: string, k: string, l: string) => [
  { emoji: '🎵', title: a, desc: b },
  { emoji: '🌧️', title: c, desc: d },
  { emoji: '⏱️', title: e, desc: f },
  { emoji: '✅', title: g, desc: h },
  { emoji: '🎬', title: i, desc: j },
  { emoji: '🌙', title: k, desc: l },
]

export const STUDY_ROOM_LOCALES: StudyRoomLocale[] = [
  {
    lang: 'es', path: '/es/sala-de-estudio-online', ogLocale: 'es_ES',
    metaTitle: 'Sala de Estudio Online Gratis con Música Lofi y Pomodoro',
    metaDesc: 'Una sala de estudio online gratis: música lofi, sonidos de lluvia y cafetería, temporizador Pomodoro y lista de tareas en una sola pestaña. Sin registro.',
    keywords: ['sala de estudio online', 'sala de estudio virtual', 'estudia conmigo', 'música lofi para estudiar', 'pomodoro online', 'página para estudiar'],
    crumbHome: 'Inicio', crumb: 'Sala de estudio online',
    h1: 'Sala de estudio online', tagline: 'Gratis, sin registro, en una sola pestaña',
    intro: 'Estudiar solo en casa cuesta. LofiSpace te da el ambiente de una biblioteca tranquila o una cafetería: música lofi, lluvia de fondo y un temporizador Pomodoro que te ayuda a empezar y a seguir.',
    cta: 'Entrar a la sala', fine: 'Gratis · Sin cuenta · Funciona en el móvil',
    featuresTitle: 'Todo lo que necesitas para concentrarte',
    features: F('Música lofi', 'Emisoras lofi sin anuncios o tu propio enlace de YouTube.', 'Sonidos de ambiente', 'Mezcla lluvia, cafetería, chimenea, bosque y mar a tu gusto.', 'Pomodoro', 'Bloques de 25 minutos con descansos cortos y largos personalizables.', 'Lista de tareas', 'Anota lo que toca hoy y vincula cada tarea a tus pomodoros.', 'Escenas animadas', 'Habitación lofi, playa nocturna, cabaña de invierno y más.', 'Modo noche', '«Volver a casa»: un rincón tranquilo para desconectar después de estudiar.'),
    stepsTitle: 'Cómo funciona',
    steps: [
      { title: 'Abre la sala', desc: 'Sin cuenta ni descargas. Un clic y ya estás dentro.' },
      { title: 'Elige tu ambiente', desc: 'Escena, música y sonidos. Guarda tu combinación como «Mi sala».' },
      { title: 'Pulsa Pomodoro', desc: '25 minutos de concentración, 5 de descanso. Repite.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Qué es una sala de estudio online?', a: 'Un espacio en el navegador que imita el ambiente de una biblioteca o cafetería, con música, sonidos de fondo y herramientas de concentración para estudiar solo sin sentirte solo.' },
      { q: '¿Es realmente gratis?', a: 'Sí. No hay cuenta, ni suscripción, ni costes ocultos.' },
      { q: '¿Funciona en el móvil?', a: 'Sí, en navegadores de móvil, tablet y ordenador. También puedes instalarla como app en la pantalla de inicio.' },
      { q: '¿Necesito cámara, como en los «estudia conmigo»?', a: 'No. Es una sala tranquila para ti, sin cámara ni micrófono.' },
    ],
    closing: 'Tu próxima sesión de estudio empieza aquí.',
  },
  {
    lang: 'pt', path: '/pt/sala-de-estudos-online', ogLocale: 'pt_BR',
    metaTitle: 'Sala de Estudos Online Grátis com Música Lofi e Pomodoro',
    metaDesc: 'Uma sala de estudos online grátis: música lofi, sons de chuva e café, timer Pomodoro e lista de tarefas em uma única aba. Sem cadastro.',
    keywords: ['sala de estudos online', 'sala de estudo virtual', 'estude comigo', 'música lofi para estudar', 'pomodoro online', 'site para estudar'],
    crumbHome: 'Início', crumb: 'Sala de estudos online',
    h1: 'Sala de estudos online', tagline: 'Grátis, sem cadastro, em uma única aba',
    intro: 'Estudar sozinho em casa é difícil. O LofiSpace traz o clima de uma biblioteca silenciosa ou de um café: música lofi, chuva ao fundo e um timer Pomodoro que ajuda você a começar e continuar.',
    cta: 'Entrar na sala', fine: 'Grátis · Sem conta · Funciona no celular',
    featuresTitle: 'Tudo o que você precisa para focar',
    features: F('Música lofi', 'Rádios lofi sem anúncios ou o seu próprio link do YouTube.', 'Sons ambiente', 'Misture chuva, café, lareira, floresta e mar do seu jeito.', 'Pomodoro', 'Blocos de 25 minutos com pausas curtas e longas personalizáveis.', 'Lista de tarefas', 'Anote o que fazer hoje e ligue cada tarefa aos seus pomodoros.', 'Cenas animadas', 'Quarto lofi, praia à noite, cabana de inverno e mais.', 'Modo noite', '“Voltar para casa”: um cantinho calmo para desligar depois de estudar.'),
    stepsTitle: 'Como funciona',
    steps: [
      { title: 'Abra a sala', desc: 'Sem conta nem download. Um clique e pronto.' },
      { title: 'Escolha o clima', desc: 'Cena, música e sons. Salve a combinação como “Minha sala”.' },
      { title: 'Comece o Pomodoro', desc: '25 minutos de foco, 5 de pausa. Repita.' },
    ],
    faqTitle: 'Perguntas frequentes',
    faq: [
      { q: 'O que é uma sala de estudos online?', a: 'Um espaço no navegador que recria o clima de uma biblioteca ou café, com música, sons de fundo e ferramentas de foco para estudar sozinho sem se sentir sozinho.' },
      { q: 'É grátis mesmo?', a: 'Sim. Sem conta, sem assinatura e sem custos escondidos.' },
      { q: 'Funciona no celular?', a: 'Sim, em navegadores de celular, tablet e computador. Dá até para instalar como app na tela inicial.' },
      { q: 'Preciso de câmera, como no “estude comigo”?', a: 'Não. É uma sala tranquila só para você, sem câmera nem microfone.' },
    ],
    closing: 'Sua próxima sessão de estudos começa aqui.',
  },
  {
    lang: 'fr', path: '/fr/salle-detude-en-ligne', ogLocale: 'fr_FR',
    metaTitle: "Salle d'Étude en Ligne Gratuite avec Musique Lofi et Pomodoro",
    metaDesc: "Une salle d'étude en ligne gratuite : musique lofi, bruits de pluie et de café, minuteur Pomodoro et liste de tâches dans un seul onglet. Sans inscription.",
    keywords: ["salle d'étude en ligne", 'salle de travail virtuelle', 'study with me français', 'musique lofi pour travailler', 'pomodoro en ligne', 'site pour réviser'],
    crumbHome: 'Accueil', crumb: "Salle d'étude en ligne",
    h1: "Salle d'étude en ligne", tagline: 'Gratuite, sans inscription, dans un seul onglet',
    intro: "Travailler seul chez soi, ce n'est pas facile. LofiSpace recrée l'ambiance d'une bibliothèque calme ou d'un café : musique lofi, pluie en fond et un minuteur Pomodoro pour vous aider à démarrer et à tenir.",
    cta: 'Entrer dans la salle', fine: 'Gratuit · Sans compte · Fonctionne sur mobile',
    featuresTitle: 'Tout pour rester concentré',
    features: F('Musique lofi', 'Radios lofi sans pub ou votre propre lien YouTube.', "Sons d'ambiance", 'Mélangez pluie, café, cheminée, forêt et mer à votre goût.', 'Pomodoro', 'Sessions de 25 minutes, pauses courtes et longues réglables.', 'Liste de tâches', 'Notez ce qui est prévu et reliez chaque tâche à vos pomodoros.', 'Décors animés', 'Chambre lofi, plage de nuit, chalet en hiver et plus encore.', 'Mode soir', '« Rentrer chez soi » : un coin calme pour décrocher après le travail.'),
    stepsTitle: 'Comment ça marche',
    steps: [
      { title: 'Ouvrez la salle', desc: 'Ni compte ni téléchargement. Un clic, et vous y êtes.' },
      { title: 'Choisissez votre ambiance', desc: 'Décor, musique et sons. Enregistrez-la comme « Ma salle ».' },
      { title: 'Lancez le Pomodoro', desc: '25 minutes de concentration, 5 de pause. Recommencez.' },
    ],
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: "Qu'est-ce qu'une salle d'étude en ligne ?", a: "Un espace dans le navigateur qui reproduit l'ambiance d'une bibliothèque ou d'un café, avec musique, sons de fond et outils de concentration, pour travailler seul sans se sentir seul." },
      { q: "C'est vraiment gratuit ?", a: "Oui. Pas de compte, pas d'abonnement, pas de frais cachés." },
      { q: 'Ça marche sur mobile ?', a: "Oui, sur mobile, tablette et ordinateur. Vous pouvez aussi l'installer comme une app sur l'écran d'accueil." },
      { q: 'Faut-il une caméra, comme pour les « study with me » ?', a: 'Non. C\'est une salle calme rien que pour vous, sans caméra ni micro.' },
    ],
    closing: 'Votre prochaine séance de travail commence ici.',
  },
  {
    lang: 'de', path: '/de/online-lernraum', ogLocale: 'de_DE',
    metaTitle: 'Online-Lernraum kostenlos – mit Lofi-Musik und Pomodoro-Timer',
    metaDesc: 'Ein kostenloser Online-Lernraum: Lofi-Musik, Regen- und Café-Geräusche, Pomodoro-Timer und To-do-Liste in einem Tab. Ohne Anmeldung.',
    keywords: ['online lernraum', 'virtueller lernraum', 'study with me deutsch', 'lofi musik zum lernen', 'pomodoro timer online', 'lernen mit musik'],
    crumbHome: 'Startseite', crumb: 'Online-Lernraum',
    h1: 'Online-Lernraum', tagline: 'Kostenlos, ohne Anmeldung, in einem Tab',
    intro: 'Allein zu Hause zu lernen ist schwer. LofiSpace bringt die Atmosphäre einer ruhigen Bibliothek oder eines Cafés zu dir: Lofi-Musik, Regen im Hintergrund und ein Pomodoro-Timer, der dir beim Anfangen und Durchhalten hilft.',
    cta: 'Lernraum öffnen', fine: 'Kostenlos · Kein Konto · Funktioniert auf dem Handy',
    featuresTitle: 'Alles, was du zum Fokussieren brauchst',
    features: F('Lofi-Musik', 'Werbefreie Lofi-Streams oder dein eigener YouTube-Link.', 'Umgebungsgeräusche', 'Misch Regen, Café, Kamin, Wald und Meer nach Gefühl.', 'Pomodoro', '25-Minuten-Blöcke mit einstellbaren kurzen und langen Pausen.', 'To-do-Liste', 'Notier die Aufgaben für heute und verknüpf sie mit deinen Pomodoros.', 'Animierte Szenen', 'Lofi-Zimmer, Strand bei Nacht, Winterhütte und mehr.', 'Abendmodus', '„Nach Hause“: ein ruhiger Ort zum Abschalten nach dem Lernen.'),
    stepsTitle: "So funktioniert's",
    steps: [
      { title: 'Lernraum öffnen', desc: 'Kein Konto, kein Download. Ein Klick und los.' },
      { title: 'Atmosphäre wählen', desc: 'Szene, Musik, Geräusche. Speicher die Kombination als „Mein Raum“.' },
      { title: 'Pomodoro starten', desc: '25 Minuten Fokus, 5 Minuten Pause. Wiederholen.' },
    ],
    faqTitle: 'Häufige Fragen',
    faq: [
      { q: 'Was ist ein Online-Lernraum?', a: 'Ein Ort im Browser, der die Atmosphäre einer Bibliothek oder eines Cafés nachbildet, mit Musik, Hintergrundgeräuschen und Fokus-Tools, damit du allein lernst, ohne dich allein zu fühlen.' },
      { q: 'Ist das wirklich kostenlos?', a: 'Ja. Kein Konto, kein Abo, keine versteckten Kosten.' },
      { q: 'Funktioniert es auf dem Handy?', a: 'Ja, im Browser auf Handy, Tablet und Computer. Du kannst es auch wie eine App auf dem Startbildschirm installieren.' },
      { q: 'Brauche ich eine Kamera wie bei „Study with me“?', a: 'Nein. Es ist ein ruhiger Raum nur für dich, ohne Kamera und Mikrofon.' },
    ],
    closing: 'Deine nächste Lernsession beginnt hier.',
  },
  {
    lang: 'ru', path: '/ru/komnata-dlya-ucheby-onlajn', ogLocale: 'ru_RU',
    metaTitle: 'Комната для учёбы онлайн — бесплатно, с lofi-музыкой и Pomodoro',
    metaDesc: 'Бесплатная онлайн-комната для учёбы: lofi-музыка, шум дождя и кафе, таймер Pomodoro и список дел в одной вкладке. Без регистрации.',
    keywords: ['комната для учебы онлайн', 'онлайн учебная комната', 'учись со мной', 'lofi музыка для учебы', 'помодоро таймер онлайн', 'сайт для учебы'],
    crumbHome: 'Главная', crumb: 'Комната для учёбы онлайн',
    h1: 'Комната для учёбы онлайн', tagline: 'Бесплатно, без регистрации, в одной вкладке',
    intro: 'Учиться дома в одиночку непросто. LofiSpace создаёт атмосферу тихой библиотеки или кофейни: lofi-музыка, дождь на фоне и таймер Pomodoro, который помогает начать и не бросить.',
    cta: 'Войти в комнату', fine: 'Бесплатно · Без аккаунта · Работает на телефоне',
    featuresTitle: 'Всё, чтобы сосредоточиться',
    features: F('Lofi-музыка', 'Lofi-трансляции без рекламы или ваша ссылка на YouTube.', 'Фоновые звуки', 'Смешивайте дождь, кафе, камин, лес и море по настроению.', 'Pomodoro', 'Блоки по 25 минут с настраиваемыми короткими и длинными перерывами.', 'Список дел', 'Запишите задачи на сегодня и привяжите их к помидоркам.', 'Анимированные сцены', 'Lofi-комната, ночной пляж, зимний домик и другие.', 'Вечерний режим', '«Домой»: тихое место, чтобы отключиться после учёбы.'),
    stepsTitle: 'Как это работает',
    steps: [
      { title: 'Откройте комнату', desc: 'Без аккаунта и загрузок. Один клик.' },
      { title: 'Выберите атмосферу', desc: 'Сцена, музыка, звуки. Сохраните сочетание как «Моя комната».' },
      { title: 'Запустите Pomodoro', desc: '25 минут фокуса, 5 минут отдыха. Повторите.' },
    ],
    faqTitle: 'Частые вопросы',
    faq: [
      { q: 'Что такое онлайн-комната для учёбы?', a: 'Пространство в браузере, которое воссоздаёт атмосферу библиотеки или кафе: музыка, фоновые звуки и инструменты фокуса, чтобы учиться одному, но не чувствовать себя одиноко.' },
      { q: 'Это правда бесплатно?', a: 'Да. Без аккаунта, подписки и скрытых платежей.' },
      { q: 'Работает на телефоне?', a: 'Да, в браузере на телефоне, планшете и компьютере. Можно установить как приложение на главный экран.' },
      { q: 'Нужна ли камера, как в «учись со мной»?', a: 'Нет. Это тихая комната только для вас, без камеры и микрофона.' },
    ],
    closing: 'Ваша следующая учебная сессия начинается здесь.',
  },
  {
    lang: 'ja', path: '/ja/online-jishushitsu', ogLocale: 'ja_JP',
    metaTitle: 'オンライン自習室（無料）｜lofi音楽とポモドーロで集中',
    metaDesc: '無料のオンライン自習室。lofi音楽、雨音やカフェの環境音、ポモドーロタイマー、ToDoリストがブラウザのタブひとつに。登録不要。',
    keywords: ['オンライン自習室', '自習室 無料', '作業用bgm lofi', 'ポモドーロ タイマー', '勉強 集中 サイト', 'study with me'],
    crumbHome: 'ホーム', crumb: 'オンライン自習室',
    h1: 'オンライン自習室', tagline: '無料・登録不要・タブひとつで',
    intro: '家でひとりで勉強するのは難しいもの。LofiSpaceは静かな図書館やカフェのような空気をつくります。lofi音楽、雨の音、そして始めるのと続けるのを助けてくれるポモドーロタイマー。',
    cta: '自習室に入る', fine: '無料・アカウント不要・スマホ対応',
    featuresTitle: '集中に必要なものがそろっています',
    features: F('lofi音楽', '広告なしのlofi配信、または好きなYouTubeリンク。', '環境音', '雨、カフェ、暖炉、森、海を好きな音量でミックス。', 'ポモドーロ', '25分の集中と、調整できる短い休憩・長い休憩。', 'ToDoリスト', '今日のタスクを書き、ポモドーロと結びつけられます。', 'アニメーション背景', 'lofiの部屋、夜の海辺、冬の山小屋など。', '夜のモード', '「おうちに帰る」：勉強のあとに心をほどく静かな場所。'),
    stepsTitle: '使い方',
    steps: [
      { title: '自習室を開く', desc: 'アカウントもダウンロードも不要。ワンクリックで。' },
      { title: '雰囲気を選ぶ', desc: '景色・音楽・環境音。組み合わせは「マイルーム」に保存。' },
      { title: 'ポモドーロ開始', desc: '25分集中して5分休憩。くり返すだけ。' },
    ],
    faqTitle: 'よくある質問',
    faq: [
      { q: 'オンライン自習室とは？', a: '図書館やカフェの雰囲気をブラウザで再現する場所です。音楽や環境音、集中のためのツールがあり、ひとりでも孤独を感じずに勉強できます。' },
      { q: '本当に無料ですか？', a: 'はい。アカウントもサブスクリプションも隠れた費用もありません。' },
      { q: 'スマホでも使えますか？', a: 'はい。スマホ・タブレット・パソコンのブラウザで使えます。ホーム画面にアプリとして追加することもできます。' },
      { q: 'study with meのようにカメラは必要？', a: 'いいえ。カメラもマイクも不要な、あなただけの静かな部屋です。' },
    ],
    closing: '次の勉強時間は、ここから。',
  },
  {
    lang: 'ko', path: '/ko/online-dokseosil', ogLocale: 'ko_KR',
    metaTitle: '온라인 독서실 무료 | 로파이 음악과 뽀모도로 타이머',
    metaDesc: '무료 온라인 독서실. 로파이 음악, 빗소리·카페 소리, 뽀모도로 타이머, 할 일 목록을 브라우저 탭 하나에서. 가입 필요 없음.',
    keywords: ['온라인 독서실', '온라인 스터디룸', '공부할 때 듣는 음악', '뽀모도로 타이머', '공부 집중 사이트', '스터디 윗미'],
    crumbHome: '홈', crumb: '온라인 독서실',
    h1: '온라인 독서실', tagline: '무료, 가입 없이, 탭 하나로',
    intro: '집에서 혼자 공부하기는 쉽지 않죠. LofiSpace는 조용한 도서관이나 카페 같은 분위기를 만들어 줍니다. 로파이 음악, 은은한 빗소리, 그리고 시작하고 이어 가도록 돕는 뽀모도로 타이머.',
    cta: '독서실 들어가기', fine: '무료 · 계정 없음 · 모바일 지원',
    featuresTitle: '집중에 필요한 모든 것',
    features: F('로파이 음악', '광고 없는 로파이 스트림 또는 나만의 유튜브 링크.', '배경 소리', '비, 카페, 벽난로, 숲, 바다를 원하는 대로 섞어 보세요.', '뽀모도로', '25분 집중과 조절 가능한 짧은·긴 휴식.', '할 일 목록', '오늘 할 일을 적고 뽀모도로와 연결하세요.', '움직이는 배경', '로파이 방, 밤바다, 겨울 오두막 등.', '저녁 모드', '“집으로”: 공부를 마치고 마음을 내려놓는 조용한 곳.'),
    stepsTitle: '이용 방법',
    steps: [
      { title: '독서실 열기', desc: '계정도 다운로드도 필요 없어요. 클릭 한 번이면 끝.' },
      { title: '분위기 고르기', desc: '장면, 음악, 소리. 조합은 “내 공간”에 저장하세요.' },
      { title: '뽀모도로 시작', desc: '25분 집중, 5분 휴식. 반복하면 돼요.' },
    ],
    faqTitle: '자주 묻는 질문',
    faq: [
      { q: '온라인 독서실이 뭔가요?', a: '도서관이나 카페 분위기를 브라우저에서 재현한 공간이에요. 음악과 배경 소리, 집중 도구가 있어 혼자 공부해도 외롭지 않아요.' },
      { q: '정말 무료인가요?', a: '네. 계정도, 구독도, 숨은 비용도 없어요.' },
      { q: '휴대폰에서도 되나요?', a: '네, 휴대폰·태블릿·컴퓨터 브라우저에서 쓸 수 있어요. 홈 화면에 앱처럼 추가할 수도 있어요.' },
      { q: '스터디 윗미처럼 카메라가 필요한가요?', a: '아니요. 카메라도 마이크도 필요 없는, 나만을 위한 조용한 공간이에요.' },
    ],
    closing: '다음 공부 시간은 여기서 시작하세요.',
  },
  {
    lang: 'zh', path: '/zh/xianshang-zixishi', ogLocale: 'zh_CN',
    metaTitle: '线上自习室（免费）｜Lofi 音乐 + 番茄钟专注学习',
    metaDesc: '免费线上自习室：Lofi 音乐、雨声和咖啡馆白噪音、番茄钟和待办清单，一个浏览器标签页搞定。无需注册。',
    keywords: ['线上自习室', '在线自习室', '学习白噪音', '番茄钟在线', 'lofi 学习音乐', '专注学习网站'],
    crumbHome: '首页', crumb: '线上自习室',
    h1: '线上自习室', tagline: '免费、无需注册、一个标签页',
    intro: '一个人在家学习并不容易。LofiSpace 帮你营造安静图书馆或咖啡馆的氛围：Lofi 音乐、窗外雨声，再加一个帮你开始、也帮你坚持的番茄钟。',
    cta: '进入自习室', fine: '免费 · 无需账号 · 支持手机',
    featuresTitle: '专注所需，一应俱全',
    features: F('Lofi 音乐', '无广告的 Lofi 直播，或你自己的 YouTube 链接。', '环境白噪音', '雨声、咖啡馆、壁炉、森林、海浪，随心混合。', '番茄钟', '25 分钟专注，短休息和长休息都可调整。', '待办清单', '写下今天要做的事，并与番茄钟关联。', '动态场景', 'Lofi 小屋、夜晚海滩、冬日木屋等。', '夜晚模式', '“回家”：学习结束后放松身心的安静角落。'),
    stepsTitle: '如何使用',
    steps: [
      { title: '打开自习室', desc: '无需账号，无需下载，点一下就开始。' },
      { title: '选择氛围', desc: '场景、音乐、声音。把组合保存为“我的房间”。' },
      { title: '开始番茄钟', desc: '专注 25 分钟，休息 5 分钟，循环即可。' },
    ],
    faqTitle: '常见问题',
    faq: [
      { q: '什么是线上自习室？', a: '一个在浏览器里重现图书馆或咖啡馆氛围的空间，有音乐、环境音和专注工具，让你一个人学习也不觉得孤单。' },
      { q: '真的免费吗？', a: '是的。没有账号、没有订阅、没有隐藏费用。' },
      { q: '手机能用吗？', a: '可以，手机、平板和电脑的浏览器都能用，也可以像 App 一样添加到主屏幕。' },
      { q: '需要像 study with me 那样开摄像头吗？', a: '不需要。这是只属于你的安静房间，无需摄像头和麦克风。' },
    ],
    closing: '下一段学习时光，从这里开始。',
  },
  {
    lang: 'id', path: '/id/ruang-belajar-online', ogLocale: 'id_ID',
    metaTitle: 'Ruang Belajar Online Gratis dengan Musik Lofi dan Pomodoro',
    metaDesc: 'Ruang belajar online gratis: musik lofi, suara hujan dan kafe, timer Pomodoro, dan daftar tugas dalam satu tab. Tanpa daftar.',
    keywords: ['ruang belajar online', 'ruang belajar virtual', 'study with me', 'musik lofi untuk belajar', 'timer pomodoro online', 'website untuk belajar'],
    crumbHome: 'Beranda', crumb: 'Ruang belajar online',
    h1: 'Ruang belajar online', tagline: 'Gratis, tanpa daftar, dalam satu tab',
    intro: 'Belajar sendirian di rumah itu tidak mudah. LofiSpace menghadirkan suasana perpustakaan yang tenang atau kafe: musik lofi, suara hujan, dan timer Pomodoro yang membantumu mulai dan bertahan.',
    cta: 'Masuk ruang belajar', fine: 'Gratis · Tanpa akun · Bisa di HP',
    featuresTitle: 'Semua yang kamu butuhkan untuk fokus',
    features: F('Musik lofi', 'Siaran lofi tanpa iklan atau link YouTube pilihanmu.', 'Suara suasana', 'Campur hujan, kafe, perapian, hutan, dan laut sesukamu.', 'Pomodoro', 'Sesi 25 menit dengan istirahat pendek dan panjang yang bisa diatur.', 'Daftar tugas', 'Catat tugas hari ini dan hubungkan dengan pomodoro-mu.', 'Latar animasi', 'Kamar lofi, pantai malam, kabin musim dingin, dan lainnya.', 'Mode malam', '“Pulang”: sudut tenang untuk melepas penat setelah belajar.'),
    stepsTitle: 'Cara kerjanya',
    steps: [
      { title: 'Buka ruangan', desc: 'Tanpa akun dan unduhan. Sekali klik langsung masuk.' },
      { title: 'Pilih suasana', desc: 'Latar, musik, suara. Simpan kombinasimu sebagai “Ruanganku”.' },
      { title: 'Mulai Pomodoro', desc: '25 menit fokus, 5 menit istirahat. Ulangi.' },
    ],
    faqTitle: 'Pertanyaan umum',
    faq: [
      { q: 'Apa itu ruang belajar online?', a: 'Ruang di browser yang meniru suasana perpustakaan atau kafe, dengan musik, suara latar, dan alat fokus, supaya belajar sendiri tidak terasa sepi.' },
      { q: 'Benar-benar gratis?', a: 'Ya. Tanpa akun, tanpa langganan, tanpa biaya tersembunyi.' },
      { q: 'Bisa dipakai di HP?', a: 'Bisa, di browser HP, tablet, dan komputer. Kamu juga bisa memasangnya seperti aplikasi di layar utama.' },
      { q: 'Perlu kamera seperti “study with me”?', a: 'Tidak. Ini ruang tenang khusus untukmu, tanpa kamera dan mikrofon.' },
    ],
    closing: 'Sesi belajarmu berikutnya dimulai di sini.',
  },
  {
    lang: 'th', path: '/th/hong-an-nangsue-online', ogLocale: 'th_TH',
    metaTitle: 'ห้องอ่านหนังสือออนไลน์ ฟรี พร้อมเพลง Lofi และ Pomodoro',
    metaDesc: 'ห้องอ่านหนังสือออนไลน์ฟรี: เพลง lofi เสียงฝนและเสียงคาเฟ่ ตัวจับเวลา Pomodoro และรายการสิ่งที่ต้องทำ ในแท็บเดียว ไม่ต้องสมัคร',
    keywords: ['ห้องอ่านหนังสือออนไลน์', 'ห้องเรียนออนไลน์ อ่านหนังสือ', 'เพลงอ่านหนังสือ lofi', 'pomodoro timer', 'เว็บช่วยโฟกัส', 'study with me'],
    crumbHome: 'หน้าแรก', crumb: 'ห้องอ่านหนังสือออนไลน์',
    h1: 'ห้องอ่านหนังสือออนไลน์', tagline: 'ฟรี ไม่ต้องสมัคร ใช้ได้ในแท็บเดียว',
    intro: 'การอ่านหนังสือคนเดียวที่บ้านไม่ใช่เรื่องง่าย LofiSpace สร้างบรรยากาศเหมือนห้องสมุดเงียบ ๆ หรือคาเฟ่ ทั้งเพลง lofi เสียงฝนเบา ๆ และตัวจับเวลา Pomodoro ที่ช่วยให้เริ่มและไปต่อได้',
    cta: 'เข้าห้องอ่านหนังสือ', fine: 'ฟรี · ไม่ต้องมีบัญชี · ใช้บนมือถือได้',
    featuresTitle: 'ครบทุกอย่างที่ช่วยให้โฟกัส',
    features: F('เพลง lofi', 'สตรีม lofi ไม่มีโฆษณา หรือใส่ลิงก์ YouTube ของคุณเอง', 'เสียงบรรยากาศ', 'ผสมเสียงฝน คาเฟ่ เตาผิง ป่า และทะเลได้ตามใจ', 'Pomodoro', 'ช่วงโฟกัส 25 นาที ปรับเวลาพักสั้นและพักยาวได้', 'รายการสิ่งที่ต้องทำ', 'จดงานของวันนี้และผูกกับรอบ Pomodoro', 'ฉากเคลื่อนไหว', 'ห้อง lofi ชายหาดยามค่ำ กระท่อมฤดูหนาว และอีกมากมาย', 'โหมดยามค่ำ', '“กลับบ้าน”: มุมสงบไว้พักใจหลังอ่านหนังสือเสร็จ'),
    stepsTitle: 'วิธีใช้',
    steps: [
      { title: 'เปิดห้อง', desc: 'ไม่ต้องมีบัญชี ไม่ต้องดาวน์โหลด คลิกเดียวก็เริ่มได้' },
      { title: 'เลือกบรรยากาศ', desc: 'ฉาก เพลง และเสียง บันทึกชุดที่ชอบไว้เป็น “ห้องของฉัน”' },
      { title: 'เริ่ม Pomodoro', desc: 'โฟกัส 25 นาที พัก 5 นาที แล้วทำซ้ำ' },
    ],
    faqTitle: 'คำถามที่พบบ่อย',
    faq: [
      { q: 'ห้องอ่านหนังสือออนไลน์คืออะไร', a: 'พื้นที่บนเบราว์เซอร์ที่จำลองบรรยากาศห้องสมุดหรือคาเฟ่ มีเพลง เสียงบรรยากาศ และเครื่องมือช่วยโฟกัส ให้อ่านหนังสือคนเดียวได้โดยไม่รู้สึกเหงา' },
      { q: 'ฟรีจริงไหม', a: 'ฟรีจริง ไม่มีบัญชี ไม่มีค่าสมาชิก ไม่มีค่าใช้จ่ายแอบแฝง' },
      { q: 'ใช้บนมือถือได้ไหม', a: 'ได้ ใช้ผ่านเบราว์เซอร์บนมือถือ แท็บเล็ต และคอมพิวเตอร์ และติดตั้งเป็นแอปบนหน้าจอหลักได้ด้วย' },
      { q: 'ต้องเปิดกล้องแบบ study with me ไหม', a: 'ไม่ต้อง นี่คือห้องเงียบ ๆ สำหรับคุณคนเดียว ไม่ต้องใช้กล้องหรือไมค์' },
    ],
    closing: 'การอ่านหนังสือรอบถัดไปของคุณ เริ่มที่นี่',
  },
]

/** One hreflang cluster: the English and Vietnamese originals plus every localized page. */
export const STUDY_ROOM_HREFLANG: Record<string, string> = {
  en: `${SITE}/online-study-room`,
  vi: `${SITE}/vi/phong-hoc-online`,
  ...Object.fromEntries(STUDY_ROOM_LOCALES.map(l => [l.lang, `${SITE}${l.path}`])),
  'x-default': `${SITE}/online-study-room`,
}

export function studyRoomLocale(lang: StudyRoomLocale['lang']): StudyRoomLocale {
  return STUDY_ROOM_LOCALES.find(l => l.lang === lang)!
}

export const SITE_URL = SITE
