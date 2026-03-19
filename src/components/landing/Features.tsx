'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

interface StatItem {
  number: string
  label: { ka: string; en: string }
}

interface ClientItem {
  name: string
  src: string
  width: number
  height: number
  sizeClassName: string
}

function getInitialLanguage(): 'ka' | 'en' {
  const savedLanguage = localStorage.getItem('siteLanguage')
  if (savedLanguage === 'ka' || savedLanguage === 'en') return savedLanguage
  return 'ka'
}

export function Features() {
  const [language, setLanguage] = useState<'ka' | 'en'>('ka')
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  const [isClientsVisible, setIsClientsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)

  const stats = useMemo<StatItem[]>(
    () => [
      { number: '10+', label: { ka: 'გუნდის გამოცდილება', en: 'Years of Experience' } },
      { number: '3+', label: { ka: 'ქვეყანა სადაც ვმუშაობთ', en: 'Countries Served' } },
      { number: '10+', label: { ka: 'წარმატებული პროექტი', en: 'Projects Delivered' } },
    ],
    [],
  )

  const clientLogos = useMemo<ClientItem[]>(
    () => [
      { name: 'Exzotron Technology', src: '/client-logos/exzotron.png', width: 160, height: 64, sizeClassName: 'h-28' },
      { name: 'Wissol', src: '/client-logos/wissol.png', width: 160, height: 64, sizeClassName: 'h-24' },
      { name: 'MG GPS', src: '/client-logos/mygps.png', width: 160, height: 64, sizeClassName: 'h-32' },
      { name: 'GEO GPS', src: '/client-logos/geogps.png', width: 160, height: 64, sizeClassName: 'h-36' },
      { name: 'Parvus Group', src: '/client-logos/parvus.png', width: 160, height: 64, sizeClassName: 'h-28' },
      { name: 'Wialon', src: '/client-logos/wialon.png', width: 160, height: 64, sizeClassName: 'h-24' },
    ],
    [],
  )

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
    const currentStatsRef = statsRef.current
    const currentClientsRef = clientsRef.current
    const observerOptions: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.2 }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsStatsVisible(true)
      })
    }, observerOptions)

    const clientsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsClientsVisible(true)
      })
    }, observerOptions)

    if (currentStatsRef) statsObserver.observe(currentStatsRef)
    if (currentClientsRef) clientsObserver.observe(currentClientsRef)

    return () => {
      if (currentStatsRef) statsObserver.unobserve(currentStatsRef)
      if (currentClientsRef) clientsObserver.unobserve(currentClientsRef)
    }
  }, [])

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 py-20"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mb-20" id="solutions">
          <h3 className="mb-8 tracking-wider text-white/90 uppercase">
            {language === 'ka' ? '/ჩვენი გამოცდილება' : '/OUR EXPERIENCE'}
          </h3>
          <div className="grid gap-6 md:grid-cols-3" ref={statsRef}>
            {stats.map((stat, index) => (
              <div
                key={`${stat.number}-${stat.label.en}`}
                className={`transform rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white/15 ${
                  isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 text-6xl text-white md:text-7xl">{stat.number}</div>
                <div className="text-lg text-white/90">{stat.label[language]}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-8 tracking-wider text-white/90 uppercase">
            {language === 'ka' ? '/მეგობარი კომპანიები' : '/OUR CLIENTS'}
          </h3>
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-6" ref={clientsRef}>
            {clientLogos.map((logo, index) => (
              <div
                key={logo.name}
                className={`flex transform items-center justify-center grayscale transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 ${
                  isClientsVisible ? 'translate-y-0 opacity-70' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.sizeClassName} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
