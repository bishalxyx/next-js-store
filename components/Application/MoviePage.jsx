'use client'
import React, { useEffect, useState } from 'react'
import ShimmerMoviePage from './ShimmerMoviePage';

export const Moviepage = ({id}) => {
    const [loading,setLoading]=useState(true);
    const [movieList, setmovieList] = useState([]);
    // console.log(movieId)
    const getmovie = async() => {
        try{
     
        
        await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9c9543032d831fbc338e8a565c16266f`)
            .then(response => response.json())
            .then(response => setmovieList(response))
            .catch(err => console.error(err));
    }
    catch (err) {
      console.error(err);
    }
     finally {
      setLoading(false); 
    }
}
    useEffect(() => {getmovie();}, [id])
    // console.log(movieList);
    if (loading) return <ShimmerMoviePage />;
    // const gen = movieList.genres;
    return (
        <div>
           <section className="bg-slate-500 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 p-6 dark:bg-gray-800">
  {/* Poster Image */}
  <div className="w-full md:w-1/3 lg:w-1/4">
    <img
      src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`}
      alt={movieList.original_title}
      className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
    />
  </div>

  {/* Content */}
  <div className="max-w-2xl text-gray-700 text-lg dark:text-white w-full md:w-2/3">
    {/* Title */}
    <h1 className="text-3xl md:text-4xl font-bold my-3 text-black dark:text-white">
      {movieList.original_title}
    </h1>

    {/* Overview */}
    <p className="my-4 text-black dark:text-gray-300 leading-relaxed">
      {movieList.overview}
    </p>

    {/* Genres (uncomment when needed) */}
    <p className="my-7 flex flex-wrap gap-2">
      {/* {gen.map((genre) => (
        <span
          className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2 text-sm"
          key={genre.id}
        >
          {genre.name}
        </span>
      ))} */}
    </p>

    {/* Rating */}
    <div className="flex items-center mb-4">
      <svg
        className="w-5 h-5 text-yellow-400 mr-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <p className="text-black dark:text-white font-semibold">
        {movieList.vote_average}
      </p>
      <span className="mx-2 w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {movieList.vote_count} reviews
      </span>
    </div>

    {/* Runtime */}
    <p className="my-2">
      <span className="font-bold text-black dark:text-white mr-2">Runtime:</span>
      <span className="text-black dark:text-gray-300">{movieList.runtime} min</span>
    </p>

    {/* Budget */}
    <p className="my-2">
      <span className="font-bold text-black dark:text-white mr-2">Budget:</span>
      <span className="text-black dark:text-gray-300">${movieList.budget}</span>
    </p>

    {/* Revenue */}
    <p className="my-2">
      <span className="font-bold text-black dark:text-white mr-2">Revenue:</span>
      <span className="text-black dark:text-gray-300">${movieList.revenue}</span>
    </p>

    {/* Release Date */}
    <p className="my-2">
      <span className="font-bold text-black dark:text-white mr-2">
        Release Date:
      </span>
      <span className="text-black dark:text-gray-300">{movieList.release_date}</span>
    </p>
  </div>
</section>

        </div>
    )
}
