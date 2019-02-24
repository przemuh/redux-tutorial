export function searchMovie(title) {
    return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=30ff620&s=${title}`)
        .then(response => response.json())
        .then(({ Search }) => Search)
        .catch(e => {
            alert("Coś poszło nie tak przy pobieraniu");
            console.log(e);
        });
}
