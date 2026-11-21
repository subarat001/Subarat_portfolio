import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/ui/Hero'
import Projects from '../components/ui/Projects'
import Testimonials from '../components/ui/Testimonials'
import Lab from '../components/ui/Lab'
import Footer from '../components/layout/Footer'
import { scrollToSection } from '../utils/scroll'

export default function Home() {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state?.scrollTo) return
    const target = state.scrollTo
    const t = setTimeout(() => {
      scrollToSection(target)
      navigate('/', { replace: true, state: null })
    }, 500)
    return () => clearTimeout(t)
  }, [state, navigate])

  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <Projects />
      <Testimonials />
      <div id="lab">
        <Lab />
      </div>
      <Footer />
    </>
  )
}