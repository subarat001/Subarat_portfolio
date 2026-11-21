import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SmoothScroll from './SmoothScroll'
import Navbar from './Navbar'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </SmoothScroll>
  )
}