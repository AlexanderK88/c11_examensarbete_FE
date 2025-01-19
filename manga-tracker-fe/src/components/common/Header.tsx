import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MangaDto } from "../../types/mangaTypes";
import SearchInput from "../filtering/SearchInput";
import MangaModal from "../modals/MangaModal";
import { useAuthContext } from "../../provider/AuthProvider";
import ConfirmationModal from "../modals/ConfirmationModal";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState<MangaDto[]>([]);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);
  const [continueAction, setcontinueAction] = useState<boolean>(false);

  const location = useLocation();
  const { dbUser } = useAuthContext();

  const handleLogout = () => {
    console.log("opening modal");
    setConfirmationModalVisible(true);
  };

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "border-purple-800" : "border-transparent";
  };

  return (
    <>
      <header className="w-full bg-[#121212] text-white  shadow-md relative z-20 h-16 px-4 font-sans">
        <div className="flex justify-between h-full ">
          <div className="h-full flex items-center text-3xl font-semibold ml-8">MangaVault</div>
          <div className="flex flex-row align-center h-full">
            <div className="hidden md:flex items-center h-full mr-10">
              <nav className="h-full w-full font-semibold">
                <ul className="h-full flex gap-8">
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/dashboard"
                    )} `}
                  >
                    <Link to="/dashboard" className=" text-xl">
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/browse"
                    )} `}
                  >
                    <Link to="/browse" className=" text-xl">
                      Browse
                    </Link>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/discovery"
                    )}`}
                  >
                    <Link to="/discovery" className=" text-xl">
                      Discovery
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center ">
              <div className="hidden lg:inline-block relative">
                <SearchInput setMangas={setSearchResults} />
                <MangaModal mangas={searchResults} />
              </div>
              {dbUser ? (
                <button
                  onClick={handleLogout}
                  className="hidden lg:block text-white font-semibold bg-purple-800 hover:bg-purple-600 text-sm py-2 px-4 rounded-md ml-4"
                >
                  Logout
                </button>
              ) : null}
              <button onClick={handleMobileMenu} className="lg:hidden text-white">
                <FaBars size={30} />
              </button>
              <Link to="/profile">
                <img
                  src={dbUser?.profilePictureUrl || "/pfp2.png"}
                  alt="Avatar"
                  loading="lazy"
                  className="rounded-full ml-4 w-10 sm:w-12 md:mx-4  hover:shadow-purple-800 hover:shadow-sm cursor-pointer"
                />
              </Link>
            </div>
            {confirmationModalVisible && (
              <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-[400px] sm:w-[600px] w-max-[400px] sm:w-max-[600px] rounded-lg shadow-lg px-10 py-5">
                  <ConfirmationModal
                    confirmationType="logout"
                    setContinueAction={setcontinueAction}
                    setConfirmationModalVisible={setConfirmationModalVisible}
                    continueAction={continueAction}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div
        className={`${
          isMobile
            ? "opacity-100 pointer-events-auto translate-y-0 duration-200"
            : "opacity-0 pointer-events-none -translate-y-full duration-0"
        } transition-all ease-out absolute left-0 right-0 z-10 border-2 border-t-0 border-zinc-800 shadow-sm bg-[#121212] text-white p-6 pt-8 rounded-sm lg:hidden`}
      >
        <ul className="space-y-6 text-lg font-semibold">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/discovery">Discovery</Link>
          </li>
          <li>
            <SearchInput setMangas={setSearchResults} />
            <MangaModal mangas={searchResults} />
          </li>
          <li>
            {dbUser ? (
              <>
                <button
                  onClick={handleLogout}
                  className="w-full text-white font-semibold bg-purple-800 hover:bg-purple-600 text-sm py-2 px-4 rounded-md "
                >
                  Logout
                </button>
              </>
            ) : null}
          </li>
        </ul>
      </div>
    </>
  );
}
