import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CreateListModalDashboard from "../modals/CreateListModalDashboard";
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

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBgColorPercentagePerStatus = (statuses: Status[]) => {
    const total = statuses.length;

    const statusCounts: Record<Status, number> = {
      Reading: 0,
      Completed: 0,
      "On-Hold": 0,
      Dropped: 0,
      "Plan to Read": 0,
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

    const distribution = Object.entries(statusCounts).map(
      ([status, count]) => ({
        status: status as Status,
        percentage: (count / total) * 100,
      })
    );

    return distribution;
  };

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

  const distribution = handleBgColorPercentagePerStatus(testStatuses);

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
      <div className="w-full h-full flex justify-between border-2 shadow-md border-gray-300 ">
        <div className="w-full flex flex-col  pt-6">
          <div className="px-5 pb-4 w-full flex justify-between">
            <h3 className="text-2xl">Reading list 2025</h3>
            <div className="flex justify-center items-center w-20 h-8 shadow-md rounded-md bg-gray-200">
              <p className="mx-auto my-auto">12 Series</p>
            </div>
          </div>
          <div className="mt-2 h-6 w-full mx-auto flex shadow-md overflow-hidden">
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
      {modalVisible && (
        <div className="fixed inset-0 w-full h-full px-5 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-hidden">
          <CreateListModalDashboard setModalVisible={setModalVisible} />
        </div>
      )}
    </div>
  );
}
