import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAddReview } from "../../services/ReviewService";

interface Props {
  neededAttributes: {
    userid: string;
    mangaId: number;
    setShowMobileModal: (value: boolean) => void;
  };
}

export default function ReviewModalMobile({ neededAttributes }: Props) {
  const [value, setValue] = useState<number>(1);
  const [spoiler, setSpoiler] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>("");
  const { mutate, isSuccess } = useAddReview();
  const { userid, mangaId, setShowMobileModal } = neededAttributes;

  const handleAddReview = () => {
    if (!reviewText) {
      alert("Please write a review");
      return;
    }
    mutate({
      userId: Number(userid),
      mangaId: mangaId,
      rating: value,
      spoiler: spoiler,
      reviewText: reviewText,
    });
    setShowMobileModal(false);
  };

  const handleValueChangeUp = () => {
    if (value < 10) {
      setValue(value + 1);
    }
  };
  const handleValueChangeDown = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleSpoilerChange = (value: boolean) => {
    setSpoiler(value);
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };
  return (
    <>
      <div className="relative w-[400px] p-6 bg-[#121212] rounded-lg shadow-lg">
        <div
          className="absolute right-5 top-5 text-2xl cursor-pointer text-white"
          onClick={() => setShowMobileModal(false)}
        >
          <IoMdClose />
        </div>
        <div className="w-full">
          <h2 className="text-white text-xl font-semibold">Review</h2>
          <textarea
            placeholder=" Write your review..."
            className="mt-3 h-36 border-2 w-full rounded-sm p-2 bg-black border-zinc-800 text-white"
            onChange={handleReviewTextChange}
          />
          <div className="w-full flex mt-4 justify-between items-center">
            <h2 className="text-white text-xl font-semibold mr-4">Rate the series 1-10</h2>
            <div className="flex gap-2">
              <button
                className="w-10 h-10 rounded-md border-2 border-zinc-800 flex justify-center items-center"
                onClick={handleValueChangeDown}
              >
                <p className="text-center text-xl font-bold text-white">-</p>
              </button>
              <div className="w-10 h-10 rounded-md border-2 border-zinc-800 flex justify-center items-center">
                <p className="text-center text-xl font-bold text-white">{value}</p>
              </div>
              <button
                className="w-10 h-10 rounded-md border-2 border-zinc-800 flex justify-center items-center"
                onClick={handleValueChangeUp}
              >
                <p className="text-center text-xl font-bold text-white shadow-sm">+</p>
              </button>
            </div>
          </div>
          <div className="mt-2 flex">
            <p className="font-semibold">Spoiler? </p>
            <div className="ml-4 flex items-center gap-1">
              <p className="text-white">Yes</p>
              <button
                className={`border-2 border-zinc-800 p-2 w-4 h-4 rounded-md cursor-pointer ${
                  spoiler && "bg-purple-600"
                }`}
                onClick={() => handleSpoilerChange(true)}
              ></button>
              <p className="ml-2 text-white">No</p>
              <button
                className={`border-2 border-zinc-800 p-2 w-4 h-4 rounded-md cursor-pointer ${
                  !spoiler && "bg-purple-600"
                }`}
                onClick={() => handleSpoilerChange(false)}
              ></button>
            </div>
          </div>
        </div>
        <button
          onClick={handleAddReview}
          className="mt-4 abosolute bottom-2 right-2 w-full px-3 py-2 rounded-md bg-purple-600 text-white"
        >
          Send Review
        </button>
      </div>
    </>
  );
}
