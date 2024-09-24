import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'mondd.dev',
    short_name: 'md',
    description: 'A professional portfolio website of Rey Mond Gomera, a Filipino Full Stack Web Developer.',
    start_url: '/'
  }
}
