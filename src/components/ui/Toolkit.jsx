import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toolkit } from '../../utils/content'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  code: (
    <>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
}

const glow = {
  background:
    'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(15,43,255,0.08), transparent 70%)',
}

export default function Toolkit() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.t-label', {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.t-left', start: 'top 85%' },
      })

      gsap.from('.t-word', {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.t-title', start: 'top 88%' },
      })

      gsap.from('.t-para', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.t-title', start: 'top 88%' },
      })

      gsap.fromTo(
        '.t-closing',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          delay: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.t-title', start: 'top 88%' },
        },
      )

      const gridTrigger = { trigger: '.t-grid', start: 'top 85%' }
      const stagger = { each: 0.12, grid: [2, 2], from: 'start' }

      gsap.from('.t-card', {
        y: 60,
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.8,
        stagger,
        ease: 'back.out(1.4)',
        scrollTrigger: gridTrigger,
      })

      gsap.from('.t-icon', {
        scale: 0,
        rotation: -60,
        duration: 0.6,
        delay: 0.4,
        stagger,
        ease: 'back.out(2)',
        scrollTrigger: gridTrigger,
      })

      gsap.from('.t-tag', {
        x: 16,
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.55,
        stagger,
        ease: 'power3.out',
        scrollTrigger: gridTrigger,
      })

      gsap.fromTo(
        '.t-note',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          delay: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.t-note', start: 'top 96%' },
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
    <section ref={root} className="relative bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cream to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="t-left">
          <p className="t-label font-hand text-lg text-hand">{toolkit.label}</p>

          <h2 className="t-title mt-4 font-display text-3xl font-black leading-tight text-ink md:text-4xl lg:text-[2.4rem]">
            {toolkit.title.map((line) => (
              <span key={line} className="block">
                {line.split(' ').map((w, i) => (
                  <Fragment key={i}>
                    <span className="inline-block overflow-hidden pb-1 align-bottom">
                      <span className="t-word inline-block">{w}</span>
                    </span>{' '}
                  </Fragment>
                ))}
              </span>
            ))}
          </h2>

          <p className="t-para mt-6 max-w-sm text-[15px] leading-relaxed text-neutral-500">
            {toolkit.text}
          </p>
          <p className="t-closing mt-3 font-hand text-xl text-brand">{toolkit.closing}</p>
        </div>

        <div>
          <div className="t-grid grid gap-4 sm:grid-cols-2">
            {toolkit.cards.map((c) => (
              <div
                key={c.title}
                onMouseMove={onMove}
                className="t-card group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_20px_36px_-22px_rgba(15,43,255,0.4)]"
              >
                <div
                  style={glow}
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative flex gap-4">
                  <div className="t-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icons[c.icon]}
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-ink">{c.title}</h3>
                      <span className="t-tag shrink-0 font-hand text-base text-brand">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="t-note mt-8 text-center font-hand text-lg text-hand">{toolkit.note}</p>
        </div>
      </div>
    </section>
  )
}