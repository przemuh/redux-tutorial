import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { connect, Provider } from "react-redux";
import { store, changeFilterAction, addToDoItemAction, toggleItemAction } from "./04-store";

const Filter = ({ changeFilter }) => (
    <div>
        Pokaż tylko:
        <select defaultValue="all" onChange={ (e) => changeFilter(e.target.value) }>
            <option>zrobione</option>
            <option>niezrobione</option>
            <option>all</option>
        </select>
    </div>
);
const ToDoList = ({ items = [], toggle }) => (
    <Fragment>
        { items.map(({ title, done }) =>
            <li
                key={ title }
                style={{ textDecoration: done ? 'line-through' : 'none' }}
                onClick={ () => toggle(title) }
            >
                {title}
            </li>)
        }
    </Fragment>
);
const Form = ({ onAdd }) => (
    <form onSubmit={ (e) => { e.preventDefault(); onAdd(e.target.name.value)} }>
        <input type="text" id="name" />
        <button type="submit">Dodaj</button>
    </form>
);

const ConnectedFilter = connect(
    null,
    (dispatch) => ({
        changeFilter: (filter) => dispatch(changeFilterAction(filter))
    })
)(Filter);

const ConnectedForm = connect(
    null,
    (dispatch) => ({
        onAdd: (title) => dispatch(addToDoItemAction(title))
    })
)(Form);

const ConnectedList = connect(
    (state) => ({
        items: state.filter === "all" ? state.items : state.items.filter(({ done }) => {
            return done === (state.filter === "zrobione");
        })
    }),
    (dispatch) => ({
        toggle: (title) => dispatch(toggleItemAction(title))
    })
)(ToDoList);

const App = () => (
    <div>
        <Provider store={ store }>
            <ConnectedFilter />
            <ConnectedList />
            <ConnectedForm />
        </Provider>
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
