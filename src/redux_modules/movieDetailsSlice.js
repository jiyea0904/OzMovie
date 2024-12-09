import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id) => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
        const data = await response.json();
        console.log("API Response:", data); // 응답 데이터 확인
        return { ...data, id }; // 응답 데이터에 id 추가
    }
);


const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: {
      movieDetails: {}, // ID별 상세 정보 저장
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovieDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.movieDetails[action.payload.id] = action.payload;
        })
        .addCase(fetchMovieDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default movieDetailsSlice.reducer;