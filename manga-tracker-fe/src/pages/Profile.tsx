import { useState, useEffect } from "react";
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

export default function Profile() {
  const { dbUser } = useAuthContext();
  const [isLibrary, setIsLibrary] = useState<boolean>(true);
  const [mangas, setMangas] = useState<MangaDto[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);

  if (!dbUser) {
    return null;
  }
  const { data, error, isLoading } = useFetchAllSavedMangas(dbUser.id);

  useEffect(() => {
    if (data) {
      setMangas(data);
    }
  }, [data]);

  const handleLibrary = () => {
    setIsLibrary(!isLibrary);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible((prev) => !prev);
  };

  return (
    <>
      <main className="w-full font-sans">
        <div className="relative h-[350px] bg-cover bg-center bg-no-repeat bg-[url('/banner2.jpg')]">
          <ProfileHeader />
          <div className="absolute flex flex-col items-center bottom-[-95px] left-8">
            <img
              className="rounded-full w-28 h-28 shadow-lg"
              src={dbUser?.profilePictureUrl}
              alt=""
            />
            <p className=" text-center font-semibold text-black max-w-[100px]">
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

          <div className="absolute flex gap-5 bottom-[-20px] left-[180px] text-black bg-white p-2 px-4 rounded-3xl shadow-lg ">
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
        <div className="w-full h-full h-min-screen mt-[140px] border-t-2 border-b-2 py-4 border-gray-300 flex flex-col items-center">
          <div
            className="w-full flex justify-between cursor-pointer"
            onClick={toggleFilterModal}
          >
            <h3 className="text-xl ml-10 font-semibold">Filters</h3>
            <IoIosArrowDown className="text-2xl mt-1 text-black mr-10" />
          </div>
        </div>
        {isLoading && (
          <div>
            <StandardCardSkeleton />
            <StandardCardSkeleton />
            <StandardCardSkeleton />
          </div>
        )}
        {isFilterModalVisible && data && (
          <FilterModalProfile mangas={data} setMangas={setMangas} />
        )}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {data &&
            mangas.map((manga) => (
              <StandardCard manga={manga} key={manga.id} />
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
