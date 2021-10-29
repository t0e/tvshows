import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './movies';

export default configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
