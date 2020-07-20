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
        {x: 250, y: 430, width:5},
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
    let rightcollision
    let leftcollision
    let bottomcollision;
    let topcollision

function checkCollisions(){
    platforms.forEach((platform, i)=>{
     if (char.x+char.width>=platform.x && char.x+char.width<platform.x+5 && char.y<platform.y+70 && char.y+char.height>platform.y){
        rightcollision = true;}
    if (char.x<=platform.x+70*platform.width && char.x>platform.x-5+70*platform.width && char.y<platform.y+70 && char.y+char.height>platform.y){
        leftcollision =true;
    }
    if(char.y+char.height>=platform.y && char.y+char.height<platform.y+5 && char.x<platform.x+70*platform.width && char.x+char.width > platform.x){
        bottomcollision=true;
    }
    if(char.y<=platform.y+70 && char.y>platform.y+65 && char.x<platform.x+70*platform.width && char.x+char.width > platform.x){
        topcollision=true;
        console.log (platform)
    }
})}
    
    //Main game interval
    intervalId = setInterval(() => {
        frame++;
        drawMain()}, 33)


    //Here is the listener for the character movement
    document.addEventListener('keydown', function(event){
        if (event.key === 'w' &&  bottomcollision){
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
        rightcollision=false;
        leftcollision=false;
        bottomcollision=false;
        topcollision=false;
        ctx.clearRect(0, 0, screen.width,screen.height);
        checkCollisions()
        generatePlatform();
        drawCharacter();

        
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

        char.y++;
        if (!bottomcollision){char.y++}
        if (jump && framejump +60 > frame && !topcollision){
            if (char.direction === 'right' && !rightcollision){
                char.y-=5
                if (char.x + char.width < screen.width){char.x += 5}
                else {char.x =0};
            }
            else if (char.direction === 'left'&& !leftcollision){
                if (char.x > 0){char.x -= 5}
                else {char.x = screen.width-char.width}
                char.y -= 5;
            }
        }
        if (jump && framejump +60 === frame){
                jump = false;
        }
        if (goRight && !jump && !rightcollision){
            if (char.x + char.width < screen.width){char.x += 5}
            else {char.x =0};
            char.direction='right';
        }
        else if (goLeft && !jump && !leftcollision){
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
