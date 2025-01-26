import { useQuery, useMutation } from "react-query";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { ReviewDto, AddReviewDto } from "../types/mangaTypes";
import { AddCommentDto } from "../types/mangaTypes";

const fetchReviews = async (mangaId: string) => {
  try {
    const response = await axiosInstance.get(`/reviews/manga/${mangaId}`);
    return response.data as ReviewDto[];
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

export const useFetchReviews = (mangaId: string) => {
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useQuery(["reviews", mangaId], () => fetchReviews(mangaId), {
    retry: false,
    enabled: !!mangaId,
    onError: () => console.log("Failed to fetch reviews for manga with id:", mangaId),
  });

  return { reviews, isLoading, isError, refetch };
};

const addReview = async (review: AddReviewDto) => {
  try {
    const response = await axiosInstance.post("/reviews", review);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error adding review:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || `Error adding review: ${error.message}`);
    } else if (error instanceof Error) {
      console.error("Error adding review:", error.message);
      throw new Error(`Error adding review: ${error.message}`);
    } else {
      console.error("Unknown error adding review:", error);
      throw new Error("An unknown error occurred while adding the review.");
    }
  }
};

export const useAddReview = () => {
  return useMutation(addReview);
};

const addComment = async (comment: AddCommentDto) => {
  try {
    const response = await axiosInstance.post("/review/comment", comment);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error adding comment:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || `Error adding comment: ${error.message}`);
    } else if (error instanceof Error) {
      console.error("Error adding comment:", error.message);
      throw new Error(`Error adding comment: ${error.message}`);
    } else {
      console.error("Unknown error adding comment:", error);
      throw new Error("An unknown error occurred while adding the comment.");
    }
  }
};

export const useAddComment = () => {
  return useMutation(addComment);
};

const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/review/comment/${commentId}`);
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

export const useDeleteComment = () => {
  return useMutation(deleteComment, {
    onError: () => console.log("Failed to delete list"),
  });
};
