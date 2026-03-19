import type { Metadata } from 'next/types'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export default function Page() {
  notFound()
}

export function generateMetadata(): Metadata {
  return { title: 'Not Found' }
}
