//startGame encompasses all the game functions to make sure they get loaded after clicking on Start.
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
    let jump = false;
    let framejump =0;
    let fg = new Image();
    fg.src = 'grass.png';


    
    //Main game interval
    intervalId = setInterval(() => {
        frame++;
        drawMain()}, 33)


    //Here is the listener for the character movement
    document.addEventListener('keydown', function(event){
        if (event.key === 'w'){
            jump = true;
            framejump = frame;
        }
        else if (event.key === 'd'){
            goRight = true;
            goLeft = false
            char.direction ='right'
        } 
        else if (event.key === 'a'){
            goLeft= true; 
            goRight = false;
            char.direction = 'left'
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
        generatePlatform(0, 630, 10);
        drawCharacter();
        if (platforms.length <2) {randomizePlatform()};
    }


    //Updates the Player character
    function drawCharacter(){
        ctx.clearRect(char.x, char.y, charpic.width,charpic.height);
        characterMove();
        ctx.drawImage(charpic, char.x, char.y)
    }

    //Here is the logic for the character movement
    function characterMove(){
        if (jump && framejump +30 > frame){
            if (char.direction === 'right'){
                char.y-=5
                if (char.x + charpic.width < screen.width){char.x += 5}
                else {char.x =0};
            }
            else if (char.direction === 'left'){
                if (char.x > 0){char.x -= 5}
                else {char.x = screen.width-charpic.width}
                char.y -= 5;
            }
        }
        if (jump && framejump +30 === frame){
                jump = false;
        }
        if (goRight && !jump){
            if (char.x + charpic.width < screen.width){char.x += 5}
            else {char.x =0};
            char.direction='right';
        }
        else if (goLeft && !jump){
            if (char.x > 0){char.x -= 5}
            else {char.x = screen.width-charpic.width}
            char.direction='left';
        }
    }


    //Creates a platform in the coordinates and of the width specified and pushes it into an array
    function generatePlatform (x, y, width){
        for (i=0; i<width; i++){
        ctx.drawImage(fg, x+fg.width*i, y);}
        platforms.push (fg);
    }

    //Calculates coordinates to feed the generatePlatform function

    function randomizePlatform(){
        let randw = Math.floor(Math.random()*10)
        let randx = Math.floor(Math.random()*630)
        // let randy = Math.floor(Math.random()*400)
        generatePlatform(randx, 30, randw)
    }
}
