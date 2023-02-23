import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
// c032e2d7
const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7';

const App = ()=>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async(title)=>{
        // it looks different because it's a template string
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        console.log((data.Search)[0]);
    }

    useEffect(()=>{
        searchMovies('Superman');
    },[]);
    return (
        <div className="app">
            <h1>Movie land</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(event)=>{
                        setSearchTerm(event.target.value);
                    }}
                />
                <img 
                    src={SearchIcon}
                    alt="Search"
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length?(
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ):(
                    <div className="empty">
                        <h2>No movies Found</h2>
                    </div>
                )
            }

        </div>
    );
}
export default App;