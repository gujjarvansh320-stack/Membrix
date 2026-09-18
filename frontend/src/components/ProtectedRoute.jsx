// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Show a loading screen while checking local storage for the token
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If there is no user logged in, send them back to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component (like the Dashboard)
  return children;
};

export default ProtectedRoute;