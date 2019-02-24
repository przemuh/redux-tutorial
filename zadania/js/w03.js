import React from "react";
import ReactDOM from "react-dom";

const imgSrc = "https://www.raletta.in/images/rocket.gif";

const Rocket = ({ isLaunched }) =>
    <img
        alt="rocket"
        src={imgSrc}
        className={`rocket ${isLaunched ? 'launched': ''}`}
    />;

const Counter = ({ seconds }) => <div>Launch in {seconds}</div>;
const LaunchButton = ({ launchRocket }) => <button onClick={launchRocket}>Launch the rocket!</button>;

const App = () => (
    <div className="root">
        <Rocket />
        <Counter />
        <LaunchButton />
    </div>
);

ReactDOM.render(<App />, document.querySelector("#app"));
