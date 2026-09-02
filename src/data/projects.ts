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
};

export type FeaturedProject = {
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
  tone: ProjectTone;
  slides: readonly ProjectSlide[];
};

export const featuredProjects: readonly FeaturedProject[] = [
  {
    number: "01",
    title: "FuelLead",
    kind: "Внутренний MVP · B2B",
    year: "2026",
    summary:
      "Создал внутренний инструмент для поиска компаний с нужными ОКВЭД и подготовки персональных обращений.",
    result:
      "Объединил Checko и API-ФНС, дедупликацию в PostgreSQL, карточки компаний, контакты, XLSX-экспорт и работу с Gmail OAuth.",
    technologies: ["React", "FastAPI", "PostgreSQL", "Docker"],
    href: "https://github.com/MustafaProger/FuelLead",
    linkLabel: "Смотреть код",
    tone: "fuellead",
    slides: [
      {
        label: "Обзор",
        visualCode: "FL",
        src: "/projects/fuellead/overview.png",
        alt: "Обзор воронки компаний и статистики рассылок в FuelLead",
      },
      {
        label: "Рассылка",
        visualCode: "SEND",
        src: "/projects/fuellead/outreach.png",
        alt: "Прогресс автоматической очереди отправки писем в FuelLead",
      },
      {
        label: "Компании",
        visualCode: "DB",
        src: "/projects/fuellead/companies.png",
        alt: "Таблица найденных компаний с контактами и статусами в FuelLead",
      },
      {
        label: "Шаблон письма",
        visualCode: "@",
        src: "/projects/fuellead/email-template.png",
        alt: "Редактор шаблона персонального письма в FuelLead",
      },
    ],
  },
  {
    number: "02",
    title: "Chef’s Choice",
    kind: "E-commerce · ресторан",
    year: "2026",
    summary:
      "Перезапустил неудобный сайт ресторана как полноценный сервис заказа: адаптивное меню, корзина, оформление, доставка и самовывоз.",
    result:
      "Интегрировал Strapi, YooKassa и email-уведомления. По данным клиента, менее чем за неделю продвижения сайт принёс 65 000+ ₽ выручки.",
    technologies: ["Next.js", "Strapi", "YooKassa", "SEO"],
    href: "https://chefschoice-turk.ru/",
    linkLabel: "Открыть проект",
    tone: "chef",
    slides: [
      {
        label: "Главная",
        visualCode: "CC",
        src: "/projects/chef-choice/home.jpg",
        alt: "Главная страница сайта ресторана Chef’s Choice",
      },
      {
        label: "Каталог блюд",
        visualCode: "01",
        src: "/projects/chef-choice/catalog.jpg",
        alt: "Каталог блюд Chef’s Choice с категориями и карточками товаров",
      },
      {
        label: "Карточка блюда",
        visualCode: "02",
        src: "/projects/chef-choice/product-modal.jpg",
        alt: "Карточка блюда Chef’s Choice с выбором количества и добавлением в корзину",
      },
      {
        label: "Преимущества",
        visualCode: "03",
        src: "/projects/chef-choice/advantages.jpg",
        alt: "Раздел преимуществ ресторана Chef’s Choice",
      },
      {
        label: "Контакты",
        visualCode: "04",
        src: "/projects/chef-choice/contacts.jpg",
        alt: "Контакты ресторана Chef’s Choice и карта проезда",
      },
    ],
  },
  {
    number: "03",
    title: "Finance",
    kind: "Собственный продукт · финтех",
    year: "2026",
    summary:
      "Спроектировал и разработал личный менеджер финансов вместо устаревших приложений с постоянной подпиской.",
    result:
      "Авторизация, операции, категории, бюджеты, сбережения и аналитика по месяцам и произвольным периодам. Использую приложение каждый день.",
    technologies: ["React", "TypeScript", "Firebase", "Recharts"],
    availabilityLabel: "Личный проект — публичная ссылка не размещена",
    tone: "finance",
    slides: [
      {
        label: "Обзор",
        visualCode: "₽",
        src: "/projects/finance/overview.jpg",
        alt: "Обзор счетов и расходов в приложении Finance",
      },
      {
        label: "Операции",
        visualCode: "+",
        src: "/projects/finance/operations.jpg",
        alt: "Операции и распределение расходов по категориям в Finance",
      },
      {
        label: "Аналитика",
        visualCode: "%",
        src: "/projects/finance/analytics.jpg",
        alt: "Аналитика категорий расходов и денежного потока в Finance",
      },
      {
        label: "Бюджеты",
        visualCode: "B",
        src: "/projects/finance/budgets.jpg",
        alt: "Бюджеты по категориям в приложении Finance",
      },
      {
        label: "Период",
        visualCode: "P",
        src: "/projects/finance/period.jpg",
        alt: "Операции Finance за выбранный период",
      },
    ],
  },
  {
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
        alt: "Главная страница каталога сантехники Leppa & WenSton",
      },
      {
        label: "Каталог",
        visualCode: "01",
        src: "/projects/leppa-wenston/catalog.jpg",
        alt: "Каталог товаров Leppa & WenSton с поиском и категориями",
      },
      {
        label: "Карточка товара",
        visualCode: "02",
        src: "/projects/leppa-wenston/product.jpg",
        alt: "Карточка товара Leppa & WenSton с вариантами и добавлением в корзину",
      },
      {
        label: "Комплект",
        visualCode: "03",
        src: "/projects/leppa-wenston/bundle.jpg",
        alt: "Комплект товаров и мини-корзина Leppa & WenSton",
      },
      {
        label: "Оформление заказа",
        visualCode: "04",
        src: "/projects/leppa-wenston/checkout.jpg",
        alt: "Корзина и форма оформления заказа Leppa & WenSton",
      },
    ],
  },
  {
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
    slides: [
      {
        label: "SEO-позиции",
        visualCode: "SEO",
        src: "/projects/olympion/seo.jpg",
        alt: "Таблица поисковых запросов для страницы спортивного клуба Olympion Тропарёво",
      },
      {
        label: "Блог",
        visualCode: "01",
        src: "/projects/olympion/blog.jpg",
        alt: "Блог спортивного клуба Olympion с карточками публикаций",
      },
      {
        label: "Страница направлений",
        visualCode: "02",
        src: "/projects/olympion/directions.jpg",
        alt: "Страница направлений фитнес-клуба Olympion в Тропарёво",
      },
      {
        label: "Форма заявки",
        visualCode: "03",
        src: "/projects/olympion/contact-form.jpg",
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
