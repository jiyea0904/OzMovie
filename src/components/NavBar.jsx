import { Link } from "react-router-dom";
import '../App.css';

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="navbar_logo">
        <Link to="/">🎥 OZ Movie</Link>
      </div>
      <div className="navbar_search">
        <input type="text" placeholder="Search movies..." />
      </div>
      <div className="navbar_buttons">
        <button className="navbar_button">Login</button>
        <button className="navbar_button">Sign Up</button>
      </div>
    </header>
  );
};

export default NavBar;
