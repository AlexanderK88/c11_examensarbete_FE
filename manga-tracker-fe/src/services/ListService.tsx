import axiosInstance from "./axiosInstance";
import { useMutation, useQuery } from "react-query";
import { SaveMangaDto } from "./SaveMangaService";

interface ListDto {
  listName: string;
  userId: string;
}

export interface ListDtoWithId extends ListDto {
  id: string;
  savedMangas: SaveMangaDto[];
}

const createNewList = async (list: ListDto): Promise<ListDto> => {
  try {
    console.log("Creating new list:", list);
    const response = await axiosInstance.post("/user/list", list);
    return response.data;
  } catch (error) {
    console.error("Failed to create new list:", error);
    return list;
  }
};

export const useCreateNewList = () => {
  return useMutation(createNewList, {
    onError: () => console.log("Failed to create new list"),
  });
};

const fetchAllLists = async (userId: string): Promise<ListDtoWithId[]> => {
  try {
    console.log("Fetching all lists for user with id:", userId);
    const response = await axiosInstance.get(`/user/${userId}/lists`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch lists:", error);
    return [];
  }
};

export const useFetchAllLists = (userId: string) => {
  return useQuery(["lists", userId], () => fetchAllLists(userId), {
    retry: false,
    enabled: !!userId,
    onError: () =>
      console.log("Failed to fetch lists for user with id:", userId),
  });
};

const addMangaToList = async (
  listId: string,
  mangaIds: number[]
): Promise<void> => {
  try {
    console.log("Adding manga with id:", mangaIds, "to list with id:", listId);
    await axiosInstance.post(`/user/list/add/${listId}`, mangaIds);
  } catch (error) {
    console.error("Failed to add manga to list:", error);
    throw error; // Ensure errors are properly propagated
  }
};

export const useAddMangaToList = () => {
  return useMutation(
    ({ listId, mangaIds }: { listId: string; mangaIds: number[] }) =>
      addMangaToList(listId, mangaIds),
    {
      onError: (error) => {
        console.error("Failed to add manga to list:", error);
      },
    }
  );
};
