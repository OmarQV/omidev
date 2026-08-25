import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Security: do not advertise the framework
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
