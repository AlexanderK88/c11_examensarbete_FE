import { useState } from "react";
import MangaDropdownModal from "./MangaDropdownModal";
import { IoMdClose } from "react-icons/io";

interface CreateListModalDashboardProps {
  setModalVisible: any;
}

export default function CreateListModalDashboard({
  setModalVisible,
}: CreateListModalDashboardProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [listName, setListName] = useState<string>("");

  const handleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <div className="relative w-full h-full flex flex-col justify-between max-h-[300px] px-6 py-6 rounded-lg bg-white shadow-md">
        <div
          className="absolute right-5 top-5 text-2xl cursor-pointer"
          onClick={() => setModalVisible(false)}
        >
          <IoMdClose />
        </div>
        <h2 className="text-xl">Create a new list</h2>
        <label htmlFor="listName" className="text-lg">
          List name:
        </label>
        <input
          type="text"
          id="listName"
          name="listName"
          className="p-1 w-full border border-gray-300 rounded-md mt-2"
          onChange={(e) => setListName(e.target.value)}
        />
        <h3 className="text-lg mt-6">Choose Series to add</h3>
        <button
          className="border rounded px-2 py-1 mt-2 w-full text-left"
          onClick={handleModalVisibility}
        >
          {selectedSeries.length > 0 ? "Good choices!" : "Add series"}
        </button>
        {isModalVisible && (
          <MangaDropdownModal
            setSelectedSeries={setSelectedSeries}
            setIsModalVisible={setIsModalVisible}
          />
        )}
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded-md shadow-sm hover:bg-purple-700 mt-4"
        >
          Create
        </button>
      </div>
    </>
  );
}
