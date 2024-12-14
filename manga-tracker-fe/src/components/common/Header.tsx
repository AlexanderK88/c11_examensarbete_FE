import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const isActive = (path: string) => {
    const location = useLocation();
    return location.pathname === path ? "border-purple-800" : "";
  };

  return (
    <>
      <header className="w-full bg-white border-b-2 shadow-sm relative z-20 h-16 px-4">
        <div className="flex justify-between h-full ">
          <div className="h-full flex items-center">
            <img src="/logo.png" alt="LOGO" className="w-48 " />
          </div>
          <div className="flex flex-row align-center h-full">
            <div className="hidden md:flex items-center h-full mr-10">
              <nav className="h-full w-full font-semibold">
                <ul className="h-full flex gap-8">
                  <li
                    className={`h-full flex items-center border-b-2 border-white hover:border-purple-800 ${isActive(
                      "/dashboard"
                    )}`}
                  >
                    <a href="/dashboard" className="text-black text-xl">
                      Dashboard
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2 border-white hover:border-purple-800 ${isActive(
                      "/browse"
                    )}`}
                  >
                    <a href="/browse" className="text-black text-xl">
                      Browse
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2 border-white hover:border-purple-800 ${isActive(
                      "/discovery"
                    )}`}
                  >
                    <a href="/discovery" className="text-black text-xl">
                      Discovery
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center ">
              <input
                type="text"
                placeholder="Search"
                className="hidden md:inline-block w-42 p-1 border border-gray-300 rounded-md"
              />
              <img
                src="/pfp.jpg"
                alt="Avatar"
                className="rounded-full w-10 sm:w-12 md:ml-4 hover:shadow-purple-800 hover:shadow-sm cursor-pointer"
              />
              <button onClick={handleMobileMenu} className="lg:hidden">
                {" "}
                <FaBars size={30} />{" "}
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
        } transition-all ease-out absolute left-0 right-0 z-10 border-2 border-t-0 shadow-sm bg-white p-6 pt-8 rounded-sm lg:hidden`}
      >
        <ul className="space-y-6 text-lg font-semibold">
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Browse</a>
          </li>
          <li>
            <a href="#">Discovery</a>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search"
              className=" w-full p-1 border border-gray-300 rounded-md md:hidden"
            />
          </li>
        </ul>
      </div>
    </>
  );
}
