import React from "react";
import { useMangaById } from "../../../services/MangaService";
import PersonalRecommendationCard from "../cards/PersonalRecommendationCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PersonalRecommendations: React.FC = () => {
  const { data: manga1, isLoading: loading1 } = useMangaById("7");
  const { data: manga2, isLoading: loading2 } = useMangaById("11");
  const { data: manga3, isLoading: loading3 } = useMangaById("26");
  const { data: manga4, isLoading: loading4 } = useMangaById("44");

  const isLoading = loading1 || loading2 || loading3 || loading4;
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full xl:w-11/12 px-4 md:px-8 lg:px-16 mx-auto gap-2">
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Slider {...sliderSettings}>
          {manga1 && (
            <div className="w-full my-6">
              <PersonalRecommendationCard manga={manga1} />
            </div>
          )}
          {manga2 && (
            <div className="w-full my-6">
              <PersonalRecommendationCard manga={manga2} />
            </div>
          )}
          {manga3 && (
            <div className="w-full my-6">
              <PersonalRecommendationCard manga={manga3} />
            </div>
          )}
          {manga4 && (
            <div className="w-full my-6">
              <PersonalRecommendationCard manga={manga4} />
            </div>
          )}
        </Slider>
      )}
    </div>
  );
};

export default PersonalRecommendations;
