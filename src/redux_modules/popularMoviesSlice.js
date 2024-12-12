import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 환경 변수에서 API 키 가져오기
    const API_URL = import.meta.env.VITE_TMDB_API_URL; // 환경 변수에서 API URL 가져오기

    // API 호출
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`);
    const data = await response.json();

    // `adult` 값이 false인 영화만 반환
    return data.results.filter((movie) => !movie.adult);
  }
);


const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState: {
    movies: [],       // 인기 영화 데이터를 저장
    loading: false,   // 로딩 상태
    error: null,      // 에러 메시지
  },
  reducers: {},       // 동기 리듀서 (현재 없음)
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;  // 로딩 시작
        state.error = null;    // 에러 초기화
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;       // 로딩 종료
        state.movies = action.payload; // 영화 데이터 저장
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false; // 로딩 종료
        state.error = action.payload; // 에러 메시지 저장
      });
  },
});


export default popularMoviesSlice.reducer;