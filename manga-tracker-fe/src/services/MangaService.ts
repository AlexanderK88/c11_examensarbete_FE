
import axiosInstance from "./axiosInstance";
import { useQuery } from "react-query";
import { MangaDto } from "../types/mangaTypes";


const fetchMangas = async (): Promise<MangaDto[]> => {
  const response = await axiosInstance.get('/manga');
  return response.data;
};

export const useMangas = () => {
    return useQuery<MangaDto[], Error>('mangas', fetchMangas); 
  };

  export const fetchMangaById = async (id: string): Promise<MangaDto> => {
    const response = await axiosInstance.get(`/manga/${id}`);
    return response.data[0];
  }

  export const useMangaById = (id: string) => {
    return useQuery<MangaDto, Error>(['manga', id], () => fetchMangaById(id))
  }