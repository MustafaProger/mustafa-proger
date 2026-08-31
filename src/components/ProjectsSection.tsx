import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  additionalProjects,
  featuredProjects,
  type FeaturedProject,
} from "../data/projects";

function ProjectVisual({
  project,
}: {
  project: Pick<FeaturedProject, "number" | "title" | "tone" | "slides">;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const hasMedia = project.slides.some((slide) => Boolean(slide.src));

  const showSlide = (index: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const normalizedIndex = (index + project.slides.length) % project.slides.length;
    track.scrollTo({
      left: normalizedIndex * track.clientWidth,
      behavior: "smooth",
    });
    setActiveSlide(normalizedIndex);
  };

  const updateActiveSlide = () => {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveSlide(Math.min(project.slides.length - 1, Math.max(0, nextIndex)));
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

          dragStateRef.current = {
            isDragging: true,
            startX: event.clientX,
            startScrollLeft: event.currentTarget.scrollLeft,
          };
          event.currentTarget.dataset.dragging = "true";
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current.isDragging) {
            return;
          }

          const distance = event.clientX - dragStateRef.current.startX;
          event.currentTarget.scrollLeft = dragStateRef.current.startScrollLeft - distance;
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showSlide(activeSlide - 1);
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            showSlide(activeSlide + 1);
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
          >
            {slide.src ? (
              <img
                src={slide.src}
                alt={slide.alt ?? `${project.title} — ${slide.label}`}
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

      <div className="project-carousel__controls">
        <button
          type="button"
          aria-label={`Предыдущее изображение проекта ${project.title}`}
          onClick={() => showSlide(activeSlide - 1)}
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <span aria-live="polite">
          {String(activeSlide + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label={`Следующее изображение проекта ${project.title}`}
          onClick={() => showSlide(activeSlide + 1)}
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="project-card">
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

        <ul className="project-card__stack" aria-label={`Технологии проекта ${project.title}`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

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
            {project.availabilityLabel ?? "Сайт клиента сейчас не опубликован"}
          </p>
        )}
      </div>

      <ProjectVisual project={project} />
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section className="works-section" id="works" aria-labelledby="works-heading">
      <header className="works-section__header">
        <div className="works-section__intro">
          <h2 id="works-heading">Работы</h2>
          <p>
            От первого коммерческого заказа до собственных продуктов и сервисов для бизнеса.
          </p>
        </div>

        <dl className="works-proof" aria-label="Опыт в цифрах">
          <div>
            <dt>3+</dt>
            <dd>года в разработке</dd>
          </div>
          <div>
            <dt>7</dt>
            <dd>завершённых заказов</dd>
          </div>
          <div>
            <dt>20+</dt>
            <dd>проектов общей сложности</dd>
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
          <p>Более компактные сайты и каталоги, разработанные под задачи малого бизнеса.</p>
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
                <span className="additional-projects__year">{project.year}</span>
                <strong>{project.title}</strong>
                <span className="additional-projects__description">{project.description}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
