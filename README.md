# Redux zadania

## Organizacja repozytorium

Aplikacja z zadaniami oparta jest o bundler `parcel`.

Każde zadanie posiada swój plik `html` oraz `js`.

Zadania z wykładowcą oznaczone są literą `w`.

## Instalacja

```
npm install
```

## Uruchomienie

```
npm start
```

Następnie wejdź na stronę http://localhost:1234

Strony nie musisz odświeżać. Przy każdej zmianie w plikach `html` i `js` parcel zadba o to żeby odświeżyć stronę.

## Zadania

### Zadanie z wykładowcą 1
W pliku `js/myStore.js` zaimplementuj własny Store na bazie API jakie dostarcza redux.
Dzięki samodzielnej implementacji lepiej poznasz jak działa redux.

Następnie w pliku `js/w01.js` zaimportuj zaimplementowany Store i stwórz stan dla prostej aplikacji konta w banku.

- Chcemy aby nasz store przechowywał ilość pieniędzy na koncie.
- Stan początkowy ustaw na 0.
- Zapisz się na zmiany stanu i przy każdej z nich zaloguj w konsoli aktualny stan konta
- Zaimplementuj akcję która wpłaca pieniądze do banku
- Wpłać kilka razy pewną dowolną sumę pieniędzy
- Spróbuj wypisać się z nasłuchiwania zmian stanu
- Wpłać kolejną sumę
- Sprawdź czy stan konta się zgadza za pomocą metody getState


### Zadanie 01
- Zmodyfikuj zadanie z wykładowcą `w01.js`
- Zamiast używać własnego STORE użyj tego z pakietu redux `import { createStore } from "redux"`
- Sprawdź czy aplikacja działa jak poprzednio

### Zadanie 02
W tym zadaniu dołożymy warstwę prezentacji. Zamiast logować do konsoli stan konta, wyświetl go na stronie.

W pliku `02.js` znajdziesz już podstawowy "boilerplate" do wykonania aplikacji.

Na stronie znajdują się: 
- informacja o aktualnym sladzie konta
- input, do którego możemy wpisać liczbę
- przycisk `Wpłać`, po kliknięciu wpłaca nam wpisaną w `input` sumę na konto
- przycisk `Wypłać`, wypłaca pieniądze z konta

Zaimplementuj odpowiedni Store korzystając z pakietu `redux`.

**Dla chętnych**: Zabezpiecz konto przed ujemnym saldem ;)

![](https://github.com/przemuh/redux-tutorial/raw/master/images/zad02.gif)

### Zadanie 03
Na stronie znajduje się lista artykułów oraz `select`, który pokazuje nam artykuły z wybranej kategorii.

Zaimplementuj Store. Napisz główny reducer tak, aby składał się z dwóch niezależnych funkcji `postReducer` oraz `filterReducer`.

`postReducer` na razie nic nie robi więc może zwracać po prostu stan.

Po zaznaczeniu odpowiedniego filtra (backend/frontend/all) na stronie mają się wyświetlić tylko odfiltrowane artykuły.

![](https://github.com/przemuh/redux-tutorial/raw/master/images/zad03.gif)

### Zadanie z wykładowcą 2
Przeróbcie zadanie 3, tak aby wykorzystać bibliotekę `React`.

Komponenty jakie powinny znaleźć się na stronie:
- `<Filter />`
- `<Articles />` - komponent powinien zawierać pojedyncze artykuły w postaci <ArticleItem />

Skorzystaj z pakietu `react-redux` w tym z funkcji `connect` i komponentu `<Provider>`

### Zadanie 04
Napisz aplikację ToDo list. Aplikacja powinna się składać z następujących komponentów:
- formularza do tworzenia todo-item
- listy zadań do zrobienia (todo-list)
- filtra który zmienia stan listy (pokaż wszystko, pokaż tylko zrobione, pokaż tylko niezrobione)

![](https://github.com/przemuh/redux-tutorial/raw/master/images/zad04.gif)

### Zadanie z wykładowcą 3
W zadaniu znajdują się:
- rakieta
- licznik
- przycisk startujący rakietę

Napisz kod, który:
- po naciśnięciu przycisku `Launch the rocket` odpali licznik
- licznik ma odliczać od 5 do 0
- po osiągnięciu 0 ustaw w stanie aplikacji pole `isLaunched`
- przekaż do rakiety wartość pola `isLaunched`

W tym zadaniu chodzi o to, aby zaimplementować asynchroniczną akcję z wykorzystaniem `setInterval`.

Do asynchronicznej akcji wykorzystaj pakiet `redux-thunk`. Być może trzeba go będzie doinstalować ;)

![](https://github.com/przemuh/redux-tutorial/raw/master/images/w03.gif)

### Zadanie 05
Zadanie 5 składa się z 3 plików:
- `05-api` - wystawia metodę która pobiera listę filmów z http://omdbapi.com
- `05-store` - tutaj implementujemy nasz stan aplikacji
- `05` - tutaj implementujemy aplikację React

Napisz aplikację do tworzenia listy ulubionych filmów. Na aplikację powinny się składać następujące komponenty:
- Wyszukiwarka filmów
- Lista znalezionych filmów
- Lista ulubionych filmów

Po wpisaniu tytułu filmu, na liście znalezionych filmów wyświetl wyniki z API.

Po kliknięciu na okładkę filmu, ma się od dodać do ulubionych.

Po kliknięciu na okładkę filmu, który został dodany do ulubionych, usuń go z listy.

Taki powinien być effekt: https://github.com/przemuh/redux-tutorial/raw/master/images/05.mp4
