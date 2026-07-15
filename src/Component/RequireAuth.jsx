import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

function RequireAuth() {
  let token=localStorage.getItem("auth_token")
  if(!token){
    return <Navigate to="/login" replace/>;
 
  }
  return <Outlet/>;
}

export default RequireAuth