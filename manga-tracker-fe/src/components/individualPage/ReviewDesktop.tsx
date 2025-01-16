import { useEffect, useState } from "react";
import { useFetchReviews } from "../../services/ReviewService";
import { ReviewDto } from "../../types/mangaTypes";
import ReviewModalDesktop from "../modals/ReviewModalDesktop";
import ReviewThreadModal from "../modals/ReviewThreadModal";

interface Props {
  userid: string;
  mangaid: string;
}

const ReviewDesktop = ({ mangaid, userid }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [currentReview, setCurrentReview] = useState<ReviewDto | null>(null);
  const [showThread, setShowThread] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);

  const handleShowThread = (review: ReviewDto) => {
    setCurrentReview(review);
    setShowThread(!showThread);
  };

  const neededAttributes = {
    userid,
    mangaId: parseInt(mangaid),
    setShowModal,
  };

  const { reviews, isLoading, refetch, isError } = useFetchReviews(mangaid);

  useEffect(() => {
    if (hasCommented) {
      refetch().then(() => {
        const updatedReview = reviews?.find(
          (review) => review.reviewId === currentReview?.reviewId
        );
        if (updatedReview) {
          setCurrentReview(updatedReview);
        }
      });
      setHasCommented(false);
    }
  }, [hasCommented, reviews, currentReview?.reviewId, refetch]);

  const truncateLongReview = (review: string) => {
    if (review.length > 200) {
      return review.substring(0, 200) + "...";
    }
    return review;
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="w-2/3 md:w-3/5 sm:w-1/2 mx-auto border-b-2 border-x-2 rounded-md border-gray-300">
        <div className="w-full p-3 px-6 pr-5 flex justify-between items-center border-b border-t border-gray-300">
          <h1 className="text-black font-bold text-xl">Review forum</h1>
          <button
            onClick={handleModal}
            className="font-semibold w-44 rounded-md shadow-md p-2 text-white bg-purple-600 cursor-pointer hover:bg-purple-700"
          >
            Write a Review
          </button>
        </div>
        {isLoading && (
          <div className="w-full h-96 flex justify-center items-center">
            <p className="text-black font-semibold">Loading...</p>
          </div>
        )}
        {isError && (
          <div className="w-full h-96 flex justify-center items-center">
            <p className="text-black font-semibold">Error fetching reviews</p>
          </div>
        )}
        {reviews && reviews.length === 0 && (
          <div className="w-full h-96 flex justify-center items-center">
            <p className="text-black font-semibold">No reviews available</p>
          </div>
        )}
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review: ReviewDto) => (
            <div className="w-full mt-2 border-b-2 border-gray-300">
              <div className="relative w-full p-3">
                <div className="w-full flex space-x-6 ml-3 items-center">
                  <p className="text-black font-semibold">
                    Rating: {review.rating}/10
                  </p>
                  <p className="absolute right-6 text-purple-600 hover:text-purple-700 font-semibold">
                    {review.comments.length} comments
                  </p>
                </div>
                <p className="px-3 pt-3 text-purple-900 font-semibold">
                  {review.username}
                </p>
                <div className="w-full px-3  mt-2 max-h-32 ">
                  "{truncateLongReview(review.reviewText)}"
                </div>
                <p
                  className="w-full text-end pr-3 text-purple-600 font-semibold cursor-pointer hover:text-purple-700"
                  onClick={() => handleShowThread(review)}
                >
                  See thread
                </p>
              </div>
              {showThread && currentReview && (
                <div className="fixed inset-0 w-full h-full px-5 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                  <ReviewThreadModal
                    review={currentReview}
                    setShowThread={setShowThread}
                    setHasCommented={setHasCommented}
                  />
                </div>
              )}
            </div>
          ))}
        {showModal && (
          <div className="fixed inset-0 w-full h-full px-5 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <ReviewModalDesktop neededAttributes={neededAttributes} />
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewDesktop;
