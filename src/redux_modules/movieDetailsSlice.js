import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = import.meta.env.VITE_TMDB_API_URL;

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id) => {
        const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
        const data = await response.json();
        return data; 
    }
);

export const fetchMovieRecommendations = createAsyncThunk(
    'movies/fetchMovieRecommendations',
    async (id) => {
        const response = await fetch(`${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1`);
        const data = await response.json();
        return data.results.filter((movie) => !movie.adult); 
    }
);


const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: {
        movieDetails: {},
        recommendations: [],
        loading: false,
        recommendationsLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchMovieDetails
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
            })
            // fetchMovieRecommendations
            .addCase(fetchMovieRecommendations.pending, (state) => {
                state.recommendationsLoading = true;
                state.error = null;
            })
            .addCase(fetchMovieRecommendations.fulfilled, (state, action) => {
                state.recommendationsLoading = false;
                state.recommendations = action.payload;
            })
            .addCase(fetchMovieRecommendations.rejected, (state, action) => {
                state.recommendationsLoading = false;
                state.error = action.error.message;
            });
    },
});

export default movieDetailsSlice.reducer;
