'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import Shimmer from './Shimmer';
import { bagActions } from '@/store/bagSlice';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movieList, setmovieList] = useState([]);
  const bagitem = useSelector((state) => state.bag);
  const dispatch = useDispatch();

  const handleClick = (id) => dispatch(bagActions.add(id));
  const handleDelete = (id) => dispatch(bagActions.remove(id));

  const getmovie = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=9c9543032d831fbc338e8a565c16266f'
      );
      const data = await response.json();
      setmovieList(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getmovie(); }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-lg">
        🎬 Explore Trending Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Shimmer key={i} />)
          : movieList.map((movie) => (
              <div
                key={movie.id}
                className="w-72 flex flex-col bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                {/* Poster */}
                <Link href={`/auth/${movie.id}`}>
                  <div className="relative w-full h-96 group">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                      fill
                      sizes="(max-width: 640px) 100vw, 
               (max-width: 768px) 50vw, 
               (max-width: 1024px) 33vw, 
               25vw"
                      className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-grow p-5">
                  <Link href={`/auth/${movie.id}`}>
                    <h5 className="mb-2 text-xl font-bold text-white hover:text-pink-400 transition-colors line-clamp-2">
                      {movie.original_title}
                    </h5>
                  </Link>

                  <p className="mb-4 text-sm text-gray-300 line-clamp-3">
                    {movie.overview}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-green-400 text-lg font-semibold">
                      Free
                    </span>

                    {bagitem.includes(movie.id) ? (
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="text-white bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 hover:scale-105 focus:ring-4 focus:ring-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClick(movie.id)}
                        className="text-white bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:scale-105 focus:ring-4 focus:ring-green-400/50 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
