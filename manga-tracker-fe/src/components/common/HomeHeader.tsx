import { useState } from "react";
import { FaBars } from "react-icons/fa";

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
      <header className="w-full bg-[#121212] border-b-2 shadow-sm relative z-20 h-16 px-4 text-white font-sans">
        <div className="flex justify-between h-full ">
          <div className="h-full flex items-center text-purple-700">
            <h1 className="text-3xl"> MangaVault </h1>
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
                    <a href="/" className="text-white text-xl">
                      About us
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/d"
                    )} `}
                  >
                    <a href="/" className="text-white text-xl">
                      FAQ
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center border-b-2  hover:border-purple-800 ${isActive(
                      "/d"
                    )}`}
                  >
                    <a href="/" className="text-white text-xl">
                      Pricing
                    </a>
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
        } transition-all ease-out absolute left-0 right-0 z-10 border-2 border-t-0 shadow-sm bg-white p-6 pt-8 rounded-sm lg:hidden`}
      >
        <ul className="space-y-6 text-lg font-semibold">
          <li>
            <a href="/dashboard"> us</a>
          </li>
          <li>
            <a href="/browse"></a>
          </li>
          <li>
            <a href="/discovery"></a>
          </li>
        </ul>
      </div>
    </>
  );
}
