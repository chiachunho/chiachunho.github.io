import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: 'utils/loader.ts',
  },
};

export default nextConfig;
