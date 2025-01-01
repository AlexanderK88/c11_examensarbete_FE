import ProfileHeader from "../components/common/ProfileHeader";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "../components/common/Footer";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../provider/AuthProvider";
import { useFetchAllSavedMangas } from "../services/SaveMangaService";
import StandardCard from "../components/manga/cards/StandardCard";

export default function Profile() {
  const { dbUser } = useAuthContext();
  if (!dbUser) {
    return null;
  }
  const { data, error, isLoading } = useFetchAllSavedMangas(dbUser.id);
  console.log("data:", data);

  console.log("username:", dbUser?.username);
  console.log("profilePictureUrl:", dbUser?.profilePictureUrl);
  console.log("email:", dbUser?.email);
  console.log("createdAt:", dbUser?.createdAt);

  // if (isLoading) {
  //   return (
  //     <>
  //       <Header />
  //       <main className="min-h-screen flex items-center justify-center">
  //         <div>Loading...</div>
  //       </main>
  //       <Footer />
  //     </>
  //   );
  // }

  // if (error) {
  //   return (
  //     <>
  //       <Header />
  //       <main className="min-h-screen flex items-center justify-center">
  //         <div>Error: {error.message}</div>
  //       </main>
  //       <Footer />
  //     </>
  //   );

  return (
    <>
      <main className="w-full font-sans">
        <div className="relative h-[350px] bg-cover bg-center bg-no-repeat bg-[url('/banner2.jpg')]">
          <ProfileHeader />
          <div className="absolute flex flex-col items-center bottom-[-95px] left-8">
            <img
              className="rounded-full w-28 h-28 shadow-lg"
              src={dbUser?.profilePictureUrl}
              alt=""
            />
            <p className=" text-center font-semibold text-black max-w-[100px]">
              {dbUser?.username}
            </p>
            <p className="text-center text-gray-500 max-w-[100px]">
              Joined{" "}
              {dbUser?.createdAt
                ? formatDistanceToNow(new Date(dbUser.createdAt))
                : ""}{" "}
              ago
            </p>
          </div>

          <div className="absolute flex gap-5 bottom-[-20px] left-[180px] text-black bg-white p-2 px-4 rounded-3xl shadow-lg ">
            <h4 className="text-gray-400 rounded-2xl hover:bg-purple-700 px-4 py-1 cursor-pointer hover:text-white">
              Overview
            </h4>
            <h4 className="text-gray-400 rounded-2xl hover:bg-purple-700 px-4 py-1 cursor-pointer hover:text-white">
              Library
            </h4>
          </div>
        </div>
        <div></div>
        <div className="w-full h-full h-min-screen mt-[140px] border-t-2 border-b-2 py-4 border-gray-300 flex flex-col items-center">
          <div className="w-full flex justify-between">
            <h3 className="text-xl ml-10 font-semibold">Filters</h3>
            <IoIosArrowDown className="text-2xl mt-1 text-black mr-10" />
          </div>
          <div className="filters hidden"></div>
        </div>
        {data &&
          data.map((manga) => (
            <div className="flex flex-wrap justify-center">
              <StandardCard manga={manga} key={manga.id} />
            </div>
          ))}
      </main>
      <Footer />
    </>
  );
}
