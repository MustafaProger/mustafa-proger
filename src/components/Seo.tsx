import { absoluteUrl, site } from "../data/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/** React 19 hoists these tags into <head>, including during static rendering. */
export function Seo({
  title = site.title,
  description = site.description,
  path = "/",
  image = site.image,
  noIndex = false,
}: SeoProps) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const isHome = path === "/";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.author,
        url: `${site.url}/`,
        jobTitle: "Веб-разработчик",
        image: absoluteUrl("/mustafa-portrait.jpg"),
        sameAs: [site.telegram, site.github],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        inLanguage: "ru-RU",
        author: { "@id": `${site.url}/#person` },
      },
      {
        "@type": isHome ? "ProfilePage" : "WebPage",
        "@id": `${canonical}#webpage`,
        name: title,
        description,
        url: canonical,
        inLanguage: "ru-RU",
        isPartOf: { "@id": `${site.url}/#website` },
        ...(isHome ? { mainEntity: { "@id": `${site.url}/#person` } } : {}),
      },
      ...(!isHome
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Главная",
                  item: `${site.url}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: title.split(" — ")[0],
                  item: canonical,
                },
              ],
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={site.author} />
      <meta
        name="robots"
        content={
          noIndex ? "noindex, follow" : "index, follow, max-image-preview:large"
        }
      />
      {!noIndex && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Мустафа — разработка сайтов и веб-приложений"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {!noIndex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
