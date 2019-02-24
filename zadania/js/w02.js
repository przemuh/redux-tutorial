import React from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

const FILTER_CHANGE = "FILTER_CHANGE";

// Stan początkowy dla aplikacji
const initialState = {
    filter: "all",
    posts: [
        { title: "Pierwsze kroki z reduxem", category: "frontend" },
        { title: "JAVA to nie JavaScript", category: "backend" },
        { title: "CSS to moja pasja", category: "frontend" }
    ]
};

function postsReducer(state = initialState.posts) {
    return state;
}

function filterReducer(state = initialState.filter, action) {
    switch (action.type) {
        case FILTER_CHANGE:
            return action.filter;
    }

    return state;
}

const mainReducer = combineReducers({
    posts: postsReducer,
    filter: filterReducer,
});

const store = createStore(mainReducer);

const Filter = connect(
    null,
    (dispatch) => ({
        onChange: (filter) => dispatch({ type: FILTER_CHANGE, filter })
    })
)(({ onChange }) => (
    <div>
        Pokaż tylko:
        <select defaultValue="all" onChange={ (e) => onChange(e.target.value)}>
            <option>frontend</option>
            <option>backend</option>
            <option>all</option>
        </select>
    </div>
));

const List = connect(
    ({ filter, posts }) => ({
        items: filter === "all" ? posts : posts.filter(({ category }) => category === filter)
    })
)(({ items }) => (
    <ul>
        { items.map(({ title }) => <li key={title}>{title}</li>) }
    </ul>
));

const App = () => (
    <div>
        <Provider store={ store }>
            <Filter />
            <List />
        </Provider>
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
