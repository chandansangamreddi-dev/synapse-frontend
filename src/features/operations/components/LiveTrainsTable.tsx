import { StatusBadge } from '../../../components/status/StatusBadge'
import { DataTable, type DataTableColumn } from '../../../components/ui/DataTable'
import { EmptyState } from '../../../components/ui/EmptyState'
import type { Train } from '../types'

/** UI-only display fields that complement the shared train domain type. */
export type LiveTrain = Train & {
  category?: string
  location?: string
  section?: string
  priority?: string
}

type LiveTrainsTableProps = {
  trains: readonly LiveTrain[]
  onTrainSelect?: (train: LiveTrain) => void
}

const columns: readonly DataTableColumn<LiveTrain>[] = [
  {
    id: 'train',
    header: 'Train',
    cell: (train) => (
      <div>
        <p className="font-semibold text-slate-950">{train.trainNumber}</p>
        <p className="mt-0.5 text-sm text-slate-700">{train.trainName}</p>
      </div>
    ),
  },
  {
    id: 'category',
    header: 'Category / type',
    cell: (train) => train.category ?? '--',
  },
  {
    id: 'route',
    header: 'Origin / destination',
    cell: (train) => (
      <div>
        <p>{train.origin}</p>
        <p className="mt-0.5 text-sm text-slate-600">to {train.destination}</p>
      </div>
    ),
  },
  {
    id: 'location',
    header: 'Location',
    cell: (train) => train.location ?? '--',
  },
  {
    id: 'eta',
    header: 'ETA',
    cell: (train) =>
      train.estimatedArrival !== null ? (
        <time dateTime={train.estimatedArrival}>{train.estimatedArrival}</time>
      ) : (
        '--'
      ),
  },
  {
    id: 'delay',
    header: 'Delay',
    cell: (train) => `${train.delayMinutes} min`,
  },
  {
    id: 'platform-section',
    header: 'Platform / section',
    cell: (train) => train.platform ?? train.section ?? '--',
  },
  {
    id: 'priority',
    header: 'Priority',
    cell: (train) => train.priority ?? '--',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (train) => <StatusBadge status={train.status} />,
  },
]

/** Presents supplied live-train records without sorting, filtering, or derived values. */
export function LiveTrainsTable({ trains, onTrainSelect }: LiveTrainsTableProps) {
  return (
    <section aria-labelledby="live-trains-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
      <h2 id="live-trains-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
        Live trains
      </h2>

      {trains.length === 0 ? (
        <EmptyState
          title="No live trains"
          description="No train records have been supplied for the current operations view."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <DataTable
            data={trains}
            columns={columns}
            getRowKey={(train) => train.id}
            caption="Live trains and current operating details"
            onRowClick={onTrainSelect}
          />
        </div>
      )}
    </section>
  )
}
