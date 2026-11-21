import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, moreText } from '../../utils/content'
import { Burst, Arrow } from './Doodles'

gsap.registerPlugin(ScrollTrigger)

const tilts = [-2, 4, -4]

export default function Projects() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const cleanups = []
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.burst-line').forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      gsap.utils.toArray('.project').forEach((card) => {
        const img = card.querySelector('.project-img')
        const tilt = parseFloat(img.dataset.tilt)
        const text = card.querySelectorAll('.project-text > *')
        const lines = card.querySelectorAll('.burst-line')
        const video = img.querySelector('video')

        gsap.set(img, { rotation: tilt })

        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: card, start: 'top 75%' },
          })
          .from(text, { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.1 })
          .from(img, { y: 80, autoAlpha: 0, rotation: tilt * 3, scale: 0.92, duration: 0.9 }, 0.1)

        const show = () => {
          if (video) video.play().catch(() => {})
          gsap.to(lines, {
            strokeDashoffset: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: true,
          })
        }

        const hide = () => {
          if (video) {
            video.pause()
            video.currentTime = 0
          }
          gsap.to(lines, {
            strokeDashoffset: (i, el) => el.getTotalLength(),
            duration: 0.25,
            overwrite: true,
          })
        }

        img.addEventListener('mouseenter', show)
        img.addEventListener('mouseleave', hide)
        cleanups.push(() => {
          img.removeEventListener('mouseenter', show)
          img.removeEventListener('mouseleave', hide)
        })

        gsap.to(img, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      gsap.to('.burst', {
        rotation: 6,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '0% 100%',
        stagger: 0.3,
      })

            gsap.to('.more-arrow', {
        y: -6,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.from('.more-text', {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.more-text', start: 'top 92%' },
      })
    }, root.current)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section id="next" ref={root} className="bg-white px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-24 md:gap-32">
        {projects.map((p, i) => {
          const imageLeft = i % 2 === 1
          return (
            <article
              key={p.tag}
              className="project grid items-center gap-12 md:grid-cols-2 md:gap-16"
            >
              <div className={`project-text ${imageLeft ? 'md:order-2' : 'md:order-1'}`}>
                <p className="text-sm font-bold uppercase tracking-wide text-brand">{p.tag}</p>
                <h3 className="mt-3 font-display text-3xl font-black leading-tight text-ink md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 font-hand text-lg text-hand">{p.stack}</p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-600">
                  {p.desc}
                </p>
              </div>

              <div
                data-tilt={tilts[i % tilts.length]}
                className={`project-img group relative ${imageLeft ? 'md:order-1' : 'md:order-2'}`}
              >
                <div className="absolute -inset-1 rounded-[32px] border-4 border-brand opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-90" />
                <img
                  src={p.image}
                  alt={p.title}
                  className="relative aspect-[16/10] w-full rounded-[28px] border-4 border-neutral-300/70 bg-neutral-100 object-cover shadow-2xl transition-colors duration-500 group-hover:border-brand"
                />
                {p.video && (
                  <video
                    src={p.video}
                    poster={p.image}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="pointer-events-none absolute inset-0 h-full w-full rounded-[28px] border-4 border-brand object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
                <Burst
                  flip={imageLeft}
                  className={`burst absolute -top-9 h-11 w-14 text-brand ${
                    imageLeft ? '-left-4' : '-right-4'
                  }`}
                />
              </div>
            </article>
          )
        })}

        <div className="more-text flex justify-center">
          <Link
            to="/work"
            className="group flex items-start gap-2 text-hand transition-colors duration-300 hover:text-brand"
          >
            <span className="font-hand text-2xl leading-none underline decoration-transparent decoration-wavy underline-offset-8 transition-all duration-300 group-hover:decoration-brand md:text-3xl">
              {moreText}
            </span>
            <Arrow
              variant="downRight"
              className="more-arrow mt-4 h-9 w-12 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}