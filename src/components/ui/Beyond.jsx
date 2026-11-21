import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { beyond } from '../../utils/content'

gsap.registerPlugin(ScrollTrigger)

export default function Beyond() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.b-label', {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.b-title', start: 'top 90%' },
      })

      gsap.from('.b-word', {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.b-title', start: 'top 88%' },
      })

      gsap.from('.b-para', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.b-title', start: 'top 88%' },
      })

      gsap.utils.toArray('.b-card').forEach((card) => {
        const frame = card.querySelector('.b-frame')
        const img = card.querySelector('.b-img')
        const texts = card.querySelectorAll('.b-text > *')

        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: card, start: 'top 85%' },
          })
          .from(card, { y: 70, autoAlpha: 0, duration: 0.9 })
          .fromTo(
            frame,
            { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              duration: 1.1,
              ease: 'power4.inOut',
              clearProps: 'clipPath',
            },
            0.1,
          )
          .from(img, { scale: 1.4, duration: 1.4 }, 0.1)
          .from(texts, { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, 0.6)

        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      const underline = root.current.querySelector('.b-draw')
      const len = underline.getTotalLength()
      gsap.set(underline, { strokeDasharray: len, strokeDashoffset: len })

      const bottomTrigger = { trigger: '.b-bottom', start: 'top 96%' }

      gsap.fromTo(
        '.b-bottom',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.inOut',
          clearProps: 'clipPath',
          scrollTrigger: bottomTrigger,
        },
      )

      gsap.to(underline, {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 1,
        ease: 'power2.inOut',
        scrollTrigger: bottomTrigger,
      })
    }, root.current)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
        <div className="text-center">
          <p className="b-label font-hand text-lg text-hand">{beyond.label}</p>

          <h2 className="b-title mx-auto mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-ink md:text-5xl">
            {beyond.title.map((line) => (
              <span key={line} className="block">
                {line.split(' ').map((w, i) => (
                  <Fragment key={i}>
                    <span className="inline-block overflow-hidden pb-1 align-bottom">
                      <span className="b-word inline-block">{w}</span>
                    </span>{' '}
                  </Fragment>
                ))}
              </span>
            ))}
          </h2>

          <p className="b-para mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-500 md:text-base">
            {beyond.text}
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {beyond.cards.map((c) => (
            <article
              key={c.title}
              className="b-card group transition-[translate] duration-300 hover:-translate-y-1.5"
            >
              <div className="b-frame relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-200 shadow-[0_24px_40px_-20px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="b-img absolute left-0 top-[-12.5%] h-[125%] w-full object-cover"
                  />
                </div>
              </div>

              <div className="b-text mt-5">
                <h3 className="relative inline-block font-display text-xl font-bold text-ink">
                  {c.title}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-center">
          <span className="b-bottom relative inline-block font-hand text-2xl text-brand md:text-3xl">
            {beyond.bottom}
            <svg
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-2.5 w-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path className="b-draw" d="M2 8 C 60 3, 150 4, 298 6" />
            </svg>
          </span>
        </p>
      </div>
    </section>
  )
}