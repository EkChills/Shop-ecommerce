import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { db } from "@/server/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";
import { redirect } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { totp, authenticator } from "otplib";
import { env } from "@/env";
import { sendMail } from "@/lib/nodemailer";
import { getOtpBody } from "@/lib/otpTemplate";
import { generateOtpAndSendMail } from "@/lib/otpGenAndSendMail";

// jackeline.cruickshank@ethereal.email
// qk43Ba5Kaf7DuX6UXr

export default function SignIn() {
  async function signInAction(formData: FormData) {
    "use server";
    const formEmail = formData.get("email");
    const CreateAccountSchema = z.string();
    const parsedEmail = CreateAccountSchema.parse(formEmail);
    const genOtpWithEmail = generateOtpAndSendMail.bind(null, parsedEmail)

    console.log({ parsedEmail });

    const dbUser = await db.query.user.findFirst({
      where:eq(user.email, parsedEmail)
    })
    if(!dbUser) {
      redirect('/create-account')
    }
    // generating otp
   await genOtpWithEmail()
  }
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <form
        action={signInAction}
        className="flex flex-col items-center rounded-2xl bg-white p-8 antialiased shadow-lg"
      >
        <span className="relative h-6 w-6 rounded-full bg-blue-700">
          <span className="absolute inset-1 rounded-full bg-white"></span>
        </span>
        <h4 className="mt-4 text-center text-lg font-semibold text-black/80">
          Sign In with Shop
        </h4>
        <p className="mt-2 text-balance text-center text-sm font-semibold text-black/70">
          The easiest and most secure way to sign in <br />
          __no password needed.
        </p>
        <Input
          name="email"
          id="email"
          className="mt-4 border-2 border-black/20"
        />
        <SubmitButton />
        <h4 className="mt-4 text-center text-xl font-bold text-blue-700">
          shop
        </h4>
      </form>
    </div>
  );
}
