import { configureStore } from '@reduxjs/toolkit';
import popularMoviesReducer from './popularMoviesSlice';
import movieDetailsReducer from './movieDetailsSlice';
import searchReducer from './searchSlice';
import upcomingMoviesReducer from './upcomingMoviesSlice';
import movieListReducer from './movieListSlice';

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    movieDetails: movieDetailsReducer,
    search: searchReducer,
    upcomingMovies: upcomingMoviesReducer,
    movieList: movieListReducer,
  },
});

export default store;
