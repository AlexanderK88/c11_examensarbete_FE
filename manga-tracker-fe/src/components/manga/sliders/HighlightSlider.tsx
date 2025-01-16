import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import StandardCard from "../cards/StandardCard";
import StandardCardSkeleton from "../../skeleton/StandardCardSkeleton";
import { MangaDto } from "../../../types/mangaTypes";

interface HighlightSliderProps {
  title: string;
  data: any;
  route: string;
}

export default function HighlightSlider({
  title,
  data,
  route,
}: HighlightSliderProps) {
  const navigate = useNavigate();

  const handleGoToBrowse = () => {
    navigate(route);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1920, settings: { slidesToShow: 6.1, slidesToScroll: 5 } },
      { breakpoint: 1600, settings: { slidesToShow: 5.1, slidesToScroll: 5 } },
      {
        breakpoint: 1440,
        settings: { slidesToShow: 4.5, slidesToScroll: 4.5 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3.5, slidesToScroll: 3.5 },
      },
      { breakpoint: 900, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2.5, slidesToScroll: 2.5 } },
      { breakpoint: 700, settings: { slidesToShow: 2.2, slidesToScroll: 2 } },
      { breakpoint: 580, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1.4, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="w-full xl:w-11/12 px-4 md:px-8 lg:px-16 mx-auto mt-10 relative">
      <div className="flex justify-between items-end mb-4 gap-2">
        <p className="text-3xl font-semibold text-white">{title}</p>
        <p
          onClick={handleGoToBrowse}
          className="pb-[1.5px] underline rounded-md px-2 italic hover:bg-purple-400 hover:text-white cursor-pointer text-white"
        >
          See all
        </p>
      </div>
      <Slider {...sliderSettings}>
        {data && data.pages.length > 0
          ? data.pages
              .flatMap((page: any) => page.content)
              .map((manga: MangaDto) => (
                <div key={manga.id}>
                  <StandardCard manga={manga} />
                </div>
              ))
          : Array.from({ length: 15 }).map((_, index) => (
              <div key={index}>
                <StandardCardSkeleton />
              </div>
            ))}
      </Slider>
    </div>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-purple-500 border-2 border-purple-500 rounded-full shadow-lg p-1 text-3xl z-10"
      onClick={onClick}
      style={{ right: "-15px" }}
    >
      <FaArrowRight />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-purple-500 border-2 border-purple-500 rounded-full shadow-lg p-1 text-3xl z-10"
      onClick={onClick}
      style={{ left: "-15px" }}
    >
      <FaArrowLeft />
    </button>
  );
}
