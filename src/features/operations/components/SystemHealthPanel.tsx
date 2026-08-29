import { ConnectionIndicator } from '../../../components/status/ConnectionIndicator'
import { StatusBadge } from '../../../components/status/StatusBadge'
import { EmptyState } from '../../../components/ui/EmptyState'
import type { SystemHealth } from '../types'

export type ServiceHealth = SystemHealth & {
  serviceName: string
  latency?: string
  interruption?: string
}

type SystemHealthPanelProps = {
  health?: readonly ServiceHealth[]
}

function ServiceStatus({ status }: Pick<SystemHealth, 'status'>) {
  if (status === 'live' || status === 'reconnecting' || status === 'offline') {
    return <ConnectionIndicator state={status} />
  }

  return <StatusBadge status={status} />
}

/** Presents supplied service-health observations without deriving their state or measurements. */
export function SystemHealthPanel({ health }: SystemHealthPanelProps) {
  if (health === undefined || health.length === 0) {
    return (
      <section aria-labelledby="system-health-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
        <h2 id="system-health-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
          System health
        </h2>
        <EmptyState
          title="No service health available"
          description="No health observations have been supplied for the current operations view."
        />
      </section>
    )
  }

  return (
    <section aria-labelledby="system-health-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
      <h2 id="system-health-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
        System health
      </h2>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {health.map((service) => (
          <li key={service.serviceName} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-950">{service.serviceName}</h3>
              <ServiceStatus status={service.status} />
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">Observed</dt>
                <dd className="mt-1 tabular-nums text-slate-800">
                  <time dateTime={service.lastUpdatedAt}>{service.lastUpdatedAt}</time>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">Message</dt>
                <dd className="mt-1 leading-5 text-slate-800">{service.message}</dd>
              </div>
              {service.latency !== undefined ? (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">Latency</dt>
                  <dd className="mt-1 text-slate-800">{service.latency}</dd>
                </div>
              ) : null}
              {service.interruption !== undefined ? (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">Interruption</dt>
                  <dd className="mt-1 leading-5 text-slate-800">{service.interruption}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}
