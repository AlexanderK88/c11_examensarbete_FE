import React, { useEffect } from "react";
import { MangaDto } from "../../../types/mangaTypes";

interface ImageCardProps {
  manga: MangaDto;
}

const ImageCard: React.FC<ImageCardProps> = ({ manga }) => {
  return (
    <div className="p-2">
      <img
        className={`w-[215px] h-[322px] rounded-lg shadow-lg shadow-purple-300 hover:transform hover:scale-105 transition-transform hover:cursor-pointer`}
        src={manga.images[0]?.imageUrl ?? ""}
        alt={manga.title}
      />
    </div>
  );
};

export default ImageCard;
