import type { ComponentPropsWithoutRef } from 'react'

import { StatusBadge } from './StatusBadge'

export type ConnectionState = 'live' | 'reconnecting' | 'offline'

type ConnectionIndicatorProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  state: ConnectionState
}

const connectionLabels: Record<ConnectionState, string> = {
  live: 'LIVE',
  reconnecting: 'RECONNECTING',
  offline: 'OFFLINE',
}

/** Displays the supplied connection state. */
export function ConnectionIndicator({
  state,
  className = '',
  ...props
}: ConnectionIndicatorProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={`Connection status: ${connectionLabels[state]}`}
      className={`inline-flex items-center ${className}`.trim()}
      {...props}
    >
      <StatusBadge status={state} className="uppercase" />
    </span>
  )
}
