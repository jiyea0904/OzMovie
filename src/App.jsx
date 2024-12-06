import { useState } from 'react';
import MovieCard from './components/MovieCard';
import movieListData from './data/movieListData.json';
import { Link, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import Layout from './components/Layout';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css"; // Core styles
import "swiper/css/navigation"; // Navigation styles



const MovieList = () => {
  const [movies] = useState(movieListData.results);
  
  return(
    <div className='movielist'>
      <Swiper 
        modules={[Navigation]}
        spaceBetween={60}
        slidesPerView="auto"
        navigation>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} style={{width: '230px'}}>
            <Link
              to="/details"
              key={movie.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MovieCard title={movie.title} poster={movie.poster_path} rating={movie.vote_average} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
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
