import { LanguageProvider } from './i18n/LanguageContext'
import BackgroundVideo from './components/BackgroundVideo'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import CursorFollower from './components/CursorFollower'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()

  return (
    <LanguageProvider>
      <BackgroundVideo />
      <Nav />
      <CursorFollower />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
