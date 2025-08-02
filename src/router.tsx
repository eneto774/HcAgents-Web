import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Login from "./pages/Login"
import GuestGuard from "./guards/GuestGuard"
import Home from "./pages/Home"
import AuthGuard from "./guards/AuthGuard"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        element: <GuestGuard><Login /></GuestGuard>,
        index: true,
      },
      {
        path: "/home",
        element: <AuthGuard><Home /></AuthGuard>,
      },
    ]
  },
])
