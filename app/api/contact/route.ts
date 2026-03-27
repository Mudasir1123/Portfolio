import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // SMTP Configuration optimized for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify connection configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('Nodemailer Verification Error:', verifyError)
      return NextResponse.json(
        { error: 'SMTP connection failed. Check your credentials in .env.local.' },
        { status: 500 }
      )
    }

    const mailOptions = {
      from: `"${name}" <${process.env.FROM_EMAIL || 'mudasirhanif5438@gmail.com'}>`, // sender address
      to: process.env.CONTACT_EMAIL || 'mudasirhanif5438@gmail.com', // list of receivers
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f7f9fc; }
              .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
              .header { background: linear-gradient(135deg, #000000 0%, #333333 100%); color: #ffffff; padding: 40px 20px; text-align: center; }
              .header h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
              .content { padding: 40px; }
              .field { margin-bottom: 25px; }
              .label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888; letter-spacing: 1px; margin-bottom: 8px; }
              .value { font-size: 16px; color: #333; font-weight: 500; }
              .message-box { background: #fcfcfc; border: 1px solid #eeeeee; padding: 20px; border-radius: 8px; color: #444; font-style: italic; white-space: pre-wrap; margin-top: 10px; border-left: 4px solid #000; }
              .footer { background: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eeeeee; }
              .badge { display: inline-block; padding: 4px 12px; background: #000000; color: #fff; border-radius: 20px; font-size: 10px; font-weight: bold; margin-bottom: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="badge">NEW SUBMISSION</div>
                <h2>Contact Form Request</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Sender Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Message Details</div>
                  <div class="message-box">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent from your Portfolio Contact Form.</p>
                <p>&copy; ${new Date().getFullYear()} M Mudasir Portfolio</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('SMTP Error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please check your SMTP configuration.' },
      { status: 500 }
    )
  }
}
