import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { useSelector } from "react-redux";
import RecommendedMovies from "../components/RecommendedMovies";


const Detail = () => {
    const { id } = useParams();
    const movie = useSelector((state) => state.movieDetails.movieDetails[id]);

    return (
        <>
            <MovieDetail />
            <RecommendedMovies movieId={parseInt(id)} />
        </>
    )
}

export default Detail;