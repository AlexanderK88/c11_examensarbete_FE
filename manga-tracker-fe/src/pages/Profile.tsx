import { useState, useEffect, useMemo } from "react";
import ProfileHeader from "../components/common/ProfileHeader";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../components/common/Footer";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../provider/AuthProvider";
import { useFetchAllSavedMangas } from "../services/SaveMangaService";
import StandardCard from "../components/manga/cards/StandardCard";
import StandardCardSkeleton from "../components/skeleton/StandardCardSkeleton";
import FilterModalProfile from "../components/modals/FilterModalProfile";
import { MangaDto } from "../types/mangaTypes";
import UserAddInfoModal from "../components/modals/UserAddInfoModal";

export default function Profile() {
  const { dbUser } = useAuthContext();
  const [isLibrary, setIsLibrary] = useState<boolean>(true);
  const [mangas, setMangas] = useState<MangaDto[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);

  if (!dbUser) {
    return null;
  }
  const { data, isError, isLoading } = useFetchAllSavedMangas();

  useEffect(() => {
    if (data && JSON.stringify(mangas) !== JSON.stringify(data)) {
      setMangas(data);
    }
  }, [data, mangas]);

  const handleLibrary = () => {
    setIsLibrary(!isLibrary);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible((prev) => !prev);
  };

  const handleUserInfoModal = () => {
    if (!dbUser.username || !dbUser.email) {
      return true;
    } else if (dbUser.username == null && dbUser.email == null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <main className="w-full font-sans">
        <div className="relative h-[350px] bg-cover bg-center bg-no-repeat bg-[url('/banner2.jpg')]">
          <ProfileHeader />
          <div className="absolute flex flex-col items-center bottom-[-95px] left-8">
            <img
              className="rounded-full w-28 h-28 shadow-lg"
              src={dbUser?.profilePictureUrl || "/pfp2.png"}
              alt="Avatar"
              loading="lazy"
            />
            <p className=" text-center font-semibold text-white max-w-[100px]">
              {dbUser?.username}
            </p>
            <p className="text-center text-gray-500 max-w-[100px]">
              Joined{" "}
              {dbUser?.createdAt
                ? formatDistanceToNow(new Date(dbUser.createdAt))
                : ""}{" "}
              ago
            </p>
          </div>

          <div className="absolute flex gap-5 bottom-[-20px] left-[180px] bg-black text-white p-2 px-4 rounded-3xl shadow-lg">
            <h4
              className={`rounded-2xl px-4 py-1 cursor-pointer ${
                isLibrary
                  ? "text-gray-400 hover:bg-purple-700 hover:text-white"
                  : "bg-purple-700 text-white"
              }`}
              onClick={handleLibrary}
            >
              Overview
            </h4>
            <h4
              className={`rounded-2xl px-4 py-1 cursor-pointer ${
                isLibrary
                  ? "bg-purple-700 text-white"
                  : "text-gray-400 hover:bg-purple-700 hover:text-white"
              }`}
              onClick={handleLibrary}
            >
              Library
            </h4>
          </div>
        </div>
        <div></div>
        <div className="w-full h-full h-min-screen mt-[140px] border-t-2 border-b-2 py-4 border-zinc-800 flex flex-col items-center">
          <div
            className="w-full flex justify-between cursor-pointer"
            onClick={toggleFilterModal}
          >
            <h3 className="text-xl ml-10 font-semibold text-white">Filters</h3>
            <IoIosArrowDown className="text-2xl mt-1 text-white mr-10" />
          </div>
        </div>
        {isLoading && (
          <div>
            <StandardCardSkeleton />
            <StandardCardSkeleton />
            <StandardCardSkeleton />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center text-red-500 mt-4">
            <p>Something went wrong. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg"
            >
              Retry
            </button>
            z
          </div>
        )}

        {!isLoading && !isError && isFilterModalVisible && data && (
          <FilterModalProfile mangas={data} setMangas={setMangas} />
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {data &&
            mangas.map((manga) => (
              <StandardCard manga={manga} key={manga.id} />
            ))}
        </div>
        {handleUserInfoModal() && (
          <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="w-[400px] sm:w-[600px] w-max-[400px] sm:w-max-[600px] bg-[#121212] rounded-lg shadow-lg px-10 py-5">
              <UserAddInfoModal />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
