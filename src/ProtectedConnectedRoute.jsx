import React from "react"
import {Navigate} from "react-router-dom";

const ProtectedConnectedRoute = ({user, children}) => {
  if (!user) {
    return (
      <Navigate to="/" replace/>
    );
  }
  return children
}

export default ProtectedConnectedRoute