import { Fragment, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '../../utils/content'

gsap.registerPlugin(ScrollTrigger)

const BRAND = '#0f2bff'
const IDLE = '#d4d4d8'

export default function Journey() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.j-label', {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.j-left', start: 'top 85%' },
      })

      gsap.from('.j-word', {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.j-title', start: 'top 88%' },
      })

      gsap.from('.j-para', {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.j-para', start: 'top 92%' },
      })

      gsap.from('.j-note', {
        y: 30,
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.j-note', start: 'top 92%' },
      })

      gsap.fromTo(
        '.j-note-line',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          stagger: 0.35,
          delay: 0.4,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.j-note', start: 'top 92%' },
        },
      )

      const timeline = root.current.querySelector('.j-timeline')
      const progress = root.current.querySelector('.j-progress')
      const items = gsap.utils.toArray('.j-item')

      gsap.set(progress, { scaleY: 0 })
      gsap.set('.j-dot', { borderColor: IDLE, backgroundColor: '#ffffff' })
      gsap.set('.j-content > *', { autoAlpha: 0, y: 30 })
      gsap.set('.j-chip', { autoAlpha: 0, scale: 0.6 })

      const ping = gsap.fromTo(
        '.j-ping',
        { scale: 1, opacity: 0.5 },
        {
          scale: 2.8,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          ease: 'power1.out',
          paused: true,
          immediateRender: false,
        },
      )

      const frac = (item) => item.offsetTop / (timeline.offsetHeight - 13)

      items.forEach((item, i) => {
        const dot = item.querySelector('.j-dot')
        const content = item.querySelectorAll('.j-content > *')
        const chips = item.querySelectorAll('.j-chip')
        const last = i === items.length - 1

        ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              dot,
              { scale: 1.6 },
              {
                scale: 1,
                borderColor: BRAND,
                backgroundColor: last ? BRAND : '#ffffff',
                duration: 0.5,
                ease: 'back.out(2)',
              },
            )
            gsap.to(content, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: true,
            })
            if (chips.length) {
              gsap.to(chips, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.06,
                delay: 0.5,
                ease: 'back.out(2)',
                overwrite: true,
              })
            }
            gsap.to(progress, {
              scaleY: frac(item),
              duration: 0.9,
              ease: 'power2.out',
              overwrite: true,
            })
            if (last) ping.play()
          },
          onLeaveBack: () => {
            gsap.to(dot, {
              borderColor: IDLE,
              backgroundColor: '#ffffff',
              duration: 0.3,
            })
            gsap.to(content, { autoAlpha: 0, y: 30, duration: 0.3, overwrite: true })
            if (chips.length) {
              gsap.to(chips, { autoAlpha: 0, scale: 0.6, duration: 0.2, overwrite: true })
            }
            gsap.to(progress, {
              scaleY: i === 0 ? 0 : frac(items[i - 1]),
              duration: 0.6,
              ease: 'power2.out',
              overwrite: true,
            })
            if (last) {
              ping.pause(0)
              gsap.set('.j-ping', { opacity: 0 })
            }
          },
        })
      })
    }, root.current)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:px-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="j-left lg:sticky lg:top-32 lg:self-start">
          <p className="j-label font-hand text-lg text-hand">{journey.label}</p>

          <h2 className="j-title mt-4 font-display text-3xl font-black leading-tight text-ink md:text-4xl lg:text-[2.5rem]">
            {journey.title.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <span className="j-word inline-block">{w}</span>
                </span>{' '}
              </Fragment>
            ))}
          </h2>

          <p className="j-para mt-6 max-w-sm text-[15px] leading-relaxed text-neutral-500">
            {journey.text}
          </p>

          <div className="j-note mt-8 max-w-sm rounded-2xl bg-cream px-6 py-5 font-hand text-xl leading-snug text-brand">
            {journey.note.map((line) => (
              <p key={line} className="j-note-line">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="j-timeline relative pl-10">
          <span className="absolute bottom-0 left-[6px] top-[13px] w-0.5 bg-neutral-200" />
          <span className="j-progress absolute bottom-0 left-[6px] top-[13px] w-0.5 origin-top bg-brand" />

          {journey.timeline.map((t, i) => {
            const last = i === journey.timeline.length - 1
            return (
              <div key={t.label} className="j-item relative pb-14 last:pb-0">
                {last && (
                  <span className="j-ping absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full bg-brand opacity-0" />
                )}
                <span className="j-dot absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full border-2" />

                <div className="j-content transition-transform duration-300 hover:translate-x-1">
                  <p className="font-hand text-lg text-brand">{t.label}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-neutral-500">
                    {t.desc}
                  </p>
                  {t.tech && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.tech.map((x) => (
                        <span
                          key={x}
                          className="j-chip rounded-full border border-brand/30 px-3 py-1 text-xs font-medium text-brand"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}