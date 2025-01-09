
import axiosInstance from "./axiosInstance";
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

const saveManga = async (manga: SaveMangaDto): Promise<SaveMangaDto> => {
    try {
        console.log("Saving manga:", manga);
        const response = await axiosInstance.post("/user/manga", manga);
        return response.data;
    } catch (error) {
        console.error("Failed to save manga:", error);
        return manga;
    }
    };

export const useSaveManga = () => {
    return useMutation(saveManga, {
        onError: () => console.log("Failed to save manga"),
    });
};

const fetchAllSavedMangas = async (userId: string): Promise<MangaDto[]> => {
    try {
        console.log("Fetching all saved mangas for user with id:", userId);
        const response = await axiosInstance.get(`/user/${userId}/mangas`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch saved mangas:", error);
        return [];
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
        console.log("Deleting saved manga with id:", mangaId);
        await axiosInstance.delete(`/user/manga/${mangaId}/${userId}`);
    } catch (error) {
        console.error("Failed to delete saved manga:", error);
    }
};

export const useDeleteSavedManga = (userId: string, mangaId: string) => {
    return useMutation(() => deleteSavedManga(userId, mangaId), {
        onError: () => console.log("Failed to delete saved manga"),
    });
};

const fetchUsersSAvedMangas = async (userId: string): Promise<SaveMangaDto[]> => {
    try {
        console.log("Fetching all saved mangas for user with id:", userId);
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