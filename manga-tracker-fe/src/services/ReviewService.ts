import { useQuery, useMutation } from "react-query";
import axiosInstance from "./axiosInstance";
import { ReviewDto, AddReviewDto
 } from "../types/mangaTypes";


const fetchReviews = async (mangaId: string) => {
  try {
    console.log("Fetching reviews for mangaId:", mangaId);
    const response = await axiosInstance.get(`/reviews/manga/${mangaId}`);
    return response.data as ReviewDto[];
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return null;
  }
}

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
            console.log("Adding review:", review);
            const response = await axiosInstance.post("/reviews", review);
            return response.data;
        } catch (error) {
            console.error("Failed to add review:", error);
            return null;
        }
    }

    export const useAddReview = () => {
        return useMutation(addReview);
    }