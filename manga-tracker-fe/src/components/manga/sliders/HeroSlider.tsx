import React, { useState } from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImageCard from "../cards/ImageCard";
import { MangaDto } from "../../../types/mangaTypes";
import ImageCardSkeleton from "../../skeleton/ImageCardSkeleton";

interface HeroSectionProps {
  mangas: any;
}

export default function HeroSlider({ mangas }: HeroSectionProps) {
  const responsive: ResponsiveType = {
    ExtraLarge: {
      breakpoint: { max: 1600, min: 1301 },
      items: 5,
    },
    Large: {
      breakpoint: { max: 1300, min: 1025 },
      items: 4,
    },
    smallTablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    xSmallTablet: {
      breakpoint: { max: 800, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
    },
  };

  const mangasContent = mangas?.map((manga: MangaDto) => manga) || [];

  return (
    <div className="my-12">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        ssr={true}
        arrows={false}
        infinite={true}
        focusOnSelect={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        centerMode={true}
        containerClass="carousel-container"
      >
        {mangasContent.length > 0
          ? mangasContent.map((manga: MangaDto, index: number) => {
              return (
                <div key={manga.id} className="mx-auto my-8">
                  <ImageCard manga={manga} />
                </div>
              );
            })
          : Array.from({ length: 15 }).map((_, index) => (
              <div className="mx-auto my-8">
                <ImageCardSkeleton />
              </div>
            ))}
      </Carousel>
    </div>
  );
}
