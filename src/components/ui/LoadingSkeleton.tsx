import type { ComponentPropsWithoutRef } from 'react'

export type LoadingSkeletonVariant = 'text' | 'rectangular' | 'circular'

type LoadingSkeletonProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  variant?: LoadingSkeletonVariant
}

const variantClassNames: Record<LoadingSkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  rectangular: 'h-24 w-full rounded-md',
  circular: 'size-10 rounded-full',
}

/** Displays a decorative placeholder while related content is loading. */
export function LoadingSkeleton({
  variant = 'rectangular',
  className = '',
  ...props
}: LoadingSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`bg-slate-200 motion-safe:animate-pulse ${variantClassNames[variant]} ${className}`.trim()}
      {...props}
    />
  )
}
