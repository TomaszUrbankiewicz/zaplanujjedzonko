

# ScrumLab

 
<a href='https://zaplanujjedzonko.netlify.app/' target="blank" > Zobacz - zaplanujjedzonko </a>

Projekt, którego celem jest nauczenie Cię pracy w zespole programistów.  Symuluje on realne zadania
w projekcie aplikacji webowej. 
Praca w grupie na kursie programowania w CodersLab

## Jak zainstalować wszystkie potrzebne biblioteki?
Żeby zacząć pracować z ScrumLab musisz:
* `npm install` - zainstalować wszystkie potrzebne paczki

## Gulp
Poniżej możesz znaleźć wszystkie komendy Gulp, które są dla Ciebie dostępne:
* `gulp` lub `gulp serve`  - uruchomi GULP w trybie `watchmode`. Oznacza to, że zostanie uruchomiona strona `localhost` która będzie odświeżana za każdym razem, gdy zmienisz jakikolwiek plik `scss`, `js` lub `html`.
* `gulp watch` - uruchamia GULP w trybie nadzoru, będzie kompilować `main.scss` w `css/main.css`
* `gulp sass` - Kompiluje SASS do CSS

## Struktura katalogów
```
| - development/
	| - css/      
	| - fonts/
	| - images/  
	| - js/
	| - scss/
	| - app.html  
	| - index.html  
	| - recipes.html    
	| - schedules.html
| - distribution/
| - package.json
| - gulpfile.js
```

