import { combineReducers, createStore } from "redux";

const FILTER_CHANGE = "FILTER_CHANGE";
const ADD_ITEM = "ADD_ITEM";
const TOGGLE_ITEM = "TOGGLE_ITEM";

function itemsReducer(state = [], action) {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, { title: action.title, done: false }];
        case TOGGLE_ITEM: {
            const copy = [...state];
            const index = copy.findIndex(({ title }) => title === action.title);
            copy[index].done = !copy[index].done;
            return copy;
        }
    }
    return state;
}

function filterReducer(state = "all", action) {
    switch (action.type) {
        case FILTER_CHANGE:
            return action.filter;
    }

    return state;
}

const mainReducer = combineReducers({
    items: itemsReducer,
    filter: filterReducer,
});

export const store = createStore(mainReducer);

export const changeFilterAction = (filter) => ({ type: FILTER_CHANGE, filter });
export const addToDoItemAction = (title) => ({ type: ADD_ITEM, title });
export const toggleItemAction = (title) => ({ type: TOGGLE_ITEM, title });
