"use client"

import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import {Loader2} from 'lucide-react'

export default function SubmitButton() {
    const {pending} = useFormStatus()
  return (
    <Button className='mt-2 w-full bg-[#045cb5]' size={'lg'} >{pending ? <Loader2 className='animate-spin w-4 h-4' /> : 'Continue'}</Button>
    )
}
