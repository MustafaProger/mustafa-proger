import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies, getCaseStudy } from "../data/cases";
import { ProjectVisual } from "./ProjectsSection";
import "../cases.css";

export function CasePage({ slug }: { slug: string }) {
  const reduceMotion = useReducedMotion();
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return <NotFoundPage />;
  }

  const { project } = caseStudy;
  const currentIndex = caseStudies.indexOf(caseStudy);
  const relatedCases = [1, 2].map(
    (offset) => caseStudies[(currentIndex + offset) % caseStudies.length],
  );
  const reveal = {
    initial: false as const,
    whileInView: { y: reduceMotion ? 0 : [24, 0] },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <article className={`case-page case-page--${project.tone}`}>
      <nav className="case-breadcrumb" aria-label="Хлебные крошки">
        <Link to="/#works">
          <ArrowLeft aria-hidden="true" /> Все работы
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <motion.header className="case-hero" {...reveal}>
        <div className="case-eyebrow">
          <span>Кейс {project.number}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="case-hero__headline">{caseStudy.headline}</p>
        <div className="case-hero__bottom">
          <p>{project.kind}</p>
          <a className="case-text-link" href="#case-screens">
            К экранам проекта <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </motion.header>

      <motion.section
        className="case-brief"
        aria-label="Задача и роль"
        {...reveal}
      >
        <div>
          <span className="case-section-label">01 / Контекст</span>
          <h2>Задача</h2>
          <p>{caseStudy.task}</p>
        </div>
        <div>
          <span className="case-section-label">02 / Участие</span>
          <h2>Моя роль</h2>
          <p>{caseStudy.role}</p>
          {caseStudy.scopeNote && (
            <p className="case-scope-note">{caseStudy.scopeNote}</p>
          )}
        </div>
      </motion.section>

      <motion.section
        className="case-gallery"
        id="case-screens"
        aria-labelledby="case-screens-heading"
        {...reveal}
      >
        <div className="case-section-heading">
          <div>
            <span className="case-section-label">03 / Интерфейс</span>
            <h2 id="case-screens-heading">Продукт в деталях</h2>
          </div>
          <p>Листайте экраны стрелками или свайпом.</p>
        </div>
        <ProjectVisual key={project.slug} project={project} />
      </motion.section>

      <section
        className="case-decisions"
        aria-labelledby="case-decisions-heading"
      >
        <div className="case-section-heading">
          <div>
            <span className="case-section-label">04 / Реализация</span>
            <h2 id="case-decisions-heading">Ключевые решения</h2>
          </div>
        </div>
        <div className="case-decisions__list">
          {caseStudy.decisions.map((decision, index) => (
            <motion.div
              className="case-decision"
              key={decision.title}
              {...reveal}
            >
              <span className="case-decision__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{decision.title}</h3>
              <p>{decision.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className="case-outcome"
        aria-labelledby="case-outcome-heading"
        {...reveal}
      >
        <div>
          <span className="case-section-label">05 / Результат</span>
          <h2 id="case-outcome-heading">Что получилось</h2>
          <p>{caseStudy.outcome}</p>
          {project.href && (
            <a
              className="case-button case-button--dark"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.linkLabel}
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
        <div className="case-stack">
          <h3>Технологии проекта</h3>
          <ul>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        className="case-contact"
        aria-labelledby="case-contact-heading"
        {...reveal}
      >
        <span className="case-section-label">Следующий проект — ваш</span>
        <h2 id="case-contact-heading">Есть похожая задача?</h2>
        <p>
          Расскажите, что нужно сделать. Обсудим сценарии, объём работы и
          следующий шаг.
        </p>
        <Link className="case-button case-button--dark" to="/#contact">
          Обсудить проект
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </motion.section>

      <section className="case-related" aria-labelledby="case-related-heading">
        <div className="case-section-heading">
          <h2 id="case-related-heading">Ещё два проекта</h2>
          <Link className="case-text-link" to="/#works">
            Все работы
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="case-related__grid">
          {relatedCases.map((related) => (
            <Link
              className="case-related__link"
              key={related.slug}
              to={`/projects/${related.slug}/`}
            >
              <div
                className={`case-related__image case-related__image--${related.project.tone}`}
              >
                <img
                  src={related.project.slides[0].src}
                  alt=""
                  width={related.project.slides[0].width}
                  height={related.project.slides[0].height}
                  loading="lazy"
                />
              </div>
              <div className="case-related__caption">
                <div>
                  <span>{related.project.kind}</span>
                  <h3>{related.title}</h3>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

export function NotFoundPage() {
  return (
    <section className="case-not-found" aria-labelledby="not-found-heading">
      <span className="case-section-label">404 / Страница не найдена</span>
      <h1 id="not-found-heading">
        Кажется, здесь
        <br />
        пока пусто.
      </h1>
      <p>
        Возможно, в адресе опечатка. Все проекты и способы связаться со мной
        есть на главной.
      </p>
      <Link className="case-button case-button--dark" to="/">
        На главную
        <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}
