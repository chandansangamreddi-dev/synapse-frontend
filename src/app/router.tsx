import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import { OperationsPage } from '../pages/OperationsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <OperationsPage />,
      },
    ],
  },
])