import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import './normalize.css'
import './styles.css'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children: [
      {
        path: 'pokemon',
        element: null
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router}></RouterProvider>
  </React.StrictMode>,
)

