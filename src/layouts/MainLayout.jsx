import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/components/headers/header/Header'
import { Footer } from '@/components/footers/footer/Footer'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default MainLayout