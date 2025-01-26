import axiosInstance from "./axiosInstance";
import { DbUser } from "../types/userType";
import { useQuery, useMutation } from "react-query";

const fetchDbUser = async (oAuthId: string): Promise<DbUser | null> => {
  try {
    console.log("Fetching DB user data for oAuthId:", oAuthId);
    const response = await axiosInstance.get(`/user/data/${oAuthId}`);
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
    onError: () =>
      console.log(
        "Failed to fetch user data from the database with oAuthId:",
        oAuthId
      ),
  });

  return { dbUser: dbUser ?? null, isLoading, isError, refetch };
};

const fetchAllUsers = async (): Promise<DbUser[] | null> => {
  try {
    console.log("Fetching all users");
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all users:", error);
    return null;
  }
};

export const useFetchAllUsers = () => {
  const {
    data: allUsers,
    isLoading,
    isError,
    refetch,
  } = useQuery("allUsers", fetchAllUsers, {
    retry: false,
    onError: () => console.log("Failed to fetch all users"),
  });

  return { allUsers: allUsers ?? null, isLoading, isError, refetch };
};

export interface UpdateMissingUserInfoDto {
  username: string;
  email: string;
}

const updateMissingUserInfo = async ({
  username,
  email,
}: UpdateMissingUserInfoDto): Promise<boolean> => {
  try {
    const response = await axiosInstance.patch(`/user/add-info`, {
      username,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update missing user info:", error);
    return false;
  }
};

export const useUpdateMissingUserInfo = () => {
  return useMutation(updateMissingUserInfo);
};
