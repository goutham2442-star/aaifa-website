import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { contactSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    const apiKey = process.env.RESEND_API_KEY || ''
    const contactEmailTo = process.env.CONTACT_EMAIL_TO || 'avighnaabhyasa@gmail.com'

    const isSupabaseConfigured =
      !!supabaseUrl &&
      !!serviceRoleKey &&
      !supabaseUrl.includes('placeholder') &&
      !serviceRoleKey.includes('placeholder')

    const isResendConfigured =
      !!apiKey &&
      !apiKey.includes('placeholder') &&
      apiKey.startsWith('re_')

    // Validate request body
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { full_name, email, phone, subject, message, inquiry_type } = parsed.data
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

    // Save to Supabase
    if (isSupabaseConfigured) {
      try {
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
        const { error: dbError } = await supabaseAdmin.from('inquiries').insert({
          full_name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          inquiry_type,
          ip_address: ip,
        })

        if (dbError) {
          console.error('Supabase insert error:', dbError.message)
          // Continue — still try to send email
        }
      } catch (dbEx) {
        console.error('Supabase exception:', dbEx)
        // Continue — still try to send email
      }
    } else {
      console.log('[ContactForm] New submission (Supabase not configured):', {
        full_name, email, phone, subject, message, inquiry_type,
      })
    }

    // Send email via Resend
    if (isResendConfigured) {
      try {
        const resend = new Resend(apiKey)
        await resend.emails.send({
          from: 'Avighna Abhyasa Website <onboarding@resend.dev>',
          to: contactEmailTo,
          replyTo: email,
          subject: subject || `New ${inquiry_type} inquiry from ${full_name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Inquiry Type:</strong> ${inquiry_type}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        })
      } catch (emailEx) {
        console.error('Resend email error:', emailEx)
      }
    } else {
      console.log('[ContactForm] Email not sent (Resend not configured). Would send to:', contactEmailTo)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
