import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = (token: string, redirectPath = '/login') => {
  if(!token) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet/>
}
