import { LanguageProvider } from './i18n/LanguageContext'
import BackgroundVideo from './components/BackgroundVideo'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <BackgroundVideo />
      <Nav />
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
