import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lab, skillsRow1, skillsRow2 } from '../../utils/content'
import { Ring } from './Doodles'

gsap.registerPlugin(ScrollTrigger)

const fade = {
  maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
}

function Row({ items, dir }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee-row overflow-hidden py-3" style={fade}>
      <div data-dir={dir} className="marquee-track flex w-max">
        {loop.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            className="group mr-4 flex h-28 w-28 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-xl md:mr-6 md:h-36 md:w-36 md:rounded-3xl"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-9 w-9 select-none object-contain transition-transform duration-300 group-hover:scale-125 md:h-14 md:w-14"
            />
            <span className="px-2 text-center font-display text-[11px] font-bold leading-tight text-ink md:text-sm">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Lab() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lab-head > *', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.lab-head', start: 'top 88%' },
      })

      const ringPath = root.current.querySelector('.lab-tag .draw')
      const len = ringPath.getTotalLength()
      gsap.fromTo(
        ringPath,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: 0.3,
          ease: 'power2.inOut',
          clearProps: 'strokeDasharray,strokeDashoffset',
          scrollTrigger: { trigger: '.lab-head', start: 'top 88%' },
        },
      )

      gsap.to('.lab-ring', {
        rotation: 1.5,
        scaleX: 1.02,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
      })

      gsap.from('.marquee-row', {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.lab-grid', start: 'top 88%' },
      })

      gsap.utils.toArray('.marquee-track').forEach((track) => {
        const left = track.dataset.dir === 'left'
        const tween = gsap.fromTo(
          track,
          { xPercent: left ? 0 : -50 },
          {
            xPercent: left ? -50 : 0,
            duration: 45,
            ease: 'none',
            repeat: -1,
          },
        )
        const row = track.parentElement
        row.addEventListener('mouseenter', () =>
          gsap.to(tween, { timeScale: 0.15, duration: 0.5, overwrite: true }),
        )
        row.addEventListener('mouseleave', () =>
          gsap.to(tween, { timeScale: 1, duration: 0.5, overwrite: true }),
        )
      })
    }, root.current)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-white px-0 pb-28 pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream to-transparent" />

      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="lab-head flex flex-col items-center text-center">
          <div className="lab-tag relative px-10 py-4">
            <Ring className="lab-ring absolute inset-0 h-full w-full text-brand" />
            <span className="relative font-hand text-xl text-ink">{lab.tag}</span>
          </div>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-black leading-tight text-ink md:text-5xl">
            {lab.title}
          </h2>
        </div>
      </div>

      <div className="lab-grid mt-16 flex flex-col gap-2">
        <Row items={skillsRow1} dir="left" />
        <Row items={skillsRow2} dir="right" />
      </div>
    </section>
  )
}