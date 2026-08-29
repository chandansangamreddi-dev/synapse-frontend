import { StatusBadge } from '../../../components/status/StatusBadge'
import { DataTable, type DataTableColumn } from '../../../components/ui/DataTable'
import { EmptyState } from '../../../components/ui/EmptyState'
import type { ConflictSeverity, ConflictSummary } from '../types'

export type ActiveConflict = ConflictSummary & {
  resource: string
  cause: string
  projectedImpact: string
  aiRecommendation?: string
}

type ActiveConflictsPanelProps = {
  conflicts: readonly ActiveConflict[]
  onConflictSelect?: (conflict: ActiveConflict) => void
}

const severityClassNames: Record<ConflictSeverity, string> = {
  low: 'border-slate-300 bg-slate-100 text-slate-800',
  medium: 'border-amber-300 bg-amber-50 text-amber-900',
  high: 'border-orange-300 bg-orange-50 text-orange-900',
  critical: 'border-red-300 bg-red-50 text-red-900',
}

const columns: readonly DataTableColumn<ActiveConflict>[] = [
  {
    id: 'conflict',
    header: 'Conflict',
    cell: (conflict) => (
      <div className="flex items-center gap-2 font-medium text-slate-950">
        <StatusBadge status="conflict" />
        <span>{conflict.title}</span>
      </div>
    ),
  },
  {
    id: 'severity',
    header: 'Severity',
    cell: (conflict) => (
      <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold capitalize ${severityClassNames[conflict.severity]}`}>
        Severity: {conflict.severity}
      </span>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: (conflict) => (
      <span className="inline-flex rounded-md border border-sky-300 bg-sky-50 px-2 py-1 text-xs font-semibold capitalize text-sky-900">
        Status: {conflict.status}
      </span>
    ),
  },
  {
    id: 'affected-trains',
    header: 'Affected trains',
    cell: (conflict) => conflict.affectedTrainIds.join(', '),
  },
  {
    id: 'resource',
    header: 'Resource',
    cell: (conflict) => conflict.resource,
  },
  {
    id: 'detected-time',
    header: 'Detected time',
    cell: (conflict) => <time dateTime={conflict.detectedAt}>{conflict.detectedAt}</time>,
  },
  {
    id: 'cause',
    header: 'Cause',
    cell: (conflict) => conflict.cause,
  },
  {
    id: 'projected-impact',
    header: 'Projected impact',
    cell: (conflict) => conflict.projectedImpact,
  },
  {
    id: 'ai-recommendation',
    header: 'AI recommendation',
    cell: (conflict) => conflict.aiRecommendation,
  },
]

/** Presents supplied active conflicts and optionally notifies a parent when one is selected. */
export function ActiveConflictsPanel({ conflicts, onConflictSelect }: ActiveConflictsPanelProps) {
  return (
    <section aria-labelledby="active-conflicts-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
      <div className="mb-3">
        <h2 id="active-conflicts-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-800">
          Active conflicts
        </h2>
      </div>

      {conflicts.length === 0 ? (
        <EmptyState
          title="No active conflicts"
          description="There are no conflicts reported for this control area."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <DataTable
            data={conflicts}
            columns={columns}
            getRowKey={(conflict) => conflict.id}
            caption="Active operational conflicts"
            onRowClick={onConflictSelect}
          />
        </div>
      )}
    </section>
  )
}
