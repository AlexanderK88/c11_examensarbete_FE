import { useMangasBySearch } from "../../services/MangaService";
import { useState, useEffect } from "react";
import { MangaDto } from "../../types/mangaTypes";

interface SearchInputProps {
  setMangas: (mangas: MangaDto[]) => void;
}

export default function SearchInput({ setMangas }: SearchInputProps) {
  const [search, setSearch] = useState("");

  const { data, error } = useMangasBySearch(10, search);
  useEffect(() => {
    if (search.length > 0 && data) {
      setMangas(data.pages.flatMap((page) => page.content));
    } else {
      setMangas([]);
    }
  }, [data, setMangas]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex items-center">
      <input
        type="text"
        aria-label="Search series"
        placeholder="Search series..."
        className="p-1 pl-3 border bg-black text-white border-gray-300 rounded-md"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}
