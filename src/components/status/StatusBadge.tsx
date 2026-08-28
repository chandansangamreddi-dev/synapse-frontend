import type { ComponentPropsWithoutRef } from 'react'

export type StatusBadgeStatus =
  | 'on_time'
  | 'delayed'
  | 'held'
  | 'approaching'
  | 'conflict'
  | 'unknown'
  | 'live'
  | 'stale'
  | 'reconnecting'
  | 'offline'
  | 'degraded'

type StatusBadgeProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  status: StatusBadgeStatus
}

type StatusBadgeMetadata = {
  label: string
  symbol: string
  className: string
}

const statusMetadata: Record<StatusBadgeStatus, StatusBadgeMetadata> = {
  on_time: {
    label: 'On time',
    symbol: '✓',
    className: 'border-emerald-700 bg-emerald-50 text-emerald-950',
  },
  delayed: {
    label: 'Delayed',
    symbol: '!',
    className: 'border-amber-700 bg-amber-50 text-amber-950',
  },
  held: {
    label: 'Held',
    symbol: '⏸',
    className: 'border-orange-700 bg-orange-50 text-orange-950',
  },
  approaching: {
    label: 'Approaching',
    symbol: '↗',
    className: 'border-sky-700 bg-sky-50 text-sky-950',
  },
  conflict: {
    label: 'Conflict',
    symbol: '⚠',
    className: 'border-red-700 bg-red-50 text-red-950',
  },
  unknown: {
    label: 'Unknown',
    symbol: '?',
    className: 'border-slate-700 bg-slate-50 text-slate-950',
  },
  live: {
    label: 'Live',
    symbol: '●',
    className: 'border-emerald-700 bg-emerald-50 text-emerald-950',
  },
  stale: {
    label: 'Stale',
    symbol: '◷',
    className: 'border-amber-700 bg-amber-50 text-amber-950',
  },
  reconnecting: {
    label: 'Reconnecting',
    symbol: '↻',
    className: 'border-sky-700 bg-sky-50 text-sky-950',
  },
  offline: {
    label: 'Offline',
    symbol: '○',
    className: 'border-slate-700 bg-slate-50 text-slate-950',
  },
  degraded: {
    label: 'Degraded',
    symbol: '△',
    className: 'border-orange-700 bg-orange-50 text-orange-950',
  },
}

/** Displays a human-readable operational or schedule status. */
export function StatusBadge({ status, className = '', ...props }: StatusBadgeProps) {
  const { label, symbol, className: statusClassName } = statusMetadata[status]

  return (
    <span
      aria-label={`Status: ${label}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-medium leading-none ${statusClassName} ${className}`.trim()}
      {...props}
    >
      <span aria-hidden="true" className="font-semibold">
        {symbol}
      </span>
      <span>{label}</span>
    </span>
  )
}
