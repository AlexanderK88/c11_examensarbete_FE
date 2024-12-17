import { MangaDto } from "../../../types/mangaTypes";

interface PersonalRecommendationCardProps {
  manga: MangaDto;
}

export default function PersonalRecommendationCard({
  manga,
}: PersonalRecommendationCardProps) {
  return (
    <div className="mx-auto max-w-[410px] lg:max-w-[600px] p-4 bg-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow md:mr-4">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <img
            className="w-[140px] h-[210px] rounded-lg object-cover shadow-md"
            src={manga.images[0].imageUrl}
            alt={manga.title}
          />
        </div>
        <div className="flex-grow">
          <h2 className="font-bold text-lg lg:text-xl mb-2">{manga.title}</h2>
          <p className="text-gray-600 text-sm lg:text-base line-clamp-6">
            {manga.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
