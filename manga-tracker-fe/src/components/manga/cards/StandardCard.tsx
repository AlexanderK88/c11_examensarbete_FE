import { MangaDto } from "../../../types/mangaTypes";

interface StandardCardProps {
  manga: MangaDto;
}

export default function StandardCard({ manga }: StandardCardProps) {
  return (
    <a
      href={`manga/${manga.id}`}
      key={manga.id}
      className="mx-auto max-w-[215px] hover:cursor-default"
    >
      <div className="">
        <div className="rounded-lg">
          <img
            className="mt-8 w-[215px] h-[322px] rounded-lg shadow-md hover:transform hover:scale-105 transition-transform hover:cursor-pointer"
            src={manga.images[0].imageUrl}
            alt={manga.title}
          />
        </div>
        <h2 className="ml-2 font-semibold text-left mt-2 font-sans text-xl truncate hover:transform hover:scale-105 transition-transform hover:cursor-pointer">
          {manga.title}
        </h2>
      </div>
    </a>
  );
}
