import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomeHeader() {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "border-purple-800" : "border-transparent";
  };

  return (
    <>
      <header className="w-full bg-[#121212] shadow-sm shadow-black relative z-20 h-16 px-4 text-white font-sans">
        <div className="flex justify-between h-full ">
          <div className="h-full flex items-center text-purple-700">
            <h1 className="text-3xl font-bold"> MangaVault </h1>
          </div>
          <div className="flex flex-row align-center h-full">
            <div className="hidden md:flex items-center h-full mr-10">
              <nav className="h-full w-full font-semibold">
                <ul className="h-full flex gap-8">
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/d"
                    )} `}
                  >
                    <Link to="/" className="text-white text-xl">
                      About us
                    </Link>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/d"
                    )} `}
                  >
                    <Link to="/" className="text-white text-xl">
                      FAQ
                    </Link>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/d"
                    )}`}
                  >
                    <Link to="/" className="text-white text-xl">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center ">
              <button onClick={handleMobileMenu} className="lg:hidden">
                <FaBars size={30} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`${
          isMobile
            ? "opacity-100 pointer-events-auto translate-y-0 duration-200"
            : "opacity-0 pointer-events-none -translate-y-full duration-0"
        } transition-all ease-out absolute left-0 right-0 z-10 border-2 border-t-0 shadow-sm bg-[#121212] p-6 pt-8 rounded-sm lg:hidden`}
      >
        <ul className="space-y-6 text-lg font-semibold">
          <li>
            <Link to="/"> About us</Link>
          </li>
          <li>
            <Link to="/"> FAQ</Link>
          </li>
          <li>
            <Link to="/"> PRICING </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
