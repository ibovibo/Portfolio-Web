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
      "I'm an AI Engineering student at Trabzon University, mostly working with Python for data and machine learning basics, and Flutter for small apps. I like understanding how something works end to end — from a messy dataset to a working interface — and I'm still early in that process.",
  },
  skills: {
    heading: 'Skills',
    items: ['GitHub'],
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
