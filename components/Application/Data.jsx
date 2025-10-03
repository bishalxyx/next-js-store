"use client"
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { itemActions } from '@/store/itemSlice';
export const Data = () => {
    const dispatch=useDispatch();
    const noItem=useSelector(state=>state.item);
    const getmovie=async()=>{
       await fetch('https://api.themoviedb.org/3/discover/movie?api_key=9c9543032d831fbc338e8a565c16266f')
  .then(response => response.json())
  .then(response => dispatch(itemActions.addInitialItem(response.results)))
  .catch(err => console.error(err));
    }
    // console.log(movieList);
    // movieList.map(movie=>console.log(movie.poster_path))
    useEffect(()=>{getmovie();},[])
    // console.log(noItem);
  return (
    <div>
        {}
    </div>
  )
}
