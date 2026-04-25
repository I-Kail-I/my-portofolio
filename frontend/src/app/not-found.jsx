import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='w-full text-center space-y-5'>
      <h1 className='text-muted-foreground text-5xl font-bold font-mono'>404</h1>
      <p className='text-muted-foreground'>The page you&apos;re looking for doesn&apos;t exist.</p>

      <Link href="/" passHref>
        <Button size='lg' variant='ghost' className="cursor-pointer">Go back</Button>
      </Link>
    </div>
  )
}
