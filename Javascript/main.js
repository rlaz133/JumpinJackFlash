
// AUXILIARIES 

/**
 * Turns a text string into a node with the same html code
 * @param {string} htmlString HTML code to be built
 * @returns A div HTML element
 */
function buildDom(htmlString) {
    let div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.children[0];
  }

/** Cleans the screen */
function cleanScreen(){
    document.getElementById('container').innerHTML='';
}

/**
 * Loads the screen
 * @param {string} htmlString 
 */
function loadScreen(htmlString){
    cleanScreen();
    let htmlElement = buildDom(htmlString)
    document.getElementById('container').appendChild(htmlElement)
};

/**
 * Adds button click event listener
 * @param {string} buttonSelector 
 * @param {function} callback 
 */
function addButtonListener(buttonSelector, callback){
    let button = document.querySelector(buttonSelector);
    button.addEventListener('click', callback)
}

/** Listens to the buttons to load the different screens and calls the relevant function */
function screenSelector(){
    const player = document.getElementById('playerName').value;
    addButtonListener('#start-btn', ()=>loadGame(player));
    addButtonListener('#high-btn', ()=>loadHigh())
}

//SCREEN LOADERS

/** Loads the game screen and kickstarts the canvas*/
function loadGame(Playername){
    loadScreen(INNER_STRINGS.CANVAS);
    startGame(Playername);
}

/** Loads the splash screen */
function loadSplash(){
    loadScreen(INNER_STRINGS.SPLASH);     
    screenSelector();
}

//Interpolate the time in the string
/**
 * Loads the retry screen
 * @param {number} time Number of seconds the user lasted 
 * @param {string} player Name of the player
 */
function loadRetry(time, player){    
    loadScreen(INNER_STRINGS.RETRY);
    document.getElementById('score').innerHTML= time;
    addButtonListener('#yes-btn', ()=>loadGame(player));
    addButtonListener('#no-btn', ()=>loadSplash());
}

/** Loads the high scores screen */
function loadHigh(){
    loadScreen(INNER_STRINGS.HIGH_SCORES);
    addButtonListener('#back-btn', ()=>loadSplash());
    const highScores = readHighScores();
    buildHighScoresList(highScores, 5)
}


//HIGH SCORES FEATURE

/**
 * Reads high scores from local storage
 * @returns Array with the high scores sorted by score
 */
function readHighScores(){
    const sortedStorage = new Array;

    for (i=0; i<localStorage.length;i++){
        if (localStorage.key(i).includes('Jumper')){
            sortedStorage.push(
                {player: localStorage.key(i).split('::')[1],
                time: Number(localStorage.getItem(localStorage.key(i)))
                }
            )}}
    sortedStorage.sort((a, b) => b.time - a.time);
    return sortedStorage
}

/**
 * Builds a row of the high scores list.
 * @param {string} player - The player that got the score
 * @param {string} time - The score of the player
 */
function buildHighScoresRow(player, time){
    let entry = document.createElement('li');
        entry.classList.add('entry')     
        entry.innerHTML=`<span>${player}</span> <span>${time}</span>`
        document.getElementById('scoresList').appendChild(entry);
}

/**
 * Builds the whole high scores list.
 * @param {array} highScores - The list of high scores already sorted
 * @param {number} maxNumberOfScores - How many scores will be listed
 */
function buildHighScoresList(highScores, maxNumberOfScores){
    for (i=0; i<highScores.length && i<maxNumberOfScores; i++){
        buildHighScoresRow(highScores[i].player, highScores[i].time)
    }
}

window.addEventListener('load', ()=>{screenSelector()})
