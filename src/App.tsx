import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code2, Menu, Search, Send, X } from "lucide-react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ProjectsSection } from "./components/ProjectsSection";
import { CasePage, NotFoundPage } from "./components/CasePage";
import {
  AboutSection,
  ContactSection,
  FaqSection,
  ProcessSection,
  ServicesSection,
  SiteFooter,
} from "./components/SiteSections";
import { Seo } from "./components/Seo";
import { getCaseStudy } from "./data/cases";

const navigation = [
  { label: "Работы", href: "/#works" },
  { label: "Услуги", href: "/#services" },
  { label: "Обо мне", href: "/#about" },
] as const;

const services = [
  { label: "Разработка", Icon: Code2 },
  { label: "SEO", Icon: Search },
  { label: "Запуск", Icon: Send },
] as const;

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const glow = glowRef.current;
    if (
      !glow ||
      reduced ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
        glow.classList.add("cursor-glow--visible");
      });
    };
    const hide = () => glow.classList.remove("cursor-glow--visible");
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(frame);
      hide();
    };
  }, [reduced]);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

function RoutePosition() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;
    const frame = requestAnimationFrame(() => {
      let anchor = hash.slice(1);
      try {
        anchor = decodeURIComponent(anchor);
      } catch {
        /* Ignore malformed URL escapes. */
      }
      const target = anchor ? document.getElementById(anchor) : null;
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (changedPage)
          document
            .getElementById("main-content")
            ?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const reduced = useReducedMotion();
  const closeForNavigation = () => {
    dialogRef.current?.close();
    setOpen(false);
  };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActive("");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    for (const id of ["top", "works", "services", "about", "contact"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 66.01rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
      >
        <Link className="wordmark" to="/#top" aria-label="Мустафа — на главную">
          MUSTAFA<span aria-hidden="true">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              aria-current={active === item.href ? "location" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" to="/#contact">
          <span>Обсудить проект</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <motion.button
          className="menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label="Открыть меню"
          onClick={() => setOpen(true)}
          whileTap={{ scale: reduced ? 1 : 0.92 }}
        >
          <Menu aria-hidden="true" />
        </motion.button>
      </header>
      <motion.dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="navigation-dialog"
        aria-labelledby="navigation-title"
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? [-10, 0] : 0 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
        onAnimationComplete={() => {
          if (!open) dialogRef.current?.close();
        }}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const items = event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          );
          const first = items[0];
          const last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="navigation-dialog__top">
          <span id="navigation-title">Навигация</span>
          <button
            type="button"
            className="menu-button"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          {[
            ...navigation,
            { label: "Как работаю", href: "/#process" },
            { label: "Вопросы и ответы", href: "/#faq" },
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={false}
              animate={{ x: open ? [-12, 0] : 0 }}
              transition={{ delay: open && !reduced ? index * 0.035 : 0 }}
            >
              <Link to={item.href} onClick={closeForNavigation}>
                {item.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
          <Link
            className="navigation-dialog__cta"
            to="/#contact"
            onClick={closeForNavigation}
          >
            Обсудить проект
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
        <p>От задачи до работающего сайта.</p>
      </motion.dialog>
    </>
  );
}

function HomePage() {
  const reduced = useReducedMotion();
  const entrance = (delay = 0) => ({
    initial: { y: 18 },
    animate: { y: 0 },
    transition: {
      duration: reduced ? 0 : 0.7,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });
  return (
    <>
      <Seo />
      <div className="hero-layout">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span aria-hidden="true" /> Независимый веб-разработчик
            </p>
            <h1 id="hero-title">
              <motion.span {...entrance(0.04)}>Сайты для</motion.span>
              <motion.span {...entrance(0.1)}>
                <mark>бизнеса,</mark>
              </motion.span>
              <motion.span {...entrance(0.16)}>которые хочется</motion.span>
              <motion.span {...entrance(0.22)}>открывать.</motion.span>
            </h1>
            <motion.p className="hero-description" {...entrance(0.25)}>
              Создаю сайты по готовому дизайну — от разработки и базовой
              SEO-настройки до запуска.
            </motion.p>
            <motion.div className="hero-actions" {...entrance(0.3)}>
              <Link className="button button--primary" to="/#contact">
                <span>Обсудить проект</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="button button--secondary" to="/#works">
                Смотреть работы
              </Link>
            </motion.div>
            <ul className="service-list" aria-label="Направления работы">
              {services.map(({ label, Icon }) => (
                <li key={label}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.figure
            className="portrait"
            initial={{ x: 16 }}
            animate={{ x: 0 }}
            transition={{
              duration: reduced ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src="/mustafa-portrait-2026-09.jpg"
              alt="Мустафа, разработчик сайтов"
              width="640"
              height="640"
              fetchPriority="high"
            />
            <figcaption className="portrait-caption">
              <span>Мустафа</span>
              <span>Frontend · React · Next.js</span>
            </figcaption>
          </motion.figure>
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
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

function ProjectRoute() {
  const { slug = "" } = useParams();
  const study = getCaseStudy(slug);
  if (!study) return <MissingPage />;
  return (
    <>
      <Seo
        title={`${study.title} — кейс разработки | Мустафа`}
        description={study.description}
        path={`/projects/${slug}/`}
      />
      <CasePage key={slug} slug={slug} />
    </>
  );
}

function MissingPage() {
  return (
    <>
      <Seo
        title="Страница не найдена — Мустафа"
        description="Вернитесь к проектам и услугам разработчика Мустафы."
        path="/404/"
        noIndex
      />
      <NotFoundPage />
    </>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="reading-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <div className="site-shell">
        <CursorGlow />
        <RoutePosition />
        <a className="skip-link" href="#main-content">
          Перейти к содержанию
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug/" element={<ProjectRoute />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}

export default App;
