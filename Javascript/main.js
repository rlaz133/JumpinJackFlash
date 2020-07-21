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
    let splashBtn = document.querySelector('#splash-btn');
    splashBtn.addEventListener('click', ()=>loadSplash());


}

//loads the game screen and kickstarts the canvas
function loadGame(){
    document.getElementById('container').innerHTML='';
    let canvasCode = buildDom(`<canvas id='canvas' width=700px; height=700px></canvas>`);
    document.getElementById('container').appendChild(canvasCode)
    startGame();
}

//loads the splash screen
function loadSplash(){
    document.getElementById('container').innerHTML='';
    let splashCode = buildDom(
        `<div id='splashScreen' class='screen'>
            <h1 id='title'> Jumping Jack Flash</h1>
            <button id="start-btn" class='button'>Start</button>
        </div>`
        )
    document.getElementById('container').appendChild(splashCode)
    screenSelector();
}

//loads the retry screen
function loadRetry(){
    document.getElementById('container').innerHTML='';
    let retryCode = buildDom (
        `<div id='retryScreen' class='screen' >
            <h1>Retry?</h1>
            <div>
              <button id="yes-btn" class ='button'>Yes</button>
              <button id="no-btn" class = 'button'>No</button>
            </div>
    </div>`
    )
    document.getElementById('container').appendChild(retryCode)
    let yesBtn = document.querySelector('#yes-btn');
    yesBtn.addEventListener('click', ()=>loadGame());
    let noBtn = document.querySelector('#no-btn');
    noBtn.addEventListener('click', ()=>loadSplash());
}

window.addEventListener('load', ()=>{screenSelector()})
