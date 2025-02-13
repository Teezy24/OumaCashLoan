import { useState } from 'react'
import LoginRegistration from './Pages/loginRegistration'
import Dashboard from './Pages/Dashboard'
import ApplyforLoan from './Pages/ApplyforLoan'
import Loanhistory from './Pages/Loanhistory'
import CalculateInstallment from './Pages/Calculator'
import HomeLoanpage from './Pages/HomeLoanpage'
import AdminDashboard from './Pages/Admin'
import ApprovalWorkflow from './Pages/ApprovalPage'
import ProfilePage from './Pages/ProfilePage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'

//create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <div><LoginRegistration /></div>
  },
  {
    path: "/register",
    element: <div><LoginRegistration /></div>
  },
  {
    path: "/dashboard",
    element: <div><Dashboard /></div>
  },
  {
    path: "/ApplyforLoan",
    element: <div><ApplyforLoan /></div>
  },
  {
    path: "/loanhistory",
    element: <div><Loanhistory /></div>
  },
  {
    path: "/calculate",
    element: <div><CalculateInstallment /></div>
  },
  {
    path: "/homeloanapplication",
    element: <div><HomeLoanpage /></div>
  },
  {
    path: "/Admin",
    element: <div><AdminDashboard /></div>
  },
  {
    path: "/Aproval",
    element: <div><ApprovalWorkflow /></div>
  },
  {
    path: "/Profile",
    element: <div><ProfilePage /></div>
  },

])

function App() {

  return (
    <div>
      <RouterProvider router = {router} />
    </div>
  )
}

export default App
