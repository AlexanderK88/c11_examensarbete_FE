import React from "react";
import { FaGithub } from "react-icons/fa";

const GitHubLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/login";
  };

  return (
    <button
      className="flex items-center justify-center gap-3 p-3 w-80 bg-black text-white font-bold text-lg rounded-md shadow-md hover:shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:-translate-y-1"
      onClick={handleLogin}
    >
      <FaGithub className="w-8 h-8" />
      Log in using GitHub
    </button>
  );
};

export default GitHubLoginButton;
