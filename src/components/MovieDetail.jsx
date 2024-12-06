import { useState } from "react";
import movieDetailData from "../data/movieDetailData.json";
import '../App.css';

const MovieDetail = () => {
  const [movie, setMovie] = useState(movieDetailData);
  const backdropUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <section className="movie-detail">
        <div className="movie-detail_poster">
            <img src={backdropUrl} alt={movie.title} />
        </div>
        <h1 className="movie-detail_title">{movie.title}</h1>
        <p className="movie-detail_rating">
            평점
            <strong>{movie.vote_average.toFixed(1)}</strong>
        </p>
        <p className="movie-detail_genres">
            <strong>장르</strong>
            {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <div className="movie-detail_overview">
            <h2>줄거리</h2> 
            <p>{movie.overview}</p>
        </div>
    </section>
  );
};

export default MovieDetail;
