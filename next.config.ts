import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'assets.inspirapos.biz.id' }] },
};

export default nextConfig;
