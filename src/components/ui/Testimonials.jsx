import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { story, testimonials as allTestimonials } from '../../utils/content'

gsap.registerPlugin(ScrollTrigger)

const PREVIEW_QUOTE = '[Preview only: replace with the approved review before publishing]'

const testimonials = allTestimonials
  .map((t) => ({ ...t, quote: t.quote || (import.meta.env.DEV ? PREVIEW_QUOTE : '') }))
  .filter((t) => t.quote)

const tilts = [-6, 5, -4, 6, -5, 4]

export default function Testimonials() {
  const root = useRef(null)
  const wrap = useRef(null)
  const tail = useRef(null)
  const items = useRef([])
  const btns = useRef([])
  const placed = useRef(false)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (!testimonials.length) return
    const ctx = gsap.context(() => {
      gsap.from('.story-title', {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.story-title', start: 'top 88%' },
      })

      gsap.fromTo(
        '.story-mark',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.story-title', start: 'top 88%' },
        },
      )

      gsap.from('.bubble', {
        scale: 0.9,
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.bubble', start: 'top 90%' },
      })

      gsap.from('.avatar-item', {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.avatar-row', start: 'top 95%' },
      })

      gsap.from('.story-end', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.story-end', start: 'top 96%' },
      })
    }, root.current)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!testimonials.length) return
    const place = (duration) => {
      const li = items.current[active]
      if (!li || !wrap.current || !tail.current) return
      const w = wrap.current.getBoundingClientRect()
      const r = li.getBoundingClientRect()
      gsap.to(tail.current, {
        x: r.left + r.width / 2 - w.left,
        duration,
        ease: 'power3.out',
      })
    }

    place(placed.current ? 0.5 : 0)
    placed.current = true

    const onResize = () => place(0)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  useEffect(() => {
    if (!testimonials.length) return
    btns.current.forEach((b, i) => {
      if (!b) return
      gsap.to(b, {
        rotation: i === active ? 0 : tilts[i],
        y: i === active ? -8 : 0,
        scale: i === active ? 1.12 : 1,
        duration: 0.45,
        ease: 'back.out(1.6)',
      })
    })

    gsap.fromTo(
      '.quote-body',
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    )
  }, [active])

  useEffect(() => {
    if (testimonials.length < 2) return
    const id = setTimeout(() => setActive((a) => (a + 1) % testimonials.length), 5000)
    return () => clearTimeout(id)
  }, [active])

  const current = testimonials[active]
  if (!current) return null

  return (
    <section ref={root} className="relative bg-cream px-6 pb-24 pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="story-title mx-auto max-w-2xl font-display text-3xl font-black leading-tight md:text-5xl">
          {story.before}{' '}
          <span className="story-mark inline-block -rotate-1 rounded-lg bg-brand px-3 py-0.5 text-white">
            {story.highlight}
          </span>{' '}
          {story.after}
        </h2>

        <div ref={wrap} className="relative mt-12">
          <div className="bubble relative rounded-3xl border border-brand bg-white px-6 py-5 text-left">
            <div className="quote-body min-h-[8.5rem]">
              <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
                {current.quote}
              </p>
              <p className="mt-3 text-right text-sm font-medium text-brand">
                {current.name} · {current.company}
              </p>
            </div>
            <div ref={tail} className="absolute -bottom-2 left-0">
              <div className="-ml-2 h-4 w-4 rotate-45 border-b border-r border-brand bg-white" />
            </div>
          </div>

          <ul className="avatar-row mt-8 flex items-start justify-center">
            {testimonials.map((t, i) => (
              <li
                key={t.name}
                ref={(el) => (items.current[i] = el)}
                className={`avatar-item relative -ml-2 first:ml-0 ${active === i ? 'z-10' : ''}`}
              >
                <button
                  ref={(el) => (btns.current[i] = el)}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={t.name}
                  className="block cursor-pointer"
                >
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-16 w-16 rounded-2xl object-cover shadow-lg md:h-[72px] md:w-[72px]"
                  />
                </button>
                <p
                  className="mt-3 text-center font-hand text-lg text-ink"
                  style={{ transform: `rotate(${tilts[i] / 2}deg)` }}
                >
                  {t.name.split(' ')[0]}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="story-end mx-auto mt-16 max-w-xs font-display text-xl font-medium text-ink">
          {story.closing}
        </p>
      </div>
    </section>
  )
}