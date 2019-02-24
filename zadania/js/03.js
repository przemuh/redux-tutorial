// Stan początkowy dla aplikacji
const initialState = {
    filter: "all",
    posts: [
        { title: "Pierwsze kroki z reduxem", category: "frontend" },
        { title: "JAVA to nie JavaScript", category: "backend" },
        { title: "CSS to moja pasja", category: "frontend" }
    ]
};

function postsReducer(state) {
    return state;
}

function filterReducer(state, action) {
    // TODO zaimplementuj reducer na zmianę filtru
    return state;
}

// Stwórz store i przypisz mu initial state wraz z dwoma reducerami
// skorzystaj z metody combineReducers z pakietu redux
// combineReducers({ posts, filter })


// Zapisz się na zamiany stanu i wywołaj poniższą funkcję
function updateList(filteredList) {
    document.querySelector("ul").innerHTML = filteredList.map(({ title }) => `<li>${title}</li>`).join("");
}

// Zdarzenie na zmianę filtru
document.querySelector("select").addEventListener("change", (e) => {
    const currentFilter = e.target.value;

    // Tutaj wywołaj akcję zmiany filtru
});



updateList(initialState.posts);
