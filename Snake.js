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
    isDead: false,
    headColor: "red",
    snakeTail: {
        
    },
    // starts the interval calls to draw the board
    start: () => {
        interval = setInterval(() => {
            gameBoard()
        },150)
        snakeObj.displayPause = false 
        snakeObj.isDead = false
    },
    // clears the draw interval
    stop: () => {
        clearInterval(interval);
        snakeObj.displayPause = true;
    },
    //resets the board and clears the draw interval
    dead: async () => {
        clearInterval(interval)
        resetBoard()
        snakeObj.isDead = true
    },
    draw: () => {
        c.beginPath()
        c.fillStyle = `${snakeObj.headColor}`
        c.fillRect(snakeObj.currentCoordinates.x, snakeObj.currentCoordinates.y, snakeObj.size, snakeObj.size)
        c.stroke()
    },  
}

const tail = {
    length: 0,
    tailArr: [],
    tailColor: "grey",
    update: () => {
        const arr = []
        if(snakeObj.length > 0){
            tail.tailArr.unshift(snakeObj.previousCoordinates)

            for(let i = 0; i < tail.tailArr.length; i++){
                arr.push(tail.tailArr[i])
            }     
            tail.tailArr = [...arr.slice(0, snakeObj.length + 1)]
        }
    },
    draw: () => {
        tail.update()
    if(snakeObj.length >= 1){            
         // snakeObj.snakeTail.tailArr.forEach(element => {
        for(let i = 0; i < tail.tailArr.length; i++){                    
                 c.beginPath()
                 c.fillStyle = `${tail.tailColor}`
                 c.fillRect(tail.tailArr[i-1 >= 0?i-1:i]?.x, tail.tailArr[i-1 >= 0?i-1:i]?.y, snakeObj.size, snakeObj.size)
                 c.stroke()
            }
    }
    
}      
}

const foodObj = {
    x: boardXStart + 125,
    y: boardYStart + 125,
    size: 25,
    dx: 25,
    dy: 25,
    displayPause: true,
    foodColor: "yellow",
    draw: () => {
        c.beginPath()
        c.fillStyle = `${foodObj.foodColor}`
        c.fillRect(foodObj.x, foodObj.y , 25, 25)
        c.stroke()
    }
}
//Draw the board on initial load
window.addEventListener('DOMContentLoaded',()=>{
    drawBoard()
    snakeObj.draw()
})

//detect space bar and toggle game state pause or unpause
window.addEventListener('keydown',(e)=>{
    setKey(e)
    if(e.key === ' '){
        if(snakeObj.displayPause){
            console.log("unpaused")
            snakeObj.start()
        }
        else{
            console.log("pause")
            snakeObj.stop()
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
            snakeObj.dead()
        }else{

            snakeObj.currentCoordinates.y -= snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowRight'){
        if(snakeObj.currentCoordinates.x === boardXStart + 275){
            // snakeObj.currentCoordinates.x = boardXStart
            snakeObj.dead()
        }else{
            snakeObj.currentCoordinates.x += snakeObj.dx
        }
    }
    if(snakeObj.currentKey === 'ArrowDown'){
        if(snakeObj.currentCoordinates.y === boardYStart + 275){
            // snakeObj.currentCoordinates.y = boardYStart
            snakeObj.dead()
        }else{
            snakeObj.currentCoordinates.y += snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowLeft'){
        if(snakeObj.currentCoordinates.x === boardXStart){
            // snakeObj.currentCoordinates.x = boardXStart + 275
            snakeObj.dead()
        }else{
            snakeObj.currentCoordinates.x -= snakeObj.dx
        }
    }  
    // draws food object in a random location on the board
    if(snakeObj.isDead === false){        
        foodObj.draw()
        // draws snake head
        snakeObj.draw()
        // draws snake tail 
        if(snakeObj.length >= 1) {            
            tail.draw()  
        }
        // sets previousCoordinates to currentCoordinates AFTER drawing current frame
        // makes a tail following effect.
        snakeObj.previousCoordinates = {...snakeObj.currentCoordinates}
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
    foodObj.draw()
}

//checks snake coordinates against the food coordinates
const checkCoordinates = () => {
    if(snakeObj.currentCoordinates.x === foodObj.x && snakeObj.currentCoordinates.y === foodObj.y){
        getRandomCoordinates()
        snakeObj.length++ 
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
    snakeObj.previousCoordinates.x = boardXStart
    snakeObj.previousCoordinates.y = boardYStart
    snakeObj.length = 0
    snakeObj.currentKey = "ArrowDown"
    snakeObj.displayPause = true
    tail.tailArr = []
    c.clearRect(0,0,300,300)
    drawBoard()
    snakeObj.draw()
}