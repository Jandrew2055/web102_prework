/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById('games-container');

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    let div = document.createElement('div');
    div.classList.add('game-card'); // add the class game-card to the list

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")

    //games[i]['img'] --> gives us the image
    //games[i]['goal'] ==> gives us the game's goal
    //games[i]['pledged'] --> gives us the game's pledge amount

    div.innerHTML = `<img src = ${games[i]['img']} alt = "game image" width = "300" height = "150" > <br>  
        <p>${games[i]['description']}</p>
        <p>goal: ${games[i]['goal']} </p> 
        <p>pledged: ${games[i]['pledged']} </p>`; // '<p>CreateElement example</p>';
    // append the game to the games-container

    gamesContainer.appendChild(div);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById('num-contributions');

// use reduce() to count the number of total contributions by summing the backers
const gameArr = GAMES_JSON;
let totalContributions = gameArr.reduce((acc, element) => {
  return acc + element['backers'];
}, 0);

// let p = document.createElement('p'); you can delete this
totalContributions = totalContributions.toLocaleString('en-US');
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById('total-raised');

let totalPledged = gameArr.reduce((acc, element) => {
  return acc + element['pledged'];
}, 0);
totalPledged = totalPledged.toLocaleString('en-US');

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalPledged}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById('num-games');

let numGames = gameArr.reduce((acc, element) => {
  return acc + 1;
}, 0);

numGames = numGames.toLocaleString('en-US');

// set inner HTML using template literal
gamesCard.innerHTML = `${numGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let notYetGoal = gameArr.filter((element) => {
    return element['goal'] > element['pledged'];
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(notYetGoal);
}
// console.log(filterUnfundedOnly());
// filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let reachedGoal = gameArr.filter((element) => {
    return element['pledged'] > element['goal'];
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(reachedGoal);
}

// filterFundedOnly();

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
// showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById('unfunded-btn');
const fundedBtn = document.getElementById('funded-btn');
const allBtn = document.getElementById('all-btn');

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener('click', function () {
  filterUnfundedOnly();
});

fundedBtn.addEventListener('click', function () {
  filterFundedOnly();
});
allBtn.addEventListener('click', function () {
  showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById('description-container');

// use filter or reduce to count the number of unfunded games
let unfundedGameCount = gameArr.reduce((acc, element) => {
  if (element['goal'] > element['pledged']) {
    return acc + 1;
  }
  return acc;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalPledged} has been raised for ${numGames} games! Unfortunately, ${unfundedGameCount} remain unfunded. Please, with your contribution we can get all games funded entirely! Every bit helps.`;

// create a new DOM element containing the template string and append it to the description container
let p = document.createElement('p');
p.innerHTML = displayStr;
descriptionContainer.appendChild(p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById('first-game');
const secondGameContainer = document.getElementById('second-game');

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let firstGame = sortedGames[0]['name'];
let secondGame = sortedGames[1]['name'];

// create a new element to hold the name of the top pledge game, then append it to the correct element
let game1 = document.createElement('p');
game1.innerHTML = `${firstGame}`;
firstGameContainer.appendChild(game1);

// do the same for the runner up item

let game2 = document.createElement('p');
game2.innerHTML = `${secondGame}`;
secondGameContainer.appendChild(game2);






