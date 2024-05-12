import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './App.tsx'
import { Home, Register, SignIn } from './pages/index.ts'

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: 'tso-page',
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
