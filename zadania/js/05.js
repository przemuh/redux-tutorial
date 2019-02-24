import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";

import { store, searchMovieAction, addFavAction, removeFavAction } from "./05-store";


const SearchBox = ({ searchMovie, movies, addFav }) => {
    console.log(movies);
    return (
        <div>
            <span>Find a movie: </span>
            <input type="text" onChange={ (e) => searchMovie(e.target.value) } />
            <ul>
                { movies.map((movie) => <li key={movie.id} onClick={ () => addFav(movie)}><img src={movie.Poster}/></li>) }
            </ul>

        </div>
    );
};

const FavMoviesList = ({ favMovies, removeFav }) => (
    <div>
        <h1>My ❤️ movies:</h1>
        <ul>
            { favMovies.map((movie) => <li key={movie.id} onClick={ () => removeFav(movie)}><img src={movie.Poster}/></li>) }
        </ul>
    </div>
);

const ConnectedSearchBox = connect(
    ({ movies }) => ({
        loading: movies.loading,
        movies: movies.result || []
    }),
    (dispatch) => ({
        searchMovie: (title) => dispatch(searchMovieAction(title)),
        addFav: (movie) => dispatch(addFavAction(movie))
    })
)(SearchBox);

const ConnectedFavList = connect(
    ({ favMovies}) => ({ favMovies }),
    (dispatch) => ({
        removeFav: (movie) => dispatch(removeFavAction(movie))
    })
)(FavMoviesList);

const App = () => (
    <div>
        <Provider store={ store } >
            <ConnectedSearchBox />
            <ConnectedFavList />
        </Provider>
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
