import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuery, fetchMovies, resetResults } from "../redux_modules/searchSlice";
import useDebounce from "../hooks/useDebounce";
import MovieCard from "./MovieCard";
import '../css/search.css';

const SearchForm = () => {
  const query = useSelector((state) => state.search.query);
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);

  // 입력값 업데이트
  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  // 검색 버튼 클릭
  const handleSearchSubmit = () => {
    if (query.trim()) {
      dispatch(resetResults()); // 검색창 검색결과 초기화
      dispatch(fetchMovies(query)); // API 호출
      navigate(`/search/${query}`);
    } else {
      dispatch(resetResults()); // 검색어가 없을 때 결과 초기화
    }
  };

  // 디바운스된 검색어로 API 호출
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchMovies(debouncedQuery));
    } else {
      dispatch(resetResults()); // 검색어가 비어 있으면 결과 초기화
    }
  }, [debouncedQuery, dispatch]);

  return (
    <section className="search-form_wrap">
      <div className="search_bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
        />
        <button className="search_button" onClick={handleSearchSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </button>
      </div>
      <div className="search_results">
        {status === "loading" && <p>Loading...</p>}
        <ul>
          {results.slice(0, 5).map((movie) => (
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
    </section>
  );
};

export default SearchForm;
