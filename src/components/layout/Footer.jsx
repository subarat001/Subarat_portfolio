import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { footer } from '../../utils/content'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5c0-1.5 1-2.5 2.5-2.5S17 12 17 13.5V17" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  )
}

export default function Footer() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ft-left > *', {
        x: -40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ft-left', start: 'top 88%' },
      })

      gsap.from('.ft-right h3, .ft-link', {
        x: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ft-right', start: 'top 88%' },
      })

      gsap.from('.ft-img', {
        y: 70,
        scale: 0.92,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ft-center', start: 'top 88%' },
      })

      gsap.from('.ft-bubble', {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: '10% 100%',
        duration: 0.6,
        delay: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.ft-center', start: 'top 88%' },
      })

      gsap.from('.ft-name', {
        y: 10,
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ft-center', start: 'top 88%' },
      })

      gsap.from('.ft-bottom', {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ft-bottom', start: 'top 98%' },
      })

      gsap.to('.ft-float', {
        y: -8,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      gsap.to('.ft-bubble-wrap', {
        y: -6,
        rotation: -1.5,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '10% 100%',
      })

      gsap.to('.ft-center', {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }, root.current)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={root}
      className="relative overflow-hidden bg-cream px-6 pb-6 pt-28 md:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />

      <div className="mx-auto grid max-w-[1320px] items-center gap-x-8 gap-y-12 md:grid-cols-[1fr_1.3fr_1fr]">
        <div className="ft-left max-w-[22rem]">
          <p className="font-hand text-base text-hand">{footer.philosophyTitle}</p>
          {footer.philosophy.map((para, i) => (
            <p key={i} className="mt-3 text-[15px] leading-[1.5] text-neutral-500">
              {para.map((s, j) =>
                s.hl ? (
                  <span key={j} className="font-semibold text-brand">
                    {s.t}
                  </span>
                ) : (
                  <span key={j}>{s.t}</span>
                ),
              )}
            </p>
          ))}
        </div>

        <div className="ft-center relative mx-auto w-full max-w-[34rem] pt-20">
          <div className="ft-bubble-wrap absolute left-[42%] top-0 z-10">
            <p className="ft-name mb-1 ml-2 font-hand text-base text-ink">{footer.name}</p>
            <div className="ft-bubble relative whitespace-nowrap rounded-2xl bg-brand px-5 py-3 font-display text-sm font-bold text-white md:text-base">
              {footer.bubble}
              <span className="absolute -bottom-1.5 left-6 h-4 w-4 rotate-45 bg-brand" />
            </div>
          </div>
          <div className="ft-float">
            <img
              src="/myIcons/Footer-img.png"
              alt="Subarat at his desk"
              className="ft-img w-full select-none"
            />
          </div>
        </div>

        <div className="ft-right md:pl-4">
          <h3 className="whitespace-nowrap font-display text-3xl font-bold text-brand lg:text-[2.1rem]">
            {footer.connectTitle}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-4">
            {footer.links.map((l) => (
              <li key={l.label} className={`ft-link ${l.full ? 'w-full' : ''}`}>
                <a
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-brand"
                >
                  <Icon name={l.icon} />
                  <span className="relative font-hand text-xl text-hand">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ft-bottom mx-auto mt-10 max-w-[1320px] text-center">
        <p className="text-sm font-medium text-neutral-600">{footer.copyright}</p>
        <p className="mt-1 font-hand text-base text-hand">{footer.tagline}</p>
      </div>
    </footer>
  )
}