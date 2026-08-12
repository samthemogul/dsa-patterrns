/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole app is client-side, so every route can be
  // prerendered to HTML at build time and served from Netlify's CDN with
  // no serverless functions involved.
  output: 'export',

  // Emits /topic/two-pointers/index.html rather than /topic/two-pointers.html,
  // which is what Netlify's static server expects for clean URLs.
  trailingSlash: true,

  // No <Image> usage, but the optimiser is unavailable in an export build
  // and Next refuses to build without this acknowledged.
  images: { unoptimized: true },

  reactStrictMode: true,
};

export default nextConfig;
