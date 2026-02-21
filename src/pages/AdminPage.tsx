import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AdminLogin } from '../components/Admin/AdminLogin'
import { AdminDashboard } from '../components/Admin/AdminDashboard'
import type { Session } from '@supabase/supabase-js'

export const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="font-body text-text-secondary text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
