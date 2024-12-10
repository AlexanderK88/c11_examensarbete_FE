
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

