import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MangaDto } from "../../types/mangaTypes";

interface FilterModalProfileProps {
  mangas: MangaDto[];
  setMangas: (mangas: MangaDto[]) => void;
}

export default function FilterModalProfile({
  mangas,
  setMangas,
}: FilterModalProfileProps) {
  const [sort, setSort] = useState("Standard");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchParams] = useSearchParams();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const availableTypes = ["Manga", "Manhwa", "Manhua", "Other"]; // Example types

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let newSort = "popularity";
    let newSortDirection = "asc";

    if (value === "popularity" || value === "score" || value === "chapters") {
      newSort = value;
      newSortDirection = value === "popularity" ? "asc" : "desc";
    } else if (value === "publishedFrom") {
      newSort = "publishedFrom";
      newSortDirection = "desc";
    }

    setSort(newSort);
    setSortDirection(newSortDirection);

    const sortedMangas = [...mangas].sort((a, b) => {
      const validKeys: (keyof MangaDto)[] = [
        "popularity",
        "score",
        "chapters",
        "publishedFrom",
      ];
      const aValue = validKeys.includes(newSort as keyof MangaDto)
        ? a[newSort as keyof MangaDto] ?? 0
        : 0;
      const bValue = validKeys.includes(newSort as keyof MangaDto)
        ? b[newSort as keyof MangaDto] ?? 0
        : 0;

      if (newSortDirection === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    setMangas(sortedMangas);
  };

  const handleTypeChange = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);

    const filteredMangas = mangas.filter((manga) =>
      updatedTypes.length > 0 ? updatedTypes.includes(manga.type) : true
    );

    setMangas(filteredMangas);
  };

  useEffect(() => {
    if (searchParams.has("sort") && searchParams.has("sortDirection")) {
      setSort(searchParams.get("sort") || "popularity");
      setSortDirection(searchParams.get("sortDirection") || "asc");
    }
    if (searchParams.has("selectedTypes")) {
      setSelectedTypes([searchParams.get("selectedTypes") || ""]);
    }
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col gap-6 md:mx-10 mt-8">
      <div className="flex flex-col md:flex-row gap-4 sjustify-center items-center">
        {/* Sorting */}
        <label className="text-lg font-semibold">Sort By:</label>
        <select
          value={sort}
          onChange={handleSortChange}
          className="border p-2 sm:p-1 rounded-md "
        >
          <option>Standard</option>
          <option value="popularity">Popularity</option>
          <option value="score">Score</option>
          <option value="chapters">Chapters</option>
          <option value="publishedFrom">Published From</option>
        </select>

        {/* Filtering */}
        <label className="text-lg font-semibold">Filter By Type:</label>
        <div className="flex flex-wrap gap-4 items-center">
          {availableTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                className="cursor-pointer w-5 h-5"
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
