import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../redux_modules/popularMoviesSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import '../App.css';
import "swiper/css"; // Core styles
import "swiper/css/navigation"; // Navigation styles

const MovieList = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state.popularMovies);
  
    useEffect(() => {
        dispatch(fetchPopularMovies()); // 인기 영화 데이터 가져오기
    }, [dispatch]);

    
    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className='movielist'>
            <Swiper
                modules={[Navigation]} // Navigation 모듈 추가
                spaceBetween={60}
                slidesPerView="auto"
                navigation // 네비게이션 활성화
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id} style={{ width: '230px' }}>
                        <MovieCard
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            rating={movie.vote_average}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MovieList;
