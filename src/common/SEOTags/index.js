// components/common/SeoHead.js or .tsx
'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function SEOTags() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensures this is rendered client-side after first paint
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <Head>
      <title>Apt World</title>
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
      {/* <meta property="og:url" content="https://speedsweeps.com/" />
      <meta property="og:image" content={defaultBanner_des} /> */}
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
