/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@sab/shared-types', '@sab/shared-validation'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
