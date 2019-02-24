// W tym pliku zaimplementuj prosty stan dla aplikacji do zarządzania kontem w banku

import Store from "./myStore";

function reducer(state = 0, action = {}) {
    switch (action.type) {
        case "DEPOSIT_MONEY":
            return state + action.payload.amount;
    }

    return state;
}

const store = new Store(reducer);

const unsubsribe = store.subscribe(() => console.log("Stan konta:", store.getState()));

store.dispatch({ type: "DEPOSIT_MONEY", payload: { amount: 200 }});
store.dispatch({ type: "DEPOSIT_MONEY", payload: { amount: 200 }});
store.dispatch({ type: "DEPOSIT_MONEY", payload: { amount: 200 }});

unsubsribe();

store.dispatch({ type: "DEPOSIT_MONEY", payload: { amount: 200 }});

console.log(store.getState());
