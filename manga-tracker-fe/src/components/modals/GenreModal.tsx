import { useState } from "react";

interface GenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedGenre: string) => void;
}

export default function GenreDropdown({
  isOpen,
  onClose,
  onApply,
}: GenreModalProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const toggleGenre = (genreValue: string) => {
    setSelectedGenre((prev) => (prev === genreValue ? null : genreValue));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-10 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Select Genre</h2>
        <div className="space-y-2">
          {[
            { value: "Award%20Winning", label: "Award Winning" },
            { value: "Action", label: "Action" },
            { value: "Adventure", label: "Adventure" },
            { value: "Comedy", label: "Comedy" },
            { value: "Mystery", label: "Mystery" },
            { value: "Drama", label: "Drama" },
            { value: "Romance", label: "Romance" },
            { value: "Horror", label: "Horror" },
            { value: "Fantasy", label: "Fantasy" },
            { value: "Slice%20of%20Life", label: "SoF" },
            { value: "Sci-Fi", label: "Sci-Fi" },
            { value: "Supernatural", label: "Supernatural" },
          ].map((genre) => (
            <label key={genre.value} className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                onChange={() => toggleGenre(genre.value)}
                checked={selectedGenre === genre.value}
              />
              {genre.label}
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(selectedGenre ?? "");
              onClose();
            }}
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-900"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
