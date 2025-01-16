import GitHubLoginButton from "../components/github/GithubLoginButton";
import GoogleLoginButton from "../components/github/GoogleLoginButton";
import { useAuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import HomeHeader from "../components/common/HomeHeader";
import Footer from "../components/common/Footer";
import { IoRocketSharp } from "react-icons/io5";

export default function Home() {
  const { dbUser } = useAuthContext();
  if (dbUser) {
    return <Navigate to="/discovery" replace />;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <HomeHeader />
        <div className="flex flex-col gap-6 items-center justify-center mt-10">
          <h1 className="text-xl sm:text-4xl font-bold text-blue-600">
            Welcome to MangaVault
          </h1>
          <p className="text-gray-600 text-center px-6 max-w-2xl">
            Discover, save, and track your favorite manga effortlessly. Join a
            community of manga enthusiasts and embark on an exciting journey!
          </p>
          <IoRocketSharp className="text-6xl text-purple-500 animate-bounce" />
          <div className="w-full max-w-4xl px-4">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              🌟 Featured Mangas
            </h2>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                <div className="bg-white shadow-md rounded-lg  ">
                  <img
                    src="vinland.jpg"
                    alt="manga"
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                  <div className="mt-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Vinland Saga
                    </h3>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg ">
                  <img
                    src="bloodhound.jpg"
                    alt="manga"
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                  <div className="mt-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Revenge of the Baskerville Bloodhound
                    </h3>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg ">
                  <img
                    src="hunter.jpg"
                    alt="manga"
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                  <div className="mt-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Hunter x Hunter
                    </h3>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg ">
                  <img
                    src="mounthua.jpg"
                    alt="manga"
                    className="w-full h-[300px] object-cover  rounded-t-lg"
                  />
                  <div className="mt-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Return of the Blossoming Blade
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-12 w-full mt-10">
          <GitHubLoginButton />
          <GoogleLoginButton />
        </div>
        <Footer />
      </div>
    </>
  );
}
