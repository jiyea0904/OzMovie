import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { resetResults, setQuery } from "../redux_modules/searchSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuthContext";

const NavBar = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, updateUser } = useAuth(); // AuthContext에서 사용자 정보와 상태 업데이트 함수 가져오기
  const [showDropdown, setShowDropdown] = useState(false);

  // 경로 변경 감지하여 검색 폼 닫기 및 검색어 초기화
  useEffect(() => {
    setShowSearchForm(false);
    dispatch(setQuery(""));
    dispatch(resetResults());
  }, [location, dispatch]);

  const handleLogout = () => {
    updateUser(null); // 전역 상태에서 사용자 정보 초기화
    setShowDropdown(false); // 드롭다운 닫기
    navigate("/"); // 메인 페이지로 이동
  };

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
          <button className="dropdown_item" onClick={handleLogout}>
                    Logout
                  </button>
          {!user ? (
            <>
              <button
                className="navbar_button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="navbar_button"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="navbar_user">
              <img
                src={user.profileImageUrl || "https://via.placeholder.com/40"}
                alt="User Thumbnail"
                className="user_thumbnail"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="dropdown_menu">
                  <button
                    className="dropdown_item"
                    onClick={() => navigate("/mypage")}
                  >
                    My Page
                  </button>
                  <button className="dropdown_item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {showSearchForm && <SearchForm />}
      </header>
    </>
  );
};

export default NavBar;
