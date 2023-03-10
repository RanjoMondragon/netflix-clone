import React, {useState, useEffect} from 'react';
import axios from './axios';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    //make a GET request to API using axios and initializes the movie data to an empty array
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies && movies.length > 0 && 
                    movies.map((movie) => (
                    <img 
                    key={movie.id}
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    //if the movie belongs to a large row then use its backdrop instead of poster
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} 
                        alt={movie.name}

                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Row;