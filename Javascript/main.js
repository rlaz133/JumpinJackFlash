// auxiliary; turns a text string into a node with the same html code
function buildDom(htmlString) {
    let div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.children[0];
  }

//listens to the buttons to load the different screens and calls the relevant function
function screenSelector(){
    let startBtn = document.querySelector('#start-btn');
    startBtn.addEventListener('click', ()=>loadGame());
    // let splashBtn = document.querySelector('#splash-btn');
    // splashBtn.addEventListener('click', ()=>loadSplash());
}

//loads the game screen and kickstarts the canvas
function loadGame(){
    document.getElementById('splashScreen').remove();
    let canvasCode = buildDom(`<canvas id='canvas' width=800px; height=700px></canvas>`);
    document.getElementById('container').appendChild(canvasCode)
    startGame();
    screenSelector()
}

//loads the splash screen
function loadSplash(){
    document.getElementById('container').innerHTML='';
    let splashCode = buildDom(
        `<div id='splashScreen'>
            <h1 id='title'> Jumping Jack Flash</h1>
            <button id="start-btn">Start</button>
        </div>`
        )
    document.getElementById('container').appendChild(splashCode)
    screenSelector()
}

window.addEventListener('load', ()=>{screenSelector()})
