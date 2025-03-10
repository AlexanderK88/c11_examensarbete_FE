import { SaveMangaDto, useUpdateSavedManga } from "../../services/SaveMangaService";
import { useAuthContext } from "../../provider/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMangaById } from "../../services/MangaService";

type Props = {
  manga: SaveMangaDto;
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function EditSavedMangaModal({ manga, setIsModalOpen }: Props) {
  const { dbUser } = useAuthContext();
  const { mutate, isLoading, isError, isSuccess } = useUpdateSavedManga();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<Boolean>(false);
  const [isScoreDropdownOpen, setIsScoreDropdownOpen] = useState<Boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(manga.chaptersRead);
  const [readingStatus, setReadingStatus] = useState<string>(manga.status);
  const [score, setScore] = useState<number>(manga.score);

  const { data: mangaData } = useMangaById(manga.mangaid.toString());

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0); // React Router 6+ supports reloading the current route
  };

  const handleSave = () => {
    mutate({
      userid: dbUser ? parseInt(dbUser.id) : 0,
      mangaid: manga.mangaid,
      status: readingStatus || "",
      score: score || 0,
      chaptersRead: selectedChapter,
      title: manga.title,
    });
    setIsModalOpen(false);
    refreshPage();
  };

  const handleOptionClick = (option: number) => {
    setSelectedChapter(option);
    setIsDropdownOpen(false);
  };

  const handleStatusOptionClick = (option: string) => {
    setReadingStatus(option);
    setIsStatusDropdownOpen(false);
  };

  const handleScoreOptionClick = (score: number) => {
    setScore(score);
    setIsScoreDropdownOpen(false);
  };

  const toggleChapterDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsStatusDropdownOpen(false);
    setIsScoreDropdownOpen(false);
  };

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
    setIsDropdownOpen(false);
    setIsScoreDropdownOpen(false);
  };

  const toggleScoreDropdown = () => {
    setIsScoreDropdownOpen(!isScoreDropdownOpen);
    setIsDropdownOpen(false);
    setIsStatusDropdownOpen(false);
  };

  const handleTextForChapter = () => {
    if (selectedChapter !== null && selectedChapter !== undefined) {
      return `Chapter ${selectedChapter}`;
    }
    if (!mangaData?.chapters) {
      return "No chapters available";
    }
    return "Choose chapter";
  };

  return (
    <div className="h-[400px] sm:h-[390px] flex flex-row py-2 mb-3 bg-[#121212] text-white">
      <div className="w-full">
        <h1 className="font-semibold text-2xl truncate">{manga.title}</h1>
        <div className="w-full flex sm:flex-row mt-4">
          <img
            className="hidden sm:block sm:mr-10 rounded-md shadow-md max-h-[300px]"
            src={mangaData?.images[0].imageUrl}
          />

          <div className="w-full flex flex-col space-y-4 sm:justify-between">
            <div className="w-ful">
              <p className="font-semibold">Last Read Chapter</p>
              <button
                className="border rounded px-2 mt-2 py-1 w-full text-left"
                onClick={toggleChapterDropdown}
              >
                {handleTextForChapter()}
              </button>
              {isDropdownOpen && (
                <div className="absolute border border-zinc-800 rounded mt-2 font-semibold text-white pl-2 bg-[#121212] max-h-44 overflow-y-scroll w-[290px]">
                  <ul>
                    {Array.from({ length: mangaData?.chapters || 0 }, (_, i) => i).map((i) => (
                      <li
                        key={i}
                        className="hover:bg-blue-600 p-1"
                        onClick={() => handleOptionClick(i)}
                      >
                        {`Chapter ${i}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full mt-4">
              <p className="font-semibold">Status</p>
              <button
                className="border rounded px-2 py-1 mt-2 w-full text-left"
                onClick={toggleStatusDropdown}
              >
                {readingStatus || manga.status}
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute border border-zinc-800 rounded mt-2 font-semibold text-white pl-2 bg-[#121212] max-h-44 overflow-y-scroll w-[290px]">
                  <ul>
                    {["Reading", "Completed", "On Hold", "Dropped", "Plan to read"].map(
                      (status) => (
                        <li
                          key={status}
                          className="hover:bg-blue-600 p-1"
                          onClick={() => handleStatusOptionClick(status)}
                        >
                          {status}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full mt-4">
              <p className="font-semibold">Rate</p>
              <button
                className="border rounded px-2 py-1 mt-2 w-full text-left"
                onClick={toggleScoreDropdown}
              >
                {score || manga.score || "Select a rating"}
              </button>
              {isScoreDropdownOpen && (
                <div className="absolute border border-zinc-800 rounded mt-2 font-semibold text-white pl-2 bg-[#121212] max-h-44 overflow-y-scroll w-[290px]">
                  <ul>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <li
                        key={score}
                        className="hover:bg-blue-600 p-1"
                        onClick={() => handleScoreOptionClick(score)}
                      >
                        {score}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full">
              <button
                className="w-full p-2 bg-purple-600 rounded-md font-semibold shadow-md text-white mb-2 mt-4 sm:my-0"
                onClick={handleSave}
                disabled={isLoading}
              >
                Update Series
              </button>
              {isLoading && <p>Saving...</p>}
              {isError && <p>Failed to save the manga.</p>}
              {isSuccess && <p>Manga saved successfully!</p>}
            </div>
          </div>
        </div>
        <button
          className="text-red-500 text-xl font-semibold font-sans mt-3 cursor-pointer hover:text-red-500"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
