import type { MetadataRoute } from 'next'

import { siteConfig } from '@/constant'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/examples',
        '/signin',
        '/signup',
        '/dashboard',
        '/auth-error',
        '/email-verification',
        '/forgot-password',
        '/new-password',
        '/two-factor'
      ]
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`
  }
}
