// auxiliary; turns a text string into a node with the same html code
function buildDom(htmlString) {
    let div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.children[0];
  }

//listens to the buttons to load the different screens and calls the relevant function
function screenSelector(){
    let startBtn = document.querySelector('#start-btn');
    startBtn.addEventListener('click', ()=>loadGame(document.getElementById('playerName').value));
    let highBtn = document.querySelector('#high-btn');
    highBtn.addEventListener('click', ()=>loadHigh());
    // let splashBtn = document.querySelector('#splash-btn');
    // splashBtn.addEventListener('click', ()=>loadSplash());
}

//loads the game screen and kickstarts the canvas
function loadGame(Playername){
    document.getElementById('container').innerHTML='';
    let canvasCode = buildDom(`<canvas id='canvas' width=700px; height=700px></canvas>`);
    document.getElementById('container').appendChild(canvasCode)
    startGame(Playername);
}

//loads the splash screen
function loadSplash(){
    document.getElementById('container').innerHTML='';
    let splashCode = buildDom(
        `<div id='splashScreen' class='screen'>
        <h1> Jumping <br>Jack Flash</h1>
        <button id="start-btn" class='button'>Start</button>
        <button id="high-btn" class='button'>High Scores</button>
        <div id='instructions-panel'>
            <h2>Controls</h2>
            <ul id='instructions'>
                <li>Jump</li>
                <li><img src="letter_w.png" alt="W Key" width = "50px" height="50px"></li>
                <li>Left<img src="letter_a.png" alt="W Key" width = "50px" height="50px"><img src="letter_d.png" alt="W Key" width = "50px" height="50px"> Right</li>
            </ul>
        </div>
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
    console.log (localStorage)
}
//loads the high scores screen
function loadHigh(){
    document.getElementById('container').innerHTML='';
    let highCode = buildDom (`<div id='highScreen' class='screen'>
                                <div id="highPanel">
                                <h1>High Scores</h1>
                                <ol id='scoresList'>
                                <li id='list-header'><span>Player</span><span>Score</span>
                                </ol>
                                </div>
                                <button id="back-btn" class='button'>Back to Title</button>
                                <div>
                                `)
    document.getElementById('container').appendChild(highCode)
    let backBtn = document.querySelector('#back-btn');
    backBtn.addEventListener('click', ()=>loadSplash());

    for (i=0; i<localStorage.length;i++){
        console.log (localStorage)
        // localStorage.sort((a, b) =>{
        //     if (a > b){return 1;}
        //     else if(a < b) {return -1;}
        //     else {return 0;}
        // })
        let entry = document.createElement('li');
        entry.innerHTML=`<span>${localStorage.key(i)}</span> <span>${localStorage.getItem(localStorage.key(i))}</span>`
        document.getElementById('scoresList').appendChild(entry);
    }

}



window.addEventListener('load', ()=>{screenSelector()})
