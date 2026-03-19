'use client'

import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

function getInitialLanguage(): 'ka' | 'en' {
  const savedLanguage = localStorage.getItem('siteLanguage')
  if (savedLanguage === 'ka' || savedLanguage === 'en') return savedLanguage
  return 'ka'
}

export function Contact() {
  const [language, setLanguage] = useState<'ka' | 'en'>('ka')
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

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
        threshold: 0.15,
        rootMargin: '-50px',
      },
    )

    if (currentSection) observer.observe(currentSection)
    return () => {
      if (currentSection) observer.unobserve(currentSection)
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        window.alert(
          language === 'ka' ? 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.' : 'An error occurred. Please try again.',
        )
      }
    } catch {
      window.alert(language === 'ka' ? 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.' : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12 sm:py-16 md:px-8 md:py-20"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2
            className={`mb-4 text-4xl text-gray-800 transition-all duration-700 sm:text-5xl md:text-6xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {language === 'ka' ? 'დაგვიკავშირდით' : 'Get In Touch'}
          </h2>
          <p
            className={`mx-auto max-w-2xl px-4 leading-relaxed text-gray-600 transition-all delay-100 duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {language === 'ka'
              ? 'ჩვენ შევქმნით მაღალი ხარისხის IT გადაწყვეტილებებს თქვენი ბიზნესის ზრდისთვის. დაგვიკავშირდით და განვიხილოთ თქვენი პროექტი.'
              : 'We create high-quality IT solutions to help your business grow. Get in touch with us to discuss your project and requirements.'}
          </p>
        </div>

        <div
          className={`mx-auto grid max-w-5xl gap-0 overflow-hidden rounded-2xl bg-white shadow-2xl transition-all delay-200 duration-1000 sm:rounded-3xl md:grid-cols-2 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-700 p-8 text-white sm:p-10 md:p-12">
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-20 translate-y-20 animate-pulse rounded-full bg-white/10" />

            <div className="relative z-10">
              <h3
                className={`mb-4 text-2xl transition-all delay-300 duration-700 sm:text-3xl ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                }`}
              >
                {language === 'ka' ? 'საკონტაქტო ინფორმაცია' : 'Contact Information'}
              </h3>
              <p
                className={`mb-8 leading-relaxed text-white/90 transition-all delay-400 duration-700 sm:mb-12 ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                }`}
              >
                {language === 'ka'
                  ? 'დაგვიკავშირდით ნებისმიერი შეკითხვისთვის. ჩვენ ყოველთვის მზად ვართ დაგეხმაროთ.'
                  : 'Reach out to us for any inquiries. We are always ready to help you with your IT needs.'}
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div
                  className={`flex items-start gap-4 transition-all delay-500 duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                  }`}
                >
                  <div className="rounded-lg bg-white/20 p-3 transition-colors duration-300 hover:bg-white/30">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-white/80">{language === 'ka' ? 'ტელეფონი' : 'Phone'}</p>
                    <p className="text-sm text-white sm:text-base">+995 599 123 456</p>
                    <p className="text-sm text-white sm:text-base">+995 577 987 654</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 transition-all delay-600 duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                  }`}
                >
                  <div className="rounded-lg bg-white/20 p-3 transition-colors duration-300 hover:bg-white/30">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-white/80">{language === 'ka' ? 'ელ-ფოსტა' : 'Email'}</p>
                    <p className="text-sm text-white sm:text-base">info@selo.ge</p>
                    <p className="text-sm text-white sm:text-base">support@selo.ge</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 transition-all delay-700 duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                  }`}
                >
                  <div className="rounded-lg bg-white/20 p-3 transition-colors duration-300 hover:bg-white/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-white/80">{language === 'ka' ? 'მისამართი' : 'Address'}</p>
                    <p className="text-sm text-white sm:text-base">
                      {language === 'ka' ? 'თბილისი, საქართველო' : 'Tbilisi, Georgia'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div
                  className={`transition-all delay-300 duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <label htmlFor="name" className="mb-2 block text-sm text-gray-600">
                    {language === 'ka' ? 'თქვენი სახელი' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    placeholder={language === 'ka' ? 'სახელი გვარი' : 'John Doe'}
                    className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div
                  className={`transition-all delay-400 duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <label htmlFor="email" className="mb-2 block text-sm text-gray-600">
                    {language === 'ka' ? 'თქვენი ელ-ფოსტა' : 'Your Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    placeholder="hello@example.com"
                    className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div
                className={`transition-all delay-500 duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label htmlFor="subject" className="mb-2 block text-sm text-gray-600">
                  {language === 'ka' ? 'თქვენი თემა' : 'Your Subject'}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                  placeholder={language === 'ka' ? 'მაგ., ვებ აპლიკაციის დამზადება' : 'e.g., I want to hire you quickly'}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div
                className={`transition-all delay-600 duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label htmlFor="message" className="mb-2 block text-sm text-cyan-500">
                  {language === 'ka' ? 'შეტყობინება' : 'Message'}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  placeholder={language === 'ka' ? 'დაწერეთ თქვენი შეტყობინება აქ' : 'Write here your message'}
                  className="w-full resize-none border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:w-auto ${
                  isVisible ? 'translate-y-0 opacity-100 delay-700' : 'translate-y-4 opacity-0'
                }`}
              >
                {isSubmitting
                  ? language === 'ka'
                    ? 'იგზავნება...'
                    : 'Sending...'
                  : language === 'ka'
                    ? 'უფასო კონსულტაცია'
                    : 'Free Consultation'}
                <Send className="transition-transform group-hover:translate-x-1" size={18} />
              </button>

              {submitSuccess ? (
                <p className="text-sm text-emerald-600">
                  {language === 'ka' ? 'გმადლობთ! ჩვენ მალე დაგიკავშირდებით.' : 'Thank you! We will contact you soon.'}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
