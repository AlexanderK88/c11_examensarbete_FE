import { useState, useEffect } from "react";
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
    SuperDuperMegaLarge: {
      breakpoint: { max: 5000, min: 3001 },
      items: 11,
    },
    SuperDuperLarge: {
      breakpoint: { max: 3000, min: 2401 },
      items: 9,
    },

    SuperLarge: {
      breakpoint: { max: 2400, min: 1601 },
      items: 7,
    },
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

  const calculateSkeletonCount = () => {
    const width = window.innerWidth;

    switch (true) {
      case width > 3000:
        return responsive.SuperDuperMegaLarge.items;
      case width > 2400 && width <= 3000:
        return responsive.SuperDuperLarge.items;
      case width > 1600 && width <= 2400:
        return responsive.SuperLarge.items;
      case width > 1300 && width <= 1600:
        return responsive.ExtraLarge.items;
      case width > 1025 && width <= 1300:
        return responsive.Large.items;
      case width > 800 && width <= 1024:
        return responsive.smallTablet.items;
      case width > 600 && width <= 800:
        return responsive.xSmallTablet.items;
      case width <= 599:
        return responsive.mobile.items;
      default:
        return responsive.ExtraLarge.items; // Fallback value
    }
  };

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
          ? mangasContent.map((manga: MangaDto) => {
              return (
                <div key={manga.id} className="mx-auto my-8">
                  <ImageCard manga={manga} />
                </div>
              );
            })
          : Array.from({ length: calculateSkeletonCount() }).map((_, index) => (
              <div className="mx-auto my-8" key={index}>
                <ImageCardSkeleton />
              </div>
            ))}
      </Carousel>
    </div>
  );
}
