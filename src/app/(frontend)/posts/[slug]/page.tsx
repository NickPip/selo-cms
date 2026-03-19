import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return []
}

export default function Post() {
  notFound()
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Not Found' }
}
