import { configureStore } from '@reduxjs/toolkit';
import popularMoviesReducer from './popularMoviesSlice';
import movieDetailsReducer from './movieDetailsSlice';

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    movieDetails: movieDetailsReducer,
  },
});

export default store;
