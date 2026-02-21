import { useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'

export const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-10">
          <h1 className="font-brand text-[26px] font-normal tracking-[0.35em] uppercase text-text-primary mb-2">
            VEVE
          </h1>
          <p className="font-body text-[11px] font-light tracking-[0.2em] uppercase text-text-accent">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-body text-[11px] font-light tracking-[0.15em] uppercase text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full font-body text-[13px] font-light text-text-primary bg-transparent border-b border-border py-2 outline-none focus:border-text-primary transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block font-body text-[11px] font-light tracking-[0.15em] uppercase text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full font-body text-[13px] font-light text-text-primary bg-transparent border-b border-border py-2 outline-none focus:border-text-primary transition-colors duration-300"
            />
          </div>

          {error && (
            <p className="font-body text-[11px] font-light text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 font-body text-[11px] font-light tracking-[0.25em] uppercase text-white bg-text-primary py-3 border-none cursor-pointer hover:bg-text-primary/90 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-8">
          <a
            href="/"
            className="font-body text-[11px] font-light tracking-[0.15em] text-text-accent hover:text-text-primary transition-colors duration-300 no-underline"
          >
            &larr; Back to site
          </a>
        </div>
      </div>
    </div>
  )
}
