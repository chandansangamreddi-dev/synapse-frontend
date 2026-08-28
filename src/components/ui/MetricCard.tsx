import type { ComponentPropsWithoutRef } from 'react'

type MetricCardProps = Omit<ComponentPropsWithoutRef<'article'>, 'children'> & {
  label: string
  value: string | number
  unit?: string
  description?: string
}

/** Displays a supplied operational metric and optional supporting context. */
export function MetricCard({
  label,
  value,
  unit,
  description,
  className = '',
  ...props
}: MetricCardProps) {
  return (
    <article
      className={`rounded-lg border border-slate-200 bg-white px-4 py-3 text-left ${className}`.trim()}
      {...props}
    >
      <h2 className="text-xs font-medium uppercase tracking-wide text-slate-600">
        {label}
      </h2>
      <p className="mt-1 text-2xl font-semibold leading-none text-slate-950">
        {value}
        {unit !== undefined ? (
          <span className="ml-1 text-sm font-medium text-slate-600">{unit}</span>
        ) : null}
      </p>
      {description !== undefined ? (
        <p className="mt-2 text-sm leading-5 text-slate-700">{description}</p>
      ) : null}
    </article>
  )
}
