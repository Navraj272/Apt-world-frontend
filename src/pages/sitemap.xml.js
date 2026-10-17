import { SITE_URL, STATIC_SEO, apiGet, nameOf, slugify } from '@/common/SEOTags/seo';

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const urlEntry = (path, lastmod) =>
  `  <url><loc>${escapeXml(`${SITE_URL}${path === '/' ? '' : path}`)}</loc>${
    lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''
  }</url>`;

export async function getServerSideProps({ res }) {
  const [categories, subcategories, products] = await Promise.all([
    apiGet('/categories?limit=500&isActive=true', 15000),
    apiGet('/subcategories?limit=1000&isActive=true', 15000),
    apiGet('/products?limit=5000&isActive=true', 20000),
  ]);

  const entries = [
    ...Object.entries(STATIC_SEO)
      .filter(([, meta]) => !meta.noindex)
      .map(([path]) => urlEntry(path)),
    ...((categories && categories.categories) || []).map((c) => urlEntry(`/categories/${c.slug}`, c.updatedAt)),
    ...((subcategories && subcategories.subcategories) || []).map((s) => urlEntry(`/categories/${s.slug}`, s.updatedAt)),
    ...((products && products.products) || []).map((p) =>
      urlEntry(`/products/${slugify(nameOf(p.name) || p.baseCode)}/${p.id}`, p.updatedAt)
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
