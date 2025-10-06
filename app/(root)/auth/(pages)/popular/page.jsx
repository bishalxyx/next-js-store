'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Shimmer from '@/components/Application/Shimmer';

const Popular = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=9c9543032d831fbc338e8a565c16266f'
      );
      const data = await res.json();
      setMovieList(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-gray-900 to-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-indigo-400 drop-shadow-lg">
          🎬 Popular Movies
        </h1>

        {/* Loading Shimmer */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Shimmer key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg hover:shadow-indigo-600/50 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Movie Poster */}
                <Link
                  href={`/auth/${movie.id}`}
                  className="relative w-full h-80 sm:h-96 group"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                </Link>

                {/* Movie Details */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <Link href={`/auth/${movie.id}`}>
                    <h5 className="text-lg sm:text-xl font-semibold text-white line-clamp-2 hover:text-indigo-400 transition-colors duration-200">
                      {movie.original_title}
                    </h5>
                  </Link>
                  <p className="text-gray-300 mt-2 line-clamp-4 text-sm sm:text-base">
                    {movie.overview}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-emerald-400 font-semibold text-lg">
                      Free
                    </span>
                    <span className="text-gray-400 text-sm">
                      {movie.release_date?.slice(0, 4)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popular;
