import {
  OperationsHeader,
} from '../components/OperationsHeader'
import { KpiStrip } from '../components/KpiStrip'
import {
  ActiveConflictsPanel,
  type ActiveConflict,
} from '../components/ActiveConflictsPanel'
import {
  AIRecommendationPanel,
  type AIRecommendation,
} from '../components/AIRecommendationPanel'
import {
  LiveTrafficTimeline,
} from '../components/LiveTrafficTimeline'
import { LiveTrainsTable } from '../components/LiveTrainsTable'
import {
  SystemHealthPanel,
  type ServiceHealth,
} from '../components/SystemHealthPanel'
import type { ConnectionState } from '../../../components/status/ConnectionIndicator'
import type { FreshnessState } from '../../../components/status/FreshnessIndicator'
import type { OperationsOverview } from '../types'
import { operationsOverviewMock } from '../mocks/operationsMock'

type OperationsPageProps = {
  /** Backend-backed data can replace the temporary preview overview later. */
  overview?: OperationsOverview
}

function toConnectionState(status: OperationsOverview['systemHealth']['status']): ConnectionState {
  if (status === 'live') return 'live'
  if (status === 'offline') return 'offline'
  return 'reconnecting'
}

function toFreshnessState(status: OperationsOverview['systemHealth']['status']): FreshnessState {
  if (status === 'stale') return 'stale'
  if (status === 'degraded') return 'degraded'
  return 'live'
}

/** Composes the static operations workspace from supplied overview data. */
export function OperationsPage({ overview: providedOverview }: OperationsPageProps) {
  // TEMPORARY PREVIEW FALLBACK: replace operationsOverviewMock with backend data at integration time.
  const overview = providedOverview ?? operationsOverviewMock
  const firstTrain = overview.trains[0]

  // These presentation components have richer UI-only shapes than the current domain mock.
  // Keep the supplied records unchanged; missing detail remains absent in the rendered panels.
  const conflicts = overview.conflicts as unknown as readonly ActiveConflict[]
  const recommendation = overview.recommendations[0] as AIRecommendation | undefined
  const health = overview.systemHealth
    ? ([
        {
          ...overview.systemHealth,
          serviceName: 'Operations overview',
        },
      ] satisfies readonly ServiceHealth[])
    : undefined

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-4 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <OperationsHeader
            controlArea={firstTrain?.origin ?? 'Unavailable'}
            liveClock={overview.systemHealth.lastUpdatedAt}
            connectionState={toConnectionState(overview.systemHealth.status)}
            freshnessState={toFreshnessState(overview.systemHealth.status)}
            lastUpdatedAt={overview.systemHealth.lastUpdatedAt}
          />
        </div>

        <div className="lg:col-span-12">
          <KpiStrip
            metrics={overview.kpiMetrics}
            throughput="Unavailable"
            utilization="Unavailable"
          />
        </div>

        <div className="lg:col-span-12">
          <LiveTrafficTimeline timeHorizon="Unavailable" items={[]} />
        </div>

        <div className="lg:col-span-8">
          <ActiveConflictsPanel conflicts={conflicts} />
        </div>

        <div className="lg:col-span-4">
          <AIRecommendationPanel recommendation={recommendation} />
        </div>

        <div className="lg:col-span-12">
          <LiveTrainsTable trains={overview.trains} />
        </div>

        <div className="lg:col-span-12">
          <SystemHealthPanel health={health} />
        </div>
      </div>
    </main>
  )
}
