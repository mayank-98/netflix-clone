import React, { useEffect, useState } from 'react';
import './Row.css'
import axios from "./axios"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"



function Row({title, fetchURL, isLargeRow=false}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const base_url = "https://image.tmdb.org/t/p/original/";
    useEffect(() =>{
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl('');
        } else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
    }

    console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    ((isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)) && (
                        <img className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                        key={movie.id}
                        onClick = {() => handleClick(movie)}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} alt={movie.name}/>
                    )
                ))}
            </div>

            {trailerUrl && <Youtube videoId = {trailerUrl} opts = {opts} />}
            
        </div>
    );
}

export default Row;