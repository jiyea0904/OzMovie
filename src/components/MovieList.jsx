import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import "../css/main.css";
import { fetchMovieList } from "../redux_modules/movieListSlice";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, currentPage, hasMore } = useSelector(
    (state) => state.movieList
  );

  const observer = useRef();

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchMovieList(currentPage + 1)); // 다음 페이지 데이터 요청
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, currentPage, dispatch]
  );

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(fetchMovieList(1)); // 초기 데이터 요청
    }
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;


  return (
    <div className="normal_movielist">
        <ul className="movielist">
        {movies.map((movie, index) => (
            <li
            key={movie.id}
            ref={index === movies.length - 1 ? lastMovieElementRef : null} // 마지막 아이템에 Ref 연결
            >
            <MovieCard
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
            />
            </li>
        ))}
        {loading && <p>Loading movies...</p>}
        </ul>
    </div>
  );
};

export default MovieList;
