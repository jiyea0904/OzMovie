
const MovieCard = ({ title, poster, rating }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  return (
    <div className="moviecard_wrap">
        <div className="moviecard_img">
            <img src={posterUrl} alt={title} style={{ width: "100%", borderRadius: "5px" }} />
        </div>
        <h3 style={{ fontSize: "1.2em" }}>{title}</h3>
        <p>평점: {rating.toFixed(1)}</p>
    </div>
  );
};

export default MovieCard;
