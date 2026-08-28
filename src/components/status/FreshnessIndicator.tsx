import type { ComponentPropsWithoutRef } from 'react'

import { StatusBadge, type StatusBadgeStatus } from './StatusBadge'

export type FreshnessState = Extract<StatusBadgeStatus, 'live' | 'stale' | 'degraded'>

type FreshnessIndicatorProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  state: FreshnessState
  lastUpdatedAt?: string | number | Date
}

/** Displays a supplied data-freshness state and optional update timestamp. */
export function FreshnessIndicator({
  state,
  lastUpdatedAt,
  className = '',
  ...props
}: FreshnessIndicatorProps) {
  const hasLastUpdatedAt = lastUpdatedAt !== undefined

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`.trim()}
      {...props}
    >
      <StatusBadge status={state} />
      {hasLastUpdatedAt ? (
        <span className="text-sm text-slate-700">
          Last updated: {String(lastUpdatedAt)}
        </span>
      ) : null}
    </span>
  )
}
