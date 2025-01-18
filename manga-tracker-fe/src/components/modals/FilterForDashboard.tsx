import { useState } from "react";
import { SaveMangaDto } from "../../services/SaveMangaService";

interface Props {
  mangas: SaveMangaDto[];
  setMangas: (mangas: SaveMangaDto[]) => void;
}

export default function FilterForDashboard({ mangas, setMangas }: Props) {
  const [sort, setSort] = useState<string>("Default");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const availableStatuses = ["Reading", "Completed", "On Hold", "Dropped", "Plan to read"];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    let newSort = "Default";
    if (value === "score") {
      newSort = value;
    }

    setSort(newSort);

    const sortedMangas = [...mangas].sort((a, b) => {
      if (newSort === "score") {
        return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
      }
      return 0;
    });

    setMangas(sortedMangas);
  };

  const handleStatusChange = (status: string) => {
    const updatedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((selectedStatus) => selectedStatus !== status)
      : [...selectedStatuses, status];

    setSelectedStatuses(updatedStatuses);

    const filteredMangas = mangas.filter((manga) =>
      updatedStatuses.length > 0 ? updatedStatuses.includes(manga.status) : true
    );

    setMangas(filteredMangas);
  };

  return (
    <div className=" flex flex-col gap-6 mt-8 text-white">
      <div className="flex flex-col md:flex-row gap-4 justify-center sm:justify-end items-center sm:items-start">
        <label className="text-lg font-semibold min-w-[70px]">Sort By:</label>
        <select
          value={sort}
          onChange={handleSortChange}
          className="w-full sm:max-w-[150px] border p-2 sm:p-1 rounded-md text-white bg-black"
        >
          <option>Default</option>
          <option value="score">Score</option>
        </select>

        <label className="text-lg font-semibold min-w-[140px]">Filter By Status:</label>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-1 sm:justify-start items-center">
          {availableStatuses.map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input
                className="cursor-pointer w-5 h-5"
                type="checkbox"
                value={status}
                checked={selectedStatuses.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
