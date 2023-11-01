let eat = new Audio('eat.mp3.wav')
let move = new Audio('move.mp3.wav')
let over = new Audio('over.mp3.wav')
let score = 0


let inputDir = {
    x: 0,
    y: 0
}
let speed = 7
let lastPaintTime = 0
let snakeArr = [{
    x: 13, y: 10
}]
food = {
    x: 10, y: 16
}
// game functions 
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        // console.log(ctime)
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}
function isCollide(snake){
    // IF SNAKE EATS HIM SELF
    for (let i =1; i < snakeArr.length; i++){
if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
    over.play()
    return true;
}
    }
if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
    return true;
}

}



function gameEngine() {
    // updating the snake array 
    if(isCollide(snakeArr)){
        over.play();
        eat.pause();
        
        inputDir ={x:0 , y:0}
        alert("Game over press any key to play Agian!")
        // location.reload()
        score = 0
        scoreBox.innerHTML = "Score" +score
        snakeArr = [{x: 13, y: 10}];
        
        
        
        
    }


    // if you have eaten the food then regenrate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        eat.play()
        score += 1
        scoreBox.innerHTML = "Score : " + score;
        
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2
        let b = 16
        food = {x: Math.round(a+ (b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }
    



    // moving the snake


    for(let i = snakeArr.length-2 ;i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    



    // display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('body')
        }

        board.appendChild(snakeElement)

    });
    // display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)




}


//main logics
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }      //start the gmae
    move.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})