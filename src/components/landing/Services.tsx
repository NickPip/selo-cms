'use client'

import { ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { CallPopup } from '@/components/landing/CallPopup'

interface ServiceContent {
  title: { ka: string; en: string }
  description: { ka: string; en: string }
  features: { ka: string[]; en: string[] }
  imagePath: string
  bgClassName: string
}

function getServices(): ServiceContent[] {
  return [
    {
      title: { ka: 'პროდუქტის დეველოპმენტი', en: 'Product Development' },
      description: {
        ka: 'ჩვენ ვქმნით მასშტაბურ და ინოვაციურ პროდუქტებს, რომლებიც აკმაყოფილებენ თქვენი ბიზნესის უნიკალურ საჭიროებებს. სრული ციკლის დეველოპმენტი იდეიდან გამოშვებამდე.',
        en: 'We create scalable and innovative products that meet your unique business needs. Full-cycle development from concept to launch.',
      },
      features: {
        ka: [
          'სრული პროდუქტის დეველოპმენტი',
          'Agile მეთოდოლოგია',
          'MVP დეველოპმენტი',
          'პროდუქტის სტრატეგია',
          'ტექნიკური კონსულტაცია',
          'სკალირებადი არქიტექტურა',
        ],
        en: [
          'Full Product Development',
          'Agile Methodology',
          'MVP Development',
          'Product Strategy',
          'Technical Consulting',
          'Scalable Architecture',
        ],
      },
      imagePath: '/services/product.png',
      bgClassName: 'from-violet-600/95 via-indigo-600/90 to-blue-600/90',
    },
    {
      title: { ka: 'UX დიზაინი', en: 'UX Design' },
      description: {
        ka: 'ჩვენ ვქმნით მომხმარებელზე ორიენტირებულ გამოცდილებებს, რომლებიც აძლიერებენ ენგაჟმენტს და ზრდიან კონვერსიას. კვლევაზე დაფუძნებული UX დიზაინი.',
        en: 'We craft user-centered experiences that drive engagement and increase conversions. Research-driven UX design approach.',
      },
      features: {
        ka: [
          'მომხმარებლის კვლევა',
          'ინფორმაციის არქიტექტურა',
          'Wireframing & Prototyping',
          'Usability Testing',
          'User Journey Mapping',
          'UX აუდიტი',
        ],
        en: [
          'User Research',
          'Information Architecture',
          'Wireframing & Prototyping',
          'Usability Testing',
          'User Journey Mapping',
          'UX Audit',
        ],
      },
      imagePath: '/services/ux.png',
      bgClassName: 'from-fuchsia-600/95 via-purple-600/90 to-violet-600/90',
    },
    {
      title: { ka: 'UI დიზაინი', en: 'UI Design' },
      description: {
        ka: 'ვიზუალურად მიმზიდველი და ინტუიციური ინტერფეისები, რომლებიც ასახავენ თქვენი ბრენდის იდენტობას და უზრუნველყოფენ შესანიშნავ მომხმარებლის გამოცდილებას.',
        en: 'Visually appealing and intuitive interfaces that reflect your brand identity and ensure excellent user experience.',
      },
      features: {
        ka: ['ვიზუალური დიზაინი', 'დიზაინ სისტემები', 'ბრენდინგი', 'Responsive დიზაინი', 'ინტერაქციული ანიმაციები', 'UI კიტები'],
        en: ['Visual Design', 'Design Systems', 'Branding', 'Responsive Design', 'Interactive Animations', 'UI Kits'],
      },
      imagePath: '/services/ui.png',
      bgClassName: 'from-sky-600/95 via-cyan-600/90 to-teal-600/90',
    },
    {
      title: { ka: 'Frontend დეველოპმენტი', en: 'Frontend Development' },
      description: {
        ka: 'თანამედროვე ტექნოლოგიების გამოყენებით ვქმნით სწრაფ, რესპონსიულ და ინტერაქტიულ ვებ აპლიკაციებს მაღალი პერფორმანსით.',
        en: 'Building fast, responsive, and interactive web applications using modern technologies with high performance.',
      },
      features: {
        ka: [
          'React & Next.js დეველოპმენტი',
          'Responsive დიზაინი',
          'პერფორმანსის ოპტიმიზაცია',
          'PWA დეველოპმენტი',
          'Cross-browser თავსებადობა',
          'თანამედროვე CSS ფრეიმვორქები',
        ],
        en: [
          'React & Next.js Development',
          'Responsive Design',
          'Performance Optimization',
          'PWA Development',
          'Cross-browser Compatibility',
          'Modern CSS Frameworks',
        ],
      },
      imagePath: '/services/frontend.png',
      bgClassName: 'from-blue-600/95 via-indigo-600/90 to-violet-600/90',
    },
    {
      title: { ka: 'Backend დეველოპმენტი', en: 'Backend Development' },
      description: {
        ka: 'საიმედო და სკალირებადი სერვერული გადაწყვეტილებები, რომლებიც უზრუნველყოფენ თქვენი აპლიკაციის უსაფრთხოებას და სტაბილურობას.',
        en: 'Reliable and scalable server-side solutions that ensure your application security and stability.',
      },
      features: {
        ka: [
          'RESTful & GraphQL API',
          'მონაცემთა ბაზების დიზაინი',
          'Cloud Architecture',
          'მიკროსერვისების არქიტექტურა',
          'უსაფრთხოების იმპლემენტაცია',
          'API ინტეგაცია',
        ],
        en: [
          'RESTful & GraphQL API',
          'Database Design',
          'Cloud Architecture',
          'Microservices Architecture',
          'Security Implementation',
          'API Integration',
        ],
      },
      imagePath: '/services/backend.png',
      bgClassName: 'from-emerald-600/95 via-teal-600/90 to-cyan-600/90',
    },
    {
      title: { ka: 'მობილური დეველოპმენტი', en: 'Mobile Development' },
      description: {
        ka: 'ვქმნით მაღალი ხარისხის iOS და Android აპლიკაციებს, რომლებიც უზრუნველყოფენ შესანიშნავ მომხმარებლის გამოცდილებას ნებისმიერ მოწყობილობაზე.',
        en: 'Creating high-quality iOS and Android applications that deliver excellent user experience on any device.',
      },
      features: {
        ka: [
          'iOS & Android დეველოპმენტი',
          'React Native აპლიკაციები',
          'Cross-platform გადაწყვეტები',
          'Native პერფორმანსი',
          'App Store ოპტიმიზაცია',
          'Push Notifications',
        ],
        en: [
          'iOS & Android Development',
          'React Native Applications',
          'Cross-platform Solutions',
          'Native Performance',
          'App Store Optimization',
          'Push Notifications',
        ],
      },
      imagePath: '/services/mobile.png',
      bgClassName: 'from-orange-600/95 via-rose-600/90 to-fuchsia-600/90',
    },
    {
      title: { ka: 'ძირითადი ინფრასტრუქტურა და Cloud სერვისები', en: 'Core Infrastructure & Cloud' },
      description: {
        ka: 'საწარმოო დონის ინფრასტრუქტურა და ღრუბლოვანი გადაწყვეტილებები, რომლებიც უზრუნველყოფენ თქვენი ბიზნესის უწყვეტ მუშაობას და მასშტაბირებას.',
        en: 'Enterprise-grade infrastructure and cloud solutions that ensure continuous operation and scalability of your business.',
      },
      features: {
        ka: [
          'Systems Architect',
          'Windows/Linux სისტემების ადმინისტრირება',
          'ვირტუალიზაცია & VDI (VMware/Horizon)',
          'Backup & DR Engineer',
          'ღრუბლოვანი ინფრასტრუქტურა',
          'ინფრასტრუქტურის მონიტორინგი',
        ],
        en: [
          'Systems Architect',
          'Windows/Linux Systems Admin',
          'Virtualization & VDI (VMware/Horizon)',
          'Backup & DR Engineer',
          'Cloud Infrastructure',
          'Infrastructure Monitoring',
        ],
      },
      imagePath: '/services/cloud.png',
      bgClassName: 'from-slate-700/95 via-slate-800/90 to-zinc-800/90',
    },
    {
      title: { ka: 'ქსელი და კიბერუსაფრთხოება', en: 'Network & Security' },
      description: {
        ka: 'კომპლექსური ქსელური გადაწყვეტილებები და კიბერუსაფრთხოების სისტემები, რომლებიც იცავენ თქვენს ორგანიზაციას თანამედროვე საფრთხეებისგან.',
        en: 'Comprehensive network solutions and cybersecurity systems that protect your organization from modern threats.',
      },
      features: {
        ka: [
          'Network Engineer/Architect',
          'Security Engineer',
          'SIEM Engineer',
          'ქსელის დიზაინი და იმპლემენტაცია',
          'უსაფრთხოების აუდიტი',
          'საფრთხების მონიტორინგი',
        ],
        en: [
          'Network Engineer/Architect',
          'Security Engineer',
          'SIEM Engineer',
          'Network Design & Implementation',
          'Security Audit',
          'Threat Monitoring',
        ],
      },
      imagePath: '/services/server.png',
      bgClassName: 'from-red-600/95 via-rose-700/90 to-slate-800/90',
    },
    {
      title: { ka: 'DevOps და ოპერაციების ავტომატიზაცია', en: 'DevOps & Automation' },
      description: {
        ka: 'თანამედროვე DevOps პრაქტიკები და ავტომატიზაცია, რომლებიც აჩქარებენ დეველოპმენტის პროცესებს და ზრდიან ეფექტურობას.',
        en: 'Modern DevOps practices and automation that accelerate development processes and increase efficiency.',
      },
      features: {
        ka: [
          'DevOps / Web Infrastructure Engineer',
          'ITSM / Process Architect',
          'CI/CD Pipeline-ების დანერგვა',
          'ინფრასტრუქტურის როგორც კოდი',
          'პროცესების ავტომატიზაცია',
          'Container Orchestration',
        ],
        en: [
          'DevOps / Web Infrastructure Engineer',
          'ITSM / Process Architect',
          'CI/CD Pipeline Implementation',
          'Infrastructure as Code',
          'Process Automation',
          'Container Orchestration',
        ],
      },
      imagePath: '/services/devops.png',
      bgClassName: 'from-blue-700/95 via-indigo-700/90 to-cyan-700/90',
    },
    {
      title: { ka: 'სპეციალიზებული OT და ფიზიკური სისტემები', en: 'Specialized OT & Physical Systems' },
      description: {
        ka: 'ინდუსტრიული IoT და OT სისტემები, ფიზიკური უსაფრთხოება და სიმძლავრის ინფრასტრუქტურა საწარმოო გარემოსთვის.',
        en: 'Industrial IoT and OT systems, physical security and power infrastructure for production environments.',
      },
      features: {
        ka: [
          'IoT & OT Engineer',
          'Industrial IoT & Automation Lead',
          'Low Voltage / Physical Security Engineer',
          'UPS / Power Infrastructure Engineer',
          'ინდუსტრიული ქსელები',
          'SCADA სისტემები',
        ],
        en: [
          'IoT & OT Engineer',
          'Industrial IoT & Automation Lead',
          'Low Voltage / Physical Security Engineer',
          'UPS / Power Infrastructure Engineer',
          'Industrial Networks',
          'SCADA Systems',
        ],
      },
      imagePath: '/services/systems.png',
      bgClassName: 'from-amber-600/95 via-orange-700/90 to-red-700/90',
    },
  ]
}

function getInitialLanguage(): 'ka' | 'en' {
  const savedLanguage = localStorage.getItem('siteLanguage')
  if (savedLanguage === 'ka' || savedLanguage === 'en') return savedLanguage
  return 'ka'
}

export function Services() {
  const [language, setLanguage] = useState<'ka' | 'en'>('ka')
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const services = useMemo(() => getServices(), [])

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
    const handleOpenService = (event: Event) => {
      const customEvent = event as CustomEvent<{ serviceIndex: number }>
      const serviceIndex = customEvent.detail?.serviceIndex
      if (typeof serviceIndex !== 'number') return
      if (serviceIndex < 0 || serviceIndex >= services.length) return
      setSelectedService(serviceIndex)
    }

    window.addEventListener('openServiceModal', handleOpenService as EventListener)
    return () => window.removeEventListener('openServiceModal', handleOpenService as EventListener)
  }, [services.length])

  useEffect(() => {
    const currentRef = scrollRef.current
    const handleScroll = () => {
      if (!currentRef) return
      const scrollLeft = currentRef.scrollLeft
      const scrollWidth = currentRef.scrollWidth - currentRef.clientWidth
      setScrollProgress(scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0)
    }

    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      if (currentRef) currentRef.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const currentSection = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleCards.length === 0) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((previousCards) =>
                  previousCards.includes(index) ? previousCards : [...previousCards, index],
                )
              }, index * 120)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (currentSection) observer.observe(currentSection)
    return () => {
      if (currentSection) observer.unobserve(currentSection)
    }
  }, [services, visibleCards.length])

  return (
    <section id="services" className="bg-gradient-to-b from-purple-50/50 via-blue-50/30 to-white py-24">
      <div className="container">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex-1">
            <p className="mb-4 tracking-wide text-purple-600">
              {language === 'ka' ? '/რას ვთავაზობ' : '/Services We Offer'}
            </p>
            <h2 className="text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {language === 'ka' ? (
                <>
                  პროფესიონალური
                  <br />
                  სერვისები
                </>
              ) : (
                <>
                  Certified
                  <br />
                  Excellence
                </>
              )}
            </h2>
          </div>

          <div className="max-w-md flex-1">
            <p className="mb-6 leading-relaxed text-gray-600">
              {language === 'ka'
                ? 'მონაცემებზე დაფუძნებული IT გადაწყვეტილებებიდან პრევენციულ მომსახურებამდე, ყველაფერი დაფარულია. აირჩიეთ საიმედოობა, აირჩიეთ SELO.'
                : "From data-driven IT solutions to preventative maintenance, we've got you covered. Choose reliability, choose SELO."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="group flex items-center gap-2 text-purple-600 transition-colors hover:text-purple-700" href="#services">
                <span>{language === 'ka' ? 'ყველა სერვისი' : 'View All Services'}</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
              <a className="group flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700" href="#contact">
                <span>{language === 'ka' ? 'დაგვიკავშირდით' : 'Call For Booking'}</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative" ref={sectionRef}>
          <div className="scrollbar-hide -mx-6 overflow-x-auto px-6 pb-4" ref={scrollRef}>
            <div className="flex w-max gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title.en}
                  className={`group relative h-96 w-80 cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl ${
                    visibleCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: visibleCards.includes(index) ? '0ms' : `${index * 120}ms`,
                  }}
                >
                  <Image
                    src={service.imagePath}
                    alt={service.title[language]}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,.14),transparent_35%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/15" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <h3 className="pr-4 text-xl font-medium text-white">{service.title[language]}</h3>
                    <button
                      onClick={() => setSelectedService(index)}
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg transition-all duration-300 group-hover:scale-110 hover:from-purple-600 hover:to-blue-600"
                      aria-label="Open service details"
                    >
                      <ArrowRight className="text-white" size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-6 mt-8">
            <div className="h-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedService !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden rounded-t-3xl bg-slate-900">
              <Image
                src={services[selectedService].imagePath}
                alt={services[selectedService].title[language]}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              <button
                onClick={() => setSelectedService(null)}
                className="group absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
                aria-label="Close modal"
              >
                <X className="text-white" size={20} />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold text-white md:text-4xl">{services[selectedService].title[language]}</h2>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <p className="mb-8 text-lg leading-relaxed text-gray-700">{services[selectedService].description[language]}</p>

              <div className="mb-8">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  {language === 'ka' ? 'რას ვთავაზობთ:' : 'What We Offer:'}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {services[selectedService].features[language].map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                        <Check className="text-white" size={14} />
                      </div>
                      <span className="leading-relaxed text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                <button
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600 hover:shadow-xl"
                  onClick={() => {
                    setSelectedService(null)
                    setIsCallPopupOpen(true)
                  }}
                >
                  <span>{language === 'ka' ? 'დაგვიკავშირდით' : 'Get Started'}</span>
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-8 py-4 font-medium text-gray-700 transition-all duration-300 hover:border-purple-500 hover:text-purple-600"
                >
                  <span>{language === 'ka' ? 'დახურვა' : 'Close'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <CallPopup isOpen={isCallPopupOpen} onClose={() => setIsCallPopupOpen(false)} />
    </section>
  )
}
