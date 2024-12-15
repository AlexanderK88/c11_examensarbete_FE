import { useEffect, useState } from "react";
import { MangaDto } from "../../types/mangaTypes"; // Adjust the import based on where you define your MangaDto type

export default function MangaModal({ mangas }: { mangas: MangaDto[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    mangas.length > 0 && setIsModalOpen(true);
    mangas.length === 0 && setIsModalOpen(false);
  }, [mangas]);

  return (
    <>
      {isModalOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-96 max-w-96 pt-2">
          <div className="p-4 max-h-64 overflow-y-scroll no-scrollbar">
            <h3 className="text-lg font-semibold mb-2">Search List</h3>
            <ul className="space-y-4">
              {mangas.map((manga, index) => (
                <a href={`/manga/${manga.id}`} key={index}>
                  <li
                    key={index}
                    className="flex items-center space-x-4 hover:shadow-md rounded-md p-2"
                  >
                    <img
                      src={manga.images[0].smallImageUrl} // Use the correct poster URL from your data
                      alt={manga.title}
                      className="w-12 min-w-12 max-w-12 object-cover rounded-md"
                    />
                    <span className="text-lg truncate">{manga.title}</span>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
