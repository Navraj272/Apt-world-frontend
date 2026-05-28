/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: '/:all*\\.(js|css|png|jpg|jpeg|svg|woff2|webp|ico|ttf|eot|otf|mp4|webm)$',
  //       locale: false,
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors \'none\';',
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: [
      'fungamess.games',
      'sweepmobi.s3.us-east-1.amazonaws.com',
      'github.com',
      'media.tenor.com',
      'thumbs.alea.com',
      'speedcas-dev-storage.s3.us-east-1.amazonaws.com',
      'speed-staging-active-storage.s3.us-east-1.amazonaws.com',
      'd1aar7bd6ump5y.cloudfront.net',
      'game-tiles.platform.iconic-21.com',
      'storage.googleapis.com',
      'static.77gaming.net',
      'new-bucket-name.s3.us-east-1.amazonaws.com',
      // 'bangcoins-dev-storage.s3.us-east-1.amazonaws.com'
    ],
  },
  output: 'standalone',
  compress: true,
};

module.exports = nextConfig;