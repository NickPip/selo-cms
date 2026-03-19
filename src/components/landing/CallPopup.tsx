'use client'

import { Mail, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CallPopupProps {
  isOpen: boolean
  onClose: () => void
}

function getInitialLanguage(): 'ka' | 'en' {
  const savedLanguage = localStorage.getItem('siteLanguage')
  if (savedLanguage === 'ka' || savedLanguage === 'en') return savedLanguage
  return 'ka'
}

export function CallPopup({ isOpen, onClose }: CallPopupProps) {
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

  if (!isOpen) return null

  return (
    <div className="animate-fadeIn fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="animate-slideIn relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 p-6 text-center text-white sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-16 sm:w-16">
            <Phone size={28} className="animate-pulse sm:size-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">{language === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}</h2>
          <p className="text-sm text-white/90 sm:text-base">
            {language === 'ka' ? 'აირჩიეთ სასურველი საკომუნიკაციო არხი' : 'Choose your preferred contact method'}
          </p>
        </div>

        <div className="space-y-3 p-4 sm:p-6">
          <a
            href="tel:+995599123456"
            className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-3 transition-all duration-300 hover:scale-105 hover:from-green-100 hover:to-green-200 hover:shadow-lg sm:gap-4 sm:p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 sm:h-12 sm:w-12">
              <Phone size={18} className="text-white sm:size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-gray-600 sm:text-sm">{language === 'ka' ? 'ძირითადი ნომერი' : 'Primary Number'}</div>
              <div className="truncate text-base font-semibold text-gray-900 sm:text-lg">+995 599 123 456</div>
            </div>
            <div className="flex-shrink-0 text-green-600 transition-transform group-hover:translate-x-1">→</div>
          </a>

          <a
            href="tel:+995577987654"
            className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-3 transition-all duration-300 hover:scale-105 hover:from-blue-100 hover:to-blue-200 hover:shadow-lg sm:gap-4 sm:p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 sm:h-12 sm:w-12">
              <Phone size={18} className="text-white sm:size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-gray-600 sm:text-sm">
                {language === 'ka' ? 'ალტერნატიული ნომერი' : 'Alternative Number'}
              </div>
              <div className="truncate text-base font-semibold text-gray-900 sm:text-lg">+995 577 987 654</div>
            </div>
            <div className="flex-shrink-0 text-blue-600 transition-transform group-hover:translate-x-1">→</div>
          </a>

          <a
            href="mailto:info@selo.ge"
            className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100 p-3 transition-all duration-300 hover:scale-105 hover:from-cyan-100 hover:to-cyan-200 hover:shadow-lg sm:gap-4 sm:p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 sm:h-12 sm:w-12">
              <Mail size={18} className="text-white sm:size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-gray-600 sm:text-sm">{language === 'ka' ? 'ელ-ფოსტა' : 'Email'}</div>
              <div className="truncate text-base font-semibold text-gray-900 sm:text-lg">info@selo.ge</div>
            </div>
            <div className="flex-shrink-0 text-cyan-600 transition-transform group-hover:translate-x-1">→</div>
          </a>

          <a
            href="https://wa.me/995599123456"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 p-3 transition-all duration-300 hover:scale-105 hover:from-emerald-100 hover:to-emerald-200 hover:shadow-lg sm:gap-4 sm:p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 sm:h-12 sm:w-12">
              <MessageCircle size={18} className="text-white sm:size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-gray-600 sm:text-sm">WhatsApp</div>
              <div className="text-base font-semibold text-gray-900 sm:text-lg">{language === 'ka' ? 'დაწერეთ ჩვენ' : 'Message Us'}</div>
            </div>
            <div className="flex-shrink-0 text-emerald-600 transition-transform group-hover:translate-x-1">→</div>
          </a>
        </div>

        <div className="px-4 pb-4 text-center text-xs text-gray-500 sm:px-6 sm:pb-6 sm:text-sm">
          {language === 'ka' ? 'ჩვენ მზად ვართ დაგეხმაროთ 24/7' : 'We are ready to help you 24/7'}
        </div>
      </div>
    </div>
  )
}
