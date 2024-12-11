import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMovies, fetchMovieTrailers } from "../redux_modules/upcomingMoviesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core styles
import { Navigation } from "swiper/modules";
import "swiper/css/navigation"; // Navigation styles

const UpcomingMoviesBanner = () => {
  const dispatch = useDispatch();
  const { trailers, status } = useSelector((state) => state.upcomingMovies);

  // 상영 예정 영화와 예고편 가져오기
  useEffect(() => {
    const loadTrailers = async () => {
      const { payload: ids } = await dispatch(fetchUpcomingMovies());
      await dispatch(fetchMovieTrailers(ids));
    };
    loadTrailers();
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load trailers. Please try again.</p>;
  }

  if (!trailers || trailers.length === 0) {
    return <p>No trailers available</p>;
  }

  // 상위 3개의 예고편만 사용
  const selectedTrailers = trailers.slice(0, 3);

  // 슬라이드 개수 확인
  const enableLoop = selectedTrailers.length > 1;

  return (
    <div>
      <Swiper
        slidesPerView={1}
        loop={enableLoop} // 슬라이드 개수가 2개 이상일 때만 Loop 모드 활성화
        autoplay={{
          delay: 5000, // 5초 간격
          disableOnInteraction: false, // 사용자 상호작용 후에도 자동 전환 유지
        }}
        modules={[Navigation]} // Navigation 모듈 추가
        navigation // 네비게이션 활성화
      >
        {selectedTrailers.map((movie) => (
          <SwiperSlide key={movie.id}>
            <iframe
              src={`${movie.trailer}`} // 올바른 템플릿 리터럴 형식
              title={`Trailer for movie ${movie.id}`} // 올바른 템플릿 리터럴 형식
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingMoviesBanner;
