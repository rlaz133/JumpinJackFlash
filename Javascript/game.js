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
    let frame =0;
    let platforms =[];
    let char = new Character();
    let charpic = new Image();
    charpic.src = 'p1_stand.png';
    let goRight = false;
    let goLeft = false;


    

    intervalId = setInterval(() => {drawMain()}, 33)


    //Here is the logic for the character movement
    document.addEventListener('keydown', function(event){
        if (event.key === 'd'){
            goRight = true;
            goLeft = false
        } 
        else if (event.key === 'a'){
            goLeft= true; 
            goRight = false;
        } 
    })

    document.addEventListener('keyup', function(event){
        if (event.key === 'd'){
            goRight = false;
        } 
        else if (event.key === 'a'){
            goLeft= false; 
        } 
    })

    //Main drawing function that will be updated on the interval
    function drawMain(){
        clearScreen();
        frame++;
        generatePlatform(0, 630, 10);
        drawCharacter();
        if (frame <4) {randomizePlatform()};
        characterMove();
    }

    //function to clear the screen every frame
    function clearScreen(){
        ctx.clearRect(0, 0, screen.width, screen.height)
    }

    //Draws a platform in the coordinates and of the width specified
    function generatePlatform (x, y, width){
        let fg = new Image();
        fg.src = 'grass.png';
        for (i=0; i<width; i++){
        ctx.drawImage(fg, x+fg.width*i, y);}
        platforms.push (fg);
    }

    //Draws the Player character
    function drawCharacter(){

        ctx.drawImage(charpic, char.x, char.y)
        
    }
    function characterMove(){
        if (goRight && char.x < screen.width - charpic.width){
            char.x = char.x + 5
        }
        else if (goLeft && char.x > 0){
            char.x = char.x - 5
        }
    }



    //Calculates coordinates to feed the generatePlatform function

    function randomizePlatform(){
        let randw = Math.floor(Math.random()*10)
        let randx = Math.floor(Math.random()*630)
        // let randy = Math.floor(Math.random()*400)
        generatePlatform(randx, 30, randw)
    }

    //Moves the character
    // function characterMove(){

    // }
}
