import type { ComponentPropsWithoutRef } from 'react'

type EmptyStateAction = {
  label: string
  onClick: () => void
}

type EmptyStateProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  title: string
  description: string
  action?: EmptyStateAction
}

/** Displays a concise explanation when no content is available. */
export function EmptyState({
  title,
  description,
  action,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <section
      className={`rounded-lg border border-slate-200 bg-white px-5 py-4 text-left ${className}`.trim()}
      {...props}
    >
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-700">{description}</p>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-3 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {action.label}
        </button>
      ) : null}
    </section>
  )
}
