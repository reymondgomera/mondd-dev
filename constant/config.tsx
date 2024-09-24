import { Icon, Icons } from '@/components/icons'

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
  name: 'mondd.dev',
  creator: 'Rey Mond Gomera',
  description: 'A professional portfolio website of Rey Mond Gomera, a Filipino Full Stack Web Developer.',
  keywords: [
    'portfolio',
    'rey mond',
    'gomera',
    'mond',
    'mondd',
    'mondd.dev',
    'projects',
    'blogs',
    'full-stack development',
    'front-end development',
    'back-end development',
    'full stack developer',
    'front-end developer',
    'back-end developer',
    'software developer',
    'software engineer',
    'web developer'
  ],
  socials,
  downloadUrls,
  baseUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
  pages: {
    posts: {
      project: {
        id: 'project',
        title: 'Project',
        description: 'These projects demonstrate my skills and expertise in software development.'
      },
      blog: {
        id: 'blog',
        title: 'Blog',
        description: 'Explore my latest blogs for tips, tutorials, and discussions related to software development.'
      }
    }
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  icon?: Icon
  external?: boolean
}

export const navItems: NavItem[] = [
  { title: 'Skill', href: '/#skill' },
  { title: 'Project', href: '/#project' },
  { title: 'Experience', href: '/#experience' },
  { title: 'Blog', href: '/#blog' },
  { title: 'Contact', href: '/#contact' }
]

export type SidebarNavItem = {
  title: string
  href: string
  icon?: Icon
  disabled?: boolean
}

export const sidebarNavItems: SidebarNavItem[] = [
  { title: 'Overview', href: '/dashboard', icon: Icons.dashboard },
  { title: 'Account', href: '/dashboard/account', icon: Icons.user },
  { title: 'Project', href: '/dashboard/post/project', icon: Icons.code },
  { title: 'Blog', href: '/dashboard/post/blog', icon: Icons.notebookPen },
  { title: 'Skill', href: '/dashboard/skill', icon: Icons.bulb },
  { title: 'Experience', href: '/dashboard/experience', icon: Icons.clock }
]
