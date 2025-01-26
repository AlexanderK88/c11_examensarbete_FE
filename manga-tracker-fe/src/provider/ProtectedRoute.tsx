import React, { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider"; // Update the path as necessary

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { dbUser, isLoading } = useAuthContext();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }
  if (!dbUser) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
