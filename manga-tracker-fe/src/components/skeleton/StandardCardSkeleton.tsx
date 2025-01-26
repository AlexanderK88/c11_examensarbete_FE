export default function StandardCardSkeleton() {
  return (
    <div className="mx-auto max-w-[215px] mt-8">
      <div className="rounded-lg shadow-md bg-gray-200 animate-pulse">
        <div className="w-[215px] h-[322px] bg-gray-300 rounded-lg"></div>
      </div>
      <div className="mt-2">
        <div className="h-6 bg-gray-300 rounded w-3/4 ml-2"></div>
      </div>
    </div>
  );
}
