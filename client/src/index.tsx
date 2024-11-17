import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loading from './pages/Loading'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <App />,
  },
  {
    path: "/",
    element: <Loading />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
