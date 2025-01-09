import { useSaveManga } from "../../services/SaveMangaService";
import { useAuthContext } from "../../provider/AuthProvider";
import { useState } from "react";
import { MangaDto } from "../../types/mangaTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  manga: MangaDto;
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function SaveMangaModal({ manga, setIsModalOpen }: Props) {
  const { dbUser } = useAuthContext();
  const { mutate, isLoading, isError, isSuccess } = useSaveManga();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<Boolean>(false);
  const [isScoreDropdownOpen, setIsScoreDropdownOpen] =
    useState<Boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [readingStatus, setReadingStatus] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0); // React Router 6+ supports reloading the current route
  };

  const handleSave = () => {
    mutate({
      userid: dbUser ? parseInt(dbUser.id) : 0,
      mangaid: manga.id,
      status: readingStatus || "reading",
      score: score || 8,
      chaptersRead: selectedChapter
        ? parseInt(selectedChapter.split(" ")[1])
        : 0,
      title: manga.title,
    });
    setIsModalOpen(false);
    refreshPage();
  };

  const handleOptionClick = (option: string) => {
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

  // Handle opening a dropdown and closing others
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
    if (selectedChapter == "" && !manga.chapters) {
      return "No chapters available";
    } else if (selectedChapter == "") {
      return "Choose chapter";
    } else {
      return selectedChapter;
    }
  };

  return (
    <div className="h-[400px] sm:h-[385px] flex flex-row py-2 mb-3">
      <div className="w-full">
        <h1 className="font-semibold text-2xl">{manga.title}</h1>
        <div className="w-full flex sm:flex-row mt-4">
          <img
            className="hidden sm:block sm:mr-10 rounded-md shadow-md max-h-[300px]"
            src={manga.images[0].imageUrl}
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
                <div className="absolute border rounded mt-2 font-semibold text-purple-700 bg-gray-50 max-h-44 overflow-y-scroll w-[320px]">
                  <ul>
                    {Array.from(
                      { length: manga.chapters || 0 },
                      (_, i) => i
                    ).map((i) => (
                      <li
                        key={i}
                        className="hover:bg-gray-200 p-1"
                        onClick={() => handleOptionClick(`Chapter ${i}`)}
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
                {readingStatus || "Select Status"}
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute border rounded mt-2 font-semibold text-purple-700 bg-gray-50 max-h-44 overflow-y-scroll w-[320px]">
                  <ul>
                    {[
                      "Reading",
                      "Completed",
                      "On Hold",
                      "Dropped",
                      "Plan to read",
                    ].map((status) => (
                      <li
                        key={status}
                        className="hover:bg-gray-200 p-1"
                        onClick={() => handleStatusOptionClick(status)}
                      >
                        {status}
                      </li>
                    ))}
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
                {score || "Select a rating"}
              </button>
              {isScoreDropdownOpen && (
                <div className="absolute border rounded mt-2 font-semibold text-purple-700 bg-gray-50  max-h-44 overflow-y-scroll w-[320px]">
                  <ul>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <li
                        key={score}
                        className="hover:bg-gray-200 p-1"
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
                className="w-full p-2 bg-purple-600 rounded-md shadow-md text-white mb-2 mt-4 sm:my-0"
                onClick={handleSave}
                disabled={isLoading}
              >
                Save Manga
              </button>
              {isLoading && <p>Saving...</p>}
              {isError && <p>Failed to save the manga.</p>}
              {isSuccess && <p>Manga saved successfully!</p>}
            </div>
          </div>
        </div>
        <button
          className="text-red-400 text-xl font-thin font-mono mt-3 cursor-pointer hover:text-red-500"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
