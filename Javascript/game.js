//startGame encompasses all the game functions to make sure they get loaded after clicking on Start.
//by itself, 

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


}
