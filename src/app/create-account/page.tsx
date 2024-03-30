import React from 'react'
import SignIn from '../../components/SignIn'
import CreateAccount from '@/components/CreateAccount'

export default function CreateAccountPage() {
  return (
    <div className='fixed inset-0 w-full h-full overflow-hidden z-[-1] flex items-center justify-center'>
        <video id='background-video' className=' absolute min-w-[100%] min-h-[100%]  object-cover z-[-1]' autoPlay loop muted src='/cover-cross.mp4' />
        <CreateAccount />
    </div>
  )
}