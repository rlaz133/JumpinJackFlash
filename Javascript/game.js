//startGame encompasses all the game functions to make sure they get loaded after clicking on Start.
function startGame(){
    let screen = document.getElementById('canvas');
    screen.style.border = '3px solid black';
    screen.style.backgroundColor = '#3874F7';
    let ctx = screen.getContext('2d');
    let frame =0;
    let randy = Math.floor(Math.random()*400)
        let randx = Math.floor(Math.random()*630)
        let randw = Math.floor(Math.random()*4) + 3
        
    let platforms =[
        {x: 0, y: 630, width:10},
        {x: 450, y: 420, width:5},
        {x: 100, y:210, width:3},
        {x: 500, y:210, width:3},
        {x: randx, y: 0, width: randw}];

    let char = new Character();
    let charpic = new Image();
    let goRight = false;
    let goLeft = false;
    let jump = false;
    let framejump =0;
    let fg = new Image();
    fg.src = 'grass.png';
    let rightcollision = false

function checkCollisions(){
    platforms.forEach((platform, i)=>{
    if (char.x+charpic.width>=platform.x && char.y<platform.y+platform.height && char.y+charpic.height>platform.y){
        rightcollision = true;
        console.log (rightcollision)}
})}
    
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
        ctx.clearRect(0, 0, screen.width,screen.height);
        generatePlatform();
        drawCharacter();
        checkCollisions()
        
    }

    //Updates the Player character
    function drawCharacter(){
        if (char.direction === 'right') {charpic.src = 'p1_stand.png';}
        if (char.direction === 'left') {charpic.src = 'p1_stand_left.png';}
        characterMove();
        ctx.drawImage(charpic, char.x, char.y)
    }

    //Here is the logic for the character movement
    function characterMove(){
        if (jump && framejump +30 > frame){
            if (char.direction === 'right'){
                char.y-=5
                if (char.x + char.width < screen.width){char.x += 5}
                else {char.x =0};
            }
            else if (char.direction === 'left'){
                if (char.x > 0){char.x -= 5}
                else {char.x = screen.width-char.width}
                char.y -= 5;
            }
        }
        if (jump && framejump +30 === frame){
                jump = false;
        }
        if (goRight && !jump){
            if (char.x + char.width < screen.width){char.x += 5}
            else {char.x =0};
            char.direction='right';
        }
        else if (goLeft && !jump){
            if (char.x > 0){char.x -= 5}
            else {char.x = screen.width-char.width}
            char.direction='left';
        }
    }

    //Creates a platform in the coordinates and of the width specified and pushes it into an array
    function generatePlatform (){

        for (i=0; i<platforms.length; i++){
            //let platfomrCount = Math.floor(Math.random()*8)
            for (let j =0; j< platforms[i].width; j++){
                ctx.drawImage(fg, (platforms[i].x+ (70*j)), platforms[i].y);
            }
            
            platforms[i].y++
            if ( platforms[i].y == 200){
                let randy = Math.floor(Math.random()*400)
                let randx = Math.floor(Math.random()*630)
                let randw = Math.floor(Math.random()*4) + 3
                platforms.push ({
                    x: randx,
                    y: 0 ,
                    width: randw,
                });
            }
        }
        
    }

    //Calculates coordinates to feed the generatePlatform function

    function randomizePlatform(){
        generatePlatform()
    }
}
