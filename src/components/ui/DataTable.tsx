import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type DataTableColumn<T> = {
  id: string
  header: string
  cell: (row: T) => ReactNode
}

export type DataTableProps<T> = Omit<ComponentPropsWithoutRef<'table'>, 'children'> & {
  data: readonly T[]
  columns: readonly DataTableColumn<T>[]
  getRowKey: (row: T, index: number) => string | number
  caption: string
  onRowClick?: (row: T) => void
}

/** Displays supplied operational data in a compact, accessible table. */
export function DataTable<T>({
  data,
  columns,
  getRowKey,
  caption,
  onRowClick,
  className = '',
  ...props
}: DataTableProps<T>) {
  const isInteractive = onRowClick !== undefined

  return (
    <table
      className={`w-full border-collapse text-left text-sm ${className}`.trim()}
      {...props}
    >
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-slate-300 bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
        <tr>
          {columns.map((column) => (
            <th key={column.id} scope="col" className="px-3 py-2 font-medium">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {data.map((row, index) => (
          <tr
            key={getRowKey(row, index)}
            tabIndex={isInteractive ? 0 : undefined}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            onKeyDown={
              onRowClick
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onRowClick(row)
                    }
                  }
                : undefined
            }
            className={
              isInteractive
                ? 'cursor-pointer transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-slate-900'
                : undefined
            }
          >
            {columns.map((column) => (
              <td key={column.id} className="px-3 py-2.5 text-slate-800">
                {column.cell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
