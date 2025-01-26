import React from "react";

const ImageCardSkeleton: React.FC = () => {
  return (
    <div className="p-2">
      <div
        className="w-[215px] h-[322px] bg-gray-200 rounded-lg shadow-lg animate-pulse"
        role="status"
        aria-label="Loading..."
      ></div>
    </div>
  );
};

export default ImageCardSkeleton;
