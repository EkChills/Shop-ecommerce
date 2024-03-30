import React from "react";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { api } from "@/trpc/server";
import { z } from "zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { OtpInputs } from "./OtpInputs";

// jackeline.cruickshank@ethereal.email
// qk43Ba5Kaf7DuX6UXr

export default function VerifyOtp({ email }: { email: string }) {

  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <div
        
        className="flex flex-col items-center rounded-2xl bg-white p-8 antialiased shadow-lg"
      >
        <span className="relative h-6 w-6 rounded-full bg-blue-700">
          <span className="absolute inset-1 rounded-full bg-white"></span>
        </span>
        <h4 className="mt-4 text-center text-lg font-semibold text-black/80">
          Confirm its you
        </h4>
        <p className="mt-2 text-balance text-center text-sm font-semibold text-black/70">
          Enter the code sent to your email, <br />
          {email}
        </p>
        <div className="my-2.5 h-[1px] w-full min-w-[280px] bg-black/10" />
        <div className="flex w-full justify-between">
          <span className="max-w-44 truncate text-[.75rem] font-semibold text-black/70 antialiased">
            {email}
          </span>
          <span className="text-[.75rem] font-bold text-blue-700 antialiased">
            Change
          </span>
        </div>
        <div className="w-full">

        <OtpInputs email={email} />
        </div>
        <h4 className='text-xl font-bold text-center mt-4 text-blue-700'>shop</h4>

      </div>
    </div>
  );
}
