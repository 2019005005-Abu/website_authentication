import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LogIn from "../src/Components/LogIn/LogIn.jsx"
import Main from './Components/LayOut/Main.jsx'
import Register from "./Components/Register/Register.jsx"
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './Components/Home/Home.jsx'
const router=createBrowserRouter([
   {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },{
        path:'/login',
        element:<LogIn></LogIn>
      },{
        path:'/register',
        element:<Register></Register>
      }
    ]
   }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
