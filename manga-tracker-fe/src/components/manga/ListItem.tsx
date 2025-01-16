import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ListDtoWithId } from "../../services/ListService";
import MangaDropdownModal from "../modals/MangaDropdownModal";
import { useAddMangaToList } from "../../services/ListService";
import EditSavedMangaModal from "../modals/EditSavedMangaModal";
import { SaveMangaDto } from "../../services/SaveMangaService";
type Status = "Reading" | "Completed" | "On Hold" | "Dropped" | "Plan to read";

interface ListItemProps {
  list: ListDtoWithId;
}
export default function ListItem({ list }: ListItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [currentManga, setCurrentManga] = useState<SaveMangaDto>();
  const [selectedSeries, setSelectedSeries] = useState<number[]>([]);
  const [selectedMangas, setSelectedMangas] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sortedList, setSortedList] = useState<ListDtoWithId | null>(null);
  const { mutate, isLoading, isError } = useAddMangaToList();

  const handleOpenSavedMangaModal = (manga: SaveMangaDto) => {
    setIsModalOpen(true);
    setCurrentManga(manga);
  };

  const sortedListForRating = (list: ListDtoWithId) => {
    list.savedMangas.sort((a, b) => {
      return b.score - a.score;
    });
    setSortedList(list);
  };

  useEffect(() => {
    sortedListForRating(list);
  }, [list.savedMangas]);

  const handleAddMangaToList = (listId: string, mangaIds: number[]) => {
    console.log("Adding manga to list with id:", listId);
    console.log("Manga id:", mangaIds);
    mutate({ listId, mangaIds });
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBgColorPercentagePerStatus = (statuses: Status[]) => {
    const total = statuses.length;

    const statusCounts: Record<Status, number> = {
      Reading: 0,
      Completed: 0,
      "On Hold": 0,
      Dropped: 0,
      "Plan to read": 0,
    };

    statuses.forEach((status) => {
      statusCounts[status]++;
    });

    if (total === 0) {
      return Object.keys(statusCounts).map((status) => ({
        status: status as Status,
        percentage: 0,
      }));
    }

    // Calculate percentages only for present statuses
    const presentStatuses = Object.entries(statusCounts).filter(
      ([, count]) => count > 0
    );

    const distribution = presentStatuses.map(([status, count]) => ({
      status: status as Status,
      percentage: (count / total) * 100,
    }));

    // Adjust to ensure total percentage equals 100%
    const totalPercentage = distribution.reduce(
      (sum, { percentage }) => sum + percentage,
      0
    );

    if (totalPercentage < 100) {
      const adjustment = (100 - totalPercentage) / distribution.length;
      return distribution.map(({ status, percentage }) => ({
        status,
        percentage: percentage + adjustment,
      }));
    }

    return distribution;
  };

  const distribution = handleBgColorPercentagePerStatus(
    list.savedMangas.map((manga) => manga.status as Status)
  );

  // Map statuses to colors
  const statusColors: Record<Status, string> = {
    Reading: "bg-blue-400",
    Completed: "bg-green-400",
    "On Hold": "bg-yellow-400",
    Dropped: "bg-red-400",
    "Plan to read": "bg-gray-400",
  };

  const handleModalVisibility = () => {
    if (!modalVisible) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    setModalVisible(!modalVisible);
  };

  const handleCancel = () => {
    setSelectedMangas([]);
    setSelectedSeries([]);
    setModalVisible(false);
  };
  return (
    <>
      <div className="w-full h-full flex justify-between border-2 shadow-md border-gray-300 mt-4">
        <div className="w-full flex flex-col pt-6">
          <div className="px-5 pb-4 w-full flex justify-between">
            <h3 className="text-2xl">{list.listName}</h3>
            <div className="flex justify-center items-center w-20 h-8 shadow-md rounded-md bg-gray-200">
              <p className="mx-auto my-auto">{list.savedMangas.length}</p>
            </div>
          </div>
          <div className="mt-2 h-6 w-full flex shadow-md overflow-hidden">
            {distribution.map(({ status, percentage }) => (
              <div
                key={status}
                className={`h-full ${statusColors[status]}`}
                style={{ width: `${percentage}%` }}
              ></div>
            ))}
          </div>
        </div>
        <div
          className="w-10 flex items-center min-h-full bg-purple-600 cursor-pointer hover:bg-purple-700 "
          onClick={handleDropdown}
        >
          {isDropdownOpen ? (
            <p className="text-center text-2xl flex font-semibold justify-center w-full text-white">
              <IoIosArrowUp />
            </p>
          ) : (
            <p className="text-center text-2xl flex font-semibold justify-center w-full text-white">
              <IoIosArrowDown />
            </p>
          )}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="w-full h-full bg-gray-200">
          <div className="w-full h-full">
            <p className="p-2 mx-auto w-11/12">
              First choose what mangas you would like to add to your list, then
              after you've saved those you press the "Add series to list" button
              to add them to your list
            </p>
            <div className="relative w-full gap-4 flex justify-evenly my-2">
              <div
                onClick={handleModalVisibility}
                className="p-2 w-48 md:w-full rounded-md shadow-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-center text-white text-lg lg:text-xl "
              >
                Choose Mangas
              </div>
              <button
                className="p-2 w-48 md:w-full rounded-md shadow-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white text-lg lg:text-xl "
                onClick={() => handleAddMangaToList(list.id, selectedMangas)}
              >
                Add series to list
              </button>

              {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <MangaDropdownModal
                    setSelectedSeries={setSelectedSeries}
                    setIsModalVisible={setModalVisible}
                    setSelectedMangas={setSelectedMangas}
                    selectedMangas={selectedMangas}
                    handleCancel={handleCancel}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            {sortedList?.savedMangas?.map((manga) => {
              return (
                <div
                  key={manga.mangaid}
                  className="w-full h-12 flex justify-between items-center border-b-2 bg-white border-gray-300 p-4 "
                >
                  <p
                    className="ml-4 text-md font-semibold truncate w-2/4"
                    onClick={() => handleOpenSavedMangaModal(manga)}
                  >
                    {manga.title}
                  </p>
                  <div className="w-20 h-8 shadow-md rounded-md bg-gray-200 flex items-center">
                    <p className="mx-auto my-auto text-center font-semibold">
                      {manga.score}/10
                    </p>
                  </div>
                  <div className="w-20 md:w-[120px] h-8 shadow-md rounded-md bg-gray-200 flex items-center">
                    <p className="mx-auto truncate md:text-clip text-center ">
                      {manga.status}
                    </p>
                  </div>
                  {isModalOpen && currentManga && (
                    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                      <div className="w-[400px] sm:w-[600px] w-max-[400px] sm:w-max-[600px] bg-white rounded-lg shadow-lg px-10 py-5">
                        <EditSavedMangaModal
                          manga={currentManga}
                          setIsModalOpen={setIsModalOpen}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
