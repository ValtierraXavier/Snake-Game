const canvas = document.getElementById("canvas")
canvas.height = 300
canvas.width = 300
c = canvas.getContext("2d")
//the snake board (0,0 coordinates)
const boardXStart = 0
const boardYStart = 0
const boardSize = 300
//used to calculate the active board area with relation to the snake head size
const divs = boardSize / 25
const minX = (boardXStart)
const maxX = (boardXStart + 275)
const minY = (boardYStart)
const maxY = (boardYStart + 275)
let interval
const blink = (ms) => {
    return new Promise (resolve => setTimeout(()=>{resolve()}, ms))
}

const snakeObj = {
    currentCoordinates: {
        x: boardXStart,
        y: boardYStart
    },
    previousCoordinates:{
        x: boardXStart,
        y: boardYStart
    },    
    size: 25,
    dx: 25,
    dy: 25,
    length: 0,
    currentKey: 'ArrowDown',
    displayPause: true,
    dead: false,
    headColor: "red",
    snakeTail: {
        length: 0,
        tailArr: [],
        tailColor: "grey"
    },
    // starts the interval calls to draw the board
    startSnake: () => {
        interval = setInterval(() => {
            gameBoard()
        },300)
        snakeObj.displayPause = false 
        snakeObj.dead = false
    },
    // clears the draw interval
    stopSnake: () => {
        clearInterval(interval);
        snakeObj.displayPause = true;
    },
    //resets the board and clears the draw interval
    snakeDead: async () => {
        clearInterval(interval)
        resetBoard()
        snakeObj.dead = true
    },
    drawSnake: () => {
        c.beginPath()
        c.fillStyle = `${snakeObj.headColor}`
        c.fillRect(snakeObj.currentCoordinates.x, snakeObj.currentCoordinates.y, snakeObj.size, snakeObj.size)
        c.stroke()
    },
    drawSnakeTail: () => {        
        c.beginPath()
        c.fillStyle = `${snakeObj.snakeTail.tailColor}`
        c.fillRect(snakeObj.previousCoordinates.x, snakeObj.previousCoordinates.y, snakeObj.size, snakeObj.size)
        c.stroke()
    }
}

const foodObj = {
    x: boardXStart,
    y: boardYStart,
    size: 25,
    dx: 25,
    dy: 25,
    displayPause: true,
    foodColor: "yellow",
    drawFood: () => {
        c.beginPath()
        c.fillStyle = `${foodObj.foodColor}`
        c.fillRect(foodObj.x, foodObj.y , 25, 25)
        c.stroke()
        console.log(snakeObj.length)
    }
}
//Draw the board on initial load
window.addEventListener('DOMContentLoaded',()=>{
    drawBoard()
    snakeObj.drawSnake()
})

//detect space bar and toggle game state pause or unpause
window.addEventListener('keydown',(e)=>{
    setKey(e)
    if(e.key === ' '){
        console.log("called")
        if(snakeObj.displayPause){
            console.log("unpaused")
            snakeObj.startSnake()
        }
        else{
            console.log("pause")
            snakeObj.stopSnake()
        }
    }
}) 

//handle game functions
const gameBoard = ()=>{
    
    //if game is not paused check the coordinates of snake vs food and draw new foodObj if overlapping
    if(!snakeObj.displayPause){
        checkCoordinates()
    }
    //draw black board
    drawBoard()
    //move snake head in a direction based on input
    if(snakeObj.currentKey === 'ArrowUp'){
        if(snakeObj.currentCoordinates.y === boardYStart){
            // snakeObj.currentCoordinates.y = boardYStart + 275
            snakeObj.snakeDead()
        }else{

            snakeObj.currentCoordinates.y -= snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowRight'){
        if(snakeObj.currentCoordinates.x === boardXStart + 275){
            // snakeObj.currentCoordinates.x = boardXStart
            snakeObj.snakeDead()
        }else{
            snakeObj.currentCoordinates.x += snakeObj.dx
        }
    }
    if(snakeObj.currentKey === 'ArrowDown'){
        if(snakeObj.currentCoordinates.y === boardYStart + 275){
            // snakeObj.currentCoordinates.y = boardYStart
            snakeObj.snakeDead()
        }else{
            snakeObj.currentCoordinates.y += snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowLeft'){
        if(snakeObj.currentCoordinates.x === boardXStart){
            // snakeObj.currentCoordinates.x = boardXStart + 275
            snakeObj.snakeDead()
        }else{
            snakeObj.currentCoordinates.x -= snakeObj.dx
        }
    }  
    // draws food object in a random location on the board
    if(snakeObj.dead === false){        
        foodObj.drawFood()
        //draws snake head
        snakeObj.drawSnake()  
        snakeObj.drawSnakeTail()  
        snakeObj.previousCoordinates = {...snakeObj.currentCoordinates}
        console.log(snakeObj.previousCoordinates)
    }
}

//draws a fresh board 
const drawBoard = () => {
    c.clearRect(boardXStart, boardYStart, canvas.width, canvas.height)
    c.beginPath()
    c.fillStyle = 'black'
    c.fillRect(boardXStart, boardYStart, boardSize, boardSize)
    c.stroke()
}

//gets random coordinates to draw food object in a random location on the board
const getRandomCoordinates = () => {
    c.clearRect(foodObj.x, foodObj.y, 25, 25)
    const randomXMultiplier = Math.floor(Math.random() * divs)
    const randomYMultiplier = Math.floor(Math.random() * divs)
    foodObj.x = randomXMultiplier * 25
    foodObj.y = randomYMultiplier * 25
    foodObj.drawFood()
}

//checks snake coordinates against the food coordinates
const checkCoordinates = () => {
    if(snakeObj.currentCoordinates.x === foodObj.x && snakeObj.currentCoordinates.y === foodObj.y){
        getRandomCoordinates()
        snakeObj.length += 1
    }
}

//sets what arrowkey was press for snake head direction
const setKey = (key) => {
    if(key.key === ' '){
        return
    }
    if(key.key === 'ArrowUp' || key.key === 'ArrowDown' || key.key === 'ArrowLeft' || key.key === 'ArrowRight'){
        key.preventDefault()
        snakeObj.currentKey = key.key
    }
}

//resets all parameters and draws a fresh board
const resetBoard = async () => {
    snakeObj.currentCoordinates.x = boardXStart
    snakeObj.currentCoordinates.y = boardYStart
    snakeObj.length = 0
    snakeObj.currentKey = "ArrowDown"
    snakeObj.displayPause = true
    c.clearRect(0,0,300,300)
    drawBoard()
    snakeObj.drawSnake()
}