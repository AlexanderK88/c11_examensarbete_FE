import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ListDtoWithId } from "../../services/ListService";
import MangaDropdownModal from "../modals/MangaDropdownModal";
import {
  useAddMangaToList,
  useDeleteList,
  useRemoveMangaFromList,
} from "../../services/ListService";
import EditSavedMangaModal from "../modals/EditSavedMangaModal";
import { SaveMangaDto } from "../../services/SaveMangaService";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type Status = "Reading" | "Completed" | "On Hold" | "Dropped" | "Plan to read";

interface ListItemProps {
  list: ListDtoWithId;
}
export default function ListItem({ list }: ListItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [currentManga, setCurrentManga] = useState<SaveMangaDto>();
  const [selectedMangas, setSelectedMangas] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sortedList, setSortedList] = useState<ListDtoWithId | null>(null);
  const { mutate: deleteList } = useDeleteList();
  const { mutate: addMangaToList } = useAddMangaToList();
  const [mangasAlreadyInList, setMangasAlreadyInList] = useState<SaveMangaDto[]>([]);
  const { mutate: removeMangaFromList } = useRemoveMangaFromList();

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

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
    setMangasAlreadyInList(list.savedMangas);
  }, [list.savedMangas]);

  const handleAddMangaToList = (listId: string, mangaIds: number[]) => {
    if (mangaIds.length < 1) {
      return;
    }
    addMangaToList({ listId, mangaIds });
    refreshPage();
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

    const presentStatuses = Object.entries(statusCounts).filter(([, count]) => count > 0);

    const distribution = presentStatuses.map(([status, count]) => ({
      status: status as Status,
      percentage: (count / total) * 100,
    }));

    const totalPercentage = distribution.reduce((sum, { percentage }) => sum + percentage, 0);

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

  const statusColors: Record<Status, string> = {
    Reading: "bg-blue-500",
    Completed: "bg-green-500",
    "On Hold": "bg-yellow-500",
    Dropped: "bg-red-500",
    "Plan to read": "bg-gray-500",
  };

  const handleModalVisibility = () => {
    if (!modalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setModalVisible(!modalVisible);
  };

  const handleCancel = () => {
    setSelectedMangas([]);
    setModalVisible(false);
  };

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
    refreshPage();
  };

  const handleRemoveMangaFromList = (listId: string, mangaId: number) => {
    removeMangaFromList(
      { listId, mangaId },
      {
        onSuccess: () => {
          refreshPage();
        },
        onError: (error: any) => {
          toast.error("Error removing series: " + error.message);
        },
      }
    );
  };
  return (
    <>
      <div className="w-full h-full flex justify-between shadow-lg border border-gray-800 rounded-t-md shadow-black  mt-8">
        <div className="w-full flex flex-col pt-6">
          <div className="px-5 pb-4 w-full flex justify-between">
            <h3 className="text-2xl text-white">{list.listName}</h3>
            <div className="flex gap-6">
              <div className="flex justify-center items-center w-20 h-8 shadow-md rounded-md bg-zinc-800 text-white">
                <p className="mx-auto my-auto">{list.savedMangas.length}</p>
              </div>
              <div className="cursor-pointer hover:bg-black p-2 items-center rounded-md">
                <p className="text-center text-white" onClick={() => handleDeleteList(list.id)}>
                  <FaRegTrashCan />
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 h-6 w-full flex  shadow-md overflow-hidden">
            {distribution.map(({ status, percentage }) => (
              <div
                key={status}
                className={`h-full ${statusColors[status]}`}
                style={{ width: `${percentage}%` }}
              ></div>
            ))}
          </div>
        </div>
        <button
          className="w-10 flex items-center min-h-full bg-purple-600 cursor-pointer hover:bg-purple-700 rounded-tr-md "
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
        </button>
      </div>
      {isDropdownOpen && (
        <div className="w-full h-full bg-[#121212]">
          <div>
            {sortedList?.savedMangas?.map((manga) => {
              return (
                <div
                  key={manga.mangaid}
                  className="w-full h-12 flex justify-between items-center border-b bg-[#121212] border-zinc-800 p-4 cursor-pointer shadow-black shadow-md"
                >
                  <p
                    className="ml-4 text-md font-semibold truncate w-2/4 text-white"
                    onClick={() => handleOpenSavedMangaModal(manga)}
                  >
                    {manga.title}
                  </p>
                  <div className="w-20 h-8 shadow-md rounded-md bg-zinc-800 flex items-center">
                    <p className="mx-auto my-auto text-center font-semibold text-white">
                      {manga.score}/10
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 md:w-[120px] h-8 shadow-md rounded-md bg-zinc-800  flex items-center">
                      <p className="mx-auto truncate md:text-clip text-center text-white">
                        {manga.status}
                      </p>
                    </div>
                    <p
                      className="text-red-600 ml-4"
                      onClick={() => handleRemoveMangaFromList(list.id, manga.id)}
                    >
                      <FaRegTrashCan />
                    </p>
                  </div>

                  {isModalOpen && currentManga && (
                    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                      <div className="w-[400px] sm:w-[600px] w-max-[400px] sm:w-max-[600px] bg-[#121212] rounded-lg shadow-lg px-10 py-5">
                        <EditSavedMangaModal manga={currentManga} setIsModalOpen={setIsModalOpen} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="w-full h-full">
              <p className="p-2 mx-auto w-full text-white italic">
                * First choose what mangas you would like to add to your list, then after you've
                saved those you press the "Add series to list" button to add them to your list
              </p>
              <div className="relative w-full gap-4 flex justify-evenly my-2">
                <button
                  onClick={handleModalVisibility}
                  className="p-2 w-48 md:w-full rounded-md shadow-md shadow-black bg-purple-600 hover:bg-purple-700 cursor-pointer text-center text-white text-lg lg:text-xl "
                >
                  Choose Mangas
                </button>
                <button
                  disabled={selectedMangas.length < 1}
                  className={`${
                    selectedMangas.length < 1
                      ? "bg-zinc-600 "
                      : "bg-purple-600 hover:bg-purple-700  "
                  }p-2 w-48 md:w-full rounded-md shadow-md  text-white text-lg lg:text-xl`}
                  onClick={() => handleAddMangaToList(list.id, selectedMangas)}
                >
                  Add series to list
                </button>
                {modalVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <MangaDropdownModal
                      setIsModalVisible={setModalVisible}
                      setSelectedMangas={setSelectedMangas}
                      selectedMangas={selectedMangas}
                      handleCancel={handleCancel}
                      mangasAlreadyInList={mangasAlreadyInList}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
