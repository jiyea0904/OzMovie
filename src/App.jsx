import { useState } from 'react';
import MovieCard from './components/MovieCard';
import movieListData from './data/movieListData.json';
import { Link, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import Layout from './components/Layout';
import './App.css';

const MovieList = () => {
  const [movies, setMovies] = useState(movieListData.results);
  
  return(
    <div className='movielist'>
      {movies.map((movie) => (
        <Link
          to="/details"
          key={movie.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MovieCard title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
        </Link>
      ))}
    </div>
  );
}

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
    
  );
};

export default App;
