// components/common/SeoHead.js or .tsx
'use client';
import Head from 'next/head';

export default function SEOTags() {
  return (
    <Head>
      <title>Apt World</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Apt World"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:title"
        content="Apt World"
      />
      <meta
        property="og:description"
        content="Apt World"
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Apt World"
      />
      <meta
        name="twitter:description"
        content="Apt World"
      />
      {/* <meta name="twitter:image" content={defaultBanner_des} /> */}
    </Head>
  );
}
