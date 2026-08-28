import { StatusBadge } from '../components/status/StatusBadge'
import { operationsMockData } from '../features/operations/mockData'

function formatDelay(delayMinutes: number | null) {
  return delayMinutes === null ? '--' : `+${delayMinutes} min`
}

export function OperationsPage() {
  const data = operationsMockData

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Operations
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Network Overview
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Current railway network operating picture.
            </p>
          </div>

          <div className="text-right text-xs text-zinc-500">
            Static demonstration data
          </div>
        </div>
      </header>

      <section
        aria-label="Operations key performance indicators"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        <Kpi label="Active trains" value={data.activeTrains} />
        <Kpi
          label="On time"
          value={
            data.onTimePercentage === null
              ? '--'
              : `${data.onTimePercentage}%`
          }
        />
        <Kpi label="Active conflicts" value={data.activeConflicts} />
        <Kpi label="At risk" value={data.atRiskTrains} />
      </section>

      <section className="overflow-hidden rounded-lg border border-zinc-800 bg-[#15181d]">
        <div className="border-b border-zinc-800 px-5 py-4">
          <h2 className="text-sm font-semibold">Active Traffic</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Current operational train activity
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-5 py-3 font-medium">Train</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Route</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Delay</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800">
              {data.trains.map((train) => (
                <tr key={train.id} className="hover:bg-zinc-900/60">
                  <td className="px-5 py-4 font-medium">{train.id}</td>
                  <td className="px-5 py-4 text-zinc-400">
                    {train.service}
                  </td>
                  <td className="px-5 py-4 text-zinc-400">
                    {train.route}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={train.status} />
                  </td>
                  <td className="px-5 py-4 text-right text-zinc-300">
                    {formatDelay(train.delayMinutes)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Kpi({
  label,
  value,
}: {
  label: string
  value: string | number | null
}) {
  return (
    <div className="border border-zinc-800 bg-[#15181d] p-5">
      <div className="text-3xl font-semibold">
        {value === null ? '--' : value}
      </div>

      <div className="mt-2 text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </div>
    </div>
  )
}