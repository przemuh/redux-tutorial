import { createStore } from "redux";

const saldoEl = document.querySelector("h1 span");
const inputEl = document.querySelector("input");

document.querySelector("#deposit").addEventListener("click", onDepositClick);
document.querySelector("#withdraw").addEventListener("click", onWithdrawClick);

function reducer(state = 0, action = {}) {
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

const store = createStore(reducer);

store.subscribe(() => updateSaldo(store.getState()));

function updateSaldo(hajs) {
    saldoEl.innerText = `${hajs} PLN`;
}

function onWithdrawClick() {
    const hajs = Number(inputEl.value);
    store.dispatch(withdrawMoney(hajs));
}

function onDepositClick() {
    const hajs = Number(inputEl.value);
    store.dispatch(depositMoney(hajs));
}


