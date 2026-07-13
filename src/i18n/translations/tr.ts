import type { Translation } from './types'

export const tr: Translation = {
  meta: {
    title: 'İbrahim — Portfolyo',
  },
  nav: {
    about: 'Hakkımda',
    skills: 'Yetenekler',
    projects: 'Projeler',
  },
  hero: {
    eyebrow: 'Yapay Zeka Mühendisliği Öğrencisi',
    name: 'İbrahim',
    tagline:
      'Trabzon Üniversitesi\'nde Yapay Zeka Mühendisliği okuyorum. Python ve Flutter ile küçük ama çalışan şeyler geliştiriyorum.',
    githubCta: 'GitHub',
    emailCta: 'E-posta',
    scrollHint: 'Kaydır',
  },
  about: {
    heading: 'Hakkımda',
    body:
      "Trabzon Üniversitesi'nde Yapay Zeka Mühendisliği okuyorum. Çoğunlukla veri ve makine öğrenmesinin temelleri için Python, küçük uygulamalar için Flutter kullanıyorum. Bir şeyin uçtan uca nasıl çalıştığını anlamayı seviyorum — dağınık bir veri setinden çalışan bir arayüze kadar — ve bu süreçte hâlâ yeni sayılırım.",
  },
  skills: {
    heading: 'Yetenekler',
    items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Flutter & Dart', 'Git', 'SQL (temel)'],
  },
  projects: {
    heading: 'Projeler',
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
