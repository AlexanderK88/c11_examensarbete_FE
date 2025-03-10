import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useAuthContext } from "../provider/AuthProvider";
import {
  SaveMangaDto,
  useFetchUsersSavedMangas,
  useFetchAllSavedMangas,
} from "../services/SaveMangaService";
import FilterForDashboard from "../components/modals/FilterForDashboard";
import { IoIosArrowDown } from "react-icons/io";
import MangaListItem from "../components/manga/MangaListItem";
import ListView from "../components/manga/ListView";
import { MangaDto } from "../types/mangaTypes";

export default function Dashboard() {
  const [isListView, setIsListView] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isListView") || "false")
  );
  const { dbUser } = useAuthContext();
  const [mangas, setMangas] = useState<SaveMangaDto[]>([]);
  const [savedMangas, setSavedMangas] = useState<MangaDto[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);

  if (!dbUser) {
    return null;
  }
  const { data, error, isLoading } = useFetchUsersSavedMangas();
  const { data: fullSavedMangas } = useFetchAllSavedMangas();

  useEffect(() => {
    if (data) {
      setMangas(data);
    }
    if (fullSavedMangas) {
      setSavedMangas(fullSavedMangas);
    }
  }, [data]);

  const handleListView = () => {
    const newIsListView = !isListView;
    setIsListView(newIsListView);
    if (newIsListView == true) {
      setIsFilterModalVisible(false);
    }
    localStorage.setItem("isListView", JSON.stringify(newIsListView));
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible((prev) => !prev);
  };
  return (
    <>
      <Header />
      <main className="min-h-screen w-full lg:w-10/12 mx-auto">
        <div className="relative w-full flex justify-end items-center p-5  shadow-sm">
          <div className="absolute top-[20px] flex gap-5 left-[10px] text-white bg-black p-2 px-4 rounded-3xl shadow-lg">
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
            <div className="absolute right-4 top-[20px] max-w-44  rounded-lg py-[8px]  flex flex-col items-center">
              {!isListView && (
                <div className="flex justify-between cursor-pointer" onClick={toggleFilterModal}>
                  <h3 className="text-xl ml-10 font-semibold text-white">Filters</h3>
                  <IoIosArrowDown className="text-2xl text-white mt-1 mr-10" />
                </div>
              )}
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
              {mangas.length < 1 && (
                <h2 className="font-sans text-gray-300 text-center">
                  No series has been saved, go to
                  <Link to="/discovery">
                    <span className="underlined font-semibold cursor-pointer hover:text-purple-700">
                      {" "}
                      Discovery{" "}
                    </span>{" "}
                  </Link>{" "}
                  to find some!
                </h2>
              )}
              {mangas &&
                mangas.map((manga) => (
                  <MangaListItem
                    manga={manga}
                    key={manga.mangaid}
                    savedManga={savedMangas.find((x) => x.id == manga.mangaid) || ({} as MangaDto)}
                  />
                ))}
            </div>
          )}
          {isListView && <ListView />}
        </div>
      </main>
      <Footer />
    </>
  );
}
