'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import Shimmer from './Shimmer';
import { bagActions } from '@/store/bagSlice';


export const Home = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const [movieList, setmovieList] = useState([]);
    const bagitem = useSelector(state => state.bag)
  let elementFound = false;
    const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(bagActions.add(id));
    // console.log(elementFound=bagitem.indexOf(id)>=0);
  }
  const handleDelete = (id) => {
    dispatch(bagActions.remove(id));

  }
  // console.log(bagitem);

  const getmovie = async () => {
    try {
      setLoading(true);
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9c9543032d831fbc338e8a565c16266f')
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
  }
  // console.log(movieList);
  // movieList.map(movie=>console.log(movie.poster_path))
  useEffect(() => { getmovie(); }, [])
  return (
    <div className="bg-slate-500 dark:bg-gray-800 p-6 min-h-screen">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
    {loading ? (
      Array.from({ length: 6 }).map((_, i) => (
        <Shimmer key={i} />
      ))
    ) : (
      movieList.map((movie) => (
        <div
          key={movie.id}
          className="w-72 flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
        >
          {/* Poster */}
          <Link href={`/auth/${movie.id}`}>
            <div className="relative w-full h-96 hover:scale-105 transition-transform duration-300">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                fill
                sizes="(max-width: 640px) 100vw, 
           (max-width: 768px) 50vw, 
           (max-width: 1024px) 33vw, 
           25vw"
                className="object-cover rounded-t-2xl"
                priority={true}
              />
              {/* Rating badge */}
              <span className="absolute top-2 left-2 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </Link>

          {/* Content */}
          <div className="flex flex-col flex-grow p-5">
            <Link href={`/auth/${movie.id}`}>
              <h5 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                {movie.original_title}
              </h5>
            </Link>

            <p className="mb-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 line-clamp-3">
              {movie.overview}
            </p>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between">
              <span className="text-emerald-500 text-lg font-semibold">
                Free
              </span>

              {bagitem.includes(movie.id) ? (
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-transform transform hover:-translate-y-1"
                  onClick={() => handleDelete(movie.id)}
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-transform transform hover:-translate-y-1"
                  onClick={() => handleClick(movie.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>


  )
}

