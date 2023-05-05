import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {  
    //state to get movies and trailerUrl data
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //make a GET request to API using axios and initializes the movie data to an empty array
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        //runs again every time fetchUrl is updated
    }, [fetchUrl]);

    //Settings for the video
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }
    //movie trailer will play when you click on the movie
    const handleClick = (movie) => {
        if (trailerUrl) {
            console.log(trailerUrl);
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || "" || movie?.name)
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies && movies.length > 0 && 
                    movies.map((movie) => (
                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    //if the movie belongs to a large row then use its backdrop instead of poster
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} 
                        alt={movie.name}

                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* <YouTube videoId='fE2h3lGlOsk' opts={opts} /> */}
        </div>
    );
}

export default Row;