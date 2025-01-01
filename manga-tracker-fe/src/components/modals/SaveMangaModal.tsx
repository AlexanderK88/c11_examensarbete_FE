import { useSaveManga } from "../../services/SaveMangaService";
import { useAuthContext } from "../../provider/AuthProvider";
import { useState } from "react";
import { MangaDto } from "../../types/mangaTypes";

type Props = {
  manga: MangaDto;
};

export default function SaveMangaModal({ manga }: Props) {
  const { dbUser } = useAuthContext();
  const { mutate, isLoading, isError, isSuccess } = useSaveManga();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<Boolean>(false);
  const [isScoreDropdownOpen, setIsScoreDropdownOpen] =
    useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [readingStatus, setReadingStatus] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const handleSave = () => {
    mutate({
      userid: dbUser ? parseInt(dbUser.id) : 0,
      mangaid: manga.id,
      status: readingStatus || "reading",
      score: score || 8,
      chaptersRead: selectedOption ? parseInt(selectedOption.split(" ")[1]) : 0,
    });
    console.log("Saving manga with data:", {
      userid: dbUser ? parseInt(dbUser.id) : 0,
      mangaid: manga.id,
      status: readingStatus || "reading",
      score: score || 8,
      chaptersRead: selectedOption ? parseInt(selectedOption.split(" ")[1]) : 0,
    });
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
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

  return (
    <div className="flex flex-row">
      <div className="w-full">
        <h1 className="font-semibold text-2xl mt-2 mb-5">{manga.title}</h1>
        <div className="w-full">
          <img className="hidden sm:block" src="MangaImage" />
          <div>
            <div className="w-full">
              <p className="font-semibold">Last Read Chapter</p>
              <button
                className="border rounded px-2 mt-4 py-1 w-full text-left"
                onClick={toggleChapterDropdown}
              >
                {selectedOption || "Select an option"}
              </button>
              {isDropdownOpen && (
                <div className="absolute border rounded mt-2 bg-white max-h-44 overflow-y-scroll w-[180px]">
                  <ul>
                    {Array.from(
                      { length: manga.chapters || 1 },
                      (_, i) => i
                    ).map((i) => (
                      <li
                        key={i}
                        className="hover:bg-gray-200 p-1"
                        onClick={() => handleOptionClick(`Chapter ${i}`)}
                      >
                        Chapter {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full flex flex-row mt-4">
              <div className="w-1/2">
                <p className="font-semibold">Status</p>
                <button
                  className="border rounded px-2 py-1 w-full text-left"
                  onClick={toggleStatusDropdown}
                >
                  {readingStatus || "Select Status"}
                </button>
                {isStatusDropdownOpen && (
                  <div className="absolute border rounded mt-2 bg-white max-h-44 overflow-y-scroll w-[180px]">
                    <ul>
                      {["Reading", "Completed", "On Hold", "Dropped"].map(
                        (status) => (
                          <li
                            key={status}
                            className="hover:bg-gray-200 p-1"
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

              <div className="w-1/2">
                <p className="font-semibold">Rate</p>
                <button
                  className="border rounded px-2 py-1 w-full text-left"
                  onClick={toggleScoreDropdown}
                >
                  {score || "Select a rating"}
                </button>
                {isScoreDropdownOpen && (
                  <div className="absolute border rounded mt-2 bg-white max-h-44 overflow-y-scroll w-[180px]">
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
            </div>

            <div className="w-full">
              <button
                className="w-full p-2 bg-purple-600 rounded-md shadow-md text-white mb-2 mt-4"
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
      </div>
    </div>
  );
}
