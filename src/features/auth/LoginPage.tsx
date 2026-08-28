import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async () => {
    // TBD - connect to confirmed SYNAPSE authentication endpoint.
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-6 text-zinc-100">
      <section className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.35em] text-red-500">
            SYNAPSE
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Control Center Access
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Railway Operations Network
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-xl border border-zinc-800 bg-[#15181d] p-6 shadow-2xl"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Operator ID
            </label>

            <input
              id="username"
              {...register('username')}
              className="w-full rounded-md border border-zinc-700 bg-[#0d0f12] px-3 py-2.5 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
              autoComplete="username"
            />

            {errors.username && (
              <p className="mt-1 text-xs text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full rounded-md border border-zinc-700 bg-[#0d0f12] px-3 py-2.5 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
              autoComplete="current-password"
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            ENTER CONTROL CENTER
          </button>

          <p className="text-center text-xs text-zinc-600">
            Authentication service connection: TBD
          </p>
        </form>
      </section>
    </main>
  )
}