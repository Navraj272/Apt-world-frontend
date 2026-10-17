import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, STATIC_SEO, absoluteUrl } from './seo';

/**
 * Site-wide head tags. A page can pass its own metadata through pageProps.seo
 * ({ title, description, image, path, noindex, jsonLd }); otherwise the entry for its route in STATIC_SEO is used.
 * Rendered from _app (outside the client-only layout) so crawlers and link previews see it in the first HTML.
 */
export default function SEOTags({ seo }) {
  const router = useRouter();
  const fallback = STATIC_SEO[router.pathname] || {};
  const meta = { ...fallback, ...(seo || {}) };

  const title = meta.title || SITE_NAME;
  const description = meta.description || DEFAULT_DESCRIPTION;
  const path = meta.path || (router.asPath || '/').split(/[?#]/)[0];
  const canonical = `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL;
  const image = absoluteUrl(meta.image || DEFAULT_IMAGE);
  const jsonLd = [
    router.pathname === '/' && {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
    },
    meta.jsonLd,
  ].filter(Boolean);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <meta key="description" name="description" content={description} />
      <meta key="robots" name="robots" content={meta.noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link key="canonical" rel="canonical" href={canonical} />
      <link key="icon" rel="icon" href="/favicon.ico" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:type" property="og:type" content={meta.ogType || 'website'} />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={image} />
      {jsonLd.map((data, idx) => (
        <script key={`ld-${idx}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
    </Head>
  );
}
