import { useNavigate } from "react-router-dom";
import '../css/moviecard.css';
const MovieCard = ({ id, title, poster, rating }) => {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  const handleCardClick = () => {
    navigate(`/movies/${id}`); // 영화 ID를 기반으로 상세 페이지로 이동
  };

  return (
    <div className="moviecard_wrap" onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <div className="moviecard_img">
            <img src={posterUrl} alt={title} style={{ width: "100%" }} />
        </div>
        <h3 className="moviecard_title">{title}</h3>
        <p className="moviecard_rating">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8777fd" viewBox="0 0 256 256"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path></svg>
          {rating.toFixed(1)}
          </p>
    </div>
  );
};

export default MovieCard;
