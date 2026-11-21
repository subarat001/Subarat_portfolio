import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Work from '../Pages/Work'
import Placeholder from '../Pages/Placeholder'
import Resume from '../components/ui/ResumeSection'

const pages = ['resume']

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/resume" element={<Resume />} />
        {pages.map((p) => (
          <Route key={p} path={`/${p}`} element={<Placeholder title={p} />} />
        ))}
      </Route>
    </Routes>
  )
}