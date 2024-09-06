/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'picsum.photos' }, { hostname: 'utfs.io' }, { hostname: 'lh3.googleusercontent.com' }]
  }
}

export default nextConfig
