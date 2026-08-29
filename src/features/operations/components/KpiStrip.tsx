import { MetricCard } from '../../../components/ui/MetricCard'
import type { DashboardKpiMetrics } from '../types'

type KpiStripProps = {
  metrics: DashboardKpiMetrics
  throughput: string | number
  utilization: string | number
}

/** Presents supplied operations KPI values without deriving or transforming them. */
export function KpiStrip({ metrics, throughput, utilization }: KpiStripProps) {
  return (
    <section aria-labelledby="operations-kpis-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
      <h2 id="operations-kpis-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
        Operations metrics
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard label="Active trains" value={metrics.activeTrains} />
        <MetricCard label="Delayed trains" value={metrics.delayedTrains} />
        <MetricCard label="Conflicts" value={metrics.activeConflicts} />
        <MetricCard label="Throughput" value={throughput} />
        <MetricCard label="Utilization" value={utilization} />
      </div>
    </section>
  )
}
