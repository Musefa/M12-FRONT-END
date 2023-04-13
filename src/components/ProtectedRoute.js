import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

function ProtectedRoute({ roles, children }) {
  const { userRole } = useUserContext();

  if (roles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
