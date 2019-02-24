import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware} from "redux";
import { connect, Provider } from "react-redux";
import thunk from "redux-thunk";

const imgSrc = "https://www.raletta.in/images/rocket.gif";

const Rocket = ({ isLaunched }) =>
    <img
        alt="rocket"
        src={imgSrc}
        className={`rocket ${isLaunched ? 'launched': ''}`}
    />;

const Counter = ({ seconds }) => <div>Launch in {seconds}</div>;
const LaunchButton = ({ deploy }) => <button onClick={ ()=> deploy() }>Launch the rocket!</button>;

const Container = ({ launched, counter, deploy }) =>(
    <Fragment>
        <Rocket isLaunched={ launched }/>
        <Counter seconds={ counter }/>
        <LaunchButton deploy={ deploy }/>
    </Fragment>
);


function reducer(state = { launched: false, counter: 5 }, action) {
    switch (action.type) {
        case "LAUNCHED":
            return { ...state, launched: true };
        case "COUNTER_CHANGE":
            return { ...state, counter: action.counter };
    }
    return state;
}
const store = createStore(reducer, applyMiddleware(thunk));

const ConnectedContainer = connect(
    ({ launched, counter }) => ({ launched, counter }),

    (dispatch) => ({
        deploy: () => dispatch((dispatch, getState) => {
            console.log("DEPLOY");
            const intervalId = setInterval(() => {
                const currentCounter = getState().counter;

                if (currentCounter === 0) {
                    clearInterval(intervalId);
                    dispatch({ type: "LAUNCHED" })
                } else {
                    dispatch({ type: "COUNTER_CHANGE", counter: currentCounter - 1 });
                }

            }, 1000);
        })
    })
)(Container);

const App = () => (
    <div className="root">
        <Provider store={ store } >
            <ConnectedContainer />
        </Provider>
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
