import { useState } from "react";
import { useFetchUsersSavedMangas } from "../../services/SaveMangaService";
import { CiSquarePlus } from "react-icons/ci";
import { useAuthContext } from "../../provider/AuthProvider";
import { IoReturnDownBack } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";

interface MangaDropdownModalProps {
  setSelectedSeries: any;
  setIsModalVisible: any;
}

export default function MangaDropdownModal({
  setSelectedSeries,
  setIsModalVisible,
}: MangaDropdownModalProps) {
  const { dbUser } = useAuthContext();
  const { data, error, isLoading } = useFetchUsersSavedMangas(
    dbUser ? dbUser.id : ""
  );

  const [selectedMangas, setSelectedMangas] = useState<number[]>([]);

  const addMangasToSelectedSeries = (id: number) => {
    setSelectedSeries((prev: string[]) => [...prev, id]);
    setSelectedMangas((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleSaveAndGoBack = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedMangas([]);
    setSelectedSeries([]);
    setIsModalVisible(false);
  };

  return (
    <div className="w-full h-full absolute left-0 top-0 bg-white pb-4 rounded-md shadow-md overflow-y-scroll">
      <div className="w-full flex gap-2 items-center p-4">
        <button
          className="w-full flex justify-center items-center h-8 p-2 border-2 border-red-600 rounded-md "
          onClick={handleCancel}
        >
          <IoReturnDownBack />
          <p className="pl-2 text-center">Cancel</p>
        </button>
        <button
          className="w-full flex justify-center items-center h-8 p-2 border-2 border-purple-600 rounded-md text-md text-purple-600 cursor-pointer hover:bg-purple-600 hover:text-white"
          onClick={handleSaveAndGoBack}
        >
          <IoIosSave />
          <p className="pl-2 text-center">Save Series</p>
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {data &&
        data.map((manga) => (
          <div
            key={manga.mangaid}
            className={`w-full flex justify-between items-center px-4 border-b-2 ${
              selectedMangas.includes(manga.mangaid)
                ? "bg-purple-200"
                : "bg-white"
            }`}
          >
            <p
              className="py-4 px-2 w-full cursor-pointer"
              onClick={() => addMangasToSelectedSeries(manga.mangaid)}
            >
              {manga.title}
            </p>
            <CiSquarePlus />
          </div>
        ))}
    </div>
  );
}
