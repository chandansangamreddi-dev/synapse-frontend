import { apiRequest } from '../../api/client'
import type { LoginCredentials } from './auth.types'

export type AuthResponse = {
  user: {
    id: string
    name: string
    role: string
  }
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  // TBD - backend authentication contract required.
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function logout(): Promise<void> {
  // TBD - backend authentication contract required.
  await apiRequest('/auth/logout', {
    method: 'POST',
  })
}