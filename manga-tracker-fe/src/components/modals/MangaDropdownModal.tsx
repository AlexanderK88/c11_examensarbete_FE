import { useState } from "react";
import { useFetchUsersSavedMangas } from "../../services/SaveMangaService";
import { CiSquarePlus } from "react-icons/ci";
import { useAuthContext } from "../../provider/AuthProvider";
import { IoReturnDownBack } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { SaveMangaDto } from "../../services/SaveMangaService";

interface MangaDropdownModalProps {
  selectedMangas: number[];
  setSelectedMangas: React.Dispatch<React.SetStateAction<number[]>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  mangasAlreadyInList: SaveMangaDto[];
}

export default function MangaDropdownModal({
  setIsModalVisible,
  setSelectedMangas,
  selectedMangas,
  handleCancel,
  mangasAlreadyInList,
}: MangaDropdownModalProps) {
  const { dbUser } = useAuthContext();
  const { data, error, isLoading } = useFetchUsersSavedMangas(dbUser ? dbUser.id : "");

  const addMangasToSelectedSeries = (id: number) => {
    setSelectedMangas((prev) =>
      prev.includes(id) ? prev.filter((manga) => manga !== id) : [...prev, id]
    );
  };

  const handleSaveAndGoBack = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-10/12 h-1/2 bg-[#121212] pb-4 rounded-md shadow-md overflow-y-scroll">
      <div className="w-full flex gap-2 items-center p-4">
        <button
          className="w-full flex justify-center text-red-500 items-center h-8 p-2 border-2 border-red-600 rounded-md  hover:bg-red-600 hover:text-white "
          onClick={handleCancel}
        >
          <IoReturnDownBack />
          <p className="pl-2 text-center ">Cancel</p>
        </button>
        <button
          className="w-full flex justify-center items-center h-8 p-2 border-2 border-purple-500 rounded-md text-md text-purple-500 cursor-pointer hover:bg-purple-600 hover:text-white"
          onClick={handleSaveAndGoBack}
        >
          <IoIosSave />
          <p className="pl-2 text-center ">Save Series</p>
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {data &&
        data
          .filter(
            (manga) => !mangasAlreadyInList.some((listManga) => listManga.mangaid === manga.mangaid)
          )
          .map((manga) => (
            <div
              key={manga.mangaid}
              className={`w-full flex justify-between items-center px-4 border-b-2 border-zinc-800 ${
                selectedMangas.includes(manga.mangaid) ? "bg-purple-500" : "bg-[#121212]"
              }`}
            >
              <p
                className="py-4 px-2 w-full cursor-pointer text-white"
                onClick={() => addMangasToSelectedSeries(manga.mangaid)}
              >
                {manga.title}
              </p>
              <CiSquarePlus className="text-white" />
            </div>
          ))}
    </div>
  );
}
