import { useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import StandardCard from "../components/manga/cards/StandardCard";
import StandardCardSkeleton from "../components/skeleton/StandardCardSkeleton";
import { useSortedMangas, useMangasByGenre } from "../services/MangaService";
import { MangaDto } from "../types/mangaTypes";

export default function Discovery() {
  const { data: newMangasData } = useSortedMangas(
    15,
    "publishedFrom",
    "desc",
    [],
    ""
  );
  const { data: highestRatedMangasData } = useSortedMangas(
    15,
    "score",
    "desc",
    [],
    ""
  );
  const { data: mostReadMangasData } = useSortedMangas(
    15,
    "popularity",
    "asc",
    [],
    ""
  );
  const { data: mostReadManhwasData } = useSortedMangas(
    15,
    "popularity",
    "asc",
    ["Manhwa"],
    ""
  );

  const { data: popularRomanceSeriesData } = useMangasByGenre(15, 22);
  const { data: popularComedySeriesData } = useMangasByGenre(15, 4);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="w-full">
          <Section title="New Releases" data={newMangasData} />
          <Section title="Highest Rated" data={highestRatedMangasData} />
          <Section title="Most Read Mangas" data={mostReadMangasData} />
          <Section title="Most Read Manhwas" data={mostReadManhwasData} />
          <Section
            title="Popular Romance Series"
            data={popularRomanceSeriesData}
          />
          <Section
            title="Popular Comedy Series"
            data={popularComedySeriesData}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, data }: { title: string; data: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full lg:w-10/12 px-4 md:px-8 lg:px-16 mx-auto mt-10 relative">
      <div className="flex justify-start items-end mb-4 gap-2">
        <p className="text-3xl font-semibold ml-2">{title}</p>
        <p className="pb-[1.5px] underline rounded-md px-2 italic hover:bg-purple-400 hover:text-white cursor-pointer">
          See all
        </p>
      </div>
      <div className="relative group">
        <div>
          <button
            onClick={() => handleScroll("left")}
            className=" absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-purple-500 border-2 border-purple-500 rounded-full shadow-lg p-1 text-3xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <FaArrowLeft />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x scroll-smooth no-scrollbar overflow-visible"
          >
            {data
              ? data.pages
                  .flatMap((page: any) => page.content)
                  .map((manga: MangaDto) => (
                    <div
                      key={manga.id}
                      className="flex-shrink-0 snap-center"
                      style={{ width: "215px" }}
                    >
                      <StandardCard manga={manga} />
                    </div>
                  ))
              : Array.from({ length: 15 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 snap-center"
                    style={{ width: "215px" }}
                  >
                    <StandardCardSkeleton />
                  </div>
                ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-purple-500 border-2 border-purple-500 rounded-full  p-1 text-3xl opacity-100 transition-opacity z-10"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
