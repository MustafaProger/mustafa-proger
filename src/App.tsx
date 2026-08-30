import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Menu, Search, Send, X } from "lucide-react";

const navigation = [
  { label: "Работы", href: "#works" },
  { label: "Услуги", href: "#services" },
  { label: "Обо мне", href: "#about" },
] as const;

const services = [
  { label: "Разработка", Icon: Code2 },
  { label: "SEO", Icon: Search },
  { label: "Запуск", Icon: Send },
] as const;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const updateHeader = () => setIsHeaderScrolled(window.scrollY > 10);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Перейти к содержанию
      </a>

      <header
        className={`site-header${isHeaderScrolled && !isMenuOpen ? " site-header--scrolled" : ""}${isMenuOpen ? " site-header--open" : ""}`}
      >
        <a className="wordmark" href="#top" aria-label="Мустафа — на главную">
          MUSTAFA<span aria-hidden="true">.</span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="header-cta"
          href="https://t.me/mustafa_proger"
          target="_blank"
          rel="noreferrer"
        >
          <span>Обсудить проект</span>
          <ArrowUpRight aria-hidden="true" />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div
        className={`mobile-menu${isMenuOpen ? " mobile-menu--open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Мобильная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
              {item.label}
            </a>
          ))}
          <a
            href="https://t.me/mustafa_proger"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Обсудить проект
            <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </div>

      <main id="main-content">
        <div className="hero-layout">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span>Сайты для</span>
                <span>
                  <mark>бизнеса,</mark>
                </span>
                <span>которые хочется</span>
                <span>открывать.</span>
              </h1>

              <p className="hero-description">
                Создаю сайты по готовому дизайну — от разработки и базовой SEO‑настройки до
                запуска.
              </p>

              <div className="hero-actions" id="project-start">
                <a
                  className="button button--primary"
                  href="https://t.me/mustafa_proger"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Обсудить проект</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a className="button button--secondary" href="#works">
                  Смотреть работы
                </a>
              </div>

              <ul className="service-list" id="services" aria-label="Направления работы">
                {services.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="portrait" id="about">
              <img
                src="/mustafa-portrait.jpg"
                alt="Мустафа, разработчик сайтов"
                width="1056"
                height="1030"
                fetchPriority="high"
              />
            </figure>
          </section>

          <a
            className="contact-rail"
            href="https://t.me/mustafa_proger"
            target="_blank"
            rel="noreferrer"
            aria-label="Написать Мустафе в Telegram"
          >
            <span>ТГ: @mustafa_proger</span>
            <i aria-hidden="true" />
          </a>
        </div>

        <a className="works-preview" id="works" href="#project-start" aria-labelledby="works-heading">
          <h2 id="works-heading">Работы</h2>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </main>
    </div>
  );
}

export default App;
