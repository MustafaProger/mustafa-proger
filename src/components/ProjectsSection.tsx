import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  additionalProjects,
  featuredProjects,
  type FeaturedProject,
} from "../data/projects";

export function ProjectVisual({
  project,
}: {
  project: Pick<
    FeaturedProject,
    "number" | "title" | "tone" | "slides" | "mediaNote" | "mediaAspectRatio"
  >;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const activeSlideRef = useRef(0);
  const programmaticTargetRef = useRef<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const hasMedia = project.slides.some((slide) => Boolean(slide.src));
  const imageRatios = project.slides.flatMap((slide) =>
    slide.src && slide.width && slide.height
      ? [slide.width / slide.height]
      : [],
  );
  // Reserve one frame before loading images; changing slides must not resize it.
  const frameRatio =
    project.mediaAspectRatio ??
    (imageRatios.length > 0 ? Math.min(...imageRatios) : 1.58);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    let previousWidth = 0;
    const observer = new ResizeObserver(() => {
      const width = track.clientWidth;

      if (width === 0 || width === previousWidth) {
        return;
      }

      previousWidth = width;
      const index = Math.min(activeSlideRef.current, project.slides.length - 1);
      activeSlideRef.current = index;
      setActiveSlide(index);
      programmaticTargetRef.current = null;
      dragStateRef.current.isDragging = false;
      delete track.dataset.dragging;
      track.scrollTo({ left: index * width, behavior: "instant" });
    });

    observer.observe(track);
    return () => observer.disconnect();
  }, [project.slides.length]);

  const selectSlide = (index: number) => {
    activeSlideRef.current = index;
    setActiveSlide(index);
  };

  const showSlide = (index: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const normalizedIndex =
      (index + project.slides.length) % project.slides.length;
    programmaticTargetRef.current = normalizedIndex;
    selectSlide(normalizedIndex);
    track.scrollTo({
      left: normalizedIndex * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const updateActiveSlide = () => {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const programmaticTarget = programmaticTargetRef.current;

    if (programmaticTarget !== null) {
      const targetScrollLeft = programmaticTarget * track.clientWidth;
      const reachedTarget = Math.abs(track.scrollLeft - targetScrollLeft) <= 2;

      if (reachedTarget) {
        programmaticTargetRef.current = null;
      }

      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    selectSlide(Math.min(project.slides.length - 1, Math.max(0, nextIndex)));
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = event.currentTarget;

    if (!dragStateRef.current.isDragging) {
      return;
    }

    dragStateRef.current.isDragging = false;
    delete track.dataset.dragging;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    if (track.clientWidth > 0) {
      showSlide(Math.round(track.scrollLeft / track.clientWidth));
    }
  };

  return (
    <div
      className={`project-visual project-visual--${project.tone}${hasMedia ? " project-visual--media" : ""}`}
      style={{ "--project-image-ratio": frameRatio } as CSSProperties}
      role="region"
      aria-roledescription="карусель"
      aria-label={`Изображения проекта ${project.title}`}
    >
      <div
        ref={trackRef}
        className="project-carousel__track"
        tabIndex={0}
        onScroll={updateActiveSlide}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) {
            return;
          }

          programmaticTargetRef.current = null;
          dragStateRef.current = {
            isDragging: true,
            startX: event.clientX,
            startScrollLeft: event.currentTarget.scrollLeft,
          };
          event.currentTarget.dataset.dragging = "true";
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onWheel={() => {
          programmaticTargetRef.current = null;
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current.isDragging) {
            return;
          }

          const distance = event.clientX - dragStateRef.current.startX;
          event.currentTarget.scrollLeft =
            dragStateRef.current.startScrollLeft - distance;
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showSlide(activeSlideRef.current - 1);
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            showSlide(activeSlideRef.current + 1);
          }
        }}
      >
        {project.slides.map((slide, index) => (
          <div
            className="project-carousel__slide"
            key={slide.label}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${index + 1} из ${project.slides.length}: ${slide.label}`}
            aria-hidden={index !== activeSlide}
          >
            {slide.src ? (
              <img
                src={slide.src}
                alt={slide.alt ?? `${project.title} — ${slide.label}`}
                width={slide.width}
                height={slide.height}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ) : (
              <div className="project-visual__frame" aria-hidden="true">
                <div className="project-visual__bar">
                  <span />
                  <span>
                    PREVIEW / {project.number}.{index + 1}
                  </span>
                </div>
                <strong>{slide.visualCode}</strong>
                <div className="project-visual__footer">
                  <span>{slide.label}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="project-carousel__caption" aria-hidden="true">
        {project.slides.map((slide, index) => (
          <span key={slide.label} data-active={index === activeSlide}>
            {slide.label}
          </span>
        ))}
      </p>
      <div className="project-carousel__controls">
        <button
          type="button"
          aria-label={`Предыдущее изображение проекта ${project.title}`}
          onClick={() => showSlide(activeSlideRef.current - 1)}
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <span aria-live="polite">
          {String(activeSlide + 1).padStart(2, "0")} /{" "}
          {String(project.slides.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label={`Следующее изображение проекта ${project.title}`}
          onClick={() => showSlide(activeSlideRef.current + 1)}
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      {project.mediaNote && (
        <p className="project-carousel__note">{project.mediaNote}</p>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      initial={false}
      whileInView={{ y: reduceMotion ? 0 : [28, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{project.number}</span>
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>

        <div className="project-card__result">
          <span>Что получилось</span>
          <p>{project.result}</p>
        </div>

        <ul
          className="project-card__stack"
          aria-label={`Технологии проекта ${project.title}`}
        >
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="project-card__actions">
          <Link
            className="project-card__link project-card__link--case"
            to={`/projects/${project.slug}/`}
          >
            <span>Разобрать кейс</span>
            <ArrowRight aria-hidden="true" />
          </Link>
          {project.href ? (
            <a
              className="project-card__link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <span>{project.linkLabel}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : (
            <p className="project-card__availability">
              {project.availabilityLabel ?? "Скриншоты проекта — внутри кейса"}
            </p>
          )}
        </div>
      </div>

      <ProjectVisual project={project} />
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section
      className="works-section"
      id="works"
      aria-labelledby="works-heading"
    >
      <header className="works-section__header">
        <div className="works-section__intro">
          <h2 id="works-heading">Работы</h2>
          <p>
            От первого коммерческого заказа до собственных продуктов и сервисов
            для бизнеса.
          </p>
        </div>

        <dl className="works-proof" aria-label="Проекты в портфолио">
          <div>
            <dt>{featuredProjects.length}</dt>
            <dd>подробных кейсов</dd>
          </div>
          <div>
            <dt>
              {featuredProjects.reduce(
                (count, project) => count + project.slides.length,
                0,
              )}
            </dt>
            <dd>экранов проектов</dd>
          </div>
          <div>
            <dt>{additionalProjects.length}</dt>
            <dd>другие работы</dd>
          </div>
        </dl>
      </header>

      <div className="project-list">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="additional-projects">
        <div className="additional-projects__heading">
          <h3>Другие коммерческие работы</h3>
          <p>
            Более компактные сайты и каталоги, разработанные под задачи малого
            бизнеса.
          </p>
        </div>

        <ul>
          {additionalProjects.map((project) => (
            <li key={project.title}>
              <a
                className="additional-projects__link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="additional-projects__details">
                  <span className="additional-projects__year">
                    {project.year}
                  </span>
                  <strong>{project.title}</strong>
                  <span className="additional-projects__description">
                    {project.description}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
