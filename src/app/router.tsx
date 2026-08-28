import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import { LoginPage } from '../features/auth/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppShell />,
  },
])