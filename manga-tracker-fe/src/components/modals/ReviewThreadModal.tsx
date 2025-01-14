import { useEffect, useState } from "react";
import { CommentDto, ReviewDto } from "../../types/mangaTypes";
import { useAddComment } from "../../services/ReviewService";
import { useAuthContext } from "../../provider/AuthProvider";

interface ReviewThreadModalProps {
  review: ReviewDto;
  setShowThread: React.Dispatch<React.SetStateAction<boolean>>;
  setHasCommented: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewThreadModal({
  review,
  setShowThread,
  setHasCommented,
}: ReviewThreadModalProps) {
  const { dbUser } = useAuthContext();
  const { mutate } = useAddComment();
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    setComments(
      [...review.comments].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  }, [review.comments]);

  const handleAddComment = (comment: string) => {
    if (!comment.trim()) return;
    mutate(
      {
        reviewId: review.reviewId,
        userId: dbUser ? dbUser.id : "",
        commentText: comment,
      },
      {
        onSuccess: (newComment: CommentDto) => {
          // Update comments state with the new comment and re-sort
          setComments((prev) =>
            [...prev, newComment].sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
          );
          setShowThread(false);
          setHasCommented(true);
          setComment(""); // Clear input
        },
      }
    );
  };

  const handleTimeText = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  };

  return (
    <div className="relative w-full min-h-[400px] max-w-[800px] flex flex-col bg-white p-4 rounded-lg shadow-lg">
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-purple-700 p-2">
            {review?.username}
          </h2>
          <h3 className="text-xl font-semibold p-2">
            Rating: {review.rating}/10
          </h3>
          <span className="text-md font-semibold p-3">
            {handleTimeText(review.createdAt)}
          </span>
        </div>
        <div className="mb-2 p-2 border-gray-300 rounded-md w-full min-h-20">
          <p className="text-lg italic">
            <span className="font-semibold">Review: </span>
            {review?.reviewText}
          </p>
        </div>
      </div>
      <div className="overflow-y-scroll max-h-60">
        {comments &&
          comments.map((comment) => (
            <div className="pl-4">
              <p className="font-semibold">{comment.username}</p>
              <h3 className="text-md">{comment.commentText}</h3>
            </div>
          ))}
      </div>
      <div className="w-full px-2 mt-4">
        <div className="w-full flex flex-col pb-3">
          <textarea
            value={comment}
            placeholder="Write your comment..."
            className="border-2 border-gray-300 w-full rounded-md my-2 p-2 h-18 text-left align-top "
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white p-2 rounded-md shadow-md"
            onClick={() => handleAddComment(comment)}
          >
            Submit
          </button>
        </div>
        <span
          onClick={() => setShowThread(false)}
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          Close
        </span>
      </div>
    </div>
  );
}
