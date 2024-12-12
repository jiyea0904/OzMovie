import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovieList = createAsyncThunk(
  "movies/fetchMovieList",
  async (page) => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const API_URL = import.meta.env.VITE_TMDB_API_URL;

      const response = await fetch(
        `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`
      );
      const data = await response.json();

      return {
        results: data.results.filter((movie) => !movie.adult), // `adult` 값이 false인 영화만 반환
        total_pages: data.total_pages,
      };
  }
);

const movieListSlice = createSlice({
  name: "movieList",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload.results];
        state.totalPages = action.payload.total_pages;
        state.currentPage += 1;
        state.hasMore = state.currentPage <= action.payload.total_pages;
      })
      .addCase(fetchMovieList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetMovieList } = movieListSlice.actions;

export default movieListSlice.reducer;

