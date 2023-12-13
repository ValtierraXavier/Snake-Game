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

const head = {
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
    // starts the interval calls to draw the board
    start: () => {
        interval = setInterval(() => {
            gameBoard()
        },150)
        head.displayPause = false 
        head.isDead = false
    },
    // clears the draw interval
    stop: () => {
        clearInterval(interval);
        head.displayPause = true;
    },
    //resets the board and clears the draw interval
    dead: async () => {
        head.isDead = true
        clearInterval(interval)
        resetBoard()
    },
    draw: () => {
        c.beginPath()
        c.fillStyle = `${head.headColor}`
        c.fillRect(head.currentCoordinates.x, head.currentCoordinates.y, head.size, head.size)
        c.stroke()
    },  
}

const tail = {
    length: 0,
    tailArr: [],
    tailColor: "grey",
    update: () => {
        const arr = []
        if(head.length > 0){
            tail.tailArr.unshift(head.previousCoordinates)

            for(let i = 0; i < tail.tailArr.length; i++){
                arr.push(tail.tailArr[i])
            }     
            tail.tailArr = [...arr.slice(0, head.length + 1)]
        }
    },
    draw: () => {
        tail.update()
    if(head.length >= 1){            
        for(let i = 0; i < tail.tailArr.length; i++){                    
                 c.beginPath()
                 c.fillStyle = `${tail.tailColor}`
                 c.fillRect(tail.tailArr[i-1 >= 0?i-1:i]?.x, tail.tailArr[i-1 >= 0?i-1:i]?.y, head.size, head.size)
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
    head.draw()
})

//detect space bar and toggle game state pause or unpause
window.addEventListener('keydown',(e)=>{
    setKey(e)
    if(e.key === ' '){
        if(head.displayPause){
            console.log("unpaused")
            head.start()
        }
        else{
            console.log("pause")
            head.stop()
        }
    }
}) 

//handle game functions
const gameBoard = ()=>{
    
    //if game is not paused check the coordinates of snake vs food and draw new foodObj if overlapping
    if(!head.displayPause){
        checkForFood()
        checkForTail()
    }
    //draw black board
    drawBoard()
    //move snake head in a direction based on input
    //if the up arrow key is pressed the snake head's coordinates will be decremented (go up) along the x-axis 
    if(head.currentKey === 'ArrowUp'){
        if(head.currentCoordinates.y === boardYStart){
            // head.currentCoordinates.y = boardYStart + 275
            head.dead()
        }else{

            head.currentCoordinates.y -= head.dy
        }
    }
    //if the right arrow key is pressed the snake head's coordinates will be incremented (go right) along the x-axis 
    if(head.currentKey === 'ArrowRight'){
        if(head.currentCoordinates.x === boardXStart + 275){
            // head.currentCoordinates.x = boardXStart
            head.dead()
        }else{
            head.currentCoordinates.x += head.dx
        }
    }
    //if the down arrow key is pressed the snake head's coordinates will be incremented (go down) along the y-axis 
    if(head.currentKey === 'ArrowDown'){
        if(head.currentCoordinates.y === boardYStart + 275){
            // head.currentCoordinates.y = boardYStart
            head.dead()
        }else{
            head.currentCoordinates.y += head.dy
        }
    }
    //if the left arrow key is pressed the snake head's coordinates will be decremented (go left) along the x-axis 
    if(head.currentKey === 'ArrowLeft'){
        if(head.currentCoordinates.x === boardXStart){
            // head.currentCoordinates.x = boardXStart + 275
            head.dead()
        }else{
            head.currentCoordinates.x -= head.dx
        }
    }  
    // draws food object in a random location on the board
    if(head.isDead === false){        
        // draws snake tail 
        if(head.length >= 1) {            
            tail.draw()  
        }
        foodObj.draw()
        // draws snake head
        head.draw()
        // sets previousCoordinates to currentCoordinates AFTER drawing current frame
        head.previousCoordinates = {...head.currentCoordinates}
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
const checkForFood = () => {
    if(
        head.currentCoordinates.x === foodObj.x && head.currentCoordinates.y === foodObj.y
    ){
        getRandomCoordinates()
        head.length++ 
    }
}

const checkForTail = () => {
    for(let i = 0; i < tail.tailArr.length; i++){
        if(head.currentCoordinates.x === tail.tailArr[i].x && head.currentCoordinates.y === tail.tailArr[i].y){
            head.isDead = true
            head.displayPause = true
            setTimeout(()=>{head.dead()}, 10)
            break 
        }
    }
}

//sets what arrowkey was press for snake head direction
const setKey = (key) => {
    if(key.key === ' '){
        return
    }
    if(key.key === 'ArrowUp' || key.key === 'ArrowDown' || key.key === 'ArrowLeft' || key.key === 'ArrowRight'){
        key.preventDefault()
        head.currentKey = key.key
    }
}

//resets all parameters and draws a fresh board
const resetBoard = async () => {
    head.currentCoordinates.x = boardXStart
    head.currentCoordinates.y = boardYStart
    head.previousCoordinates.x = boardXStart
    head.previousCoordinates.y = boardYStart
    head.currentKey = "ArrowDown"
    head.length = 0
    head.displayPause = true
    tail.tailArr = []
    c.clearRect(boardXStart, boardYStart, boardSize, boardSize)
    drawBoard()
    head.draw()
}