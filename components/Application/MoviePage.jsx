'use client'
import React, { useEffect, useState } from 'react'

export const Moviepage = ({id}) => {
    const [movieList, setmovieList] = useState([]);
    // console.log(movieId)
    const getmovie = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9c9543032d831fbc338e8a565c16266f`)
            .then(response => response.json())
            .then(response => setmovieList(response))
            .catch(err => console.error(err));
    }
    useEffect(() => getmovie(), [id])
    console.log(movieList);
    const gen = movieList.genres;
    return (
        <div>
            <section className='bg-slate-500 flex flex-wrap justify-around dark:bg-gray-800 '>
                <div><img src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`} alt="" /></div>
                <div className='max-w-2xl text-gray-700 text-lg dark:text-white'>
                    <h1 className='text-4xl font-bold my-3 text-black'>{movieList.original_title}</h1>
                    <p className='my-4 text-black'>{movieList.overview}</p>
                    <p className='my-7 flex flex-wrap gap-2'>

                        {/* {gen.map((genre)=>(
                            <span className='mr-2 border border-gray-200 rounded dark:border-gray-600 p-2' key={genre.id}>{genre.name}</span>
                        ))} */}
                    </p>


                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="text-black ms-2 text-sm font-bold  dark:text-white">{movieList.vote_average}</p>
                        <span className="text-black w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <span  className="text-black text-sm font-medium   hover:no-underline dark:text-white">{movieList.vote_count} reviews</span>
                    </div>
                    <p className='my-4'>
                        <span className='text-black mr-2 font-bold'>Runtime</span>
                        <span className='text-black'>{movieList.runtime} min</span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold text-black'>Budget</span>
                        <span className='text-black'>${movieList.budget} </span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold text-black'>Revenue</span>
                        <span className='text-black'>${movieList.revenue} </span>
                    </p>
                    <p className='my-4'>
                        <span className='mr-2 font-bold text-black'>Release Date</span>
                        <span className='text-black'>{movieList.release_date} </span>
                    </p>

                </div>
            </section>
        </div>
    )
}
