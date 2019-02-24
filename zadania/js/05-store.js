import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { searchMovie } from "./05-api";

function favMovies(state = [], action) {
    switch (action.type) {
        case "FAV_ADDED": {
            return [...state, action.payload];
        }

        case "FAV_REMOVED": {
            const copy = [...state];
            const index = copy.findIndex(({ imdbID }) => imdbID === action.payload.imdbID);
            copy.splice(index, 1);
            return copy;
        }
    }

    return state;
}

function movies(state = { loading: false, result: [] }, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true };
        case "FETCH_DONE":
            return { ...state, loading: false, result: action.payload }
    }

    return state;
}

const reducer = combineReducers({
    favMovies,
    movies
});

export const addFavAction = (payload) => ({ type: "FAV_ADDED", payload });
export const removeFavAction = (payload) => ({ type: "FAV_REMOVED", payload });
export const searchMovieAction = (title) => (dispatch) => {
    dispatch({ type: "FETCH_START "});

    searchMovie(title)
        .then(result => dispatch({ type: "FETCH_DONE", payload: result }))
};

export const store = createStore(reducer, applyMiddleware(thunk));
