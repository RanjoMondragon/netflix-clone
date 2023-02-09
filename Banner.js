import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests'
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([])

    //runs based on a condition, run once when the banner loads, only on load = []
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchData();
    }, []);

    //if you have too much text on the screen, truncate will replace ending with ellipses ...
    function truncate(str, n) {
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

    return (
        //sets the movie's backdrop as the background image
        
        <header className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        >
        <div className='overlay'/>
        {/* shows the title, buttons and description of featured movie */}
        <div className='banner_contents'>
            <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>

            <div className='banner_buttons'>
                <button className='banner_button play'>Play</button>
                <button className='banner_button info'>More Info</button>
            </div>

            <h1 className='banner_description'>{truncate(movie?.overview,150)}</h1>
        </div>
        {/* aesthetic addition so that banner blends/transitions into the first row  */}
        <div className='banner--fadeBottom' />
        </header>
    )
}

export default Banner