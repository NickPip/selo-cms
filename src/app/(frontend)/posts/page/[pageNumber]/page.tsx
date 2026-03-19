import type { Metadata } from 'next/types'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export default function Page() {
  notFound()
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Not Found' }
}

export async function generateStaticParams() {
  return []
}
