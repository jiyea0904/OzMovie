import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 환경 변수에서 API 키 가져오기
const API_URL = import.meta.env.VITE_TMDB_API_URL; // 환경 변수에서 API URL 가져오기

// 상영 예정 영화 가져오기 Thunk
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async () => {
      const response = await fetch(
        `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      //console.log("Fetched movie IDs:", data.results.map((movie) => movie.id));
      return data.results.map((movie) => movie.id); // 영화 ID 배열 반환
  }
);




// 특정 영화의 예고편 가져오기 Thunk
export const fetchMovieTrailers = createAsyncThunk(
  "movies/fetchMovieTrailers",
  async (movieIds) => {
      const trailers = await Promise.all(
        movieIds.map(async (id) => {
          const response = await fetch(
            `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch trailer for movie ID ${id}`);
          }
          const data = await response.json();
          const trailer = data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          return trailer
            ? { id, trailer: `https://www.youtube.com/embed/${trailer.key}` }
            : null;
        })
      );
      //console.log("Fetched trailers:", trailers.filter(Boolean));
      return trailers.filter(Boolean); // 예고편이 있는 영화만 반환
  }
);

const upcomingMoviesSlice = createSlice({
  name: "upcomingMovies",
  initialState: {
    movieIds: [], // 영화 ID 배열
    trailers: [], // 예고편 데이터
    status: "idle", // idle | loading | succeeded | failed
    error: null, // 오류 메시지
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.movieIds = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMovieTrailers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieTrailers.fulfilled, (state, action) => {
        //console.log("Updating trailers in state:", action.payload);
        state.trailers = action.payload; // 상태 업데이트
        state.status = "succeeded";
      })
      .addCase(fetchMovieTrailers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default upcomingMoviesSlice.reducer;

