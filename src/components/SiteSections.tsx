import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Layers3,
  Plus,
  Send,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../sections.css";

const telegramUrl = "https://t.me/mustafa_proger";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ y: reducedMotion ? 0 : [18, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  number,
  label,
  id,
  title,
  description,
}: {
  number: string;
  label: string;
  id: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="ss-heading">
      <div>
        <p className="ss-eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
      {description && <p className="ss-heading__description">{description}</p>}
    </Reveal>
  );
}

const serviceItems = [
  {
    number: "01",
    Icon: Code2,
    title: "Сайты для бизнеса",
    description:
      "От первого экрана до страницы контактов — сайт, на котором легко понять ваше предложение и сделать следующий шаг.",
    features: [
      "Разработка по вашему дизайну",
      "Адаптация для телефона и компьютера",
      "Формы, базовая SEO-настройка и запуск",
    ],
    example: "Опыт: Olympion",
  },
  {
    number: "02",
    Icon: ShoppingBag,
    title: "Каталоги и магазины",
    description:
      "Помогаю показать ассортимент и выстроить путь от выбора товара до заявки или оформленного заказа.",
    features: [
      "Каталог, поиск и карточки товаров",
      "CMS для управления содержимым",
      "Корзина, оплата и уведомления",
    ],
    example: "Опыт: Chef’s Choice, Leppa-Wenston",
  },
  {
    number: "03",
    Icon: Layers3,
    title: "Веб-приложения",
    description:
      "Интерфейсы для задач, которые не помещаются в обычный сайт: работа с клиентами, данными и внутренними процессами.",
    features: [
      "Кабинеты, таблицы и фильтры",
      "Подключение API и авторизации",
      "Доработка существующего интерфейса",
    ],
    example: "Опыт: FuelLead, Finance",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      className="ss-section"
      id="services"
      aria-labelledby="services-title"
    >
      <SectionHeading
        number="02"
        label="Чем могу помочь"
        id="services-title"
        title={
          <>
            От идеи
            <br />к работающему сайту.
          </>
        }
        description="Подключусь к новому проекту или помогу довести до ума существующий. Объём работы, стоимость и сроки определим после знакомства с задачей."
      />
      <div className="ss-services">
        {serviceItems.map(
          ({ number, Icon, title, description, features, example }, index) => (
            <Reveal key={number} className="ss-service" delay={index * 0.06}>
              <div className="ss-service__top">
                <Icon aria-hidden="true" />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="ss-service__bottom">
                <span>{example}</span>
                <a href="#contact" aria-label={`Обсудить услугу «${title}»`}>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ),
        )}
      </div>
      <Reveal className="ss-section-note">
        <span className="ss-dot" aria-hidden="true" />
        Есть готовый макет или сайт, который нужно доработать? Начнём с него.
        <a href="#contact">
          Обсудить задачу <ArrowUpRight aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}

const processItems = [
  {
    title: "Разбираемся в задаче",
    text: "Обсуждаем, для кого сайт, что он должен делать и что уже есть: макеты, контент, домен или работающий проект.",
    result: "Понятная задача",
  },
  {
    title: "Согласуем план",
    text: "Фиксируем страницы, функции и интеграции. Договариваемся об этапах, стоимости и сроках до начала разработки.",
    result: "Объём и этапы работы",
  },
  {
    title: "Собираем и проверяем",
    text: "Показываю промежуточный результат. Проверяем адаптивность, формы, навигацию и основные сценарии на тестовой версии.",
    result: "Проект, который можно проверить",
  },
  {
    title: "Запускаем и передаём",
    text: "Размещаем сайт, подключаем домен и проверяем работу после запуска. Передаю исходники и объясняю, как обновлять содержимое.",
    result: "Работающий сайт и исходники",
  },
] as const;

export function ProcessSection() {
  return (
    <section
      className="ss-section ss-process-section"
      id="process"
      aria-labelledby="process-title"
    >
      <SectionHeading
        number="03"
        label="Процесс"
        id="process-title"
        title={
          <>
            Понятно на
            <br />
            каждом этапе.
          </>
        }
        description="Вы видите, как движется проект, и можете проверить результат до запуска."
      />
      <ol className="ss-process">
        {processItems.map(({ title, text, result }, index) => (
          <li key={title}>
            <Reveal delay={index * 0.06}>
              <span className="ss-process__number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="ss-process__result">
                <Check aria-hidden="true" />
                {result}
              </span>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="ss-section" id="about" aria-labelledby="about-title">
      <SectionHeading
        number="04"
        label="Обо мне"
        id="about-title"
        title={
          <>
            Привет,
            <br />я Мустафа.
          </>
        }
      />
      <div className="ss-about">
        <Reveal className="ss-about__copy">
          <p className="ss-about__lead">
            Frontend-разработчик. Превращаю макеты и бизнес-задачи в интерфейсы,
            которыми удобно пользоваться.
          </p>
          <p>
            Работаю с React, Next.js и TypeScript: создаю адаптивные сайты,
            подключаю CMS и API, настраиваю базовое SEO и помогаю с размещением
            проекта.
          </p>
          <p>
            В портфолио — ресторанный сервис заказов, каталоги и собственные
            приложения. Мне интересно не только собрать экран, но и понять весь
            путь пользователя: от первого открытия до нужного действия.
          </p>
          <p>
            Использую AI-инструменты в разработке, в том числе для сложных
            серверных задач. Проверяю полученный код и работу интеграций;
            серверную часть и её ограничения обсуждаю отдельно.
          </p>
          <a
            className="ss-text-link"
            href="https://github.com/MustafaProger"
            target="_blank"
            rel="noreferrer"
          >
            Посмотреть код на GitHub <ArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal className="ss-toolkit" delay={0.08}>
          <div className="ss-toolkit__top">
            <span className="ss-dot" aria-hidden="true" />
            <span>ИНСТРУМЕНТЫ ПОД ЗАДАЧУ</span>
            <Code2 aria-hidden="true" />
          </div>
          <p className="ss-toolkit__statement">
            Хороший интерфейс.
            <br />
            <span>Работающие детали.</span>
          </p>
          <dl>
            <div>
              <dt>Интерфейс</dt>
              <dd>React · Next.js · TypeScript</dd>
            </div>
            <div>
              <dt>Контент и данные</dt>
              <dd>Strapi · REST API · Firebase</dd>
            </div>
            <div>
              <dt>Взаимодействие</dt>
              <dd>Адаптивность · формы · анимация</dd>
            </div>
            <div>
              <dt>Запуск</dt>
              <dd>Git · хостинг · базовое SEO</dd>
            </div>
          </dl>
          <a href="#works">
            Как это работает в проектах <ArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: "Сколько стоит разработка?",
    answer:
      "Стоимость зависит от количества страниц, готовности дизайна, логики и интеграций. Пришлите описание задачи, макеты или пример сайта. После обсуждения смогу предложить объём работ и оценку — до начала разработки.",
  },
  {
    question: "Какие сроки нужны на проект?",
    answer:
      "Сроки определяем после разбора задачи. На них влияют объём разработки, готовность материалов и внешние интеграции. Для большого проекта можно согласовать первый рабочий запуск, а остальные функции добавлять поэтапно.",
  },
  {
    question: "Можно обратиться без готового дизайна?",
    answer:
      "Да, начнём с целей, примеров и структуры будущего сайта. Моя основная специализация — разработка интерфейсов. Если проекту нужен отдельный этап дизайна, обсудим его и определим, какие макеты понадобятся.",
  },
  {
    question: "Смогу ли я сам менять тексты и товары?",
    answer:
      "Да, если это входит в задачу, подключим CMS — например, Strapi. Заранее определим, какие разделы вы будете редактировать. При передаче проекта покажу, как обновлять тексты, изображения или каталог.",
  },
  {
    question: "Можно доработать уже существующий сайт?",
    answer:
      "Да. Сначала посмотрю на сайт, код и текущую задачу: что нужно исправить, добавить или ускорить. После этого обсудим точечные изменения или более крупную переработку, если она необходима.",
  },
  {
    question: "Что будет после запуска?",
    answer:
      "Передам исходники и необходимые инструкции по проекту. Дальнейшую поддержку, обновления и новые функции можно обсудить отдельно. Условия сопровождения согласуем под вашу задачу.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="ss-section ss-faq-section"
      id="faq"
      aria-labelledby="faq-title"
    >
      <SectionHeading
        number="05"
        label="Частые вопросы"
        id="faq-title"
        title={
          <>
            До начала
            <br />
            работы.
          </>
        }
        description="Несколько ответов, чтобы проще было сделать первый шаг."
      />
      <div className="ss-faq">
        {faqItems.map(({ question, answer }, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              className={`ss-faq__item${isOpen ? " ss-faq__item--open" : ""}`}
              key={question}
            >
              <h3>
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{question}</span>
                  <motion.span
                    className="ss-faq__icon"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  >
                    <Plus aria-hidden="true" />
                  </motion.span>
                </button>
              </h3>
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                aria-hidden={!isOpen}
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.24 }}
                className="ss-faq__answer"
              >
                <p>{answer}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ContactSection() {
  const [projectType, setProjectType] = useState("Сайт для бизнеса");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [timeline, setTimeline] = useState("");
  const [brief, setBrief] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const previewHeadingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (brief) previewHeadingRef.current?.focus({ preventScroll: true });
  }, [brief]);

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const descriptionField = event.currentTarget.elements.namedItem(
      "project-details",
    ) as HTMLTextAreaElement;
    if (!details.trim()) {
      descriptionField.setCustomValidity("Коротко опишите задачу.");
      descriptionField.reportValidity();
      return;
    }
    setBrief(
      [
        `Привет, Мустафа!${name.trim() ? ` Меня зовут ${name.trim()}.` : ""} Хочу обсудить проект.`,
        `Тип проекта: ${projectType}.`,
        `Задача: ${details.trim()}`,
        timeline.trim() ? `Желаемые сроки: ${timeline.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    );
    setCopyStatus("");
  }

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("Текст скопирован. Вставьте его в переписку в Telegram.");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setCopyStatus(
        "Не удалось скопировать автоматически. Текст выделен — скопируйте его вручную.",
      );
    }
  }

  return (
    <section
      className="ss-section ss-contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="ss-contact">
        <Reveal className="ss-contact__intro">
          <p className="ss-eyebrow">
            <span>06</span> Давайте знакомиться
          </p>
          <h2 id="contact-title">
            Ваш следующий
            <br />
            проект
            <br />
            <span>начинается здесь.</span>
          </h2>
          <p>
            Расскажите, что хотите сделать. Можно начать с пары предложений,
            ссылки на сайт или готового макета.
          </p>
          <a
            className="ss-contact__telegram"
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Send aria-hidden="true" />
            <span>
              <small>Написать напрямую</small>@mustafa_proger
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <p className="ss-contact__note">
            Или соберите короткий бриф рядом — он поможет начать разговор.
          </p>
        </Reveal>
        <Reveal className="ss-brief" delay={0.08}>
          <div className="ss-brief__header">
            <h3>Пара слов о проекте</h3>
            <span>БРИФ</span>
          </div>
          <form
            onSubmit={prepareBrief}
            onChange={() => {
              setBrief(null);
              setCopyStatus("");
            }}
          >
            <div className="ss-form-row">
              <label htmlFor="project-name">
                Как к вам обращаться <span>необязательно</span>
                <input
                  id="project-name"
                  name="name"
                  autoComplete="given-name"
                  placeholder="Ваше имя"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label htmlFor="project-type">
                Что нужно сделать
                <select
                  id="project-type"
                  name="project-type"
                  value={projectType}
                  onChange={(event) => setProjectType(event.target.value)}
                >
                  <option>Сайт для бизнеса</option>
                  <option>Каталог или магазин</option>
                  <option>Веб-приложение</option>
                  <option>Доработать сайт</option>
                  <option>Хочу обсудить идею</option>
                </select>
              </label>
            </div>
            <label htmlFor="project-details">
              О задаче <span>обязательно</span>
              <textarea
                id="project-details"
                name="project-details"
                required
                rows={4}
                maxLength={1500}
                placeholder="Для кого проект, какие функции нужны, есть ли дизайн?"
                value={details}
                onChange={(event) => {
                  event.target.setCustomValidity("");
                  setDetails(event.target.value);
                }}
              />
            </label>
            <label htmlFor="project-timeline">
              Желаемые сроки <span>необязательно</span>
              <input
                id="project-timeline"
                name="project-timeline"
                placeholder="Например: в течение месяца или пока не определились"
                maxLength={120}
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
              />
            </label>
            <button className="ss-button ss-button--dark" type="submit">
              Подготовить сообщение <ArrowUpRight aria-hidden="true" />
            </button>
            <p className="ss-form-note">
              Форма подготовит текст. Сообщение отправится, только когда вы сами
              отправите его в Telegram.
            </p>
          </form>
          <AnimatePresence>
            {brief && (
              <motion.div
                className="ss-brief-preview"
                initial={{
                  opacity: reducedMotion ? 1 : 0,
                  y: reducedMotion ? 0 : 8,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
              >
                <h4 ref={previewHeadingRef} tabIndex={-1}>
                  Сообщение готово к проверке
                </h4>
                <label className="ss-sr-only" htmlFor="brief-preview">
                  Текст сообщения
                </label>
                <textarea
                  id="brief-preview"
                  ref={previewRef}
                  readOnly
                  rows={7}
                  value={brief}
                />
                <div className="ss-brief-preview__actions">
                  <a
                    className="ss-button ss-button--lime"
                    href={`${telegramUrl}?text=${encodeURIComponent(brief)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть Telegram <ArrowUpRight aria-hidden="true" />
                  </a>
                  <button
                    className="ss-copy-button"
                    type="button"
                    onClick={copyBrief}
                  >
                    <Copy aria-hidden="true" />
                    Скопировать
                  </button>
                </div>
                <p className="ss-form-note">
                  Если Telegram не подставил текст, скопируйте его и вставьте в
                  чат.
                </p>
                <p className="ss-copy-status" role="status">
                  {copyStatus}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="ss-footer">
      <Link
        className="wordmark"
        to="/#top"
        aria-label="Мустафа — вернуться в начало"
      >
        MUSTAFA<span aria-hidden="true">.</span>
      </Link>
      <p>
        © {new Date().getFullYear()} Мустафа.
        <br />
        Разработка сайтов и интерфейсов.
      </p>
      <nav aria-label="Навигация в подвале">
        <Link to="/#works">Работы</Link>
        <Link to="/#services">Услуги</Link>
        <Link to="/#contact">Контакты</Link>
        <a href={telegramUrl} target="_blank" rel="noreferrer">
          Telegram <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://github.com/MustafaProger"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
      <Link
        className="ss-back-top"
        to="/#top"
        aria-label="Вернуться в начало страницы"
      >
        <ArrowUp aria-hidden="true" />
      </Link>
    </footer>
  );
}
