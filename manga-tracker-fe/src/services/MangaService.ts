
import axiosInstance from "./axiosInstance";
import { useQuery, useInfiniteQuery } from "react-query";
import { MangaDto } from "../types/mangaTypes";
import { Page } from "../types/pageType";


const fetchMangas = async (page: number, size: number): Promise<Page<MangaDto>> => {
  const response = await axiosInstance.get(`/manga?page=${page}&size=${size}`);
  return response.data;
};

export const useMangas = (pageSize: number) => {
  return useInfiniteQuery<Page<MangaDto>, Error>(
    'mangas',
    ({ pageParam = 0 }) => fetchMangas(pageParam, pageSize), // Pass the current page and page size
    {
      getNextPageParam: (lastPage) => {
        // If there are more pages, return the next page index
        return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
      },
    }
  );
};

  export const fetchMangaById = async (id: string): Promise<MangaDto> => {
    const response = await axiosInstance.get(`/manga/${id}`);
    return response.data[0];
  }

  export const useMangaById = (id: string) => {
    return useQuery<MangaDto, Error>(['manga', id], () => fetchMangaById(id))
  }