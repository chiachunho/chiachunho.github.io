/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: 'utils/loader.js',
  },
};

module.exports = nextConfig;
