import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ message: 'Enter a valid email address.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: email } },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'newsletter-subscribers',
        data: { email },
        overrideAccess: true,
      })
    }

    return Response.json({ message: 'You are on the list.' })
  } catch (error) {
    console.error('Newsletter signup failed', error)
    return Response.json({ message: 'Signup could not be completed.' }, { status: 500 })
  }
}
