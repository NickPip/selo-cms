'use client'

import { ArrowRight, Check, Menu, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CallPopup } from '@/components/landing/CallPopup'
import Image from 'next/image'

interface LanguageItem {
  code: 'ka' | 'en'
  name: string
  flag: string
}

interface ServiceItem {
  ka: { badge: string; title: string; description: string }
  en: { badge: string; title: string; description: string }
}

export function Hero2() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [language, setLanguage] = useState<'ka' | 'en'>('ka')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false)
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages: LanguageItem[] = useMemo(
    () => [
      { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
    ],
    [],
  )

  const services: ServiceItem[] = useMemo(
    () => [
      {
        ka: {
          badge: 'აპლიკაციების დეველპმენტი',
          title: 'ვებ & მობილური\nაპლიკაციები',
          description: 'თანამედროვე და მასშტაბირებადი ვებ და მობილური აპლიკაციები თქვენი ბიზნესის ზრდისთვის',
        },
        en: {
          badge: 'Application Development',
          title: 'Web & Mobile\nApplications',
          description: 'Modern and scalable web and mobile applications for your business growth',
        },
      },
      {
        ka: {
          badge: 'პროდუქტის განვითარება',
          title: 'ინოვაციური\nპროდუქტები',
          description: 'თანამედროვე ტექნოლოგიებზე დაფუძნებული პროდუქტები, რომლებიც აძლევს კონკურენტულ უპირატესობას',
        },
        en: {
          badge: 'Product Development',
          title: 'Innovative\nProducts',
          description: 'Modern technology-based products that give you a competitive advantage',
        },
      },
      {
        ka: {
          badge: 'ავტომატიზაცია',
          title: 'პროცესების\nავტომატიზაცია',
          description: 'ბიზნეს პროცესების ოპტიმიზაცი, ავტომატიზაცია, სტაბილიზაცია, ხარსხიანი და ეფექტური პროცესების გაზრდისთვის',
        },
        en: {
          badge: 'Automation',
          title: 'Process\nAutomation',
          description: 'Business process optimization and automation to increase efficiency',
        },
      },
      {
        ka: {
          badge: 'CRM სისტემები',
          title: 'თქვენზე მორგებული\nCRM პლატფორმები',
          description: 'სრულად მორგებული CRM გადაწყვეტილებები თქვენი ბიზნესის სპეციფიკური საჭიროებებისთვის',
        },
        en: {
          badge: 'CRM Systems',
          title: 'Customized\nCRM Platforms',
          description: 'Fully customized CRM solutions for your business specific needs',
        },
      },
    ],
    [],
  )

  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage')
    if (savedLanguage === 'ka' || savedLanguage === 'en') setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [services.length])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
        setIsLanguageDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentContent = services[currentSlide][language]

  function handleMobileMenuClose() {
    setIsMobileMenuClosing(true)
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsMobileMenuClosing(false)
    }, 300)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 pt-20"
    >
      <div className="absolute left-1/4 top-1/4 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-purple-200/30 to-blue-200/25 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-blue-200/35 to-purple-200/30 blur-3xl" />

      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-white/30 backdrop-blur-sm'
        }`}
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/hero/selo.png"
                alt="SELO"
                width={144}
                height={64}
                className="h-14 w-auto sm:h-16"
                priority
              />
            </div>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
              {[
                { href: '#services', key: 'services', ka: 'სერვისები', en: 'Services' },
                { href: '#features', key: 'features', ka: 'გამოცდილება', en: 'Experience' },
                { href: '#about', key: 'about', ka: 'ჩვენ შესახებ', en: 'About Us' },
              ].map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="group relative text-sm text-gray-800 transition-colors hover:text-blue-600"
                >
                  {language === 'ka' ? item.ka : item.en}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 ${
                      activeSection === item.key ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <div
                className={`relative transition-all duration-500 ${scrolled ? 'translate-x-0' : 'translate-x-24'}`}
                ref={dropdownRef}
              >
                <button
                  className="rounded-md px-3 py-2 transition hover:bg-white/70"
                  onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
                >
                  {languages.find((lang) => lang.code === language)?.flag}
                </button>

                {isLanguageDropdownOpen ? (
                  <div className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          localStorage.setItem('siteLanguage', lang.code)
                          window.dispatchEvent(new CustomEvent('siteLanguageChange', { detail: { language: lang.code } }))
                          setIsLanguageDropdownOpen(false)
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-sm transition hover:bg-gray-50"
                      >
                        <span>{lang.flag}</span>
                        <span className="text-gray-800">{lang.name}</span>
                        {language === lang.code ? <Check className="ml-auto text-green-600" size={16} /> : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <button
                className={`rounded-lg bg-gradient-to-r from-[#0080FF] to-[#00D084] px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  scrolled ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'
                }`}
                onClick={() => setIsCallPopupOpen(true)}
              >
                {language === 'ka' ? 'კონტაქტი' : 'Contact'}
              </button>
            </div>

            <button
              className="p-2 text-gray-800 transition-colors hover:text-blue-600 md:hidden"
              onClick={() => (isMobileMenuOpen ? handleMobileMenuClose() : setIsMobileMenuOpen(true))}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen || isMobileMenuClosing ? (
          <div
            className={`absolute left-0 right-0 top-full border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:hidden ${
              isMobileMenuClosing ? 'animate-slideUp' : 'animate-slideDown'
            }`}
          >
            <div className="container space-y-4 py-6">
              <a href="#services" className="block border-b border-gray-100 py-3" onClick={handleMobileMenuClose}>
                {language === 'ka' ? 'სერვისები' : 'Services'}
              </a>
              <a href="#features" className="block border-b border-gray-100 py-3" onClick={handleMobileMenuClose}>
                {language === 'ka' ? 'გამოცდილება' : 'Experience'}
              </a>
              <a href="#about" className="block border-b border-gray-100 py-3" onClick={handleMobileMenuClose}>
                {language === 'ka' ? 'ჩვენ შესახებ' : 'About Us'}
              </a>
              <button
                className="block rounded-xl bg-gradient-to-r from-[#0080FF] to-[#00D084] px-8 py-3 text-center text-white"
                onClick={() => {
                  setIsCallPopupOpen(true)
                  handleMobileMenuClose()
                }}
              >
                {language === 'ka' ? 'კონტაქტი' : 'Contact'}
              </button>
            </div>
          </div>
        ) : null}
      </nav>

      <div className="container relative z-10 pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pt-32">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-h-[300px] space-y-6 text-center lg:min-h-0 lg:text-left">
            <div className="flex justify-center overflow-hidden lg:justify-start">
              <span className="animate-slideIn inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-gradient-to-r from-blue-600/10 to-green-600/10 px-4 py-2 text-sm text-blue-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-green-600" />
                {currentContent.badge}
              </span>
            </div>

            <h1
              key={`title-${currentSlide}-${language}`}
              className="animate-slideIn whitespace-pre-line px-2 text-4xl leading-tight tracking-tight text-gray-900 sm:text-5xl lg:px-0 lg:text-6xl"
            >
              {currentContent.title}
            </h1>

            <p
              key={`desc-${currentSlide}-${language}`}
              className="animate-slideIn mx-auto max-w-xl px-2 text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0 lg:px-0"
            >
              {currentContent.description}
            </p>

            <div className="flex flex-col justify-center gap-4 px-2 sm:flex-row lg:justify-start lg:px-0">
              <button
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setIsCallPopupOpen(true)}
              >
                {language === 'ka' ? 'დაგვიკავშირდით' : 'Get Started'}
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg"
              >
                {language === 'ka' ? 'გაიგე მეტი' : 'Learn More'}
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 lg:justify-start">
              {services.map((service, index) => (
                <button
                  key={service.en.badge}
                  onClick={() => setCurrentSlide(index)}
                  className={`group relative transition-all duration-500 ${index === currentSlide ? 'w-12' : 'w-3'}`}
                  aria-label={`Select slide ${index + 1}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentSlide ? 'bg-gradient-to-r from-blue-600 to-green-600' : 'bg-gray-300 group-hover:bg-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-8 flex items-center justify-center overflow-hidden lg:overflow-visible lg:mt-0 lg:justify-end">
            <div className="relative w-full max-w-[600px] lg:max-w-[1800px] lg:translate-x-[20%] lg:translate-y-[15%] lg:scale-150">
              <Image
                src="/images/hero/hero.png"
                alt="Selo hero visual"
                width={1400}
                height={1100}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <CallPopup isOpen={isCallPopupOpen} onClose={() => setIsCallPopupOpen(false)} />
    </section>
  )
}
