/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: async function(
    defaultPathMap,
  ) {
    return {
      "/": { page: "/" }
    };
  }
}

module.exports = nextConfig
