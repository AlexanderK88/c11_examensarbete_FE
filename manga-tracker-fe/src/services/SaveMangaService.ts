import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { MangaDto } from "../types/mangaTypes";

export interface SaveMangaDto {
  userid: number;
  mangaid: number;
  status: string;
  score: number;
  chaptersRead: number | null;
  title: string;
}

export interface SaveMangaDtoWithId {
  id: number;
  userid: number;
  mangaid: number;
  status: string;
  score: number;
  chaptersRead: number | null;
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
        error.response?.data?.message ||
          `Failed with status ${error.response?.status}`
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

const fetchAllSavedMangas = async (): Promise<MangaDto[]> => {
  try {
    const response = await axiosInstance.get(`/user/mangas`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    } else {
      throw new Error("Fetch failed: Unknown error occurred");
    }
  }
};

export const useFetchAllSavedMangas = () => {
  return useQuery(["usersMangas"], () => fetchAllSavedMangas(), {
    retry: false,
    onError: () =>
      console.log("Failed to fetch saved mangas for user with id:"),
  });
};

const deleteSavedManga = async (mangaId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/user/manga/${mangaId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Delete failed: ${error.message}`);
    } else {
      throw new Error("Delete failed: Unknown error occurred");
    }
  }
};

export const useDeleteSavedManga = (mangaId: string) => {
  return useMutation(() => deleteSavedManga(mangaId), {
    onError: () => console.log("Failed to delete saved manga"),
  });
};

const fetchUsersSavedMangas = async (): Promise<SaveMangaDto[]> => {
  try {
    const response = await axiosInstance.get(`/user/savedmanga`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch saved mangas:", error);
    return [];
  }
};

export const useFetchUsersSavedMangas = () => {
  return useQuery(["savedMangas"], () => fetchUsersSavedMangas(), {
    retry: false,
    onError: () =>
      console.log("Failed to fetch saved mangas for user with id:"),
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
        error.response?.data?.message ||
          `Failed with status ${error.response?.status}`
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
