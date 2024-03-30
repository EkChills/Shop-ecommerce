import Navbar from '@/components/Navbar'
import React from 'react'

export default function Layout({children}:React.PropsWithChildren) {
  return (
    <main>
        <Navbar />
        {children}
    </main>
  )
}
