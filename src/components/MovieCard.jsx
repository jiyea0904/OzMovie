import { useNavigate } from "react-router-dom";
const MovieCard = ({ id, title, poster, rating }) => {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  const handleCardClick = () => {
    navigate(`/movies/${id}`); // 영화 ID를 기반으로 상세 페이지로 이동
  };

  return (
    <div className="moviecard_wrap" onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <div className="moviecard_img">
            <img src={posterUrl} alt={title} style={{ width: "100%", borderRadius: "5px" }} />
        </div>
        <h3 style={{ fontSize: "1.2em" }}>{title}</h3>
        <p>평점: {rating}</p>
    </div>
  );
};

export default MovieCard;
