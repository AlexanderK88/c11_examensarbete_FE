import { useState, useEffect } from "react";
import { useAuthContext } from "../../provider/AuthProvider";
import {
  useFetchAllUsers,
  useUpdateMissingUserInfo,
  UpdateMissingUserInfoDto,
} from "../../services/UserService";
import { useNavigate } from "react-router-dom";

export default function UserAddInfoModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [allUsersUsername, setAllUsersUsername] = useState<string[]>([]);
  const [allUsersEmail, setAllUsersEmail] = useState<string[]>([]);
  const { dbUser } = useAuthContext();
  if (!dbUser) return null;
  const { username: dbUsername, email: dbEmail } = dbUser;
  const { allUsers } = useFetchAllUsers();
  const { mutate: updateMissingUserInfo } = useUpdateMissingUserInfo();

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    setUsername(dbUsername);
    setEmail(dbEmail);
    setAllUsersUsername(allUsers?.map((user) => user.username) ?? []);
    setAllUsersEmail(allUsers?.map((user) => user.email) ?? []);
    if (!dbUsername || !dbEmail) {
      handleModalOpen();
    }
  }, [dbUsername, dbEmail]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSuccessfulSave = () => {
    setIsModalOpen(false);
    setUsername("");
    setEmail("");
    setError(null);
    refreshPage();
  };

  const validateInput = (
    type: "username" | "email",
    value: string
  ): string | null => {
    if (type === "username") {
      if (allUsersUsername.includes(value)) return "Username already exists";
      if (!value.match(/^[a-zA-Z0-9_]+$/))
        return "Username can only contain letters, numbers, and underscores";
      if (value.length < 5)
        return "Username must be at least 5 characters long";
    }

    if (type === "email") {
      if (allUsersEmail.includes(value)) return "Email already exists";
      if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        return "Please enter a valid email address";
    }

    return null;
  };

  const handleUpdateUserInfo = (username?: string, email?: string) => {
    updateMissingUserInfo({ username, email } as UpdateMissingUserInfoDto, {
      onSuccess: () => {
        console.log(
          `Submitting with username: ${username || "N/A"} and email: ${
            email || "N/A"
          }`
        );
        handleSuccessfulSave();
      },
      onError: (error) => {
        console.error("Error updating user info:", error);
        setError("An error occurred while updating user info");
      },
    });
  };

  const handleOnchangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUsername(input);
    setError(validateInput("username", input));
  };

  const handleOnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmail(input);
    setError(validateInput("email", input));
  };

  const handleSubmitWithEmailAndUsername = (
    username: string,
    email: string
  ) => {
    if (!username || !email) {
      setError("Please fill all the fields");
      return;
    }

    handleUpdateUserInfo(username, email);
  };

  const handleSubmitWithUsername = (username: string) => {
    if (!username) {
      setError("Please fill all the fields");
      return;
    }

    handleUpdateUserInfo(username, email);
  };

  const handleSubmitWithEmail = (email: string) => {
    if (!email) {
      setError("Please fill all the fields");
      return;
    }
    handleUpdateUserInfo(username, email);
  };

  return (
    <>
      {isModalOpen && (
        <div className="absolute mt-2 bg-black shadow-lg border-2 border-zinc-800 rounded-md min-w-96 max-w-96 pt-2">
          <div className="p-4 max-h-[500px]  text-white">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold">
                Add the missing information
              </h1>
            </div>
            {!dbUsername && (
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  onChange={(e) => handleOnchangeUsername(e)}
                  className="bg-gray-800 text-white p-2 rounded-md"
                />
              </div>
            )}
            {!dbEmail && (
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => handleOnchangeEmail(e)}
                  className="bg-gray-800 text-white p-2 rounded-md"
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div>
              <button
                className="p-2 w-full bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 cursor-pointer"
                onClick={() => {
                  if (!dbUsername && !dbEmail) {
                    handleSubmitWithEmailAndUsername(username, email);
                  } else if (!dbUsername) {
                    handleSubmitWithUsername(username);
                  } else if (!dbEmail) {
                    handleSubmitWithEmail(email);
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
