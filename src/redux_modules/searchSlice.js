import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "search/fetchMovies",
  async (searchTerm) => {

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 환경 변수에서 API 키 가져오기
    const API_URL = import.meta.env.VITE_TMDB_API_URL; // 환경 변수에서 API URL 가져오기

    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
    );
    const data = await response.json();
    const movies = (data.results || []).filter((movie) =>!movie.adult);
    return movies;
    }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetResults(state) {
        state.results = [];
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setQuery, resetResults } = searchSlice.actions;
export default searchSlice.reducer;
