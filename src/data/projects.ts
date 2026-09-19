export type ProjectTone =
  | "chef"
  | "finance"
  | "fuellead"
  | "leppa"
  | "olympion";

export type ProjectSlide = {
  label: string;
  visualCode: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type FeaturedProject = {
  slug: string;
  number: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  result: string;
  technologies: readonly string[];
  href?: string;
  linkLabel?: string;
  availabilityLabel?: string;
  mediaNote?: string;
  mediaAspectRatio?: number;
  tone: ProjectTone;
  slides: readonly ProjectSlide[];
};

export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: "fuellead",
    number: "01",
    title: "FuelLead",
    kind: "Внутренняя система · B2B",
    year: "2026",
    summary:
      "Развиваю рабочее пространство для поиска клиентов топливных карт: от компаний по ОКВЭД и контактов до рассылки и ответа клиенту.",
    result:
      "Новый адаптивный интерфейс, воронка, несколько почтовых ящиков, рассылки с лимитами и паузой. Входящие, ответы и история работы с компанией — внутри приложения.",
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    href: "https://github.com/MustafaProger/FuelLead",
    linkLabel: "Смотреть код",
    mediaNote: "Экраны с демонстрационными данными",
    tone: "fuellead",
    slides: [
      {
        label: "Обзор",
        visualCode: "FL",
        src: "/projects/fuellead/overview.png",
        width: 1280,
        height: 720,
        alt: "Новый обзор FuelLead: показатели и воронка компаний на демонстрационных данных",
      },
      {
        label: "Компании",
        visualCode: "DB",
        src: "/projects/fuellead/companies.png",
        width: 1280,
        height: 720,
        alt: "Фильтры и таблица компаний FuelLead с демонстрационными контактами и статусами",
      },
      {
        label: "Переписка",
        visualCode: "MAIL",
        src: "/projects/fuellead/conversations.png",
        width: 1280,
        height: 720,
        alt: "Переписка в FuelLead: список диалогов, история писем и форма ответа на демонстрационных данных",
      },
      {
        label: "Почтовые ящики",
        visualCode: "SMTP",
        src: "/projects/fuellead/mailboxes.png",
        width: 1280,
        height: 720,
        alt: "Подключение почтовых ящиков и настройка SMTP и IMAP в новом интерфейсе FuelLead",
      },
      {
        label: "Шаблон письма",
        visualCode: "@",
        src: "/projects/fuellead/email-template.png",
        width: 1280,
        height: 720,
        alt: "Редактор персонального шаблона FuelLead с демонстрационным текстом и переменными",
      },
      {
        label: "Вход",
        visualCode: "AUTH",
        src: "/projects/fuellead/login.png",
        width: 1280,
        height: 720,
        alt: "Новый экран входа FuelLead в зелёной палитре с пустыми полями авторизации",
      },
    ],
  },
  {
    slug: "chef-choice",
    number: "02",
    title: "Chef’s Choice",
    kind: "E-commerce · ресторан",
    year: "2026",
    summary:
      "Перезапустил неудобный сайт ресторана как полноценный сервис заказа: адаптивное меню, корзина, оформление, доставка и самовывоз.",
    result:
      "Меню под управлением Strapi, онлайн-оплата через YooKassa и email-уведомления о заказах. Посетитель может выбрать блюда и оформить доставку или самовывоз на сайте.",
    technologies: ["Next.js", "Strapi", "YooKassa", "SEO"],
    href: "https://chefschoice-turk.ru/",
    linkLabel: "Открыть проект",
    tone: "chef",
    slides: [
      {
        label: "Главная",
        visualCode: "CC",
        src: "/projects/chef-choice/home.jpg",
        width: 1800,
        height: 1130,
        alt: "Главная страница сайта ресторана Chef’s Choice",
      },
      {
        label: "Каталог блюд",
        visualCode: "01",
        src: "/projects/chef-choice/catalog.jpg",
        width: 1800,
        height: 1126,
        alt: "Каталог блюд Chef’s Choice с категориями и карточками товаров",
      },
      {
        label: "Карточка блюда",
        visualCode: "02",
        src: "/projects/chef-choice/product-modal.jpg",
        width: 1800,
        height: 1112,
        alt: "Карточка блюда Chef’s Choice с выбором количества и добавлением в корзину",
      },
      {
        label: "Преимущества",
        visualCode: "03",
        src: "/projects/chef-choice/advantages.jpg",
        width: 1800,
        height: 1023,
        alt: "Раздел преимуществ ресторана Chef’s Choice",
      },
      {
        label: "Контакты",
        visualCode: "04",
        src: "/projects/chef-choice/contacts.jpg",
        width: 1800,
        height: 1086,
        alt: "Контакты ресторана Chef’s Choice и карта проезда",
      },
    ],
  },
  {
    slug: "finance",
    number: "03",
    title: "Finance",
    kind: "Собственный продукт · финтех",
    year: "2026",
    summary:
      "Спроектировал и разработал личный менеджер финансов вместо устаревших приложений с постоянной подпиской.",
    result:
      "Авторизация, операции, категории, бюджеты, сбережения и аналитика по месяцам и произвольным периодам. Использую приложение каждый день.",
    technologies: ["React", "TypeScript", "Firebase", "Recharts"],
    href: "https://github.com/MustafaProger/finance",
    linkLabel: "Смотреть код",
    tone: "finance",
    slides: [
      {
        label: "Обзор",
        visualCode: "₽",
        src: "/projects/finance/overview.jpg",
        width: 1800,
        height: 1313,
        alt: "Обзор счетов и расходов в приложении Finance",
      },
      {
        label: "Операции",
        visualCode: "+",
        src: "/projects/finance/operations.jpg",
        width: 1800,
        height: 1315,
        alt: "Операции и распределение расходов по категориям в Finance",
      },
      {
        label: "Аналитика",
        visualCode: "%",
        src: "/projects/finance/analytics.jpg",
        width: 1800,
        height: 1306,
        alt: "Аналитика категорий расходов и денежного потока в Finance",
      },
      {
        label: "Бюджеты",
        visualCode: "B",
        src: "/projects/finance/budgets.jpg",
        width: 1800,
        height: 1307,
        alt: "Бюджеты по категориям в приложении Finance",
      },
      {
        label: "Период",
        visualCode: "P",
        src: "/projects/finance/period.jpg",
        width: 1800,
        height: 1308,
        alt: "Операции Finance за выбранный период",
      },
    ],
  },
  {
    slug: "leppa-wenston",
    number: "04",
    title: "Leppa-Wenston",
    kind: "Каталог · сантехника",
    year: "2026",
    summary:
      "Разработал многостраничный каталог сантехники с управлением товарами и заявками через сайт.",
    result:
      "Связал Next.js-фронтенд со Strapi CMS и добавил серверную отправку заявок на email. Проект развёрнут и передан клиенту.",
    technologies: ["Next.js", "Strapi", "Nodemailer", "Tailwind CSS"],
    href: "https://leppa-wenston.ru/",
    linkLabel: "Открыть проект",
    tone: "leppa",
    slides: [
      {
        label: "Главная",
        visualCode: "LW",
        src: "/projects/leppa-wenston/home.jpg",
        width: 1800,
        height: 1131,
        alt: "Главная страница каталога сантехники Leppa & WenSton",
      },
      {
        label: "Каталог",
        visualCode: "01",
        src: "/projects/leppa-wenston/catalog.jpg",
        width: 1800,
        height: 1101,
        alt: "Каталог товаров Leppa & WenSton с поиском и категориями",
      },
      {
        label: "Карточка товара",
        visualCode: "02",
        src: "/projects/leppa-wenston/product.jpg",
        width: 1800,
        height: 1128,
        alt: "Карточка товара Leppa & WenSton с вариантами и добавлением в корзину",
      },
      {
        label: "Комплект",
        visualCode: "03",
        src: "/projects/leppa-wenston/bundle.jpg",
        width: 1800,
        height: 1098,
        alt: "Комплект товаров и мини-корзина Leppa & WenSton",
      },
      {
        label: "Оформление заказа",
        visualCode: "04",
        src: "/projects/leppa-wenston/checkout.jpg",
        width: 1800,
        height: 1132,
        alt: "Корзина и форма оформления заказа Leppa & WenSton",
      },
    ],
  },
  {
    slug: "olympion",
    number: "05",
    title: "Olympion Тропарёво",
    kind: "Первый заказ · спортивный клуб",
    year: "2025",
    summary:
      "Начал с задачи по SEO, а в результате переработал страницу клуба на WordPress и улучшил весь путь до заявки.",
    result:
      "Обновил стили и адаптив, настроил почту и форму заявок, создал блог и SEO-материалы. Через сайт начали приходить обращения.",
    technologies: ["WordPress", "PHP", "JavaScript", "SEO"],
    tone: "olympion",
    // Keep the landscape site screenshots large while fitting the taller SEO report.
    mediaAspectRatio: 1280 / 697,
    slides: [
      {
        label: "SEO-позиции",
        visualCode: "SEO",
        src: "/projects/olympion/seo.jpg",
        width: 1280,
        height: 1247,
        alt: "Таблица поисковых запросов для страницы спортивного клуба Olympion Тропарёво",
      },
      {
        label: "Блог",
        visualCode: "01",
        src: "/projects/olympion/blog.jpg",
        width: 1280,
        height: 697,
        alt: "Блог спортивного клуба Olympion с карточками публикаций",
      },
      {
        label: "Страница направлений",
        visualCode: "02",
        src: "/projects/olympion/directions.jpg",
        width: 1280,
        height: 696,
        alt: "Страница направлений фитнес-клуба Olympion в Тропарёво",
      },
      {
        label: "Форма заявки",
        visualCode: "03",
        src: "/projects/olympion/contact-form.jpg",
        width: 1280,
        height: 697,
        alt: "Форма записи на тренировку на сайте Olympion",
      },
    ],
  },
] as const;

export const additionalProjects = [
  {
    title: "Domstroy",
    description: "Каталог стройматериалов · React + WordPress REST API",
    year: "2026",
    href: "https://domstroy-one.vercel.app/",
  },
  {
    title: "Chaikhana Плов Центр",
    description: "Меню ресторана · WordPress + базовое SEO",
    year: "2026",
    href: "https://chaikhana-plovcenter.ru/",
  },
  {
    title: "Тёплый Мир",
    description: "Сайт-визитка инженерной компании · React + Framer Motion",
    year: "2026",
    href: "https://tepliymir-rnd.ru/",
  },
] as const;
