import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CreateListModalDashboard from "../modals/CreateListModalDashboard";
import ListItem from "./ListItem";
import {
  useFetchAllLists,
  useAddMangaToList,
} from "../../services/ListService";
import { useAuthContext } from "../../provider/AuthProvider";
type Status = "Reading" | "Completed" | "On-Hold" | "Dropped" | "Plan to Read";

const testStatuses: Status[] = [
  "Reading",
  "Reading",
  "Reading", // 3 items
  "Completed",
  "Completed", // 2 items
  "On-Hold", // 1 item
  "Dropped",
  "Dropped",
  "Dropped",
  "Dropped", // 4 items
  "Plan to Read", // 1 item
];

export default function ListView() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const { dbUser } = useAuthContext();
  const { data: lists } = useFetchAllLists(dbUser?.id || "");

  console.log("Lists:", lists);

  const handleModalVisibility = () => {
    if (!modalVisible) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Reset scrolling when component unmounts
    };
  }, []);

  // Map statuses to colors
  const statusColors: Record<Status, string> = {
    Reading: "bg-blue-400",
    Completed: "bg-green-400",
    "On-Hold": "bg-yellow-400",
    Dropped: "bg-red-400",
    "Plan to Read": "bg-gray-400",
  };
  return (
    <div className="w-full h-full flex justify-center flex-col">
      <button
        className="w-full max-auto bg-purple-600 hover:bg-purple-700 p-2 cursor-pointer  text-xl text-white"
        onClick={handleModalVisibility}
      >
        Create List
      </button>
      <div className="w-full p-2 py-6">
        <div className="flex justify-between w-full ">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center space-x-1">
              <div className={`w-4 h-4 ${color} rounded`}></div>
              <span className="text-xs">{status}</span>
            </div>
          ))}
        </div>
      </div>
      {lists &&
        lists.map((list) => {
          return <ListItem list={list} />;
        })}
      {modalVisible && (
        <div className="fixed inset-0 w-full h-full px-5 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-hidden">
          <CreateListModalDashboard setModalVisible={setModalVisible} />
        </div>
      )}
    </div>
  );
}
