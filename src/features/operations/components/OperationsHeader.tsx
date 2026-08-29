import {
  ConnectionIndicator,
  type ConnectionState,
} from '../../../components/status/ConnectionIndicator'
import {
  FreshnessIndicator,
  type FreshnessState,
} from '../../../components/status/FreshnessIndicator'

type OperationsHeaderProps = {
  controlArea: string
  liveClock: string
  connectionState: ConnectionState
  freshnessState: FreshnessState
  lastUpdatedAt?: string
  lastOptimizationAt?: string
}

/** Presents the current operations context and supplied system-status information. */
export function OperationsHeader({
  controlArea,
  liveClock,
  connectionState,
  freshnessState,
  lastUpdatedAt,
  lastOptimizationAt,
}: OperationsHeaderProps) {
  return (
    <header className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="border-l-4 border-sky-700 pl-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Operations control</p>
          <h1 className="text-lg font-semibold text-slate-950">{controlArea}</h1>
        </div>

        <dl className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <dt className="font-medium text-slate-600">Current time</dt>
            <dd className="font-semibold tabular-nums text-slate-900">{liveClock}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-medium text-slate-600">Connection status</dt>
            <dd>
              <ConnectionIndicator state={connectionState} />
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-medium text-slate-600">Data freshness</dt>
            <dd>
              <FreshnessIndicator state={freshnessState} lastUpdatedAt={lastUpdatedAt} />
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-medium text-slate-600">Last optimization</dt>
            <dd className="tabular-nums text-slate-800">{lastOptimizationAt ?? 'Not available'}</dd>
          </div>
        </dl>
      </div>
    </header>
  )
}
