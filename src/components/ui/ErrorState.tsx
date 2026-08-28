import type { ComponentPropsWithoutRef } from 'react'

type ErrorStateProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  title: string
  message: string
  onRetry?: () => void
  retryLabel?: string
}

/** Displays a concise, user-safe error message and optional retry action. */
export function ErrorState({
  title,
  message,
  onRetry,
  retryLabel = 'Try again',
  className = '',
  ...props
}: ErrorStateProps) {
  return (
    <section
      {...props}
      role="alert"
      className={`rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-left ${className}`.trim()}
    >
      <h2 className="text-base font-semibold text-red-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-red-900">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-950 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          {retryLabel}
        </button>
      ) : null}
    </section>
  )
}
