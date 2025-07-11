import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-3xl tracking-wider'>404</div>
      <div>The page you are looking for does not exist <Link href="/" className='text-base text-[#ffa70f]'>Back to Home</Link></div>
    </div>
  )
}

export default NotFoundPage