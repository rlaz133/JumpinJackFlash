# Project's name
Jumping Jack Flash

## Description
Jumping Jack Flash is a platforming game where you control the character as he jumps from platform to platform in order to reach the goal situated on the top of the stage. The stage has an automatic vertical scroll, and the character has to be fast on his ascension since touching the bottom means game over.

## MVP (DOM - CANVAS)
The PC is controlled via keyboard. It can move horizontally and jump.
If the PC reaches the left of the screen and keeps moving left, he will appear on the right extreme and viceversa.
The screen will continually scroll upwards and it will have platforms for the PC to jump on.
Some platforms will have spikes, which will kill the PC if touched.
Winning condition: reaching the goal at the top. Losing condition: touching the bottom of the screen or a set of spikes.


## Backlog
- Add an alternative control mode (wasd or arrows)
- Add sound effects
- Add difficulty levels that modify the speed of the scroll


## Data structure

### Main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildRetryScreen () {}

### Game.js

- drawStage () {}
- drawPlayer () {}
- updateStage (){}
- clearStage (){}
- gameOver(){}

### Player.js

- Player (){}
  - this.x
  - this.y
  - this.border[upper, lower, right, left]
  - this.direction
- checkCollisions(){}
  - checkBottomStage
  - checkPlatform
  - check Spike
- move(){}
  - jump
  - left
  - right
  - fall

### Objects.js

- Object(){}
  - this.x
  - this.y
  - this.border[upper, lower, right, left]
- Platform(){} extends Object
- Spike(){} extends Object
- Goal(){} extends Object


Classes and methods definition.


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- retryScreen


## Task
Task definition in order of priority


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
