import { login } from "@/lib/myauth";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {email, otp}:{email:string; otp:string;} = await req.json() as {email: string, otp: string};
    try {
        const dbUser = await db.query.user.findFirst({
            where:eq(user.email, email)
        })
        if(!dbUser) {
            return new NextResponse('no user found', {status:400}) 
        }
        if(new Date() > dbUser.otpExpiry!) {
            return new NextResponse('Otp is expired', {status:401}) 
        }
        if(dbUser.otp !== otp) {
            return new NextResponse('no user found', {status:400}) 
        }
        await login(email)
        return NextResponse.json({success:true})
    } catch (error) {
        console.log(error);
        
    }
}