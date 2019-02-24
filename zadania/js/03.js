import { createStore, combineReducers } from "redux";

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

store.subscribe(() => {
    const { filter, posts } = store.getState();
    updateList(filter === "all" ? posts : posts.filter(({ category }) => category === filter ));
});

function updateList(filteredList) {
    document.querySelector("ul").innerHTML = filteredList.map(({ title }) => `<li>${title}</li>`).join("");
}

document.querySelector("select").addEventListener("change", (e) => {
    const currentFilter = e.target.value;

    store.dispatch({ type: FILTER_CHANGE, filter: currentFilter });
});


// Pierwszy render
updateList(initialState.posts);
