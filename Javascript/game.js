//startGame encompasses all the game functions to make sure they get loaded after clicking on Start.
//by itself, 
// let randw = Math.floor(Math.random()*10)
// let randx = Math.floor(Math.round()*630)
// console.log(randx, randw)


function startGame(){
    let screen = document.getElementById('canvas');
    screen.style.border = '3px solid black';
    screen.style.backgroundColor = '#3874F7';
    let ctx = screen.getContext('2d');

    intervalId = setInterval(() => {requestAnimationFrame(drawMain)}, 20)

    //Main drawing function that will be updated on the interval
    function drawMain(){
        generatePlatform(0, 630, 10);
        drawCharacter();
        randomizePlatform();
    }

    //Draws a platform in the coordinates and of the width specified
    function generatePlatform (x, y, width){
        let fg = new Image();
        fg.src = 'grass.png';
        for (i=0; i<width; i++){
        ctx.drawImage(fg, x+fg.width*i, y);}
    }

    //Draws the Player character
    function drawCharacter(){
        let char = new Character();
        let charpic = new Image();
        charpic.src = 'p1_stand.png';
        ctx.drawImage(charpic, char.x, char.y)
    }

    //Calculates coordinates to feed the generatePlatform function

    function randomizePlatform(){
        let randw = Math.floor(Math.random()*10)
        let randx = Math.floor(Math.random()*630)
        let randy = Math.floor(Math.random()*400)
        generatePlatform(randx, randy, randw)
    }
}
