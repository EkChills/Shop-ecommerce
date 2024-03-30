"use client"


import React, { useRef, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { Loader2, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';


export default function SearchShop({className, ringStyles = 'ring-4 focus-visible:ring-4 focus-visible:ring-offset-8 ring-offset-8'}:{className?:string; ringStyles?:string}) {
  const [isSearching, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const defaultQuery = searchParams.get('query') ?? ''
  const [query, setQuery] = useState<string>(defaultQuery)
  const router = useRouter()
  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`)
    })
  }
  return (
    <div className={cn('', className)} >
        <Input className={cn(` min-w-[20rem] w-[100%] sm:min-w-[22rem] lg:min-w-[32rem] max-w-[40rem] z-50 ring-offset focus-visible:ring-gray-300 ring-gray-300 ${ringStyles} text-black/80 font-semibold text-lg antialiased `)} value={query} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value)
        }} onKeyDown={(e) => {
          if(e.key === 'Enter') {
            search()
          }
          if(e.key === 'Escape') {
            inputRef.current?.blur()
          }
        }} ref={inputRef} />
        <Button
          disabled={isSearching}
          size='sm'
          onClick={search}
          className='absolute right-0 inset-y-0 h-full rounded-l-none'>
          {isSearching ? <Loader2 className='h-6 w-6 animate-spin' /> : <Search className='h-6 w-6' />}
        </Button>
        {/* <Search className='absolute left-3 top-[50%] w-[1.2rem] h-[1.2rem] font-semibold translate-y-[-50%] text-black/70' /> */}
    </div>
  )
}
