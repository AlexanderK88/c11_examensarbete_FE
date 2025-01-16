import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useCreateNewList } from "../../services/ListService";
import { useAuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

interface CreateListModalDashboardProps {
  setModalVisible: any;
}

export default function CreateListModalDashboard({
  setModalVisible,
}: CreateListModalDashboardProps) {
  const { dbUser } = useAuthContext();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [listName, setListName] = useState<string>("");
  const { mutate } = useCreateNewList();

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const createList = () => {
    if (!dbUser) {
      return;
    }
    if (listName.length > 0) {
      const list = {
        listName: listName,
        userId: dbUser.id,
      };
      console.log("Creating new list:", list);
      mutate(list);
      setModalVisible(false);
    }
  };

  return (
    <>
      <div className="relative w-[400px] h-full flex flex-col justify-between max-h-[250px] px-6 py-6 rounded-lg bg-white shadow-md">
        <div
          className="absolute right-5 top-5 text-2xl cursor-pointer"
          onClick={() => setModalVisible(false)}
        >
          <IoMdClose />
        </div>
        <h2 className="text-xl font-semibold">Create a new list</h2>
        <label htmlFor="listName" className="text-lg">
          List name:
        </label>
        <input
          type="text"
          id="listName"
          name="listName"
          placeholder="Enter list name"
          className="p-1 w-full border border-gray-300 rounded-md mt-2"
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          type="submit"
          onClick={createList}
          className="bg-purple-600 text-white py-2 rounded-md shadow-sm hover:bg-purple-700 mt-4"
        >
          Create
        </button>
      </div>
    </>
  );
}
