import { useParams } from "react-router-dom";
import { useMangaById, useMangas } from "../services/MangaService";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { IoMdBook } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

export default function Individual() {
  const { id } = useParams();
  const { data: manga, isLoading, error } = useMangaById(id as string);

  console.log(manga);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div>Error: {error.message}</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full font-sans">
        <div className="mt-2 w-11/12 mx-auto">
          <h1 className="text-3xl my-4 font-semibold">
            {manga?.title || "Untitled"}
          </h1>
          <div className="w-full flex mx-auto">
            {manga?.images?.[0]?.largeImageUrl && (
              <img
                src={manga.images[0].largeImageUrl}
                alt={manga.title || "Manga"}
                className="w-[185px] h-[285px] rounded-lg shadow-md mr-5"
              />
            )}
            <div className="w-full flex flex-col gap-1">
              <div>
                <div className="flex flex-wrap gap-1 my-2">
                  {manga?.genres?.map((genre) => (
                    <p
                      className="bg-purple-700 text-white p-1 px-3 text-sm rounded-lg"
                      key={genre.id}
                    >
                      {genre.name}
                    </p>
                  )) || <p>No genres available</p>}
                </div>
              </div>
              <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white">
                  <p className="mx-auto my-1">読</p>
                </div>
                <div className="mr-2">
                  <h3 className="text-sm right-0">Type</h3>
                  <p className="text-md font-bold">
                    {manga?.type || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                  <p className="text-white text-2xl my-1">
                    <IoMdBook />
                  </p>
                </div>
                <div>
                  <h3 className="text-sm">Chapters available</h3>
                  <p className="text-md font-bold">
                    {manga?.chapters ?? "soon"}
                  </p>
                </div>
              </div>
              <div className="border rounded-md shadow-md p-1 flex gap-4 items-center">
                <div className="p-1 ml-1 h-10 w-10 bg-purple-700 rounded-md text-center text-white flex items-center justify-center">
                  <p className="text-white text-2xl my-1">
                    <FaStar />
                  </p>
                </div>
                <div>
                  <h3 className="text-sm">Rating</h3>
                  <p className="text-md font-bold">
                    {manga?.score ?? "No rating"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button className="text-white mt-4 p-2 bg-purple-800 w-full rounded-lg hover:bg-purple-700">
            Add to library
          </button>
          <h2 className="text-red-600 mt-4 mx-auto w-12">Report</h2>
        </div>
        <div>
          <div className="flex flex-row justify-center h-full gap-10 mt-5">
            <p className="h-full hover:border-b border-purple-700 py-5">
              Overview
            </p>
            <p className="h-full hover:border-b border-purple-700 py-5">
              Reviews
            </p>
            <p className="h-full hover:border-b border-purple-700 py-5">
              Statistics
            </p>
          </div>
          <div className="bg-stone-400 h-[1px] w-full mb-5"></div>
          <div className="border rounded-lg m-5 p-5">
            <div>
              <h2 className="text-3xl">Synopsis</h2>
            </div>
            <div className="bg-stone-400 h-[1px] w-full my-5"></div>
            <div>
              <p>{manga?.synopsis || "No synopsis available."}</p>
            </div>
          </div>
        </div>
      </main>
      <div>
        <div>
          <h1>Similar Series</h1>
          <div></div>
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
}
