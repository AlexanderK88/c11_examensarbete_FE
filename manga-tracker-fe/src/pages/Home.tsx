import React from "react";
import GitHubLoginButton from "../components/github/GithubLoginButton";
import GoogleLoginButton from "../components/github/GoogleLoginButton";
import { useAuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuthContext();
  if (user) {
    return <Navigate to="/discovery" replace />;
  }
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to MangaVault</h1>
        <div className="flex justify-center gap-12 w-full">
          <GitHubLoginButton />
          <GoogleLoginButton />
        </div>
      </div>
    </>
  );
}
