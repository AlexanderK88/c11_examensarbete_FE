import axiosInstance from "./axiosInstance";
import { DbUser } from "../types/userType";
import { useQuery } from "react-query";

const fetchDbUser = async (oAuthId: string): Promise<DbUser | null> => {
  try {
    console.log("Fetching DB user data for oAuthId:", oAuthId);
    const response = await axiosInstance.get(`/user/data/${oAuthId}`)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch DB user data:", error);
    return null;
  }
};

export const useFetchDbUser = (oAuthId: string) => {
  const {
    data: dbUser,
    isLoading,
    isError,
    refetch,
  } = useQuery(["dbUser", oAuthId], () => fetchDbUser(oAuthId), {
    retry: false,
    enabled: !!oAuthId,
    onError: () => console.log("Failed to fetch user data from the database with oAuthId:", oAuthId),
  });

  return { dbUser: dbUser ?? null, isLoading, isError, refetch };
};
