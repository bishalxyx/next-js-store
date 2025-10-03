// components/Application/MovieDetailsShimmer.js
export default function ShimmerMoviePage() {
  return (
    <section className="bg-slate-500 flex flex-wrap justify-around dark:bg-gray-800 p-6 animate-pulse">
      {/* Left Poster Placeholder */}
      <div className="w-80 h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

      {/* Right Content Placeholder */}
      <div className="max-w-2xl w-full mt-6 md:mt-0 md:ml-8">
        {/* Title */}
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>

        {/* Overview */}
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Runtime */}
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

        {/* Budget */}
        <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

        {/* Revenue */}
        <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

        {/* Release Date */}
        <div className="h-4 w-44 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      </div>
    </section>
  );
}
