import type { ComponentPropsWithoutRef } from 'react'

import { LoginForm, type LoginCredentials } from '../components/LoginForm'

type LoginPageProps = Omit<ComponentPropsWithoutRef<'main'>, 'children'> & {
  onSubmit: (credentials: LoginCredentials) => void | Promise<void>
  isSubmitting: boolean
  errorMessage?: string
  environmentLabel?: string
  buildVersion?: string
}

/** Displays the SYNAPSE sign-in interface and supplied deployment context. */
export function LoginPage({
  onSubmit,
  isSubmitting,
  errorMessage,
  environmentLabel,
  buildVersion,
  className = '',
  ...props
}: LoginPageProps) {
  return (
    <main
      className={`min-h-screen bg-slate-200 px-4 py-8 text-slate-950 sm:px-6 lg:flex lg:items-center lg:justify-center ${className}`.trim()}
      {...props}
    >
      <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-300 bg-slate-100 lg:grid lg:grid-cols-5">
        <section className="border-b border-slate-700 bg-slate-900 p-8 text-slate-100 lg:col-span-2 lg:border-r lg:border-b-0">
          <p className="text-sm font-semibold tracking-wide text-blue-300">SYNAPSE</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Railway operations console</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            A focused workspace for coordinating live railway operations and responding to
            changing conditions.
          </p>
        </section>

        <section className="p-6 sm:p-8 lg:col-span-3" aria-labelledby="login-heading">
          <div className="mx-auto max-w-md">
            <h2 id="login-heading" className="text-2xl font-semibold text-slate-950">
              Sign in to SYNAPSE
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Use your authorized account to continue.
            </p>
            <LoginForm
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              className="mt-6 max-w-none"
            />
          </div>
        </section>

        <footer className="border-t border-slate-300 px-6 py-3 text-xs text-slate-600 lg:col-span-5 sm:px-8">
          <span>SYNAPSE</span>
          {environmentLabel !== undefined ? <span> · {environmentLabel}</span> : null}
          {buildVersion !== undefined ? <span> · Build {buildVersion}</span> : null}
        </footer>
      </div>
    </main>
  )
}
