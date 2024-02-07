const INNER_STRINGS = {
  CANVAS: `<canvas id='canvas' width=700px; height=700px></canvas>`,
  SPLASH: `<div id='splashScreen' class='screen'>
  <h1> Jumping <br>Jack Flash</h1>
  <button id="start-btn" class='button'>Start</button>
  <button id="high-btn" class='button'>High Scores</button>
  <input type="text" id="playerName" placeholder="Enter your name">
  <div id='instructions-panel'>
      <h2>Controls</h2>
      <ul id='instructions'>
          <li>Jump</li>
          <li><img src="images/keys/letter_w.png" alt="W Key" width = "50px" height="50px"></li>
          <li>Left<img src="images/keys/letter_a.png" alt="A Key" width = "50px" height="50px"><img src="images/keys/letter_d.png" alt="D Key" width = "50px" height="50px"> Right</li>
      </ul>
  </div>
</div>`,
RETRY:  `<div id='retryScreen' class='screen' >
<h2>You have lasted for <span id='score'></span> seconds</h2>
<h1>Retry?</h1>
<div>
  <button id="yes-btn" class ='button'>Yes</button>
  <button id="no-btn" class = 'button'>No</button>
</div>
</div>`,
HIGH_SCORES: `<div id='highScreen' class='screen'>
<div id="highPanel">
<h1>High<br> Scores</h1>
<ol id='scoresList'>
<li id='list-header'><span>Player</span><span>Score</span></p>
</ol>
</div>
<div id='buttonbox'>
<button id="back-btn" class='button'>Back to Title</button>
</div>
</div>
`
};

const ROUTES = {
  MUSIC: {
    BACKGROUND: 'sounds/Starlit Skies-cut.mp3',
    JUMP: 'sounds/jumpsound.mp3',
    GAME_OVER: 'sounds/gameover.mp3'
  },
  IMAGES: {
    CHARACTER:{
      STAND_RIGHT: 'images/character/p1_stand.png',
      JUMP_RIGHT: 'images/character/p1_jump.png',
      STAND_LEFT: 'images/character/p1_stand_left.png',
      JUMP_LEFT: 'images/character/p1_jump_left.png'
    },
    GRASS: 'images/scenario/grass.png',
    SPIKE: 'images/scenario/spikes.png',
    CLOUD: 'images/scenario/cloud1.png'
  }
}