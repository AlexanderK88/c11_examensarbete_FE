import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMangaById, useMangas } from "../services/MangaService";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { IoMdBook } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import SaveMangaModal from "../components/modals/SaveMangaModal";

export default function Individual() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { data: manga, isLoading, error } = useMangaById(id as string);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("Resizing...");
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div>Error: {error.message}</div>
        </main>
        <Footer />
      </>
    );
  }
  const handleActiveMenu = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <>
      <Header />
      {isMobile && (
        <>
          <main className="w-full font-sans">
            <div className="mt-2 w-11/12 mx-auto">
              <h1 className="text-3xl my-4 font-semibold">
                {manga?.title || "Untitled"}
              </h1>
              <div className="w-full flex mx-auto">
                {manga?.images?.[0]?.largeImageUrl && (
                  <img
                    src={manga.images[0].largeImageUrl}
                    alt={manga.title || "Manga"}
                    className="w-[185px] h-[285px] rounded-lg shadow-md mr-5"
                  />
                )}
                <div className="w-full flex flex-col gap-1">
                  <div>
                    <div className="flex flex-wrap gap-1 my-2">
                      {manga?.genres?.map((genre) => (
                        <p
                          className="bg-purple-700 text-white p-1 px-3 text-sm rounded-lg"
                          key={genre.id}
                        >
                          {genre.name}
                        </p>
                      )) || <p>No genres available</p>}
                    </div>
                  </div>
                  <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                    <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white">
                      <p className="mx-auto my-1">読</p>
                    </div>
                    <div className="mr-2">
                      <h3 className="text-sm right-0">Type</h3>
                      <p className="text-md font-bold">
                        {manga?.type || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                    <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                      <p className="text-white text-2xl my-1">
                        <IoMdBook />
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm">Chapters available</h3>
                      <p className="text-md font-bold">
                        {manga?.chapters ?? "Soon"}
                      </p>
                    </div>
                  </div>
                  <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                    <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                      <p className="text-white text-2xl my-1">
                        <FaStar />
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm">Rating</h3>
                      <p className="text-md font-bold">
                        {manga?.score ?? "No rating"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-white mt-4 p-2 bg-purple-800 w-full rounded-lg hover:bg-purple-700"
                onClick={toggleModal}
              >
                Add to library
              </button>
              <h2 className="text-red-600 mt-4 mx-auto w-12">Report</h2>
            </div>
            <div>
              <div className="flex flex-row justify-center h-full gap-10 mt-5">
                <p className="h-full hover:border-b border-purple-700 py-5">
                  Overview
                </p>
                <p className="h-full hover:border-b border-purple-700 py-5">
                  Reviews
                </p>
                <p className="h-full hover:border-b border-purple-700 py-5">
                  Statistics
                </p>
              </div>
              <div className="bg-stone-400 h-[1px] w-full mb-5"></div>
              <div className="border rounded-lg m-5 p-5">
                <div>
                  <h2 className="text-3xl">Synopsis</h2>
                </div>
                <div className="bg-stone-400 h-[1px] w-full my-5"></div>
                <div>
                  <p>{manga?.synopsis || "No synopsis available."}</p>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
      {!isMobile && (
        <>
          <div className="h-[1px] translate-y-[300px] bg-gray-400"></div>
          <main className="bg-gray-50 min-h-screen max-w-[1200px] mx-auto">
            {/* Hero Section */}

            <div className="relative h-[300px]  border-gray-400 ">
              <div className="absolute bottom-[-150px] left-[170px] transform -translate-x-1/2">
                {/* Image */}
                <img
                  src={manga?.images[0].largeImageUrl}
                  alt={manga?.title || "Manga"}
                  className="w-[256px] h-[384px] rounded-lg shadow-md"
                />
              </div>
              <div className="absolute w-full  ml-5 left-[340px] top-[90px]">
                <h1 className="text-black sm:text-2xl md:text-3xl lg:text-4xl font-bold sm:w-1/2 lg:max-w-[600px] ">
                  {manga?.title || "Manga Title"}
                </h1>
                <div className="flex flex-wrap gap-1 my-4">
                  {manga?.genres?.map((genre) => (
                    <p
                      className="bg-purple-700 text-white p-1 px-3 text-sm rounded-lg"
                      key={genre.id}
                    >
                      {genre.name}
                    </p>
                  )) || <p>No genres available</p>}
                </div>
              </div>
              <div className="flex flex-row gap-10 h-[55px] ml-5 left-[350px] bottom-0 absolute w-full text-stone-500">
                <p
                  className={`h-full hover:border-b-2 cursor-pointer hover:border-purple-700 py-5 ${
                    activeMenu === "overview"
                      ? "border-b-2 border-purple-700"
                      : ""
                  }`}
                  onClick={() => setActiveMenu("overview")}
                >
                  Overview
                </p>
                <p
                  className={`h-full hover:border-b-2 hover:border-purple-700 cursor-pointer py-5 ${
                    activeMenu === "reviews"
                      ? "border-b-2 border-purple-700"
                      : ""
                  }`}
                  onClick={() => setActiveMenu("reviews")}
                >
                  Reviews
                </p>
                <p className="h-full hover:border-b-2 py-5">Statistics</p>
              </div>
            </div>
            <div className="flex w-full mt-[150px] px-6">
              <div className="flex flex-col w-[300px] space-y-4 ">
                <button
                  className="w-[256px] mx-auto text-white mt-4 p-2 bg-purple-800 rounded-lg hover:bg-purple-700"
                  onClick={toggleModal}
                >
                  Add to library
                </button>
                <div className="w-[256px] mx-auto border rounded-md shadow-md p-2 flex gap-4 items-center">
                  <div className="p-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white">
                    <p className="mx-auto my-1">読</p>
                  </div>
                  <div>
                    <h3 className="text-sm">Type</h3>
                    <p className="text-md font-bold">
                      {manga?.type || "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="w-[256px] mx-auto border rounded-md shadow-md p-2 flex gap-4 items-center">
                  <div className="p-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                    <IoMdBook />
                  </div>
                  <div>
                    <h3 className="text-sm">Chapters available</h3>
                    <p className="text-md font-bold">
                      {manga?.chapters ?? "Soon"}
                    </p>
                  </div>
                </div>
                <div className="w-[256px] mx-auto border rounded-md shadow-md p-2 flex gap-4 items-center">
                  <div className="p-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                    <FaStar />
                  </div>
                  <div>
                    <h3 className="text-sm">Rating</h3>
                    <p className="text-md font-bold">
                      {manga?.score ?? "No rating"}
                    </p>
                  </div>
                </div>
                <p className="mx-auto text-red-500  font-thin">REPORT ISSUE</p>
              </div>

              {/* Right Panel */}
              <div className="flex-1 bg-white min-h-[500px] m-4 translate-y-[-135px] border-2 border-stone-200 rounded-md shadow-md max-w-[700px]">
                <div className="border-b  border-stone-200 p-4">
                  <h1 className=" text-start ml-3 text-3xl  font-mono text-stone-950">
                    Synopsis
                  </h1>
                </div>
                <div className="ml-7 mr-14 my-6">
                  <p>{manga?.synopsis || "No synopsis available."}</p>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
      {isModalOpen && manga && (
        <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[400px] w-max-[400px] bg-white rounded-lg shadow-lg px-10 py-5">
            <SaveMangaModal manga={manga} />
            <button className="text-red-500 mt-4" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
