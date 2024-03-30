"use server"

import { env } from "@/env";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { totp } from "otplib";
import { sendMail } from "./nodemailer";
import { getOtpBody } from "./otpTemplate";
import { redirect } from "next/navigation";

export async function generateOtpAndSendMail(email:string) {
    const token = totp.generate(env.JWT_SECRET);
    await db
      .update(user)
      .set({ otp: token, otpExpiry: new Date(Date.now() + 600000) })
      .where(eq(user.email, email));

    // sending the email with nodemailer

    try {
      await sendMail({
        body: getOtpBody(token),
        name: "Chills Shop",
        subject: "Test mail",
        to: email,
      });

    } catch (error) {
      console.log(error);
      
    }
    redirect(`/verify-otp?email=${email}`)
}