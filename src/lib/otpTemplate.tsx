export function getOtpBody(otp:string) {
    const template = `
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333333;
          padding: 20px;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          color: #333333;
          text-align: center;
        }
        
        p {
          line-height: 1.5;
        }
        
        .otp {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-top: 20px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>OTP Verification</h1>
        <p>Dear User,</p>
        <p>Please use the following One-Time Password (OTP) to verify your account:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for a limited time only. Please do not share it with anyone.</p>
        <p>Thank you for your cooperation.</p>
        <p>Best regards,<br>Your App Team</p>
      </div>
    </body>
  </html>
    `
    return template
}