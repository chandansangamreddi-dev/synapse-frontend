import { StatusBadge } from '../../../components/status/StatusBadge'
import { EmptyState } from '../../../components/ui/EmptyState'
import type { TrainStatus } from '../types'

/** UI-only timeline data; positioning and span values are supplied by the caller. */
export type LiveTrafficTimelineItem = {
  id: string
  trainLabel: string
  status: TrainStatus
  location: string
  timelinePosition: string
  timelineSpan?: string
  occupancyDuration?: string
  movementDuration?: string
  eventLabel?: string
  conflictIndicator?: string
}

type LiveTrafficTimelineProps = {
  timeHorizon: string
  items: readonly LiveTrafficTimelineItem[]
  onTrainSelect?: (item: LiveTrafficTimelineItem) => void
}

/** Presents supplied train positions and occupancy spans across a stated time horizon. */
export function LiveTrafficTimeline({
  timeHorizon,
  items,
  onTrainSelect,
}: LiveTrafficTimelineProps) {
  return (
    <section aria-labelledby="live-traffic-heading" className="rounded-xl border border-slate-300 bg-slate-50 p-3">
      <div className="mb-3 border-b border-slate-200 pb-3">
        <h2 id="live-traffic-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-800">
          Live traffic timeline
        </h2>
        <p className="mt-1 text-sm text-slate-700">Time horizon: {timeHorizon}</p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No live traffic items"
          description="No train timeline observations have been supplied for this time horizon."
        />
      ) : (
        <ul className="space-y-2" aria-label={`Live traffic for ${timeHorizon}`}>
          {items.map((item) => {
            const isSelectable = onTrainSelect !== undefined

            return (
              <li
                key={item.id}
                role={isSelectable ? 'button' : undefined}
                tabIndex={isSelectable ? 0 : undefined}
                onClick={isSelectable ? () => onTrainSelect?.(item) : undefined}
                onKeyDown={
                  isSelectable
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          onTrainSelect?.(item)
                        }
                      }
                    : undefined
                }
                className={`rounded-lg border border-slate-200 bg-white p-3 ${
                  isSelectable
                    ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                    : ''
                }`.trim()}
                aria-label={isSelectable ? `Select ${item.trainLabel}` : undefined}
              >
                <div className="grid gap-3 lg:grid-cols-[minmax(12rem,0.8fr)_minmax(18rem,2fr)_minmax(12rem,0.8fr)] lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-950">{item.trainLabel}</h3>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-700">Location: {item.location}</p>
                    {item.eventLabel !== undefined ? (
                      <p className="mt-1 text-sm text-slate-700">Event: {item.eventLabel}</p>
                    ) : null}
                    {item.conflictIndicator !== undefined ? (
                      <p className="mt-1 text-sm font-medium text-red-800">
                        [Conflict] {item.conflictIndicator}
                      </p>
                    ) : null}
                  </div>

                  <div
                    className="relative h-8 rounded-md border border-slate-300 bg-slate-100"
                    aria-label={`Timeline position ${item.timelinePosition}`}
                  >
                    {item.timelineSpan !== undefined ? (
                      <div
                        className="absolute top-1/2 h-3 -translate-y-1/2 rounded-sm border border-sky-700 bg-sky-100"
                        style={{ left: item.timelinePosition, width: item.timelineSpan }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className="absolute top-1/2 z-10 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900"
                      style={{ left: item.timelinePosition }}
                      aria-hidden="true"
                    />
                  </div>

                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-slate-700">
                    <div>
                      <dt className="font-medium text-slate-600">Position</dt>
                      <dd>{item.timelinePosition}</dd>
                    </div>
                    {item.occupancyDuration !== undefined ? (
                      <div>
                        <dt className="font-medium text-slate-600">Occupancy</dt>
                        <dd>{item.occupancyDuration}</dd>
                      </div>
                    ) : null}
                    {item.movementDuration !== undefined ? (
                      <div>
                        <dt className="font-medium text-slate-600">Movement</dt>
                        <dd>{item.movementDuration}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
