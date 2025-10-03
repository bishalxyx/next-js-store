'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Shimmer from '@/components/Application/Shimmer';
// import Header from '@/components/Application/Header';
// import Header from '@/components/Application/Header';

const Popular = () => {

  const [movieList,setmovieList]=useState([]);
  const [loading, setLoading] = useState(true);
  const getmovie=async () => {
    try {
      setLoading(true);
      fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=9c9543032d831fbc338e8a565c16266f')
.then(response => response.json())
.then(response => setmovieList(response.results))
.catch(err => console.error(err));
  }
  catch (err) {
      console.error(err);
    }
     finally {
      setLoading(false); 
    }
};
  // console.log(movieList);
  // movieList.map(movie=>console.log(movie.poster_path))
  useEffect(()=>{getmovie();},[])
  return (
    <>
      {/* <Header/> */}
      <div className="bg-slate-500 dark:bg-gray-800 py-6 px-4 min-h-screen">
  {loading ? (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Shimmer key={i} />
      ))}
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  )
  
}
export default Popular
