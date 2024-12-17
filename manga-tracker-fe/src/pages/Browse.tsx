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
    console.log("Selected Types:", types);
  };

  const handleApplyGenres = (genre: string) => {
    setSelectedGenre(genre); // Update selected genres
    console.log("Selected Genres:", genre);
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
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-md py-4 px-0 sm:px-6 mb-8 pt-6">
          <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-between gap-6">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SortAndFilterControls
              sort={sort}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              dropdown2={dropdown2}
              onDropdown2Change={(e) => setDropdown2(e.target.value)}
              selectedTypes={selectedTypes}
              onToggleTypeDropdown={() =>
                setIsTypeDropdownOpen((prev) => !prev)
              }
              onApplyTypes={handleApplyTypes}
              isTypeDropdownOpen={isTypeDropdownOpen}
              onToggleGenreDropdown={() =>
                setIsGenreDropdownOpen((prev) => !prev)
              }
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
