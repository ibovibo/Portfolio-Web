import type { Translation } from './types'

export const tr: Translation = {
  meta: {
    title: 'İbrahim — Portfolyo',
  },
  nav: {
    about: 'Hakkımda',
    skills: 'Yetenekler',
    projects: 'Projeler',
    contact: 'İletişim',
  },
  hero: {
    eyebrow: 'Yapay Zeka Mühendisliği Öğrencisi',
    name: 'İbrahim ENEZ',
    tagline:
      'Trabzon Üniversitesi\'nde Yapay Zeka Mühendisliği okuyorum. Python ve Flutter ile küçük ama çalışan şeyler geliştiriyorum.',
    githubCta: 'GitHub',
    emailCta: 'E-posta',
    scrollHint: 'Kaydır',
  },
  about: {
    heading: 'Hakkımda',
    body:
      'Yapay Zeka Mühendisliği öğrencisiyim, Python ve veri bilimi üzerine çalışıyorum. Veri analizi scriptlerinden mobil uygulamalara, küçük otomasyon araçlarına kadar uçtan uca projeler üretiyorum. Görsellik ve tasarım tarafıyla da ilgileniyorum, bu konuda kendimi sürekli geliştiriyorum.',
  },
  skills: {
    heading: 'Yetenekler',
    items: ['Git', 'GitHub', 'Python', 'SQL', 'Pandas', 'NumPy'],
  },
  projects: {
    heading: 'Projeler',
    comingSoon: 'Daha fazla proje yakında burada olacak.',
    items: [
      {
        title: 'Tetris × 2048',
        tag: 'Flutter · Dart',
        description:
          "Tetris'in düşen blok mekaniğiyle 2048'in birleştirerek ilerleme mantığını bir araya getiren, Flutter ile yazılmış bir bulmaca oyunu. Ders dışında state yönetimi ve grid mantığı üzerine pratik yapmak için geliştirildi.",
        link: 'https://github.com/ibovibo/tetris2048-flutter',
        linkLabel: "GitHub'da görüntüle",
      },
    ],
  },
  footer: {
    builtBy: 'İbrahim tarafından yapıldı',
  },
}
