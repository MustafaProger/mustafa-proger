export const site = {
  name: "Мустафа — разработчик сайтов",
  author: "Мустафа",
  url: "https://mustafa-proger.vercel.app",
  title: "Мустафа — разработка сайтов и веб-приложений",
  description:
    "Разрабатываю сайты, интернет-магазины и веб-приложения для бизнеса. Реальные проекты, понятный процесс работы и прямой контакт с разработчиком.",
  telegram: "https://t.me/mustafa_proger",
  github: "https://github.com/MustafaProger",
  image: "/social-preview.png",
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).href;
}
