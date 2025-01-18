import axiosInstance from "./axiosInstance";
import { useMutation, useQuery } from "react-query";
import { SaveMangaDtoWithId } from "./SaveMangaService";

interface ListDto {
  listName: string;
  userId: string;
}

export interface ListDtoWithId extends ListDto {
  id: string;
  savedMangas: SaveMangaDtoWithId[];
}

const createNewList = async (list: ListDto): Promise<ListDto> => {
  try {
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
    onError: () => console.log("Failed to fetch lists for user with id:", userId),
  });
};

const addMangaToList = async (listId: string, mangaIds: number[]): Promise<void> => {
  try {
    console.log("Adding manga with id:", mangaIds, "to list with id:", listId);
    await axiosInstance.post(`/user/list/add/${listId}`, mangaIds);
  } catch (error) {
    console.error("Failed to add manga to list:", error);
    throw error;
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

const deleteList = async (listId: string): Promise<void> => {
  try {
    console.log("Deleting list with id:", listId);
    await axiosInstance.delete(`/user/list/${listId}`);
  } catch (error) {
    console.error("Failed to delete list:", error);
    throw error;
  }
};

export const useDeleteList = () => {
  return useMutation(deleteList, {
    onError: () => console.log("Failed to delete list"),
  });
};

interface RemoveMangaProps {
  mangaId: number;
  listId: string;
}

const removeMangaFromList = async ({ mangaId, listId }: RemoveMangaProps): Promise<void> => {
  try {
    console.log("removing manga with id " + mangaId + " from list " + listId);
    await axiosInstance.delete(`/user/list/${listId}/${mangaId}`);
  } catch (error) {
    console.error("Failed to delete manga from list", error);
  }
};

export const useRemoveMangaFromList = () => {
  return useMutation(removeMangaFromList, {
    onError: () => console.log("Failed to remove manga from list"),
  });
};
