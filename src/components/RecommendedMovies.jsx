import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieRecommendations } from '../redux_modules/movieDetailsSlice';
import '../css/detail.css';
import MovieCard from "./MovieCard";

const RecommendedMovies = ({ movieId }) => {
    const dispatch = useDispatch();
    const { recommendations, recommendationsLoading, error } = useSelector((state) => state.movieDetails);

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieRecommendations(movieId));
        }
    }, [dispatch, movieId]);

    if (recommendationsLoading) return <p>Loading recommendations...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="normal_movielist">
            <ul className="movielist">
                {recommendations.length === 0 ? (
                    <p>No recommendations available.</p>
                ) : (
                    recommendations.map((movie) => (
                    <li key={movie.id}>
                    <MovieCard
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        rating={movie.vote_average}
                    />
                    </li>
                ))
            )}
            </ul>
        </div>
    );
};

export default RecommendedMovies;
