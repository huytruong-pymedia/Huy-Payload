'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Socials } from '@/components/Socials/Socials'

interface HeaderClientProps {
  data: Header
  siteSettings: any
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, siteSettings }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-4 flex justify-between">
        <Link href="/">
          <Logo
            className="invert dark:invert-0"
            logoUrl={siteSettings?.logo?.url}
          />
        </Link>
        <HeaderNav data={data} />

        <Socials socials={siteSettings?.socials} />

      </div>
    </header>
  )
}