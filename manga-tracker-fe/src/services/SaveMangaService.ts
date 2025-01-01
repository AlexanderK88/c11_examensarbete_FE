
import axiosInstance from "./axiosInstance";
import { useMutation, useQuery } from "react-query";
import { MangaDto } from "../types/mangaTypes";

interface SaveMangaDto {
    userid: number;
    mangaid: number;
    status: string;
    score: number;
    chaptersRead: number;
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
