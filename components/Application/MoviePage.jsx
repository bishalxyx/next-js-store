'use client';
import React, { useEffect, useState } from 'react';
import ShimmerMoviePage from './ShimmerMoviePage';

export const Moviepage = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [movieList, setmovieList] = useState([]);

  const getmovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9c9543032d831fbc338e8a565c16266f`
      );
      const data = await response.json();
      setmovieList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getmovie();
  }, [id]);

  if (loading) return <ShimmerMoviePage />;

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-900 via-gray-900 to-black text-white flex flex-col md:flex-row items-center md:items-start justify-center gap-10 px-6 py-10">
      {/* Poster Image */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`}
          alt={movieList.original_title}
          className="w-full max-w-sm rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out border border-indigo-700/50"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-2/3 bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-700">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 mb-4">
          {movieList.original_title}
        </h1>

        {/* Overview */}
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          {movieList.overview}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-5">
          <svg
            className="w-6 h-6 text-yellow-400 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="text-white font-semibold text-lg">
            {movieList.vote_average?.toFixed(1)}
          </p>
          <span className="mx-2 w-1 h-1 bg-gray-500 rounded-full"></span>
          <span className="text-gray-400 text-sm">
            {movieList.vote_count} reviews
          </span>
        </div>

        {/* Additional Details */}
        <div className="space-y-3 text-base">
          <p>
            <span className="font-semibold text-indigo-300">Runtime:</span>{' '}
            <span className="text-gray-300">{movieList.runtime} min</span>
          </p>
          <p>
            <span className="font-semibold text-indigo-300">Budget:</span>{' '}
            <span className="text-gray-300">
              ${movieList.budget?.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-semibold text-indigo-300">Revenue:</span>{' '}
            <span className="text-gray-300">
              ${movieList.revenue?.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-semibold text-indigo-300">Release Date:</span>{' '}
            <span className="text-gray-300">{movieList.release_date}</span>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-pink-500/40 transform hover:-translate-y-1 transition-all duration-300">
            Watch Trailer
          </button>
        </div>
      </div>
    </section>
  );
};
