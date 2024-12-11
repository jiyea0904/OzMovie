import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../redux_modules/movieDetailsSlice';
import '../css/detail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { movieDetails, loading, error } = useSelector((state) => state.movieDetails);
  
    useEffect(() => {
        dispatch(fetchMovieDetails(id));
    }, [dispatch, id]);
    
    const movie = movieDetails[id];

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p>Loading movie details...</p>;
    
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const bgUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

    return (
        <section className="movie-detail_wrap">
            <div className="movie-bg" 
            style={{background: `url(${bgUrl})`}}></div>
            <div className="movie-detail_cont">
                <div className="movie-detail_poster">
                    <img src={posterUrl} alt={movie.title} />
                </div>
                <h1 className="movie-detail_title">
                    {movie.title}
                    {movie.title !== movie.original_title && (
                        <span>{movie.original_title}</span>
                    )}

                </h1>
                <div className="movie-detail_overview">
                    {movie.overview}
                </div>
                
                <p className="movie-detail_genres">
                    <strong>장르</strong> {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <div className="movie-detail_uigroup">
                    <p className="movie-detail_rating">
                        평점
                        <strong>{movie.vote_average.toFixed(1)}</strong>
                    </p>
                    <p className="movie-detail_runtime">
                        러닝타임
                        <strong>{movie.runtime}min</strong>
                    </p>
                    <p className="movie-detail_releasedate">
                        개봉일
                    <strong>{movie.release_date}</strong>
                    </p>
                </div>
            </div>
        </section>

    );
};

export default MovieDetail;
