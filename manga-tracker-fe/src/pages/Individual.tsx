import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMangaById } from "../services/MangaService";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { IoMdBook } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import SaveMangaModal from "../components/modals/SaveMangaModal";
import { useFetchAllSavedMangas } from "../services/SaveMangaService";
import { useAuthContext } from "../provider/AuthProvider";
import { useDeleteSavedManga } from "../services/SaveMangaService";
import SynopsisDesktop from "../components/individualPage/SynopsisDesktop";
import SynopsisMobile from "../components/individualPage/SynopsisMobile";
import ReviewMobile from "../components/individualPage/ReviewMobile";
import ReviewDesktop from "../components/individualPage/ReviewDesktop";

export default function Individual() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { dbUser } = useAuthContext();
  const { id } = useParams();
  const { data: manga, isLoading, error } = useMangaById(id as string);

  const { data: savedMangas } = useFetchAllSavedMangas(dbUser?.id || "");

  const { mutate: deleteSavedManga } = useDeleteSavedManga(dbUser?.id || "", id as string);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    deleteSavedManga();
    setIsSaved(false);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 700);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (manga && savedMangas) {
      const isMangaSaved = savedMangas.some((saved) => saved.id === manga.id);
      setIsSaved(isMangaSaved);
    }
  }, [manga, savedMangas]);

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
          <main className="w-full font-sans bg-[#121212] text-white">
            <div className="mt-2 w-11/12 mx-auto">
              <h1 className="text-3xl my-4 font-semibold text-white">
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
                      )) || <p className="text-white">No genres available</p>}
                    </div>
                  </div>
                  <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                    <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white">
                      <p className="mx-auto my-1 text-white">読</p>
                    </div>
                    <div className="mr-2">
                      <h3 className="text-sm right-0 text-white">Type</h3>
                      <p className="text-md font-bold text-white">{manga?.type || "Unknown"}</p>
                    </div>
                  </div>
                  <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                    <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                      <p className="text-white text-2xl my-1">
                        <IoMdBook />
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white">Chapters</h3>
                      <p className="text-md font-bold text-white">{manga?.chapters ?? "Soon"}</p>
                    </div>
                  </div>
                  <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                    <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                      <p className="text-white text-2xl my-1">
                        <FaStar />
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-white">Rating</h3>
                      <p className="text-md font-bold text-white">{manga?.score ?? "No rating"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isSaved ? (
                <button
                  className="text-white mt-4 p-2 bg-purple-800 w-full rounded-lg hover:bg-purple-700"
                  onClick={handleDelete}
                >
                  Remove from library
                </button>
              ) : (
                <button
                  className="text-white mt-4 p-2 bg-purple-800 w-full rounded-lg hover:bg-purple-700"
                  onClick={toggleModal}
                >
                  Add to library
                </button>
              )}

              <h2 className="text-red-600 mt-4 mx-auto w-12">Report</h2>
            </div>
            <div>
              <div className="flex flex-row justify-center h-full gap-10 mt-5">
                <p
                  className={`h-full hover:border-b cursor-pointer border-purple-700 py-5 ${
                    activeMenu === "overview" ? "border-b-2 border-purple-700" : ""
                  }`}
                  onClick={() => handleActiveMenu("overview")}
                >
                  Overview
                </p>
                <p
                  className={`h-full hover:border-b cursor-pointer border-purple-700 py-5 ${
                    activeMenu === "reviews" ? "border-b-2 border-purple-700" : ""
                  }`}
                  onClick={() => handleActiveMenu("reviews")}
                >
                  Reviews
                </p>
                <p className="h-full hover:border-b border-purple-700 py-5 text-gray-500">
                  Statistics
                </p>
              </div>
              <div className="bg-stone-400 h-[1px] w-full mb-5"></div>
              {activeMenu === "overview" && <SynopsisMobile synopsis={manga?.synopsis} />}
              {activeMenu === "reviews" && (
                <ReviewMobile mangaid={id ? id : ""} userid={dbUser?.id ? dbUser.id : ""} />
              )}
            </div>
          </main>
        </>
      )}
      {!isMobile && (
        <>
          <div className="h-[1px] translate-y-[300px] bg-[#121212] text-white "></div>
          <main className=" max-w-screen-lg mx-auto">
            <div className="relative h-[300px] border-gray-400 ">
              <div className="absolute bottom-[-150px] left-[170px] transform -translate-x-1/2">
                <img
                  src={manga?.images[0].largeImageUrl}
                  alt={manga?.title || "Manga"}
                  className="w-[256px] h-[384px] rounded-lg shadow-md"
                />
              </div>
              <div className="absolute ml-5 left-[340px] top-[90px]">
                <h1 className="text-white sm:text-2xl md:text-3xl lg:text-4xl font-bold  ">
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
                  )) || <p className="text-white">No genres available</p>}
                </div>
              </div>
              <div className="flex flex-row gap-10 h-[55px] ml-5 left-[350px] bottom-0 absolute  text-white">
                <p
                  className={`h-full hover:border-b-2 cursor-pointer hover:border-purple-700 py-5 ${
                    activeMenu === "overview" ? "border-b-2 border-purple-700" : ""
                  }`}
                  onClick={() => setActiveMenu("overview")}
                >
                  Overview
                </p>
                <p
                  className={`h-full hover:border-b-2 hover:border-purple-700 cursor-pointer py-5 ${
                    activeMenu === "reviews" ? "border-b-2 border-purple-700" : ""
                  }`}
                  onClick={() => setActiveMenu("reviews")}
                >
                  Reviews
                </p>
                <p className="h-full hover:border-b-2 py-5 text-gray-400">Statistics</p>
              </div>
            </div>
            <div className="flex w-full mt-[150px] px-6">
              <div className="flex flex-col w-[300px] space-y-4 ">
                {isSaved ? (
                  <button
                    className="w-[256px] mx-auto text-white mt-4 p-2 bg-purple-800 rounded-lg hover:bg-purple-700"
                    onClick={handleDelete}
                  >
                    Remove from library
                  </button>
                ) : (
                  <button
                    className="w-[256px] mx-auto text-white mt-4 p-2 bg-purple-800 rounded-lg hover:bg-purple-700"
                    onClick={toggleModal}
                  >
                    Add to library
                  </button>
                )}
                <div className="w-[256px] mx-auto border rounded-md shadow-md p-2 flex gap-4 items-center">
                  <div className="p-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white">
                    <p className="mx-auto my-1">読</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-white">Type</h3>
                    <p className="text-md font-bold text-white">{manga?.type || "Unknown"}</p>
                  </div>
                </div>
                <div className="w-[256px] mx-auto border rounded-md shadow-md p-2 flex gap-4 items-center">
                  <div className="p-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                    <IoMdBook />
                  </div>
                  <div>
                    <h3 className="text-sm text-white">Chapters</h3>
                    <p className="text-md font-bold text-white">{manga?.chapters ?? "Soon"}</p>
                  </div>
                </div>
                <div className="w-[256px] mx-auto border rounded-md shadow-md p-2 flex gap-4 items-center">
                  <div className="p-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                    <FaStar />
                  </div>
                  <div>
                    <h3 className="text-sm text-white">Rating</h3>
                    <p className="text-md font-bold text-white">{manga?.score ?? "No rating"}</p>
                  </div>
                </div>
                <p className="mx-auto text-red-500  font-thin">REPORT ISSUE</p>
              </div>

              {activeMenu === "overview" && <SynopsisDesktop manga={manga} />}
              {activeMenu === "reviews" && (
                <ReviewDesktop mangaid={id ? id : ""} userid={dbUser?.id ? dbUser.id : ""} />
              )}
            </div>
          </main>
        </>
      )}
      {isModalOpen && manga && (
        <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[400px] sm:w-[600px] w-max-[400px] sm:w-max-[600px] rounded-lg shadow-lg px-10 py-5">
            <SaveMangaModal manga={manga} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
