import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { work, workProjects, moreText } from '../utils/content'
import { Ring, Arrow } from '../components/ui/Doodles'

gsap.registerPlugin(ScrollTrigger, Draggable)

const total = workProjects.length
const rots = [-3, 2, -1.5, 3, 1.5, -2.5, 2.5, -1]
const pad = (n) => String(n + 1).padStart(2, '0')

const dots = {
  backgroundImage: 'radial-gradient(#1f213322 1.5px, transparent 1.5px)',
  backgroundSize: '18px 18px',
}

const tabLabel = { reel: 'Reel', stills: 'Stills', live: 'Live' }

const tabsFor = (p) => {
  const t = []
  if (p.video) t.push('reel')
  if (p.images && p.images.length) t.push('stills')
  if (p.embed && p.link) t.push('live')
  return t
}

const pill =
  'rounded-full bg-ink/85 px-4 py-1.5 font-hand text-base text-white transition-colors hover:bg-brand'

function PlayIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  )
}

function Sticky({ big, small }) {
  return (
    <div className="sticky-note relative hidden w-40 shrink-0 bg-brand px-4 py-5 text-white shadow-[4px_4px_0_0_#1f2133] lg:block">
      <span className="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 bg-white/60" />
      <p className="font-display text-3xl font-black leading-none">{big}</p>
      <p className="mt-1 font-hand text-lg leading-tight">{small}</p>
    </div>
  )
}

function Stills({ images, title }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3400)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div
      className="absolute inset-0 cursor-pointer bg-ink"
      onClick={() => setI((n) => (n + 1) % images.length)}
    >
      {images.map((src, k) => (
        <img
          key={src}
          src={src}
          alt={`${title} screenshot ${k + 1}`}
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{
            opacity: k === i ? 1 : 0,
            transform: k === i ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 0.7s ease, transform 6s ease-out',
          }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((src, k) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                k === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Live({ src, title }) {
  const box = useRef(null)
  const [scale, setScale] = useState(0.5)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1280))
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden bg-white">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="origin-top-left border-0"
        style={{
          width: 1280,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
          pointerEvents: on ? 'auto' : 'none',
        }}
      />
      <div className="absolute bottom-3 left-3 flex gap-2">
        <button onClick={() => setOn((v) => !v)} className={pill}>
          {on ? 'Lock' : 'Interact'}
        </button>
        <a href={src} target="_blank" rel="noreferrer" className={pill}>
          Open ↗
        </a>
      </div>
    </div>
  )
}

function Thumb({ p }) {
  if (p.images && p.images.length)
    return (
      <img
        src={p.images[0]}
        alt=""
        draggable={false}
        className="h-full w-full select-none object-cover object-top"
      />
    )
  if (p.video)
    return (
      <video
        src={p.video}
        poster={p.poster || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    )
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5" style={dots}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-brand">
        <PlayIcon className="ml-0.5 h-4 w-4" />
      </span>
      <span className="font-hand text-base text-hand">{p.link ? 'Live site' : 'Reel soon'}</span>
    </div>
  )
}

function Card({ p, i, onOpen, dragOn, zTop }) {
  const enter = (e) => {
    const el = e.currentTarget
    gsap.set(el, { zIndex: ++zTop.current })
    gsap.to(el, { rotation: 0, scale: 1.04, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    const v = el.querySelector('video')
    if (v) v.play().catch(() => {})
  }

  const leave = (e) => {
    const el = e.currentTarget
    gsap.to(el, {
      rotation: Number(el.dataset.rot),
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    const v = el.querySelector('video')
    if (v) v.pause()
  }

  return (
    <article
      data-i={i}
      data-rot={rots[i % rots.length]}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={() => {
        if (!dragOn.current) onOpen(i)
      }}
      className={`desk-card group relative cursor-pointer select-none rounded-2xl border-2 border-ink bg-white p-3 shadow-[5px_5px_0_0_var(--color-brand)] md:cursor-grab md:active:cursor-grabbing ${
        i % 2 ? 'md:mt-8' : ''
      }`}
    >
      <span className="absolute -top-3 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-2 bg-brand/25" />
      <span className="absolute -left-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-black text-white">
        {pad(i)}
      </span>

      <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-ink bg-cream">
        <Thumb p={p} />
        {p.link && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full border border-ink bg-white/90 px-2 py-0.5 font-hand text-xs leading-none text-ink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            Live
          </span>
        )}
      </div>

      <div className="px-1 pb-1 pt-3">
        <p className="font-hand text-base leading-none text-brand">{p.tag}</p>
        <h3 className="mt-1 line-clamp-2 font-display text-base font-black leading-tight text-ink">
          {p.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {p.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/40 px-2 font-hand text-sm text-hand"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-2 font-hand text-base text-brand transition-opacity md:opacity-0 md:group-hover:opacity-100">
          Open case file →
        </p>
      </div>
    </article>
  )
}

function CaseFile({ i, onClose, onStep }) {
  const p = workProjects[i]
  const tabs = tabsFor(p)
  const [tab, setTab] = useState(tabs[0])
  const back = useRef(null)
  const panel = useRef(null)

  useLayoutEffect(() => {
    gsap.fromTo(back.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 })
    gsap.fromTo(
      panel.current,
      { y: 50, scale: 0.92, rotation: -1.5, autoAlpha: 0 },
      { y: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.4)' },
    )
  }, [])

  return (
    <div
      ref={back}
      className="fixed inset-0 z-[100] flex overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panel}
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto w-full max-w-6xl rounded-3xl border-2 border-ink bg-cream p-5 shadow-[8px_8px_0_0_var(--color-brand)] md:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white font-hand text-xl leading-none transition-colors hover:bg-brand hover:text-white"
        >
          ✕
        </button>

        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-brand" />
              <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-white">
                <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-4 py-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink bg-brand" />
                  <span className="ml-3 min-w-0 truncate rounded-full border border-ink/30 bg-white px-4 py-0.5 font-hand text-sm text-hand">
                    {p.url}
                  </span>
                  {tabs.length > 0 && (
                    <div className="ml-auto flex shrink-0 gap-1">
                      {tabs.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`flex items-center gap-1.5 rounded-full border-2 border-ink px-2.5 py-0.5 font-hand text-sm leading-none transition-colors ${
                            tab === t ? 'bg-ink text-cream' : 'text-ink hover:bg-ink/10'
                          }`}
                        >
                          {t === 'live' && (
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                          )}
                          {tabLabel[t]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative aspect-video bg-cream">
                  {tab === 'reel' && (
                    <video
                      src={p.video}
                      poster={p.poster || undefined}
                      controls
                      autoPlay
                      playsInline
                      className="h-full w-full bg-ink object-cover"
                    />
                  )}
                  {tab === 'stills' && <Stills images={p.images} title={p.title} />}
                  {tab === 'live' && <Live src={p.link} title={p.title} />}
                  {!tab && (
                    <div
                      className="flex h-full w-full flex-col items-center justify-center gap-3"
                      style={dots}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand text-brand md:h-20 md:w-20">
                        <PlayIcon className="ml-1 h-6 w-6 md:h-9 md:w-9" />
                      </span>
                      <span className="font-hand text-lg text-hand md:text-xl">
                        Demo reel coming soon
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <span
              className="block font-display text-6xl font-black leading-none md:text-7xl"
              style={{ WebkitTextStroke: '2px var(--color-brand)', color: 'transparent' }}
            >
              {pad(i)}
            </span>
            <p className="mt-3 font-hand text-xl text-brand">{p.tag}</p>
            <h3 className="mt-1 font-display text-2xl font-black leading-tight text-ink md:text-3xl">
              {p.title}
            </h3>
            <p className="mt-3 text-base leading-snug text-hand">{p.summary}</p>

            <ul className="mt-4 space-y-2">
              {p.built.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-snug text-ink">
                  <span className="mt-0.5 font-hand text-lg leading-none text-brand">→</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border-2 border-ink px-3 py-0.5 font-hand text-base text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-hand text-xl text-brand underline-offset-4 hover:underline"
              >
                Visit live site <span>↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4 font-hand text-xl text-ink">
          <button onClick={() => onStep(-1)} className="transition-colors hover:text-brand">
            ← Previous
          </button>
          <span className="text-hand">
            {pad(i)} / {pad(total - 1)}
          </span>
          <button onClick={() => onStep(1)} className="transition-colors hover:text-brand">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const root = useRef(null)
  const desk = useRef(null)
  const dragOn = useRef(false)
  const zTop = useRef(20)
  const [open, setOpen] = useState(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.desk-card', { rotation: (i) => rots[i % rots.length] })
      gsap.set('.sticky-note', { rotation: (i) => [-4, 3][i % 2] })

      gsap.from('.work-head-c > *', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })

      const ringPath = root.current.querySelector('.work-tag .draw')
      const ringLen = ringPath.getTotalLength()
      gsap.fromTo(
        ringPath,
        { strokeDasharray: ringLen, strokeDashoffset: ringLen },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: 0.3,
          ease: 'power2.inOut',
          clearProps: 'strokeDasharray,strokeDashoffset',
        },
      )

      const scribble = root.current.querySelector('.scribble')
      const sLen = scribble.getTotalLength()
      gsap.fromTo(
        scribble,
        { strokeDasharray: sLen, strokeDashoffset: sLen },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          delay: 0.9,
          ease: 'power2.inOut',
          clearProps: 'strokeDasharray,strokeDashoffset',
        },
      )

      gsap.from('.sticky-note', {
        scale: 0,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.5,
        ease: 'back.out(1.7)',
      })

      gsap.from('.desk-card', {
        y: -120,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '.desk', start: 'top 85%' },
      })

      gsap.from('.work-more', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work-more', start: 'top 92%' },
      })
    }, root.current)

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      dragOn.current = true
      const list = Draggable.create(root.current.querySelectorAll('.desk-card'), {
        type: 'x,y',
        bounds: desk.current,
        edgeResistance: 0.75,
        onPress() {
          gsap.set(this.target, { zIndex: ++zTop.current })
          gsap.to(this.target, { rotation: 0, scale: 1.05, duration: 0.2, overwrite: 'auto' })
        },
        onRelease() {
          gsap.to(this.target, {
            rotation: Number(this.target.dataset.rot),
            scale: 1,
            duration: 0.3,
            overwrite: 'auto',
          })
        },
        onClick() {
          setOpen(Number(this.target.dataset.i))
        },
      })
      return () => {
        list.forEach((d) => d.kill())
        dragOn.current = false
      }
    })

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (window.lenis) open !== null ? window.lenis.stop() : window.lenis.start()
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((n) => (n + 1) % total)
      if (e.key === 'ArrowLeft') setOpen((n) => (n - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(
    () => () => {
      if (window.lenis) window.lenis.start()
    },
    [],
  )

  const tidy = () => {
    gsap.to(root.current.querySelectorAll('.desk-card'), {
      x: 0,
      y: 0,
      scale: 1,
      rotation: (i, el) => Number(el.dataset.rot),
      duration: 0.9,
      ease: 'elastic.out(1, 0.65)',
      stagger: 0.04,
      overwrite: true,
    })
  }

  return (
    <main ref={root} className="relative overflow-x-clip bg-cream px-5 pb-24 pt-28 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-10">
          {/* <Sticky big="2,000+" small="APIs integrated" /> */}

          <div className="work-head-c flex flex-col items-center text-center">
            <div className="work-tag relative px-8 py-2.5">
              <Ring className="absolute inset-0 h-full w-full text-brand" />
              <span className="relative font-hand text-lg text-ink">{work.tag}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-black leading-[1.1] text-ink md:text-5xl">
              {work.title[0]}{' '}
              <span className="relative inline-block text-brand">
                {work.title[1]}
                <svg
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path className="scribble" d="M4 9 C 60 2, 120 12, 180 5 S 270 8, 296 4" />
                </svg>
              </span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-snug text-hand md:text-base">{work.text}</p>
          </div>

          {/* <Sticky big="200+" small="REST APIs built" /> */}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 font-hand text-xl text-hand">
            <Arrow variant="down" className="h-9 w-7" />
            <span className="md:hidden">Tap a card to open it</span>
            <span className="hidden md:inline">Drag cards around, click to open</span>
          </div>
          <button
            onClick={tidy}
            className="hidden rounded-full border-2 border-ink px-5 py-1 font-hand text-lg text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white md:inline-flex"
          >
            Tidy up
          </button>
        </div>

        <div
          ref={desk}
          className="desk relative mt-6 rounded-[2rem] border-2 border-dashed border-ink/20 p-5 md:p-10"
          style={dots}
        >
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {workProjects.map((p, i) => (
              <Card key={p.id} p={p} i={i} onOpen={setOpen} dragOn={dragOn} zTop={zTop} />
            ))}
          </div>
        </div>

        <p className="work-more mt-20 text-center font-hand text-2xl text-hand md:text-3xl">
          {moreText}
        </p>
      </div>

      {open !== null && (
        <CaseFile
          key={workProjects[open].id}
          i={open}
          onClose={() => setOpen(null)}
          onStep={(d) => setOpen((n) => (n + d + total) % total)}
        />
      )}
    </main>
  )
}