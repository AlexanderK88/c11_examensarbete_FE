import { useSaveManga } from "../../services/SaveMangaService";
import { useAuthContext } from "../../provider/AuthProvider";
import { useState } from "react";
import { MangaDto } from "../../types/mangaTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  manga: MangaDto;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsSaved: (isOpen: boolean) => void;
};

export default function SaveMangaModal({ manga, setIsModalOpen, setIsSaved }: Props) {
  const { dbUser } = useAuthContext();
  const { mutate, isLoading, isError, isSuccess } = useSaveManga();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<Boolean>(false);
  const [isScoreDropdownOpen, setIsScoreDropdownOpen] = useState<Boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [readingStatus, setReadingStatus] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0); // React Router 6+ supports reloading the current route
  };

  const handleSave = () => {
    mutate(
      {
        userid: dbUser ? parseInt(dbUser.id) : 0,
        mangaid: manga.id,
        status: readingStatus || "reading",
        score: score || 8,
        chaptersRead: selectedChapter ? parseInt(selectedChapter.split(" ")[1]) : null,
        title: manga.title,
      },
      {
        onSuccess: () => {
          setIsSaved(true);
          setIsModalOpen(false);
          refreshPage();
        },
        onError: (error: any) => {
          toast.error(`Failed to save the manga: ${error.message || "Unknown error"}`);
        },
      }
    );
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
    <div className="h-[450px] flex flex-row p-6 py-10 bg-[#121212] rounded-md shadow-md text-white">
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
                <div className="absolute border rounded mt-2 font-semibold text-white bg-[#121212] pl-2 max-h-44 overflow-y-scroll w-[273px] md:w-[243px]">
                  <ul>
                    {Array.from({ length: manga.chapters || 0 }, (_, i) => i).map((i) => (
                      <li
                        key={i}
                        className="hover:bg-blue-600 p-1"
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
                <div className="absolute border rounded mt-2 font-semibold text-white bg-[#121212] pl-2 max-h-44 overflow-y-scroll w-[273px] md:w-[243px]">
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
                {score || "Select a rating"}
              </button>
              {isScoreDropdownOpen && (
                <div className="absolute border rounded mt-2 font-semibold text-white bg-[#121212] pl-2  max-h-44 overflow-y-scroll w-[273px] md:w-[243px]">
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
                className="w-full p-2 font-semibold bg-purple-600 rounded-md shadow-md text-white mb-2 mt-4 sm:my-0"
                onClick={handleSave}
                disabled={isLoading}
              >
                Save Manga
              </button>
              {isLoading && <p>Saving...</p>}
              <button
                className="text-red-500 text-xl font-semibold font-sans mt-3 cursor-pointer hover:text-red-600"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
