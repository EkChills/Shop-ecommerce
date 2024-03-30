import { login } from "@/lib/myauth";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { user } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { string, z } from "zod";

export const userRouter = createTRPCRouter({
    createUserAccount:publicProcedure.input(z.object({ email: z.string() })).mutation(async({ctx, input}) => {
        try {
            const dbUser = await ctx.db.query.user.findFirst({
                where:eq(user.email, input.email)
            })
            if(dbUser) throw new TRPCError({code:'FORBIDDEN'})
            await ctx.db.insert(user).values({email:input.email})
            return {
                success:true
            }
        } catch (error) {
            console.log(error);
            return {
                success:false
            }
        }
    }),
    loginUser:publicProcedure.input(z.object({email:z.string(), otp:z.string()})).mutation(async({ctx, input}) => {
        try {
            const dbUser = await ctx.db.query.user.findFirst({
                where:eq(user.email, input.email)
            })
            if(!dbUser) {
                throw new TRPCError({code:'BAD_REQUEST'})
            }
            if(new Date() > dbUser.otpExpiry!) {
                throw new TRPCError({code:'FORBIDDEN'})
            }
            if(dbUser.otp !== input.otp) {
                throw new TRPCError({ code:"BAD_REQUEST" });
            }
            await login(input.email)
            return {success:true}
        } catch (error) {
            console.log(error);
            return {success:false}
        }
    })
})