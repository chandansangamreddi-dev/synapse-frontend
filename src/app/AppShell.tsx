import { NavLink, Outlet } from 'react-router-dom'
import { ConnectionIndicator } from '../components/status/ConnectionIndicator'

const navigation = [
  { label: 'Operations', path: '/' },
  { label: 'Trains', path: '/trains' },
  { label: 'Conflicts', path: '/conflicts' },
  { label: 'AI Recommendations', path: '/recommendations' },
  { label: 'Infrastructure', path: '/infrastructure' },
  { label: 'Analytics', path: '/analytics' },
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="flex w-60 shrink-0 flex-col border-r border-zinc-800 bg-[#111419]">
          <div className="border-b border-zinc-800 px-5 py-5">
            <div className="text-xl font-semibold tracking-[0.2em]">
              SYNAPSE
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
              Railway Operations
            </div>
          </div>

          <nav className="flex-1 px-3 py-4">
            <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Control
            </div>

            <div className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    [
                      'block rounded-md border px-3 py-2.5 text-sm transition-colors',
                      isActive
                        ? 'border-red-800/60 bg-red-950/40 text-red-100'
                        : 'border-transparent text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="border-t border-zinc-800 p-4">
            <div className="text-xs text-zinc-500">SYSTEM</div>
            <div className="mt-1 text-sm text-zinc-300">
              Central Control
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0f1115] px-6">
            <div>
              <div className="text-sm font-medium text-zinc-300">
                Central Control
              </div>
              <div className="text-xs text-zinc-500">
                Railway Operations Network
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ConnectionIndicator state="live" />
              <div className="text-xs text-zinc-500">LIVE NETWORK</div>
            </div>
          </header>

          <section className="p-6">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  )
}