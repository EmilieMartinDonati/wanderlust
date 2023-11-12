import React from "react"
import { Navigate } from "react-router-dom";

const ProtectedOwnerRoute = ({user, children}) => {
  if (!user || !user.isOwner) {
    return (
      <Navigate to="/" replace/>
    );
  }

  return children
}

export default ProtectedOwnerRoute