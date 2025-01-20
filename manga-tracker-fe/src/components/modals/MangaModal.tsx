import { useEffect, useState } from "react";
import { MangaDto } from "../../types/mangaTypes";
import { Link } from "react-router-dom";

export default function MangaModal({ mangas }: { mangas: MangaDto[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    mangas.length > 0 && setIsModalOpen(true);
    mangas.length === 0 && setIsModalOpen(false);
  }, [mangas]);

  return (
    <>
      {isModalOpen && (
        <div className="absolute right-0 mt-2 bg-black shadow-lg border rounded-md min-w-96 max-w-96 pt-2">
          <div className="p-4 max-h-[500px] overflow-y-scroll no-scrollbar text-white">
            <h3 className="text-lg font-semibold mb-2">Search List</h3>
            <ul className="space-y-4">
              {mangas.map((manga, index) => (
                <Link to={`/manga/${manga.id}`} key={index}>
                  <li
                    key={index}
                    className="flex items-center space-x-4 hover:shadow-md rounded-md p-2"
                  >
                    <img
                      src={manga.images[0].smallImageUrl}
                      alt={manga.title}
                      className="w-12 min-w-12 max-w-12 object-cover rounded-md"
                    />
                    <span className="text-lg truncate">{manga.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
