import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resume } from '../../utils/content'
import { Arrow, Star } from './Doodles'

gsap.registerPlugin(ScrollTrigger)

function Section({ title, children }) {
  return (
    <section className="r-sec border-t border-neutral-200 py-7">
      <h2 className="mb-4 font-hand text-xl text-brand">{title}</h2>
      {children}
    </section>
  )
}

export default function Resume() {
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
        .from('.r-kicker', { y: 20, autoAlpha: 0, duration: 0.5 })
        .from('.r-line', { yPercent: 110, duration: 0.7, stagger: 0.1 }, 0.1)
        .from('.r-intro', { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.5)
        .from('.r-face', { scale: 0.6, autoAlpha: 0, duration: 0.8, ease: 'back.out(1.7)' }, 0.2)
        .from('.r-doodle', { y: -10, autoAlpha: 0, duration: 0.5 }, 0.5)
        .from('.star-wrap', { scale: 0, rotation: -90, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, 0.6)
        .from('.pill-wrap', { scale: 0.8, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.8)
        .to('.draw', { strokeDashoffset: 0, duration: 0.7, stagger: 0.1, ease: 'power2.inOut' }, 0.9)

      gsap.to('.r-face', {
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

      gsap.utils.toArray('.r-sec').forEach((el) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })

      gsap.utils.toArray('.r-chips').forEach((wrap) => {
        gsap.from(wrap.querySelectorAll('.r-chip'), {
          autoAlpha: 0,
          scale: 0.6,
          duration: 0.4,
          stagger: 0.04,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: wrap, start: 'top 92%' },
        })
      })

      gsap.from('.r-download', {
        y: 30,
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.r-download', start: 'top 98%' },
      })
    }, root.current)

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <main ref={root} className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-16">
        <header className="grid items-center gap-10 pb-10 pt-32 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="r-kicker font-hand text-lg text-hand">{resume.label}</p>

            <h1 className="mt-3 font-display text-4xl font-black leading-tight text-ink md:text-5xl">
              <span className="block overflow-hidden pb-1">
                <span className="r-line block">{resume.title[0]}</span>
              </span>
              <span className="block overflow-hidden pb-3">
                <span className="r-line relative inline-block text-brand">
                  {resume.title[1]}
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

            <div className="r-intro mt-6">
              <h3 className="font-display text-2xl font-bold text-ink">{resume.name}</h3>
              <p className="mt-1 text-[15px] text-neutral-500">{resume.role}</p>
            </div>

            <div className="r-intro mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {resume.contact.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand underline-offset-4 hover:underline"
                  >
                    {c.label}
                  </a>
                ) : (
                  <span key={c.label} className="text-neutral-500">
                    {c.label}
                  </span>
                ),
              )}
            </div>

            <a
              href={resume.file}
              download
              className="r-intro mt-6 inline-block rounded-full border border-brand px-7 py-2.5 font-hand text-lg text-brand transition-colors hover:bg-brand hover:text-white"
            >
              {resume.downloadLabel}
            </a>
          </div>

          <div className="flex flex-col items-center">
            <p className="r-doodle font-hand text-lg text-hand">{resume.doodle}</p>

            <div className="face-wrap relative mt-4">
              <img
                src="/myPhoto/PortA.png"
                alt="Subarat"
                className="r-face w-44 select-none md:w-56"
              />
              <span className="star-wrap absolute -right-8 top-0 h-10 w-10 text-brand">
                <Star className="star h-full w-full" />
              </span>
              <span className="star-wrap absolute -right-10 top-12 h-5 w-5 text-brand">
                <Star className="star h-full w-full" />
              </span>
            </div>

            <div className="pill-wrap relative mt-8">
              <Arrow variant="down" className="absolute -top-12 right-2 h-10 w-8 text-hand" />
              <div
                className="flex items-center gap-2 rounded-full border border-brand px-5 py-2 font-hand text-lg text-brand"
                style={{ transform: 'rotate(-4deg)' }}
              >
                <span className="h-2 w-2 rounded-full bg-brand" />
                {resume.pill}
              </div>
            </div>
          </div>
        </header>

        <Section title="Summary">
          <p className="max-w-3xl text-[15px] leading-relaxed text-neutral-600">{resume.summary}</p>
        </Section>

        <Section title="Skills">
          <div className="space-y-4">
            {resume.skills.map((s) => (
              <div key={s.group} className="r-chips grid gap-2 md:grid-cols-[170px_1fr]">
                <p className="font-display text-sm font-bold text-ink">{s.group}</p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((x) => (
                    <span
                      key={x}
                      className="r-chip rounded-full border border-brand/30 px-3 py-1 text-xs font-medium text-brand"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          <div className="space-y-7">
            {resume.experience.map((e) => (
              <div key={e.role + e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">{e.role}</h3>
                  <span className="font-hand text-base text-hand">{e.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-brand">
                  {e.company} · {e.place}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-600">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-3">
            {resume.education.map((e) => (
              <div key={e.title} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{e.title}</h3>
                  <p className="text-sm text-neutral-500">{e.place}</p>
                </div>
                <span className="font-hand text-base text-hand">{e.period}</span>
              </div>
            ))}
          </div>
        </Section>

        <div className="r-download mt-4 flex justify-center border-t border-neutral-200 pt-8">
          <a
            href={resume.file}
            download
            className="rounded-full bg-brand px-10 py-4 font-hand text-lg text-white transition-transform hover:scale-105"
          >
            {resume.downloadLabel}
          </a>
        </div>
      </div>
    </main>
  )
}