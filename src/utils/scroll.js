export function getSection(id) {
  const el = document.getElementById(id)
  if (el) return el
  if (id === 'about') return document.querySelector('footer')
  return null
}

export function scrollToSection(id) {
  if (id === 'home') {
    if (window.lenis) window.lenis.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = getSection(id)
  if (!el) return
  if (window.lenis) window.lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}