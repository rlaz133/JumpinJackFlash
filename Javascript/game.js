
class Character{
    constructor(){
        this.x=10
        this.y=538
        this.width =66
        this.height=92
        this.direction = 'right'
    }
}

//startGame encompasses all the game functions to make sure they get loaded after clicking on Start.
function startGame(playerName){

    if (!playerName){playerName='Jack Flash'}

    let backgroudMusic = new Audio;
    backgroudMusic.src = 'sounds/Starlit Skies-cut.mp3'
    backgroudMusic.play();
    let jumpsound = new Audio;
    jumpsound.src = 'sounds/jumpsound.mp3';
    let oversound = new Audio;
    oversound.src = 'sounds/gameover.mp3'

    let screen = document.getElementById('canvas');
    screen.style.border = '3px solid black';
    screen.style.backgroundColor = '#3874F7';
    let ctx = screen.getContext('2d');
    let frame =0;

    let diff =0.5;



    let randx = Math.floor(Math.random()*630)
    let randw = Math.floor(Math.random()*4) + 2   
    let spikeX = randx+ (Math.floor(Math.random()*(randw-1)+1) *70)  
    let spikeChance = Math.random()+diff
    let hasSpike;
    let spiketouched =false;
    spikeChance<0.4 ? hasSpike=true : hasSpike=false
    let platforms =[
        {x: 0, y: 630, width:10},
        {x: 300, y: 430, width:3},
        {x: 0, y:300, width:2},
        {x: 300, y:125, width:4},
        {x: randx, y: -70, width: randw}
    ];
    let spikes = [
        {x: spikeX, y:-140,  exists: false},
        {x: 370, y: 360,  exists: true},
        {x: spikeX, y:-140,  exists: false},
        {x: spikeX, y:-140,  exists: false},
        {x: spikeX, y:-140,  exists : hasSpike}, ]


    let char = new Character();
    let charpic = new Image();
    let goRight = false;
    let goLeft = false;
    let jump = false;
    let framejump =0;
    let jumped = false;

    let fg = new Image();
    fg.src = 'images/scenario/grass.png';
    let spike = new Image();
    spike.src ='images/scenario/spikes.png'


    let rightcollision;
    let leftcollision;
    let bottomcollision;
    let topcollision;
    
    let cloud = new Image();
    cloud.src='images/scenario/cloud1.png'
    let clouds = [
        {x:-15, y: 270},
        {x: 500, y: 130},
        {x: 430, y:-71}]
   




    //Main game interval
    intervalId = setInterval(() => {
        frame++;
        drawMain()}, 33)

    //Main drawing function that will be updated on the interval
    function drawMain(){
        collisionsCleaner();  
        ctx.clearRect(0, 0, screen.width,screen.height);
        inputHandler();
        checkCollisions();
        drawClouds();
        generatePlatform();
        drawCharacter(); 
        gameOver();
        gameTime();
    }

    //Listener for the player input
    function inputHandler (){

    document.addEventListener('keydown', function(event){
        if (event.key === 'w' &&  bottomcollision){
            jump = true;
            framejump = frame;
            if (!jumped){
                jumpsound.play();
                jumped=true;
            }
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
        if (event.key === 'w'){
            jump = false;
        }
    })
}

    //Puts clouds in the sky
    function drawClouds(){
        for (i=0; i<clouds.length; i++){
                ctx.drawImage(cloud, clouds[i].x, clouds[i].y);
               
            clouds[i].y+=diff/2;
            if (clouds[i].y < 100+diff && clouds[i].y>100){
                let randx = Math.floor(Math.random()*670);
                clouds.push ({
                x: randx,
                y: -71
                })
            } 
        }
        
    }



    //Updates the Player character
    function drawCharacter(){
        if (char.direction === 'right') {charpic.src = 'images/character/p1_stand.png';}
        if (char.direction === 'right' && jump) {charpic.src = 'images/character/p1_jump.png'}
        if (char.direction === 'left') {charpic.src = 'images/character/p1_stand_left.png';}
        if (char.direction === 'left' && jump) {charpic.src = 'images/character/p1_jump_left.png';}
        characterMove();
        ctx.drawImage(charpic, char.x, char.y)
    }

    //Here is the logic for the character movement
    function characterMove(){
        char.y+=diff;
        if (!bottomcollision){char.y+=3}
        if (jump && framejump +60 > frame && !topcollision){
            if (char.direction === 'right' && !rightcollision){
                char.y-=7;
                if (char.x + char.width < screen.width){char.x += 5}
                else {char.x =0};
            }
            else if (char.direction === 'left'&& !leftcollision){
                if (char.x > 0){char.x -= 5}
                else {char.x = screen.width-char.width}
                char.y -= 7;
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
            for (let j =0; j< platforms[i].width; j++){
                ctx.drawImage(fg, (platforms[i].x+ (70*j)), platforms[i].y);
                if (spikes[i].exists){
                ctx.drawImage (spike, spikes[i].x, spikes[i].y) 
                }
            }
            platforms[i].y+=diff;
            spikes[i].y+=diff;
            if ( platforms[i].y == 110+diff){
                let randx = Math.floor(Math.random()*630)
                let randw = Math.floor(Math.random()*4) + 3
                let spikeX = randx+ (Math.floor(Math.random()*(randw-1)+1) *70)  
                let spikeChance = Math.random()
                let hasSpike;
                spikeChance<0.3 ? hasSpike=true : hasSpike=false
                platforms.push ({
                    x: randx,
                    y: -70 ,
                    width: randw
                })
                spikes.push({
                    x: spikeX,
                    y: -140,
                    exists: hasSpike
                });
            }
        }
    }

    // This function checks every platform created for collisions
    function checkCollisions(){
        platforms.forEach((platform, i)=>{
         if (char.x+char.width>=platform.x && char.x+char.width<platform.x+5 && char.y<platform.y+70 && char.y+char.height>platform.y){
            rightcollision = true;}
        if (char.x<=platform.x+70*platform.width && char.x>platform.x-5+70*platform.width && char.y<platform.y+70 && char.y+char.height>platform.y){
            leftcollision =true;
        }
        if(char.y+char.height>=platform.y && char.y+char.height<platform.y+5 && char.x<platform.x+70*(platform.width) && char.x+char.width > platform.x){
            bottomcollision=true;
            jumped = false;
        }
        if(char.y<=platform.y+70 && char.y>platform.y+65 && char.x<platform.x+70*platform.width && char.x+char.width > platform.x){
            topcollision=true;
            jump=false;
        }
    })

    spikes.forEach((spike, i)=>{
        if (spike.exists ===true){
            if (char.x+char.width>=spike.x && char.x+char.width<spike.x+5 && char.y<spike.y+70 && char.y+char.height>spike.y+30){
            spiketouched = true;}
            if (char.x<=spike.x+70 && char.x>spike.x-5+70 && char.y<spike.y+70 && char.y+char.height>spike.y+30){
                spiketouched =true;
            }
            if(char.y+char.height>=spike.y+30 && char.y+char.height<spike.y+35 && char.x<spike.x+70 && char.x+char.width > spike.x){
                spiketouched=true;
            }
            if(char.y<=spike.y+70 && char.y>spike.y+65 && char.x<spike.x+70 && char.x+char.width > spike.x){
                spiketouched=true;
            }
    }
   })}



    //Cleans the collision booleans so that the character can move again
    function collisionsCleaner(){
        rightcollision=false;
        leftcollision=false;
        bottomcollision=false;
        topcollision=false;
    }

    //Activates the game over
    function gameOver(){
        if (char.y>screen.height || spiketouched){
            oversound.play();
            localStorage.setItem(`Jumper::${playerName}::${Math.random()}`, gameTime())
            clearInterval(intervalId)
            backgroudMusic.pause();
            backgroudMusic.currentTime = 0;
            loadRetry(gameTime(), playerName)
            spiketouched = false;}
            
         
    }
   
    //Calculates the game time
    function gameTime(){
        time = (frame/30).toFixed(0);
        ctx.font = "30px JumpinFont"
        ctx.fillText(`${time}`, 15, 30)
    if (frame%300 ===0){diff+=0.5}
    return time;
    }
}
        
