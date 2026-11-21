import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { navLinks } from '../../utils/content'
import { scrollToSection } from '../../utils/scroll'

export default function Navbar() {
  const ref = useRef(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState('home')

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-anim', {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, ref.current)
    return () => ctx.revert()
  }, [])

  const onNav = (e, section) => {
    if (!section) return
    e.preventDefault()
    setSelected(section)
    if (pathname === '/') scrollToSection(section)
    else navigate('/', { state: { scrollTo: section } })
  }

  const isActive = (l) => (pathname === '/' ? l.section === selected : pathname === l.to)

  return (
    <header
      ref={ref}
      className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-20"
    >
      <Link to="/" onClick={(e) => onNav(e, 'home')} className="nav-anim">
        <img
          src="/myPhoto/Avtar.png"
          alt="Subarat"
          className="h-11 w-11 rounded-full bg-indigo-100 object-cover"
        />
      </Link>
      <nav className="nav-anim flex gap-5 rounded-2xl bg-black/5 px-6 py-3 text-sm backdrop-blur-md md:gap-7">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            onClick={(e) => onNav(e, l.section)}
            className={`transition-colors hover:text-brand ${
              isActive(l) ? 'text-brand' : 'text-neutral-500'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}