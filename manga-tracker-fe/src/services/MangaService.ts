import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";
import { MangaDto } from "../types/mangaTypes";
import { Page } from "../types/pageType";

const fetchMangas = async (page: number, size: number): Promise<Page<MangaDto>> => {
  try {
    const response = await axiosInstance.get(`/manga?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    } else {
      throw new Error("Fetch failed: Unknown error occurred");
    }
  }
};

export const useMangas = (pageSize: number) => {
  return useInfiniteQuery<Page<MangaDto>, Error>(
    "mangas",
    ({ pageParam = 0 }) => fetchMangas(pageParam, pageSize),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
      },
    }
  );
};

export const fetchMangaById = async (id: string): Promise<MangaDto> => {
  try {
    const response = await axiosInstance.get(`/manga/${id}`);
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    } else {
      throw new Error("Fetch failed: Unknown error occurred");
    }
  }
};

export const useMangaById = (id: string) => {
  return useQuery<MangaDto, Error>(["manga", id], () => fetchMangaById(id));
};

export const fetchSortedMangas = async (
  page: number,
  size: number,
  sort: string,
  sortDirection: string,
  selectedTypes: string[],
  genre: string,
  search: string
): Promise<Page<MangaDto>> => {
  const typesParam = selectedTypes.length > 0 ? `&types=${selectedTypes.join(",")}` : "";
  try {
    const response = await axiosInstance.get(
      `/manga/sorted?page=${page}&size=${size}&sort=${sort}&sortDirection=${sortDirection}${typesParam}&genre=${genre}&search=${search}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    } else {
      throw new Error("Fetch failed: Unknown error occurred");
    }
  }
};

export const useSortedMangas = (
  pageSize: number,
  sort: string,
  sortDirection: string,
  selectedTypes: string[],
  genre: string,
  search: string
) => {
  return useInfiniteQuery<Page<MangaDto>, Error>(
    ["sortedMangas", sort, sortDirection, selectedTypes.join(","), genre, search],
    ({ pageParam = 0 }) =>
      fetchSortedMangas(pageParam, pageSize, sort, sortDirection, selectedTypes, genre, search),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
      },
    }
  );
};

const fetchMangasBySearch = async (
  page: number,
  size: number,
  search: string
): Promise<Page<MangaDto>> => {
  try {
    const response = await axiosInstance.get(
      `/manga/search?page=${page}&size=${size}&query=${search}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    } else {
      throw new Error("Fetch failed: Unknown error occurred");
    }
  }
};

export const useMangasBySearch = (pageSize: number, search: string) => {
  return useInfiniteQuery<Page<MangaDto>, Error>(
    ["searchMangas", search],
    ({ pageParam = 0 }) => fetchMangasBySearch(pageParam, pageSize, search),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
      },
    }
  );
};

const fetchMangasByGenre = async (
  page: number,
  size: number,
  genre: number
): Promise<Page<MangaDto>> => {
  try {
    const response = await axiosInstance.get(`/manga/genre/${genre}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    } else {
      throw new Error("Fetch failed: Unknown error occurred");
    }
  }
};

export const useMangasByGenre = (pageSize: number, genre: number) => {
  return useInfiniteQuery<Page<MangaDto>, Error>(
    ["genreMangas", genre],
    ({ pageParam = 0 }) => fetchMangasByGenre(pageParam, pageSize, genre),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
      },
    }
  );
};
