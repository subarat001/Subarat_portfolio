import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { about } from '../../utils/content'
import { Arrow, Star } from './Doodles'

export default function AboutHero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    let onMove
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.draw').forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.about-kicker', { y: 20, autoAlpha: 0, duration: 0.5 })
        .from('.about-line', { yPercent: 110, duration: 0.7, stagger: 0.1 }, 0.1)
        .from('.about-para', { y: 24, autoAlpha: 0, duration: 0.6 }, 0.5)
        .from('.about-face', { scale: 0.6, autoAlpha: 0, duration: 0.8, ease: 'back.out(1.7)' }, 0.2)
        .from('.about-doodle', { y: -10, autoAlpha: 0, duration: 0.5 }, 0.5)
        .from('.star-wrap', { scale: 0, rotation: -90, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, 0.6)
        .from('.pill-wrap', { scale: 0.8, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.8)
        .to('.draw', { strokeDashoffset: 0, duration: 0.7, stagger: 0.1, ease: 'power2.inOut' }, 0.9)
        .from('.strip-item', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.9)

      gsap.to('.about-face', {
        rotation: 3,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '50% 80%',
      })

      gsap.to('.star', {
        scale: 1.2,
        rotation: 15,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.4,
        transformOrigin: '50% 50%',
      })

      gsap.to('.pill-wrap', {
        y: -6,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.5,
      })

      const moveX = gsap.quickTo('.face-wrap', 'x', { duration: 0.9, ease: 'power3' })
      const moveY = gsap.quickTo('.face-wrap', 'y', { duration: 0.9, ease: 'power3' })
      onMove = (e) => {
        moveX((e.clientX / window.innerWidth - 0.5) * 25)
        moveY((e.clientY / window.innerHeight - 0.5) * 25)
      }
      window.addEventListener('pointermove', onMove)
    }, root.current)

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} className="flex min-h-screen flex-col bg-cream">
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 pb-12 pt-32 md:px-16 lg:grid-cols-2">
        <div>
          <p className="about-kicker font-hand text-lg text-hand">{about.kicker}</p>

          <h1 className="mt-4 font-display text-4xl font-black leading-tight text-ink lg:text-[2.6rem]">
            {about.lines.map((l) => (
              <span key={l} className="block overflow-hidden pb-1 lg:whitespace-nowrap">
                <span className="about-line block">{l}</span>
              </span>
            ))}
            <span className="block overflow-hidden pb-4">
              <span className="about-line relative inline-block text-brand">
                {about.highlight}
                <svg
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path className="draw" d="M2 8 C 60 3, 150 4, 298 6" />
                  <path className="draw" d="M24 13 C 90 9, 190 10, 280 11" />
                </svg>
              </span>
            </span>
          </h1>

          <p className="about-para mt-6 max-w-lg text-lg leading-relaxed text-neutral-500">
            {about.text}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="about-doodle font-hand text-lg text-hand">{about.doodle}</p>

          <div className="face-wrap relative mt-6">
            <img
              src="/myPhoto/Face.png"
              alt="Subarat"
              className="about-face w-56 select-none md:w-72"
            />
            <span className="star-wrap absolute -right-8 top-0 h-12 w-12 text-brand">
              <Star className="star h-full w-full" />
            </span>
            <span className="star-wrap absolute -right-10 top-14 h-6 w-6 text-brand">
              <Star className="star h-full w-full" />
            </span>
          </div>

          <div className="pill-wrap relative mt-10">
            <Arrow variant="down" className="absolute -top-14 right-2 h-12 w-9 text-hand" />
            <div
              className="flex items-center gap-2 rounded-full border border-brand px-5 py-2 font-hand text-lg text-brand"
              style={{ transform: 'rotate(-4deg)' }}
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
              {about.pill}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6 md:px-16">
          <p className="strip-item font-hand text-base text-hand">{about.stripLabel}</p>
          {about.strip.map((s) => (
            <p key={s} className="strip-item font-display text-base font-bold text-brand">
              {s}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}