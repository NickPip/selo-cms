import { About } from '@/components/landing/About'
import { Contact } from '@/components/landing/Contact'
import { Features } from '@/components/landing/Features'
import { Footer } from '@/components/landing/Footer'
import { Hero2 } from '@/components/landing/Hero2'
import { Services } from '@/components/landing/Services'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero2 />
      <Services />
      <Features />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
