import React from 'react'
import { Input } from './ui/input'
import SubmitButton from './SubmitButton'
import { api } from '@/trpc/server'
import { z } from 'zod'
import { generateOtpAndSendMail } from '@/lib/otpGenAndSendMail'

// jackeline.cruickshank@ethereal.email
// qk43Ba5Kaf7DuX6UXr 

export default  function CreateAccount() {
  async function createAccountAction(formData:FormData) {
    "use server"

    const formEmail = formData.get("email")
    const CreateAccountSchema = z.string()
    const parsedEmail = CreateAccountSchema.parse(formEmail)
    const genOtpWithEmail = generateOtpAndSendMail.bind(null, parsedEmail)

    await api.user.createUserAccount({email:parsedEmail})

    // generate the otp after creating the account and mail it to the created account

    await genOtpWithEmail()
  }
  return (
    <div className='min-h-[100dvh] flex items-center justify-center'>
        <form action={createAccountAction} className='rounded-2xl p-8 bg-white shadow-lg antialiased flex flex-col items-center'>
            <span className='bg-blue-700 w-6 h-6 rounded-full relative'>
                <span className='absolute inset-1 bg-white rounded-full' ></span>
            </span>
            <h4 className='text-lg font-semibold text-center mt-4 text-black/80'>Create an account</h4>
            <p className='text-balance text-center text-sm text-black/70 font-semibold mt-2'>The easiest and most secure way to sign in <br />__no password needed.</p>
            <Input name='email' id='email' className='mt-4 border-black/20 border-2' />
            <SubmitButton />
            <p className='text-[.75rem] text-black/70 text-center font-semibold text-balance mt-2'>By continuing, you agree to the <span className='text-blue-700'>Terms of Service</span> <br />and acknowledge the <span className='text-blue-700'>Privacy Policy</span></p>
            <h4 className='text-xl font-bold text-center mt-4 text-blue-700'>shop</h4>
        </form>
    </div>
  )
}
