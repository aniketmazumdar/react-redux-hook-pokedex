# Pokedex - React Redux Thunk App
React Redux Thunk app - Pokemon list page with filtering by name, id, gender, type, strategy range etc and details on popup.

![Screenshot](https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/desktop.png?raw=true)

### Description
This is a single page responsive app. Page contains pokemon card list. There is a **Search Box**, where we can filter the pokemon list by id & name. There are two filter dropdowns based on **Type** and **Gender**. There is a **multiple range slider** based on **Stat** values for filtering items. By clicking any card item, **Pokemon Details Popup** is appeared. Here **Page Scroll Pagination** feature is integrated.


### Technologies
Project is created with:
* React JS (18.2.0)
* Redux (4.2.1)
* Redux Thunk (2.4.2)
* CSS 3


### API Services
* [pokeapi.co](https://pokeapi.co/api/v2/) is used to generate Pokemon data.


### Setup Steps
1. Fork the project and clone it locally.
2. To run this app, open the terminal into the project directory and install it locally using npm:
```shell
$ npm install
$ npm start
```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Unit Test
Jest and RTL (React Test Library) are used for unit test cases.
1. Run command to run the test cases.
```shell
$ npm run test
```
2. After running the command, `coverage` folder is created. Find the `index.html` and open in the browser. Test coverage is showing here.

![Screenshot](https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/coverage.png?raw=true)
3. Each component has a `index.test.js` file for unit test cases. Everytime after adding or changing the test file, we need to run the test command to check the test result case and reload the coverage file `coverage/index.html` to check the coverage.


### Gallery
<div style="float:left">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/desktop.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/desktop-2.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/desktop-3.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/desktop-4.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/desktop-5.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/mobile-1.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/mobile-2.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/mobile-3.png?raw=true" width="32.5%" height="150">
<img src="https://github.com/aniketmazumdar/react-redux-pokedex/blob/main/src/assets/img/mobile-4.png?raw=true" width="32.5%" height="150">
</div>