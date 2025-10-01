'use client'
import Header from '@/components/Application/Header';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
 const Upcoming = () => {
  const [movieList,setmovieList]=useState([]);
  const getmovie=()=>{
      fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=9c9543032d831fbc338e8a565c16266f')
.then(response => response.json())
.then(response => setmovieList(response.results))
.catch(err => console.error(err));
  }
  console.log(movieList);
  movieList.map(movie=>console.log(movie.poster_path))
  useEffect(()=>getmovie(),[])
  return (
    <>
      {/* <Header/> */}
      <div className="bg-slate-500 flex flex-wrap justify-center dark:bg-gray-800 p-4">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="max-w-sm w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 flex flex-col"
          >
            <Link href={`/auth/${movie.id}`} className="block relative w-full h-96">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                fill
                className="rounded-t-lg object-cover"
                priority={true}
              />
            </Link>
            <div className="p-5 flex flex-col flex-grow">
              <Link href={`/auth/${movie.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                  {movie.original_title}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
  
}
export default Upcoming;
