import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { MangaDto } from "../types/mangaTypes";

export interface SaveMangaDto {
  userid: number;
  mangaid: number;
  status: string;
  score: number;
  chaptersRead: number;
  title: string;
}

export interface SaveMangaDtoWithId {
  id: number;
  userid: number;
  mangaid: number;
  status: string;
  score: number;
  chaptersRead: number;
  title: string;
}

const saveManga = async (manga: SaveMangaDto): Promise<SaveMangaDto> => {
  try {
    const response = await axiosInstance.post("/user/manga", manga);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Save failed: ${error.message}`);
    } else {
      throw new Error("Save failed: Unknown error occurred");
    }
  }
};

export const useSaveManga = () => {
  return useMutation(saveManga, {
    onError: () => console.log("Failed to save manga"),
  });
};

const fetchAllSavedMangas = async (userId: string): Promise<MangaDto[]> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/mangas`);
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

export const useFetchAllSavedMangas = (userId: string) => {
  return useQuery(["savedMangas", userId], () => fetchAllSavedMangas(userId), {
    retry: false,
    enabled: !!userId,
    onError: () => console.log("Failed to fetch saved mangas for user with id:", userId),
  });
};

const deleteSavedManga = async (userId: string, mangaId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/user/manga/${mangaId}/${userId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Delete failed: ${error.message}`);
    } else {
      throw new Error("Delete failed: Unknown error occurred");
    }
  }
};

export const useDeleteSavedManga = (userId: string, mangaId: string) => {
  return useMutation(() => deleteSavedManga(userId, mangaId), {
    onError: () => console.log("Failed to delete saved manga"),
  });
};

const fetchUsersSAvedMangas = async (userId: string): Promise<SaveMangaDto[]> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/savedmanga`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch saved mangas:", error);
    return [];
  }
};

export const useFetchUsersSavedMangas = (userId: string) => {
  return useQuery(["savedMangas", userId], () => fetchUsersSAvedMangas(userId), {
    retry: false,
    enabled: !!userId,
    onError: () => console.log("Failed to fetch saved mangas for user with id:", userId),
  });
};

const updateSavedManga = async (manga: SaveMangaDto): Promise<SaveMangaDto> => {
  try {
    const response = await axiosInstance.put("/user/manga/edit", manga);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Update failed: ${error.message}`);
    } else {
      throw new Error("Update failed: Unknown error occurred");
    }
  }
};

export const useUpdateSavedManga = () => {
  return useMutation(updateSavedManga, {
    onError: () => console.log("Failed to update saved manga"),
  });
};
