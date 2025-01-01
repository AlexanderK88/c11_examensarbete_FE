import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider"; // Update the path as necessary

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { dbUser, isLoading } = useAuthContext();

  // Show a loading screen while user authentication is being checked
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner or loading component if desired
  }

  // Redirect to the home page if no user is logged in
  if (!dbUser) {
    return <Navigate to="/" replace />;
  }

  // Render the children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
