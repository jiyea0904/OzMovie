import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../redux_modules/searchSlice";
import MovieCard from "../components/MovieCard";
import "../css/main.css";

const SearchPage = () => {
  const { query } = useParams();
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies(query));
    }
  }, [query, dispatch]);

  return (
    <div className="normal_movielist">
      {status === "loading" && <p>Loading...</p>}
      <ul className="movielist">
        {results.map((movie) => (
            <li key={movie.id}>
            <MovieCard
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
            />
            </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
