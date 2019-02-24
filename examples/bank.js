const initialState = 0;

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "WIDTHDRAW":
            return state - action.amount;
        case "DEPOSIT":
            return state + action.amount;
    }

    return state;
}

const withdrawMoney = (amount) => ({ type: "WIDTHDRAW", amount });
const depositMoney = (amount) => ({ type: "DEPOSIT", amount });

class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this.subscribers = [];
        this.state = reducer();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.subscribers.forEach((cb) => cb());
    }
}

const store = new Store(reducer);

const unsubsribe = store.subscribe(() => console.log("Stan konta:", store.getState()));

store.dispatch({ type: "DEPOSIT_MONEY", payload: { amount: 200 }});

store.dispatch(depositMoney(100));  // mamy 100
store.dispatch(depositMoney(200));  // mamy 300
store.dispatch(depositMoney(200));  // mamy 500

store.dispatch(withdrawMoney(400)); // mamy 100

unsubsribe(); // nie słuchamy dalej

store.dispatch(withdrawMoney(100)) // mamy 0

console.log("Na koncie mam", store.getState());


function reducer(state = [], action) {
    switch (action.type) {
        case "ADD_USER": {
            state.push(action.payload);
            return state;
        }
        default:
            return state;
    }
}




import { createStore } from "redux";

const store = createStore(reducer, initialState);

const state = {
    filterType: "all",
    movies: [
        { title: "Szczęki", typ: "thriller" }, 
        { title: "Terminator", typ: "comedy"},
        { title: "Alien", typ: "horror" }
    ],
    loggedUser: {
        name: "admin",
        email: "admin@example.com"
    }
}

function movieReducer(state, action) {
    switch (action.type) {
        case "MOVIE_ADDED":
            return [ ...state, action.payload ];
        case "MOVIE_REMOVED": {
            const newMovies = movies.filter((title) => title !== action.payload.title);
            return newMovies;
        }
        default:
          return state;
        }
    }
}

function filterReducer(filter, action) {
    switch (action.type) {
        case "FILTER_CHANGED":
            return action.payload;
        case "FILTER_RESET": {
            return "all";
        }
        default:
          return filter;
        }
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return { ...state, user: action.payload };
        case "FILTER_CHANGED":
            return { ...state, filterType: "horror" };
        case "MOVIE_ADDED":
            return { ...state, movies: [...movies, action.payload ]};
        case "MOVIE_REMOVED": {
            const newMovies = movies.filter((title) => title !== action.payload.title);
            return { ...state, movies: newMovies };
        }

        // ... kolejne casey na akcje
    }
}

import { createStore, combineReducers } from "redux";

const mainReducer = combineReducers({
    filter: filterReducer,
    movies: movieReducer,
    user: userReducer
});

const store = createStore(mainReducer);

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componenDidMount() {
        store.subscribe(() => this.setState(store.getState()));
    }

    render() {
        <div>
            <Header store={ store } />
            <Content store={ store } />
            <Footer store={ store } />
        </div>
    }
}


const Header = ({ store }) => {
    const appState = store.getState();

    return (
        <header>
            <h1>Hello, { appState.user.name }</h1>
            <button onClick={ () => store.dispatch({ type: "USER_LOGOUT" }) }>Logout</button>
        </header>
    )
}

import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(mainReducer);

const App = () => (
    <div>
        <Provider store={ store }>
            <Header />
            <Content />
            <Footer />
        </Provider>
    </div>
);

// ... dalszy kod aplikacji

import { connect } from "react-redux";
import Header from "components/header";

// przypisanie zwróconej funkcji do zmiennej
const functionToConnectUserData = connect(mapStateToProps, mapDispatchToProps);

// wielokrotne wykorzystanie funkcji "łączącej"
const ConnectedHeader = functionToConnectUserData(Header);
const ConnectedFooter = functionToConnectUserData(Footer);

export default ConnectedHeader;

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch({ type: "USER_LOGGED_OUT" })
    }
}

// funkcja logout pochodzi z metody mapDispatchToProps
const Header = ({ user, logout }) => {
    <header>
        <h1>Hello, {user.name}</h1>
    </header>
}

class LaunchRocket extends React.Component {
    render() {
        <button></button>
    }
}

const state = {

}

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result
}

const logger = function (store) {
    return function (next) {
        return function (action) {
            // ... tutaj kod middleware
        }
    }
}


const fetchData = () => (dispatch) => {
    dispatch({ type: "FETCH_START "}); // pokazujemy loader

    fetch("http://movies.com/api/getMovies")
        .then((movies) => dispatch({ type: "FETCH_DONE", payload: movies }))
        .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err }));
}

const initialState = {
    isLoading: false,
    error: false,
    movies: [],
}

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true };
        case "FETCH_DONE":
            return { ...state, loading: false, error: false, movies: action.payload };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

// dla prostej aplikacji mozna zwrocić cały stan
const mapStateToProps = (state) => state; 
const mapDispatchToProps = (dispatch) => ({
    fetchMovies: () => dispatch(fetchData())
});

const ConnectedMovieList = connect(mapStateToProps, mapDispatchToProps)(MovieList);

// loading, error, movies - pola ze stanu
// fetchMovies - pole z mapDispatchToProps
const MovieList = ({ loading, error, movies, fetchMovies }) => (
    <div>
        { loading && <Spinner /> }
        { !loading && error && <h1>Wystapił błąd: {error}</h1>}
        { !loading && !errror && <MovieList movies={ movies } /> }

        <button onClick={ fetchMovies }>Pobierz filmy</button>
    </div>
)

const Header = ({ user, logout }) => {
    <header onClick={ logout }>
        <h1>Hello, {user.name}</h1>
    </header>