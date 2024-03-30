import React from 'react'
import SearchShop from './SearchShop'
import { Heart, ShoppingCart } from 'lucide-react'
import { getSession } from '@/lib/myauth'

export default async function Navbar() {
  const session = await getSession()
  console.log('session', session?.user?.email);
  
  return (
    <div className='flex justify-between items-center px-4 md:px-6 py-4 md:py-4'>
       <div className="flex items-center text-2xl font-bold text-blue-700 antialiased leading-[1] ">
        <span className='leading-[0]'>S</span>
        <span className='leading-[0]'>H</span>
        <span className="relative h-6 w-6 rounded-full bg-blue-700">
          <span className="absolute inset-[4px] rounded-full bg-white "></span>
        </span>
        <span>P</span>
      </div>
      <SearchShop className='relative' ringStyles='ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-black/5 ' />
      <div className='flex gap-4 items-center'>
        <Heart className='w-6 h-6' />
        <ShoppingCart className='w-6 h-6' />
        <span className='rounded-full bg-slate-200 w-8 h-8 flex justify-center items-center'>
          <span className='text-black/80 font-semibold text-base ' >{session?.user.email[0]}</span>
        </span>
      </div>
    </div>
  )
}
