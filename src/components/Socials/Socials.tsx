'use client'

import Link from 'next/link'
import Image from 'next/image'


interface SocialItem {
  label?: string
  link?: string
  icon?: {
    url?: string
  }
}

export const Socials = ({ socials }: { socials?: SocialItem[] }) => {
  if (!socials?.length) return null

  return (
    <div className="flex items-center justify-between gap-4">
      {socials.map((item, index) => (
       <Link
            key={index}
            href={item.link || '#'}
            target="_blank"
            className="group flex items-center justify-center w-8 h-8 bg-white rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
            >
            {item.icon?.url && (
                <Image
                    src={item.icon.url}
                    alt="social"
                    width={16}
                    height={16}
                    className="object-contain transition-transform duration-200 group-hover:scale-110"
                />
            )}
        </Link>
      ))}                       
    </div>
  )
}