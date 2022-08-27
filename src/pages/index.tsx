import { Login } from '@/containers/forms/Login'
import { Register } from '@/containers/forms/Register'
import { Layout } from '@/layouts/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const { view } = router.query

  const [form, setForm] = useState<"login" | "register">("login")

  useEffect(() => {
    if (view === "login" || view === "register") {
      setForm(view)
    }
  }, [view])

  return (
    <Layout mode="guest">
      <div className="flex items-center justify-center py-20 sm:py-32 px-4 dark:bg-neutral-900">
        {form === "login" ? <Login /> : <Register />}
      </div>
    </Layout>
  )
}
