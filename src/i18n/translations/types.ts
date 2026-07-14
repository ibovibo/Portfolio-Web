export interface Translation {
  meta: {
    title: string
  }
  nav: {
    about: string
    skills: string
    projects: string
    contact: string
  }
  hero: {
    eyebrow: string
    name: string
    tagline: string
    githubCta: string
    emailCta: string
    scrollHint: string
  }
  about: {
    heading: string
    body: string
  }
  skills: {
    heading: string
    items: string[]
  }
  projects: {
    heading: string
    comingSoon: string
    items: {
      title: string
      tag: string
      description: string
      link: string
      linkLabel: string
    }[]
  }
  contact: {
    heading: string
    emailCta: string
  }
  footer: {
    tagline: string
    discover: string
    socials: string
    home: string
    rights: string
  }
}
