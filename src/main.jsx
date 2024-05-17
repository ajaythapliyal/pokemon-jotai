import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import './normalize.css'
import './styles.css'
import { PokemonList } from './Pokemon/PokemonList.jsx';

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children: [
      {
        path: 'pokemon',
        element: <PokemonList></PokemonList>
      },
      {
        path: '',
        element: <Navigate to={'pokemon'}></Navigate>
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router}></RouterProvider>
  </React.StrictMode>,
)

