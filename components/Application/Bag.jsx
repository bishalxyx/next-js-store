'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import Logo from '@/public/assets/images/empty-cart.jpg';
import { bagActions } from '@/store/bagSlice';
import { itemActions } from '@/store/itemSlice';
import Image from 'next/image';

export const Bag = () => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const movie = useSelector(state => state.item);
  const bagItem = useSelector(state => state.bag);

  useEffect(() => {
    setMounted(true);
    const getMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=9c9543032d831fbc338e8a565c16266f'
        );
        const data = await response.json();
        dispatch(itemActions.addInitialItem(data.results));
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, [dispatch]);

  if (!mounted) return null;

  const finalItem = movie.filter(m => bagItem.includes(m.id));
  const bagEmpty = finalItem.length === 0;

  const handleClick = (id) => dispatch(bagActions.remove(id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-gray-900 to-black p-6 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-indigo-400 text-center">
        Shopping Cart
      </h1>

      {!bagEmpty ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {finalItem.map(movie => (
            <div
              key={movie.id}
              className="flex flex-col md:flex-row bg-gray-800/40 backdrop-blur-md border border-indigo-700/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-full md:w-48 h-72 md:h-auto">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-t-2xl md:rounded-l-2xl transform hover:scale-105 transition duration-500"
                  priority
                />
              </div>

              <div className="flex flex-col justify-between p-6 flex-1 relative">
                <button
                  onClick={() => handleClick(movie.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                  aria-label="Remove from cart"
                >
                  <MdDelete size={28} />
                </button>

                <h2 className="text-2xl md:text-3xl font-bold text-indigo-200 line-clamp-2">
                  {movie.title}
                </h2>
                <p className="text-gray-300 mt-2 line-clamp-4">
                  {movie.overview}
                </p>
                <span className="text-emerald-400 font-semibold text-lg mt-4">
                  Free
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className="w-48 h-48 md:w-60 md:h-60 bg-gray-700/40 rounded-2xl flex items-center justify-center shadow-lg">
            <Image
              src={Logo}
              alt="Empty Cart"
              
              className="object-contain"
              priority
            />
          </div>
          <p className="text-2xl text-gray-300 font-medium">Your cart is empty</p>
          <Link href="/">
            <button className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300">
              Keep Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
