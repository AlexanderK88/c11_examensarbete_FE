import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <>
      <header className="bg-white border-b-2 shadow-sm relative z-20 h-16 px-4">
        <div className="flex justify-between h-full ">
          <div className="h-full flex items-center">
            <img src="/logo.png" alt="LOGO" className="w-48 " />
          </div>
          <div className="hidden lg:flex space-x-8 items-center w-1/3 self-center h-full">
            <nav className="font-semibold w-full h-full">
              <ul className="flex justify-around h-full">
                <li className="h-full flex items-center">
                  <a
                    href="/Browse"
                    className="text-black text-xl hover:border-b-2 hover:border-purple-800"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="h-full flex items-center">
                  <a
                    href="#"
                    className="text-black text-xl  hover:border-b-2 hover:border-purple-800"
                  >
                    Browse
                  </a>
                </li>
                <li className="h-full flex items-center">
                  <a
                    href="#"
                    className="text-black text-xl hover:border-b-2 hover:border-purple-800"
                  >
                    Discovery
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex space-x-8 items-center right-0">
            <input
              type="text"
              placeholder="Search"
              className="hidden md:inline-block w-42 p-1 border border-gray-300 rounded-md"
            />
            <img
              src="/pfp.jpg"
              alt="Avatar"
              className="rounded-full w-10 sm:w-12"
            />
            <button onClick={handleMobileMenu} className="lg:hidden">
              {" "}
              <FaBars size={30} />{" "}
            </button>
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
