// import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'


export type PageProps = {
  params: Promise<{ pageId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type ArchitectType = {
  id: string
  href: string
  name: string
  // photo: StaticImageData
  company: string
  description: ReactNode
}

