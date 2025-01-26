import React, { createContext, useContext, useEffect, useState } from "react";
import { DbUser } from "../types/userType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface GitHubUser {
  id: string;
  login: string;
  email: string;
  avatar_url: string;
}

interface AuthContextType {
  githubUser: GitHubUser | null;
  dbUser: DbUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

// Fetch the GitHub user
const fetchGitHubUser = async (): Promise<GitHubUser | null> => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/user", {
      withCredentials: true,
    });
    return response.data;
  } catch {
    return null; // Return null if no GitHub user is found
  }
};

// Fetch the database user based on the GitHub user's id
const fetchDbUser = async (id: string): Promise<DbUser | null> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/user/data/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch {
    return null; // Return null if no database user is found
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [githubUser, setGitHubUser] = useState<GitHubUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthData = async () => {
      setIsLoading(true);

      // Fetch GitHub user
      const fetchedGitHubUser = await fetchGitHubUser();
      setGitHubUser(fetchedGitHubUser);

      if (fetchedGitHubUser) {
        // Fetch the database user using the GitHub user's email
        const fetchedDbUser = await fetchDbUser(fetchedGitHubUser.id);
        setDbUser(fetchedDbUser);
      }

      setIsLoading(false);
    };

    fetchAuthData();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:8080/logout",
      {},
      { withCredentials: true }
    );
    setGitHubUser(null);
    setDbUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ githubUser, dbUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
