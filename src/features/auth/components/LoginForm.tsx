import { useId, useState, type ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  usernameOrEmail: z.string().trim().min(1, 'Enter your username or email.'),
  password: z.string().min(1, 'Enter your password.'),
})

export type LoginCredentials = z.infer<typeof loginSchema>

type LoginFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'> & {
  onSubmit: (credentials: LoginCredentials) => void | Promise<void>
  isSubmitting: boolean
  errorMessage?: string
}

/** Collects credentials and delegates submission to the supplied authentication handler. */
export function LoginForm({
  onSubmit,
  isSubmitting,
  errorMessage,
  className = '',
  ...props
}: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const usernameOrEmailErrorId = useId()
  const passwordErrorId = useId()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<LoginCredentials>({
    mode: 'onBlur',
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  })

  const isSubmissionDisabled = isSubmitting || isFormSubmitting

  return (
    <form
      {...props}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full max-w-md rounded-xl border border-slate-300 bg-slate-100 p-6 text-left ${className}`.trim()}
    >
      {errorMessage !== undefined ? (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900"
        >
          {errorMessage}
        </p>
      ) : null}

      <div>
        <label htmlFor="login-username-or-email" className="text-sm font-medium text-slate-900">
          Username or email
        </label>
        <input
          id="login-username-or-email"
          type="text"
          autoComplete="username"
          disabled={isSubmissionDisabled}
          aria-invalid={errors.usernameOrEmail ? true : undefined}
          aria-describedby={errors.usernameOrEmail ? usernameOrEmailErrorId : undefined}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-200"
          {...register('usernameOrEmail', {
            validate: (value) => {
              const result = loginSchema.shape.usernameOrEmail.safeParse(value)

              return result.success || result.error.issues[0]?.message || 'Enter your username or email.'
            },
          })}
        />
        {errors.usernameOrEmail ? (
          <p id={usernameOrEmailErrorId} className="mt-1.5 text-sm text-red-700">
            {errors.usernameOrEmail.message}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="login-password" className="text-sm font-medium text-slate-900">
            Password
          </label>
          <button
            type="button"
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            disabled={isSubmissionDisabled}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            className="rounded px-1 text-sm font-medium text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:text-slate-500"
          >
            {isPasswordVisible ? 'Hide password' : 'Show password'}
          </button>
        </div>
        <input
          id="login-password"
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete="current-password"
          disabled={isSubmissionDisabled}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? passwordErrorId : undefined}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-200"
          {...register('password', {
            validate: (value) => {
              const result = loginSchema.shape.password.safeParse(value)

              return result.success || result.error.issues[0]?.message || 'Enter your password.'
            },
          })}
        />
        {errors.password ? (
          <p id={passwordErrorId} className="mt-1.5 text-sm text-red-700">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmissionDisabled}
        className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmissionDisabled ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
