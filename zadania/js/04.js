import React from "react";
import ReactDOM from "react-dom";

import { connect, Provider } from "react-redux";
import store from "./04-store";

const Filter = () => "filtr";
const ToDoList = () => "todo lista";
const Form = () => "formularz do dodawania itemów";

const App = () => (
    <div>
        <Filter />
        <ToDoList />
        <Form />
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
