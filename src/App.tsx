import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code2, Menu, Search, Send, X } from "lucide-react";
import { ProjectsSection } from "./components/ProjectsSection";

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

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!glow || !hasFinePointer || prefersReducedMotion) {
      return;
    }

    let animationFrame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const renderGlow = () => {
      glow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate3d(-50%, -50%, 0)`;
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      glow.classList.add("cursor-glow--visible");

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderGlow);
      }
    };

    const hideGlow = () => glow.classList.remove("cursor-glow--visible");

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hideGlow);
    document.documentElement.addEventListener("mouseleave", hideGlow);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideGlow);
      document.documentElement.removeEventListener("mouseleave", hideGlow);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

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
      <CursorGlow />

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

        <ProjectsSection />
      </main>
    </div>
  );
}

export default App;
