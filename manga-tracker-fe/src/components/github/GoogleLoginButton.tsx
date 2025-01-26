import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Implement Google OAuth login here
  };

  return (
    <button
      className="flex items-center justify-center gap-3 p-3 w-80 bg-gray-300 line-through text-black font-bold text-lg rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:-translate-y-1"
      onClick={handleLogin}
    >
      <FcGoogle className="w-8 h-8" />
      Log in using Google
    </button>
  );
};

export default GoogleLoginButton;
