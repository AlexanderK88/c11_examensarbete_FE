import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import StandardCard from "../components/manga/cards/StandardCard";
import StandardCardSkeleton from "../components/skeleton/StandardCardSkeleton";
import TypeDropdown from "../components/modals/TypeModal";
import { usePopularMangas } from "../services/MangaService";

export default function Browse() {
  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("asc");

  const [dropdown2, setDropdown2] = useState("");

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePopularMangas(21, sort, sortDirection, selectedTypes);

  const handleToggleDropdown = () => {
    setIsTypeDropdownOpen((prev) => !prev);
  };

  const handleApplyTypes = (types: string[]) => {
    setSelectedTypes(types); // Update selected types
    console.log("Selected Types:", types);
  };

  const handleSortChange = (e: any) => {
    const value = e.target.value;
    console.log("Dropdown value:", value);
    if (value === "popularity") {
      setSortDirection("asc");
      setSort(value);
    }
    if (value === "score") {
      setSortDirection("desc");
      setSort(value);
    }
    if (value === "publishedFrom") {
      setSortDirection("desc");
      setSort(value);
    }
    if (value === "chapters") {
      setSortDirection("desc");
      setSort(value);
    }
    console.log("Sort:", sort, "SortDirection:", sortDirection);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="w-10/12 lg:w-11/12 mt-40 p-4 mx-auto flex flex-col md:flex-row justify-between">
          <input
            type="text"
            placeholder="Search"
            className="w-10/12 mx-auto md:mt-auto md:h-10 lg:mx-0 lg:w-56 p-1 border border-gray-300 rounded-md lg:ml-4"
          />
          <div className=" mt-4 md:mt-0 md:ml-4 w-10/12 lg:w-3/4 xl:w-2/4 mx-auto lg:mx-0 flex flex-col lg:flex-row gap-4">
            <div className="relative w-full mx-auto flex gap-6 md:gap-4 items-center md:justify-end">
              <button
                onClick={handleToggleDropdown}
                className="realtive w-2/4 px-4 py-2 border-2 border-dashed border-gray-400 rounded-md hover:bg-gray-100 lg:w-24 focus:outline-none"
              >
                Type
              </button>
              <TypeDropdown
                isOpen={isTypeDropdownOpen}
                onClose={() => setIsTypeDropdownOpen(false)}
                onApply={handleApplyTypes}
              />
              <button className="w-2/4 px-4 py-2 border-2 border-dashed border-gray-400 rounded-md hover:bg-gray-100 lg:w-24 focus:outline-none">
                Tags
              </button>
            </div>
            <div className="w-full mx-auto flex gap-6 md:gap-4 items-center">
              <select
                value={sort}
                onChange={handleSortChange}
                className="w-2/4 p-2 border lg:max-w-48 border-gray-300 rounded-md"
              >
                <option value="popularity">Popularity</option>
                <option value="chapters">Chapters released</option>
                <option value="publishedFrom">Newest</option>
                <option value="score">Highest rated</option>
              </select>
              <select
                value={dropdown2}
                onChange={(e) => setDropdown2(e.target.value)}
                className="w-2/4 lg:max-w-48 p-2 border border-gray-300 rounded-md lg:mr-4"
              >
                <option value="">Release period</option>
                <option value="option1">This month</option>
                <option value="option2">This year</option>
                <option value="option3">All time</option>
              </select>
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={data?.pages.flatMap((page) => page.content).length || 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={Array.from({ length: 10 }).map((_, index) => (
            <StandardCardSkeleton key={index} />
          ))}
          className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4"
        >
          {data?.pages
            .flatMap((page) => page.content)
            .map((manga) => (
              <StandardCard key={manga.id} manga={manga} />
            ))}
        </InfiniteScroll>
      </main>
      <Footer />
    </>
  );
}
