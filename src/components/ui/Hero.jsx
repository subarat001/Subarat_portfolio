import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero } from '../../utils/content'
import { Arrow, Ring } from './Doodles'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    let onMove
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.draw').forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-line', { yPercent: 110, duration: 0.7, stagger: 0.08 })
        .from('.hero-face', { scale: 0.6, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.2)
        .from('.note-text', { autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.4)
        .to('.draw', { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: 'power2.inOut' }, 0.5)
        .from('.hero-how', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.5)

      gsap.to('.hero-face', {
        rotation: 4,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '50% 80%',
      })

      gsap.to('.arrow-float', {
        y: -6,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.35, from: 'random' },
      })

      gsap.to('.ring-doodle', {
        rotation: 2,
        scaleX: 1.02,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
      })

      gsap.to('.sparkle', {
        rotation: 12,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
      })

      gsap.to('.scroll-dot', {
        y: 5,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      gsap.utils.toArray('[data-scroll]').forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.scroll),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      const movers = gsap.utils.toArray('[data-depth]').map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
        d: parseFloat(el.dataset.depth),
      }))

      onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        movers.forEach((m) => {
          m.x(nx * m.d)
          m.y(ny * m.d)
        })
      }
      window.addEventListener('pointermove', onMove)
    }, root.current)

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  const scrollNext = () => {
    const el = document.getElementById('next')
    if (window.lenis && el) window.lenis.scrollTo(el)
  }

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-cream">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-start px-6 pb-12 pt-28 text-center">
        <h1
          data-scroll="-10"
          className="relative w-fit font-display text-4xl font-black leading-[1.1] md:text-6xl"
        >
           <span
            data-depth="20"
            className="note-text absolute -top-14 right-[70%] hidden items-start gap-2 whitespace-nowrap text-hand md:flex"
          >
            <img
              src="/myIcons/Group.png"
              alt=""
              className="sparkle absolute -top-7 -left-7 h-9 w-auto select-none"
            />
            <span className="font-hand text-xl font-normal leading-none">{hero.greeting}</span>
            <Arrow variant="downRight" className="arrow-float mt-6 h-9 w-12" />
          </span>

          {hero.lines.map((l) => (
            <span key={l} className="block overflow-hidden pb-1">
              <span className="hero-line block">{l}</span>
            </span>
          ))}
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block text-brand">{hero.highlight}</span>
          </span>
        </h1>

         <div className="relative mt-16 flex items-center justify-center">
          <div
            data-depth="25"
            data-scroll="-30"
            className="note-text absolute right-full top-2 mr-1 hidden items-start gap-1 whitespace-nowrap text-hand md:flex"
          >
            <span className="font-hand text-lg leading-none">{hero.leftNote}</span>
             <Arrow variant="left" className="arrow-float -mt-0 h-9 w-14" />
          </div>

          <div data-scroll="-25">
            <img
              data-depth="35"
              src="/myPhoto/Face.png"
              alt="Subarat"
              className="hero-face h-44 w-44 select-none object-contain md:h-60 md:w-60"
            />
          </div>

          <div
            data-depth="35"
            data-scroll="-40"
            className="absolute -top-4 left-full ml-4 hidden h-36 w-[22rem] items-center justify-center text-brand lg:flex"
          >
            <Ring className="ring-doodle absolute inset-0 h-full w-full" />
            <p className="note-text relative px-12 font-hand text-lg leading-snug text-hand">
              {hero.rightNote}
            </p>
            <Arrow
              variant="down"
              className="arrow-float absolute -top-14 left-10 h-14 w-10 text-hand"
            />
          </div>
        </div>

        <h2 className="hero-how mt-8 font-display text-2xl font-black md:text-3xl">
          {hero.howTitle}
        </h2>

        <button
          onClick={scrollNext}
          className="hero-how mt-4 flex items-center gap-2 rounded-full border border-hand/60 px-8 py-3 font-hand text-lg text-hand transition-colors hover:border-brand hover:text-brand"
        >
          {hero.scrollLabel}
          <span className="scroll-dot inline-block h-1.5 w-1.5 rounded-full bg-current" />
        </button>
      </div>
    </section>
  )
}