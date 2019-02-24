const saldoEl = document.querySelector("h1 span");
const inputEl = document.querySelector("input");

// Nasłuchujemy na kliknięcie w przyciski
document.querySelector("#deposit").addEventListener("click", onDepositClick);
document.querySelector("#withdraw").addEventListener("click", onWithdrawClick);

// Poniżej wykonaj zadanie:





// Funkcja aktualizująca saldo na stronie
function updateSaldo(hajs) {
    saldoEl.innerText = `${hajs} PLN`;
}

function onWithdrawClick() {
    const hajs = Number(inputEl.value);
    // dispatch correct action on store
    // store.dispatch()
}

function onDepositClick() {
    const hajs = Number(inputEl.value);
    // dispatch correct action on store
    // store.dispatch()
}


