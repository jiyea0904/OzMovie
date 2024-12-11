import { Link, useLocation } from "react-router-dom";
import '../App.css';
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { resetResults, setQuery } from "../redux_modules/searchSlice";
import { useDispatch } from "react-redux";


const NavBar = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const location = useLocation(); // 현재 경로 가져오기
  const dispatch = useDispatch(); // Redux 디스패치

  // 경로 변경 감지하여 검색 폼 닫기 및 검색어 초기화
  useEffect(() => {
    setShowSearchForm(false);
    dispatch(setQuery(""));
    dispatch(resetResults());
    
  }, [location, dispatch]);

  return (
    <>
    <header className="navbar">
      <div className="navbar_logo">
        <Link to="/">🎥 OZ Movie</Link>
      </div>
      <div className="navbar_buttons">
      <button
        className="navbar_button"
        onClick={() => setShowSearchForm(!showSearchForm)}
      >
        Search
      </button>
        <button className="navbar_button">Login</button>
        <button className="navbar_button">Sign Up</button>
      </div>
      {showSearchForm && <SearchForm />}
    </header>
    </>
  );
};

export default NavBar;
