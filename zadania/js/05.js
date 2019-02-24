import React from "react";
import ReactDOM from "react-dom";

import store from "./05-store"

const FavMovieList = () => <div />;
const SearchMovie = ({ searchMovie }) => <input type="text" onChange={ (e) => searchMovie(e.target.value) } />;

const App = () => (
    <div>
        <FavMovieList />
        <SearchMovie />
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
