// components/Application/ShimmerCard.js

export default function Shimmer() {
  return (
    <div className="max-w-sm w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 flex flex-col animate-pulse">
      {/* Image Placeholder */}
      <div className="h-96 w-full bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
      
      {/* Text Placeholder */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}
