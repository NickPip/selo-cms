'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CallPopup } from '@/components/landing/CallPopup'

function getInitialLanguage(): 'ka' | 'en' {
  const savedLanguage = localStorage.getItem('siteLanguage')
  if (savedLanguage === 'ka' || savedLanguage === 'en') return savedLanguage
  return 'ka'
}

export function About() {
  const [language, setLanguage] = useState<'ka' | 'en'>('ka')
  const [isVisible, setIsVisible] = useState(false)
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setLanguage(getInitialLanguage())

    const handleStorageChange = () => setLanguage(getInitialLanguage())
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ language: 'ka' | 'en' }>
      if (customEvent.detail?.language) setLanguage(customEvent.detail.language)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('siteLanguageChange', handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('siteLanguageChange', handleLanguageChange as EventListener)
    }
  }, [])

  useEffect(() => {
    const currentSection = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      },
    )

    if (currentSection) observer.observe(currentSection)
    return () => {
      if (currentSection) observer.unobserve(currentSection)
    }
  }, [])

  return (
    <section id="about" className="bg-white py-20" ref={sectionRef}>
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <div
              className={`text-sm tracking-wider text-gray-400 uppercase transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {language === 'ka' ? 'ჩვენ შესახებ' : 'ABOUT US'}
            </div>

            <h2
              className={`text-3xl leading-tight text-slate-800 transition-all delay-100 duration-700 md:text-4xl lg:text-5xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {language === 'ka' ? (
                <>
                  მარტივი გადაწყვეტილები{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    რთული გამოწვევებისთვის
                  </span>
                </>
              ) : (
                <>
                  Simple solutions for{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    complex challenges
                  </span>
                </>
              )}
            </h2>

            <div
              className={`space-y-4 text-lg leading-relaxed text-gray-600 transition-all delay-200 duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {language === 'ka' ? (
                <p>
                  ციფრულ სამყაროში წარმატება სწორ ტექნოლოგიურ გადაწყვეტილებზე გადის. SELO ეხმარება კომპანიებს, დანერგონ ინოვაციური
                  სისტემები, გაამარტივონ პროცესები და შექმნან მომხმარებლის საუკეთესო გამოცდილება. ჩვენ არ ვწერთ მხოლოდ კოდს, ჩვენ
                  ვქმნით ბიზნეს ღირებულებას.
                </p>
              ) : (
                <p>
                  In the digital world, success depends on the right technology solutions. SELO helps companies implement innovative
                  systems, streamline processes, and create the best user experience. We don&apos;t just write code, we create business
                  value.
                </p>
              )}
            </div>

            <button
              className={`group mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-4 opacity-0'
              }`}
              onClick={() => setIsCallPopupOpen(true)}
            >
              {language === 'ka' ? 'უფასო კონსულტაცია' : 'Free Consultation'}
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </button>
          </div>

          <div
            className={`relative flex justify-center transition-all delay-200 duration-1000 lg:justify-end ${
              isVisible ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-8 scale-95 opacity-0'
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-br from-green-500 to-green-600 opacity-20 blur-xl" />
              <div className="relative flex h-[400px] w-[400px] items-center justify-center rounded-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl ring-8 ring-green-500/30 transition-all duration-500 hover:ring-green-500/50 lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.22),transparent_42%)]" />
                <div className="px-8 text-center text-white">
                  <p className="text-sm tracking-[0.18em] text-white/70 uppercase">SELO Team</p>
                  <p className="mt-3 text-3xl font-semibold">Build. Scale. Support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CallPopup isOpen={isCallPopupOpen} onClose={() => setIsCallPopupOpen(false)} />
    </section>
  )
}
