import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { approach } from '../../utils/content'
import { Arrow } from './Doodles'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  chat: (
    <>
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </>
  ),
  flask: (
    <>
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </>
  ),
  code: (
    <>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <span className="w-icon inline-block">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 text-brand transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[name]}
      </svg>
    </span>
  )
}

const glow = {
  background:
    'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(15,43,255,0.10), transparent 70%)',
}

export default function Approach() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.draw').forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      gsap.from('.w-label', {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.w-head', start: 'top 85%' },
      })

      gsap.from('.w-word', {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.w-title', start: 'top 88%' },
      })

      gsap.from('.w-para', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.w-title', start: 'top 88%' },
      })

      const gridTrigger = { trigger: '.w-grid', start: 'top 85%' }

      gsap.from('.w-card', {
        y: 90,
        autoAlpha: 0,
        rotation: (i) => (i - 1) * 4,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: gridTrigger,
      })

      gsap.from('.w-card-inner', {
        borderColor: '#d4d4d8',
        duration: 0.8,
        delay: 0.3,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: gridTrigger,
      })

      gsap.from('.w-icon', {
        scale: 0,
        rotation: -45,
        duration: 0.6,
        delay: 0.5,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: gridTrigger,
      })

      gsap.from('.w-tag', {
        x: 20,
        autoAlpha: 0,
        duration: 0.6,
        delay: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: gridTrigger,
      })

      const noteTrigger = { trigger: '.w-note-row', start: 'top 94%' }

      gsap.to('.w-note-row .draw', {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.inOut',
        scrollTrigger: noteTrigger,
      })

      gsap.fromTo(
        '.w-note',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          delay: 0.5,
          ease: 'power2.inOut',
          scrollTrigger: noteTrigger,
        },
      )
    }, root.current)

    return () => ctx.revert()
  }, [])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section ref={root} className="bg-cream">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="w-head text-center">
          <p className="w-label font-hand text-lg text-hand">{approach.label}</p>

          <h2 className="w-title mx-auto mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-ink md:text-5xl">
            {approach.title.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <span className="w-word inline-block">{w}</span>
                </span>{' '}
              </Fragment>
            ))}
          </h2>

          <p className="w-para mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-500 md:text-base">
            {approach.text}
          </p>
        </div>

        <div className="w-grid mt-14 grid gap-6 md:grid-cols-3">
          {approach.cards.map((c) => (
            <div key={c.title} className="w-card">
              <div
                onMouseMove={onMove}
                className="w-card-inner group relative h-full overflow-hidden rounded-3xl border border-brand p-6 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_40px_-24px_rgba(15,43,255,0.45)]"
              >
                <div
                  style={glow}
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <Icon name={c.icon} />
                    <span className="w-tag font-hand text-base text-hand">{c.tag}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}

           <div className="w-note-row flex items-start gap-2 md:col-span-2 md:col-start-2">
            <Arrow variant="down" className="mt-2 h-12 w-9 shrink-0 text-hand" />
            <p className="w-note mt-8 font-hand text-xl text-brand md:whitespace-nowrap">
              {approach.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}