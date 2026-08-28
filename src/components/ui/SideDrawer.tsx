import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useId,
} from 'react'

type SideDrawerProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'role' | 'aria-modal' | 'aria-labelledby' | 'aria-describedby'
> & {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  description?: string
}

/** Displays an accessible, right-side dialog drawer. */
export function SideDrawer({
  open,
  onClose,
  title,
  children,
  description,
  className = '',
  onClick,
  ...props
}: SideDrawerProps) {
  const titleId = useId()
  const descriptionId = useId()
  const hasDescription = description !== undefined

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/20"
      onClick={onClose}
    >
      <div
        {...props}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={`h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-5 text-left shadow-xl motion-safe:transition-transform ${className}`.trim()}
        onClick={(event) => {
          event.stopPropagation()
          onClick?.(event)
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-slate-950">
              {title}
            </h2>
            {hasDescription ? (
              <p id={descriptionId} className="mt-1 text-sm leading-6 text-slate-700">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Close
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
