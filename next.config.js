/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/og.png', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, immutable' }] },
      { source: '/valisci-executive-brief-v1.pdf', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }] },
    ];
  },
};
module.exports = nextConfig;
