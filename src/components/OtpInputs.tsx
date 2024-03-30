"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {useState} from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function OtpInputs({email}:{email:string}) {
  const [value, setValue] = useState("")
  const router = useRouter()


    async function handleOtpSubmit() {
      try {
       const res = await fetch('/api/loginOtp', {
          method:"POST",
          body:JSON.stringify({
            email, otp:value
          })
        })
        if(res.ok) {
          router.push('/')
        }
        
      } catch (error) {
        console.log(error);
        
      }
        console.log('compleeeted');
        
    }
  return (
    <InputOTP onChange={(value) => setValue(value)} onComplete={handleOtpSubmit} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup className="mt-2.5">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
