/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' }, //* test images
      { hostname: 'loremflickr.com' }, //* test images
      { hostname: 'cdn.photoswipe.com' }, //* test images
      { hostname: 'utfs.io' },
      { hostname: 'lh3.googleusercontent.com' }
    ]
  }
}

export default nextConfig
