import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { SaveMangaDto } from "../../services/SaveMangaService";
import EditSavedMangaModal from "../modals/EditSavedMangaModal";

type Props = {
  manga: SaveMangaDto;
};
export default function MangaListItem({ manga }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chapterStatus, setChapterStatus] = useState<string>(`Chapter ${manga.chaptersRead}`);
  useState<boolean>(false);

  useEffect(() => {
    if (manga.chaptersRead === 0) {
      setChapterStatus("No chapters available");
    }
  }, [manga.status, manga.chaptersRead]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600 text-white hover:bg-green-700";
      case "Reading":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "On Hold":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "Dropped":
        return "bg-red-500 text-white hover:bg-red-600";
      case "Plan to Read":
        return "bg-teal-600 text-white hover:bg-teal-600";
      default:
        return "bg-gray-300 text-black hover:bg-gray-400";
    }
  };

  const getScoreClass = (score: number) => {
    if (score >= 9) {
      return "border-green-600 text-green-600";
    } else if (score >= 7) {
      return "border-blue-500 text-blue-500";
    } else if (score >= 5) {
      return "border-yellow-500 text-yellow-500";
    } else if (score >= 3) {
      return "border-orange-500 text-orange-500";
    } else {
      return "border-red-500 text-red-500";
    }
  };

  return (
    <div className="w-full h-32 flex items-center p-4 border-purple-400 border-t-2">
      <div className="w-full mr-4">
        <div className="flex justify-between w-full">
          <a href={`/manga/${manga.mangaid}`}>
            <h3 className="truncate text-white max-w-52 sm:max-w-96 md:max-w-full font-semibold py-1">
              {manga.title}
            </h3>
          </a>
          <div
            className={`px-4 py-1 rounded-lg  shadow-md font-semibold text-center w-[127px] ${getStatusClass(
              manga.status
            )}`}
          >
            {manga.status}
          </div>
        </div>
        <div className="flex w-full justify-between gap-4 mt-2 ">
          <div className="px-4 py-1 text-purple-400 text-center rounded-lg border-2 border-purple-600">
            {chapterStatus}
          </div>
          <div
            className={`px-4 py-1 rounded-lg border text-center w-[127px] ${getScoreClass(
              manga.score || 0
            )}`}
          >
            Score: {manga.score}
          </div>
        </div>
      </div>
      <p
        className="text-2xl text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded-full"
        onClick={() => setIsModalOpen(true)}
      >
        <IoIosArrowForward />
      </p>
      {isModalOpen && (
        <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[400px] sm:w-[600px] w-max-[400px] sm:w-max-[600px] bg-[#121212] rounded-lg shadow-lg px-10 py-5">
            <EditSavedMangaModal manga={manga} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
}
