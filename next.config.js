/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: 'utils/loader.js',
  },
};

module.exports = nextConfig;
