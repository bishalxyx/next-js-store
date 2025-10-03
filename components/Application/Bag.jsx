'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import Logo from '@/public/assets/images/empty-cart.jpg'
import { bagActions } from '@/store/bagSlice';
import { itemActions } from '@/store/itemSlice';
import Image from 'next/image';

export const Bag = () => {
    const cartEmpty=true;
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false); // <-- track client mount

    const movie = useSelector(state => state.item);
    const bagItem = useSelector(state => state.bag);

    useEffect(() => {
        setMounted(true); // Only render after client mount
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

    if (!mounted) return null; // avoid SSR-client mismatch

    const finalItem = movie.filter(m => bagItem.includes(m.id));
    const bagEmpty = finalItem.length === 0;

    const handleClick = (id) => dispatch(bagActions.remove(id));

    return (
        <div className="min-h-screen bg-slate-500 dark:bg-gray-900 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Shopping Cart
            </h1>

            {!bagEmpty ? (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {finalItem.map(movie => (
                        <div
                            key={movie.id}
                            className="flex flex-col md:flex-row bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                        >

                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={500}
                                height={750}
                                sizes="(max-width: 768px) 100vw, 48vw"
                                className="w-full h-72 md:h-auto md:w-48 object-cover rounded-t-lg md:rounded-l-lg"
                                priority
                            />



                            <div className="flex flex-col justify-between p-4 flex-1 relative">
                                <button
                                    onClick={() => handleClick(movie.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                                    aria-label="Remove from cart"
                                >
                                    <MdDelete size={24} />
                                </button>

                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
                                    {movie.title}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                                    {movie.overview}
                                </p>
                                <span className="text-emerald-500 font-semibold text-lg mt-4">
                                    Free
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 dark:bg-gray-900">
                    <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
                        {cartEmpty && (
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                                <Image
                                    src={Logo}
                                    alt="Empty Cart"
                                    fill
                                    sizes="(max-width: 768px) 12rem, 16rem"
                                    className="object-contain"
                                    priority // only if this is above the fold
                                />
                            </div>
                        )}



                    </div>
                    <p className="text-lg font-medium text-gray-700 dark:text-white mb-4">
                        Your cart is empty
                    </p>
                    <Link href="/">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                            Keep Shopping
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};
