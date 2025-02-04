import React from 'react'

export default function Page() {
  return (
    <main className='root-container flex min-h-dvh flex-col items-center justify-center'>
      <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>
        Whoa, slow down! You&apos;re doing that too fast. Please wait a moment before trying again.
      </h1>
      <p className='mt-3 text-center max-w-xl text-light-100'>
        Looks like you&apos;ve been a little too eager. We&apos;ve put a temporary pause on your excitement. 🚦 Chill for a bit, and try again shortly.
      </p>
    </main>
  )
}
