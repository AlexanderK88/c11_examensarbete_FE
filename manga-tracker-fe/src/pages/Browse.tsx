import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSortedMangas } from "../services/MangaService";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchBar from "../components/browseComponents/SearchBar";
import SortAndFilterControls from "../components/browseComponents/SortAndFilterControls";
import InfiniteScrollContent from "../components/browseComponents/InfiniteScrollComponent";

export default function Browse2() {
  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [dropdown2, setDropdown2] = useState("");

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const { data, error, fetchNextPage, hasNextPage } = useSortedMangas(
    21,
    sort,
    sortDirection,
    selectedTypes,
    selectedGenre,
    search
  );

  const handleApplyTypes = (types: string[]) => {
    setSelectedTypes(types);
  };

  const handleApplyGenres = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleSortChange = (e: any) => {
    const value = e.target.value;
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
  };

  useEffect(() => {
    if (searchParams.has("sort") && searchParams.has("sortDirection")) {
      setSort(searchParams.get("sort") || "popularity");
      setSortDirection(searchParams.get("sortDirection") || "asc");
    }
    if (searchParams.has("selectedTypes")) {
      setSelectedTypes([searchParams.get("selectedTypes") || ""]);
    }
    if (searchParams.has("genre")) {
      setSelectedGenre(searchParams.get("genre") || "");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-white">
        <h1 className="text-3xl font-semibold text-red-500 mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-300 mb-6">
          We encountered an error while loading the data. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#121212] text-white">
        <div className="bg-[#121212] py-4 px-0 sm:px-6  pt-10">
          <div className="w-10/12 max-w-[1270px] mx-auto flex flex-col lg:flex-row justify-between gap-6">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
            <SortAndFilterControls
              sort={sort}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              dropdown2={dropdown2}
              onDropdown2Change={(e) => setDropdown2(e.target.value)}
              selectedTypes={selectedTypes}
              onToggleTypeDropdown={() => setIsTypeDropdownOpen((prev) => !prev)}
              onApplyTypes={handleApplyTypes}
              isTypeDropdownOpen={isTypeDropdownOpen}
              onToggleGenreDropdown={() => setIsGenreDropdownOpen((prev) => !prev)}
              onApplyGenre={handleApplyGenres}
              isGenreDropdownOpen={isGenreDropdownOpen}
            />
          </div>
        </div>
        <InfiniteScrollContent
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
        />
      </main>
      <Footer />
    </>
  );
}
