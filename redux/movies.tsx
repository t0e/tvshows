import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'movies',
  initialState: {movieList: [], movieDetail: {}},
  reducers: {
    storeMovieList: (state, action) => {
      return {
        ...state,
        movieList: action.payload,
      };
    },
    storeMovie: (state, action) => {
      return {
        ...state,
        movieDetail: action.payload,
      };
    },
  },
});

export const {storeMovieList, storeMovie} = slice.actions;
export const getMovies = (state: {movies: any}) => state.movies;

export default slice.reducer;
