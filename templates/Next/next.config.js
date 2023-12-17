/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    formats: ['image/webp']
  }
};
module.exports = nextConfig;
