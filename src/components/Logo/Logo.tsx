'use client'

import Image from 'next/image'
import clsx from 'clsx'

interface Props {
  className?: string
  logoUrl?: string | null
  priority?: boolean
}

export const Logo = ({
  className,
  logoUrl,
  priority = false,
}: Props) => {
  const src =
    logoUrl ||
    'https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-logo-light.svg'

  return (
    <Image
      src={src}
      alt="Site Logo"
      width={193}
      height={34}
      priority={priority}
      className={clsx('max-w-[150px] w-full h-auto', className)}
    />
  )
}