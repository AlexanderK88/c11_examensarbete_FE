import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useAuthContext } from "../provider/AuthProvider";
import {
  SaveMangaDto,
  useFetchUsersSavedMangas,
} from "../services/SaveMangaService";
import FilterForDashboard from "../components/modals/FilterForDashboard";
import { IoIosArrowDown } from "react-icons/io";
import MangaListItem from "../components/manga/MangaListItem";
import ListView from "../components/manga/ListView";

export default function Dashboard() {
  const [isListView, setIsListView] = useState<boolean>(false);
  const { dbUser } = useAuthContext();
  const [mangas, setMangas] = useState<SaveMangaDto[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);

  if (!dbUser) {
    return null;
  }
  const { data, error, isLoading } = useFetchUsersSavedMangas(dbUser.id);

  useEffect(() => {
    console.log("fetched with user id:", dbUser.id);
    console.log("Data:", data);
    if (data) {
      setMangas(data);
    }
  }, [data]);

  const handleListView = () => {
    setIsListView(!isListView);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible((prev) => !prev);
  };
  return (
    <>
      <Header />
      <main className="min-h-screen w-full lg:w-10/12 mx-auto">
        <div className="relative w-full flex justify-end items-center p-5 border-b-2 border-purple-300 shadow-sm">
          <div className="absolute top-[20px] flex gap-5 left-[10px] text-black bg-white p-2 px-4 rounded-3xl shadow-lg">
            <h4
              className={`rounded-2xl px-4 py-1 cursor-pointer ${
                isListView
                  ? "text-gray-400 hover:bg-purple-700 hover:text-white"
                  : "bg-purple-700 text-white"
              }`}
              onClick={handleListView}
            >
              Series
            </h4>
            <h4
              className={`rounded-2xl px-4 py-1 cursor-pointer ${
                isListView
                  ? "bg-purple-700 text-white"
                  : "text-gray-400 hover:bg-purple-700 hover:text-white"
              }`}
              onClick={handleListView}
            >
              Lists
            </h4>
          </div>
          <div className="w-full">
            <div className="absolute right-4 top-[20px] max-w-44 border-2 rounded-lg py-[8px] border-gray-200 flex flex-col items-center">
              <div
                className="flex justify-between cursor-pointer"
                onClick={toggleFilterModal}
              >
                <h3 className="text-xl ml-10 font-semibold">Filters</h3>
                <IoIosArrowDown className="text-2xl mt-1 text-black mr-10" />
              </div>
            </div>
            <div className="mt-[90px] w-full">
              {isFilterModalVisible && data && (
                <FilterForDashboard mangas={data} setMangas={setMangas} />
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-full ">
          {isLoading && <div>LOADING</div>}
          {!isListView && (
            <div className="flex flex-col gap-0 ">
              {mangas && mangas.map((manga) => <MangaListItem manga={manga} />)}
            </div>
          )}
          {isListView && <ListView />}
        </div>
      </main>
      <Footer />
    </>
  );
}
