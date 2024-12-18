import InfiniteScroll from "react-infinite-scroll-component";
import StandardCardSkeleton from "../skeleton/StandardCardSkeleton";
import StandardCard from "../manga/cards/StandardCard";
import { MangaDto } from "../../types/mangaTypes";
import { Page } from "../../types/pageType";

interface Props {
  data: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const InfiniteScrollContent = ({ data, fetchNextPage, hasNextPage }: Props) => (
  <InfiniteScroll
    dataLength={
      data?.pages.flatMap((page: Page<MangaDto[]>) => page.content).length || 0
    }
    next={fetchNextPage}
    hasMore={!!hasNextPage}
    loader={Array.from({ length: 10 }).map((_, index) => (
      <StandardCardSkeleton key={index} />
    ))}
    className="w-full md:w-11/12 2xl:w-10/12 max-w-[1350px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4"
  >
    {data?.pages
      .flatMap((page: Page<MangaDto[]>) => page.content)
      .map((manga: MangaDto) => (
        <StandardCard key={manga.id} manga={manga} />
      ))}
  </InfiniteScroll>
);

export default InfiniteScrollContent;
