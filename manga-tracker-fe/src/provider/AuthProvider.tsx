import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  login: string;
  email: string;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/user", {
      withCredentials: true,
    });
    return response.data;
  } catch {
    return null; // Explicitly return null if no user is found
  }
};

// Hook to fetch user data with React Query
const useFetchUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery(["user"], fetchUser, {
    retry: false,
    onError: () => console.log("No user is logged in"),
  });

  return { user, isLoading, isError, refetch };
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, refetch } = useFetchUser();
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });
    refetch(); // Optionally clear user data
    navigate("/"); // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
