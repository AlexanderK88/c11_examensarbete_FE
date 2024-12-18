import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSlider from "../components/manga/sliders/HeroSlider";
import HighlightSlider from "../components/manga/sliders/HighlightSlider";
import PersonalRecommendationSlider from "../components/manga/sliders/PersonalRecommendationSlider";
import { useSortedMangas, useMangasByGenre } from "../services/MangaService";

export default function Discovery() {
  const { data: newMangasData } = useSortedMangas(
    15,
    "publishedFrom",
    "desc",
    [],
    "",
    ""
  );
  const { data: highestRatedMangasData } = useSortedMangas(
    15,
    "score",
    "desc",
    [],
    "",
    ""
  );
  const { data: mostReadMangasData } = useSortedMangas(
    15,
    "popularity",
    "asc",
    [],
    "",
    ""
  );
  const { data: mostReadManhwasData } = useSortedMangas(
    15,
    "popularity",
    "asc",
    ["Manhwa"],
    "",
    ""
  );

  const { data: popularRomanceSeriesData } = useMangasByGenre(15, 22);
  const { data: popularComedySeriesData } = useMangasByGenre(15, 4);

  const mixedData = [
    ...(mostReadMangasData?.pages.flatMap((page) => page.content) ?? []), // Spread `mostReadMangasData` if it's not `undefined`
    ...(mostReadManhwasData?.pages.flatMap((page) => page.content) ?? []), // Spread `mostReadManhwasData` if it's not `undefined`
  ];

  // Optionally deduplicate mixedData based on manga ID or other unique property
  const deduplicatedMixedData = Array.from(
    new Map(mixedData.map((manga) => [manga.id, manga])).values()
  );

  const routes = {
    "New Releases": "/browse?sort=publishedFrom&sortDirection=desc",
    "Highest Rated": "/browse?sort=score&sortDirection=desc",
    "Most Read Mangas": "/browse?sort=popularity&sortDirection=asc",
    "Most Read Manhwas":
      "/browse?sort=popularity&sortDirection=asc&selectedTypes=Manhwa",
    "Popular Romance Series": "/browse?genre=Romance",
    "Popular Comedy Series": "/browse?genre=Comedy",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <HeroSlider mangas={deduplicatedMixedData} />
        </div>
        <div className="w-full mt-10">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Personal Recommendations
          </h2>
          <PersonalRecommendationSlider />
        </div>
        <div className="w-full">
          <HighlightSlider
            title="New Releases"
            data={newMangasData}
            route={routes["New Releases"]}
          />
          <HighlightSlider
            title="Highest Rated"
            data={highestRatedMangasData}
            route={routes["Highest Rated"]}
          />
          <HighlightSlider
            title="Most Read Mangas"
            data={mostReadMangasData}
            route={routes["Most Read Mangas"]}
          />
          <HighlightSlider
            title="Most Read Manhwas"
            data={mostReadManhwasData}
            route={routes["Most Read Manhwas"]}
          />
          <HighlightSlider
            title="Popular Romance Series"
            data={popularRomanceSeriesData}
            route={routes["Popular Romance Series"]}
          />
          <HighlightSlider
            title="Popular Comedy Series"
            data={popularComedySeriesData}
            route={routes["Popular Comedy Series"]}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
