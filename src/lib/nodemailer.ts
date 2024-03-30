import { env } from "@/env";
import nodemailer from "nodemailer";

// jackeline.cruickshank@ethereal.email
// qk43Ba5Kaf7DuX6UXr

// export const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'eldon.runolfsson70@ethereal.email',
//         pass: 'GM7mCdhqFeVsY6KW9x'
//     }
// });

export async function sendMail({
  to,
  body,
  name,
  subject,
}: {
  to: string;
  subject: string;
  name: string;
  body: string;
}) {
    const {SMTP_EMAIL,SMTP_PASSWORD} = env

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:SMTP_EMAIL,
            pass:SMTP_PASSWORD
        }
    })
    try {
        const testResult = await transport.verify()
        console.log(testResult);
        
    } catch (error) {
        console.log(error);
    }

    try {
       const sendResult = await transport.sendMail({
        from:SMTP_EMAIL,
        to,
        subject,
        html:body
       }) 
       console.log(sendResult);
       
    } catch (error) {
        console.log(error);
        
    }
}
