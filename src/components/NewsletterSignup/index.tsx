'use client'

import { FormEvent, useState } from 'react'

export function NewsletterSignup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = event.currentTarget
    const email = new FormData(form).get('email')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = await response.json()

      if (!response.ok) throw new Error(result.message)

      setStatus('success')
      setMessage(result.message)
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Signup could not be completed.')
    }
  }

  return (
    <form className="storm-signup" onSubmit={submit}>
      <label className="sr-only" htmlFor="storm-email">
        Email address
      </label>
      <input id="storm-email" name="email" type="email" placeholder="Your email address" required />
      <button disabled={status === 'loading'} type="submit">
        {status === 'loading' ? 'Joining...' : 'Sign me up'} <span aria-hidden="true">↗</span>
      </button>
      {message ? <p className={`storm-signup-message is-${status}`}>{message}</p> : null}
    </form>
  )
}
