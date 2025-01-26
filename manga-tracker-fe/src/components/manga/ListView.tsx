import { useState, useEffect } from "react";
import CreateListModalDashboard from "../modals/CreateListModalDashboard";
import ListItem from "./ListItem";
import { useFetchAllLists } from "../../services/ListService";
type Status = "Reading" | "Completed" | "On-Hold" | "Dropped" | "Plan to Read";

export default function ListView() {
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const { data: lists } = useFetchAllLists();

  const handleModalVisibility = () => {
    if (!modalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const statusColors: Record<Status, string> = {
    Reading: "bg-blue-500",
    Completed: "bg-green-500",
    "On-Hold": "bg-yellow-500",
    Dropped: "bg-red-500",
    "Plan to Read": "bg-gray-500",
  };
  return (
    <div className="w-full h-full flex justify-center flex-col">
      <button
        className="w-full max-auto bg-purple-600 hover:bg-purple-700 rounded-md p-2 cursor-pointer  text-xl text-white"
        onClick={handleModalVisibility}
      >
        Create List
      </button>
      <div className="w-full p-2 py-6">
        <div className="flex justify-between w-full text-white">
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
          return <ListItem list={list} key={list.id} />;
        })}
      {modalVisible && (
        <div className="fixed inset-0 w-full h-full px-5 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-hidden">
          <CreateListModalDashboard setModalVisible={setModalVisible} />
        </div>
      )}
    </div>
  );
}
