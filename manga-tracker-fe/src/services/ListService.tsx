import axiosInstance from "./axiosInstance";
import axios from "axios";
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
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Creation failed: ${error.message}`);
    } else {
      throw new Error("Craetion failed: Unknown error occurred");
    }
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
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || `Failed with status ${error.response?.status}`
      );
    } else if (error instanceof Error) {
      throw new Error(`Add failed: ${error.message}`);
    } else {
      throw new Error("Add failed: Unknown error occurred");
    }
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

export const useRemoveMangaFromList = () => {
  return useMutation(removeMangaFromList, {
    onError: () => console.log("Failed to remove manga from list"),
  });
};
