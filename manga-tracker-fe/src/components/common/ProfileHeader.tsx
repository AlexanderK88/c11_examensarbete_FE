import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MangaDto } from "../../types/mangaTypes";
import SearchInput from "../filtering/SearchInput";
import MangaModal from "../modals/MangaModal";
import { useAuthContext } from "../../provider/AuthProvider";

export default function ProfileHeader() {
  const [isMobile, setIsMobile] = useState(false);
  const [manga, setManga] = useState<MangaDto[]>([]);
  const [manga1, setManga1] = useState<MangaDto[]>([]);

  const location = useLocation();
  const { dbUser, logout } = useAuthContext(); // Access user and logout from context

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "border-purple-800"
      : "border-transparent";
  };

  return (
    <>
      <header className="w-full bg-black bg-opacity-25  shadow-sm relative z-20 h-16 px-4">
        <div className="flex justify-between h-full ">
          <div className="h-full flex items-center ">
            <h1 className="text-purple-600 text-4xl font-bold font-mono">MV</h1>
          </div>
          <div className="flex flex-row align-center h-full">
            <div className="hidden md:flex items-center h-full mr-10">
              <nav className="h-full w-full font-semibold">
                <ul className="h-full flex gap-8">
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/dashboard"
                    )} `}
                  >
                    <a href="/dashboard" className="text-white text-xl">
                      Dashboard
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/browse"
                    )} `}
                  >
                    <a href="/browse" className="text-white text-xl">
                      Browse
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/discovery"
                    )}`}
                  >
                    <a href="/discovery" className="text-white text-xl">
                      Discovery
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center ">
              <div className="hidden lg:inline-block relative">
                <SearchInput setMangas={setManga} />
                <MangaModal mangas={manga} />
              </div>
              {dbUser ? (
                <button
                  onClick={logout}
                  className="hidden md:block text-white font-semibold bg-purple-800 hover:bg-purple-600 text-sm py-2 px-4 rounded-md ml-4"
                >
                  Logout
                </button>
              ) : null}
              <button
                onClick={handleMobileMenu}
                className=" text-white lg:hidden"
              >
                <FaBars size={30} />
              </button>
              <img
                src={dbUser?.profilePictureUrl}
                alt="Avatar"
                className="rounded-full ml-4 w-10 sm:w-12 md:mx-4  hover:shadow-purple-800 hover:shadow-sm cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>
      <div
        className={`${
          isMobile
            ? "opacity-100 pointer-events-auto translate-y-0 duration-200"
            : "opacity-0 pointer-events-none -translate-y-full duration-0"
        } transition-all ease-out absolute left-0 right-0 z-10 shadow-sm bg-black bg-opacity-25 text-white p-6 pt-8 rounded-sm lg:hidden`}
      >
        <ul className="space-y-6 text-lg font-semibold">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/browse">Browse</a>
          </li>
          <li>
            <a href="/discovery">Discovery</a>
          </li>
          <li>
            <SearchInput setMangas={setManga1} />
            <MangaModal mangas={manga1} />
          </li>
        </ul>
      </div>
    </>
  );
}
