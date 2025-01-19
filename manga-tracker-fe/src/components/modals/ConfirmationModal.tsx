import { useAuthContext } from "../../provider/AuthProvider";

interface modalProps {
  confirmationType: string;
  setContinueAction: any;
  continueAction: any;
  setConfirmationModalVisible: any;
}

export default function ConfirmationModal({
  confirmationType,
  setContinueAction,
  setConfirmationModalVisible,
  continueAction,
}: modalProps) {
  const { logout } = useAuthContext();
  const handleCancel = () => {
    setContinueAction(false);
    setConfirmationModalVisible(false);
  };

  const handleConfirm = () => {
    setConfirmationModalVisible(false);
    if (confirmationType == "logout") {
      console.log("logging out");
      logout();
    }
    if (confirmationType == "delete" && continueAction == true) {
      //Add functionality for dynamically deleting
    }
  };

  return (
    <div className="w-[320px] h-[160px] sm:w-[420px] sm:h-[140px] flex flex-col items-center justify-between max-h-[250px] px-6 py-6 rounded-lg bg-[#121212] shadow-md text-white">
      <h2 className="text-lg text-center sm:text-xl font-semibold">
        Are you sure you want to <span>{confirmationType}</span>?
      </h2>
      <div className="flex gap-4 justify-center items-center w-full font-semibold">
        <button
          onClick={handleConfirm}
          className="bg-red-800 w-3/4 px-4 py-2 rounded-md shadow-md cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={handleCancel}
          className="bg-blue-600 w-3/4 px-4 py-2 rounded-md shadow-md cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
