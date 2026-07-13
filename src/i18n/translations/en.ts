import type { Translation } from './types'

export const en: Translation = {
  meta: {
    title: 'İbrahim — Portfolio',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'AI Engineering Student',
    name: 'İbrahim ENEZ',
    tagline:
      "Studying AI Engineering at Trabzon University. I build small, working things with Python and Flutter.",
    githubCta: 'GitHub',
    emailCta: 'Email',
    scrollHint: 'Scroll',
  },
  about: {
    heading: 'About',
    body:
      "AI Engineering student focused on Python and data science. I build things end-to-end — from data analysis scripts to mobile apps and small automation tools. I'm also interested in visual design and keep working on improving that side of my projects too.",
  },
  skills: {
    heading: 'Skills',
    items: ['Git', 'GitHub', 'Python', 'SQL', 'Pandas', 'NumPy'],
  },
  projects: {
    heading: 'Projects',
    comingSoon: 'More projects are on the way — check back soon.',
    items: [
      {
        title: 'Tetris × 2048',
        tag: 'Flutter · Dart',
        description:
          "A puzzle game built with Flutter that blends Tetris' falling-block mechanics with 2048's merge-to-combine logic. A side project for practicing state management and grid logic outside of coursework.",
        link: 'https://github.com/ibovibo/tetris2048-flutter',
        linkLabel: 'View on GitHub',
      },
    ],
  },
  footer: {
    builtBy: 'Built by İbrahim',
  },
}
