import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { contactSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY || 're_placeholder_key'
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
    const contactEmailTo = process.env.CONTACT_EMAIL_TO || 'avighnaabhyasa@gmail.com'

    const isSupabaseConfigured =
      !!supabaseUrl &&
      !!serviceRoleKey &&
      !supabaseUrl.includes('your-project-ref') &&
      !supabaseUrl.includes('placeholder') &&
      !serviceRoleKey.includes('placeholder-key')

    const isResendConfigured =
      !!apiKey &&
      !apiKey.includes('placeholder') &&
      !apiKey.startsWith('re_xxx')

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

    // Database operation (with simulation fallback)
    if (isSupabaseConfigured) {
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
        console.error('Supabase insert error:', dbError)
        return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
      }
    } else {
      console.log('--- Supabase Inquiry Insertion (Simulated) ---')
      console.log({
        full_name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        inquiry_type,
        ip_address: ip,
        timestamp: new Date().toISOString(),
      })
      console.log('---------------------------------------------')
    }

    // Email dispatch operation (with simulation fallback)
    if (isResendConfigured) {
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
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      })
    } else {
      console.log('--- Resend Email Transmission (Simulated) ---')
      console.log({
        from: 'Avighna Abhyasa Website <onboarding@resend.dev>',
        to: contactEmailTo,
        replyTo: email,
        subject: subject || `New ${inquiry_type} inquiry from ${full_name}`,
        message,
        timestamp: new Date().toISOString(),
      })
      console.log('--------------------------------------------')
    }

    return NextResponse.json({ success: true, simulated: !isSupabaseConfigured || !isResendConfigured })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
