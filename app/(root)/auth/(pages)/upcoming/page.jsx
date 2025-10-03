'use client'
import Header from '@/components/Application/Header';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/Application/LoadingSpinner';
import React, { useEffect, useState } from 'react';
import Shimmer from '@/components/Application/Shimmer';
import ShimmerMoviePage from '@/components/Application/ShimmerMoviePage';

const Upcoming = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=9c9543032d831fbc338e8a565c16266f'
      );
      const data = await response.json();
      setMovieList(data.results || []);
    } catch (err) {
      console.error(err);
    }
     finally {
      setLoading(false); 
    }
    };

  useEffect(() => {
    getMovies();
  }, []);
// if (loading) return <ShimmerMoviePage />;
  return (
    <>
      {/* <Header/> */}
      <div className="bg-slate-500 dark:bg-gray-800 min-h-screen py-6 px-4">
  {loading ? (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Shimmer key={i} />
      ))}
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
      {movieList.map((movie) => (
        <div
          key={movie.id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
        >
          <Link href={`/auth/${movie.id}`} className="relative w-full h-80 sm:h-96">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
          </Link>

          <div className="p-5 flex flex-col flex-grow justify-between">
            <Link href={`/auth/${movie.id}`}>
              <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                {movie.original_title}
              </h5>
            </Link>
            <p className="text-gray-700 dark:text-gray-400 mt-2 line-clamp-4 text-sm sm:text-base">
              {movie.overview}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-emerald-500 font-semibold text-lg">Free</span>
              {/* <span className="text-gray-500 dark:text-gray-300 text-sm">
                Rating: {movie.vote_average}
              </span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
};

export default Upcoming;
