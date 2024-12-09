import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../redux_modules/movieDetailsSlice';
import '../App.css';

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
      
    console.log("Movie details object:", movie);
    console.log("Movie details state:", movieDetails);
    
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <section className="movie-detail">
            <div className="movie-detail_poster">
                <img src={posterUrl} alt={movie.title} />
            </div>
            <h1 className="movie-detail_title">
                {movie.title}<br/>
                <span>{movie.original_title}</span>
            </h1>
            <p className="movie-detail_rating">
                평점: <strong>{movie.vote_average.toFixed(1)}</strong>
            </p>
            <p className="movie-detail_genres">
                <strong>장르:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <div className="movie-detail_overview">
                <h2>줄거리</h2>
                <p>{movie.overview}</p>
            </div>
        </section>


    );
};

export default MovieDetail;
