'use client'

import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

function getInitialLanguage(): 'ka' | 'en' {
  const savedLanguage = localStorage.getItem('siteLanguage')
  if (savedLanguage === 'ka' || savedLanguage === 'en') return savedLanguage
  return 'ka'
}

export function Footer() {
  const [language, setLanguage] = useState<'ka' | 'en'>('ka')

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

  const services = [
    { title: { ka: 'პროდუქტის დეველოპმენტი', en: 'Product Development' }, serviceIndex: 0 },
    { title: { ka: 'Frontend დეველოპმენტი', en: 'Frontend Development' }, serviceIndex: 3 },
    { title: { ka: 'ქსელი და უსაფრთხოება', en: 'Network & Security' }, serviceIndex: 7 },
    { title: { ka: 'DevOps და ავტომატიზაცია', en: 'DevOps & Automation' }, serviceIndex: 8 },
  ]

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleServiceClick(serviceIndex: number) {
    window.dispatchEvent(new CustomEvent('openServiceModal', { detail: { serviceIndex } }))
    scrollToSection('services')
  }

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 py-12 text-gray-300">
      <div className="container">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Image src="/images/hero/selo.png" alt="SELO" width={168} height={72} className="h-16 w-auto" />
            </div>
            <p className="text-sm">
              {language === 'ka' ? 'ციფრული ტრანსფორმაცია თქვენი ბიზნესისთვის' : 'Digital Transformation for Your Business'}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-white">{language === 'ka' ? 'სწრაფი ბმულები' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('services')} className="cursor-pointer transition-colors hover:text-blue-400">
                  {language === 'ka' ? 'სერვისები' : 'Services'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="cursor-pointer transition-colors hover:text-blue-400">
                  {language === 'ka' ? 'მახასიათებლები' : 'Features'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="cursor-pointer transition-colors hover:text-blue-400">
                  {language === 'ka' ? 'ჩვენ შესახებ' : 'About Us'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="cursor-pointer transition-colors hover:text-blue-400">
                  {language === 'ka' ? 'კონტაქტი' : 'Contact'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-white">{language === 'ka' ? 'სერვისები' : 'Services'}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title.en}>
                  <button
                    onClick={() => handleServiceClick(service.serviceIndex)}
                    className="text-left transition-colors hover:text-blue-400"
                  >
                    {service.title[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-white">{language === 'ka' ? 'სოციალური მედია' : 'Social Media'}</h3>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-all hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-all hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-all hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} SELO. {language === 'ka' ? 'ყველა უფლება დაცულია.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
