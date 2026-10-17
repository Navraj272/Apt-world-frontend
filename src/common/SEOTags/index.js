import Head from 'next/head';
import { useRouter } from 'next/router';
import { CONTACT_PHONE_E164 } from '../siteContact';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, STATIC_SEO, absoluteUrl } from './seo';

/**
 * Site-wide head tags. A page can pass its own metadata through pageProps.seo
 * ({ title, description, image, path, noindex, jsonLd }); otherwise the entry for its route in STATIC_SEO is used.
 * Rendered from _app (outside the client-only layout) so crawlers and link previews see it in the first HTML.
 */
export default function SEOTags({ seo }) {
  const router = useRouter();
  const fallback = STATIC_SEO[router.pathname] || {};
  // Unknown URLs render Next's error page; keep them out of search results
  const isNotFound = router.pathname === '/_error' || router.pathname === '/404';
  const meta = { ...fallback, ...(seo || {}), ...(isNotFound ? { noindex: true, title: 'Page not found | APT WORLD' } : {}) };

  const title = meta.title || SITE_NAME;
  const description = meta.description || DEFAULT_DESCRIPTION;
  const path = meta.path || (router.asPath || '/').split(/[?#]/)[0];
  const canonical = `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL;
  const image = absoluteUrl(meta.image || DEFAULT_IMAGE);
  const jsonLd = [
    router.pathname === '/' && {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: ['Apt World', 'aptworld.in'],
      url: `${SITE_URL}/`,
    },
    router.pathname === '/' && {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-192.png`,
      telephone: CONTACT_PHONE_E164,
      contactPoint: { '@type': 'ContactPoint', telephone: CONTACT_PHONE_E164, contactType: 'customer service', areaServed: 'IN' },
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
      <link key="icon" rel="icon" href="/favicon.ico" sizes="any" />
      <link key="icon-48" rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link key="icon-32" rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link key="apple-icon" rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link key="manifest" rel="manifest" href="/site.webmanifest" />
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
