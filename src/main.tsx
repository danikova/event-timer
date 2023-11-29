import './index.css'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Counter from './App.tsx'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Counter />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
