import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useSessionStore } from '../stores/sessionStore'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isAuthenticated = useSessionStore(
    (state) => state.isAuthenticated,
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}