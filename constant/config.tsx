import { Icon } from '@/components/icons'

export const socials = {
  facebook: 'https://www.facebook.com/raymond.gomera',
  messenger: 'https://m.me/raymond.gomera',
  github: 'https://github.com/reymondgomera',
  linkedIn: 'https://www.linkedin.com/in/rey-mond-gomera-030a3023a/',
  twitter: '/#',
  instagram: '/#',
  email: 'mailto:reymondgomera24@gmail.com'
}

export const downloadUrls = {
  resume: '/#'
}

export const siteConfig = {
  name: 'mond.dev',
  description: 'A professional portfolio website of Rey Mond Gomera, a Filipino Full Stack Developer.',
  socials,
  downloadUrls
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  icon?: Icon
  external?: boolean
}

export const navItems: NavItem[] = [
  {
    title: 'Skill',
    href: '#skill'
  },
  {
    title: 'Project',
    href: '#project'
  },
  {
    title: 'Experience',
    href: '#experience'
  },
  {
    title: 'Blog',
    href: '#blog'
  },
  {
    title: 'Contact',
    href: '#contact'
  }
]
