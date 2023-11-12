import React from "react"
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({user, children}) => {
  if (!user || !user.isAdmin) {
    return (
      <Navigate to="/" replace/>
    );
  }
  return children
}

export default ProtectedAdminRoute