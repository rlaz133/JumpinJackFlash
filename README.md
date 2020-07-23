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

- buildDom (){}
- screenSelector(){}
- buildSplashScreen () {}
- buildGameScreen () {}
- buildRetryScreen () {}

### Game.js

- Character (){}
  - this.x
  - this.y
  - this.width
  - this.heigth
  - this.direction
- startGame () {}
- drawMain (){}
- inputHandler(){}
- drawCharacter(){}
- characterMove(){}
- generatePlatform(){}
- checkCollisions(){}
- collisionsCleaner(){}
- gameOver(){}
- gameTime(){}


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen into gameScreen
- gameScreen into retryScreen
- retryScreen into splashScreen or gameScreen


## Task

- 1 stage - build the skelleton
  - build DOM
  - buildSplashScreen
  - buildGameScreen
- 2 stage - create the assets
  - Game screen basics: start game, draw stage (background and floor)
  - Create player character: create class, draw on Game screen
  - Create objects
- 3 stage - build the gameplay
   - Build PC movement
   - Build collisions
   - Draw objects on stage
 - 4 stage - Put everything together
   - Incorporate collisions on the stage
   - Create scrolling
   - Game over function
   - Build Retry screen


## Links


### Trello
[Link url](https://trello.com/b/Kf3s6baJ/jumpin-jack-flash-game)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/rlaz133/JumpinJackFlash)
[Link Deploy](https://rlaz133.github.io/JumpinJackFlash/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/17ZCwG4dG7oaewJQmovGi83nP1dM7-SsVb6UprDVYEvk/edit?usp=sharing)
