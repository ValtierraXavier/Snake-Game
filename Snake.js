const canvas = document.getElementById("canvas")
c = canvas.getContext("2d")
const canvasSize = document.getElementById('boardSize')
const unitSize = document.getElementById('unitSize')
const settings = document.getElementById('selectionsDiv')
const counter = document.getElementById('counter')
const counterSection = document.getElementById('counterSection')
let boardStart = 0
let boardSize = Number(canvasSize.value)
canvas.height = Number(canvasSize.value)
canvas.width = Number(canvasSize.value)
//the snake board (0,0 coordinates)
const minX = (boardStart)
const maxX = (boardSize)
const minY = (boardStart)
const maxY = (boardSize)
let interval
const blink = (ms) => {
    return new Promise 
    (resolve => setTimeout(()=>
    {resolve()}, ms))
}

const head = {
    currentCoordinates: {
        x: boardStart,
        y: boardStart
    },
    previousCoordinates:{
        x: boardStart,
        y: boardStart
    },    
    size: Number(unitSize.value),
    dx: Number(unitSize.value),
    dy: Number(unitSize.value),
    length: 0,
    currentKey: 'ArrowDown',
    displayPause: true,
    isDead: false,
    headColor: "red",
    speed: 150,
    // starts the interval calls to draw the board
    start: () => {
        getRandomCoordinates()
        resetBoard()
        head.displayPause = false 
        head.isDead = false
        settings.style.visibility = 'hidden'
        settings.style.opacity = '0%'
        interval = setInterval(() => {
            gameBoard()
        },head.speed)
        canvas.focus()
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
        for(let i = 0; i < 10; i++){
            await blink(250)
            if(head.headColor === "red"){
                head.headColor = 'black'
                head.draw()
            }else if(head.headColor === "black"){
                head.headColor = 'red'
                head.draw()
            }
        }
        resetBoard()
        settings.style.visibility = 'visible'
        settings.style.opacity = '100%'
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

const food = {
    // initial coordinates set to a random number within the game board at an interval of the head.size
    //fix this when ypu open this again. learge board and large head coordinates to not overlap.
    x: boardSize,
    y: boardSize,
    size: head.size,
    dx: head.size,
    dy: head.size,
    displayPause: true,
    foodColor: "yellow",
    draw: () => {
        c.beginPath()
        c.fillStyle = `${food.foodColor}`
        c.fillRect(food.x, food.y , head.size, head.size)
        c.stroke()
    }
}
//Draw the board on initial load
window.addEventListener('DOMContentLoaded',()=>{
    settings.style.opacity = '0%'
    counterSection.style.opacity = '0%'
    setTimeout(()=>{
        drawBoard()
        head.draw()
        canvas.focus()
        settings.style.opacity = '100%'
        counterSection.style.opacity = '100%'
    },200)
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
    //if game is not paused check the coordinates of snake vs food and draw new food if overlapping
    if(!head.displayPause){
        checkForFood()
        checkForTail()
    }
    //draw black board
    drawBoard()
    //move snake head in a direction based on input
    //if the up arrow key is pressed the snake head's coordinates will be decremented (go up) along the x-axis 
    if(head.currentKey === 'ArrowUp'){
        if(head.currentCoordinates.y === boardStart){
            head.currentCoordinates.y = boardSize - head.size
            // head.dead()
        }else{
            
            head.currentCoordinates.y -= head.dy
        }
    }
    //if the right arrow key is pressed the snake head's coordinates will be incremented (go right) along the x-axis 
    if(head.currentKey === 'ArrowRight'){
        if(head.currentCoordinates.x === boardStart + (boardSize - head.size) ){
            head.currentCoordinates.x = boardStart
            // head.dead()
        }else{
            head.currentCoordinates.x += head.dx
        }
    }
    //if the down arrow key is pressed the snake head's coordinates will be incremented (go down) along the y-axis 
    if(head.currentKey === 'ArrowDown'){
        if(head.currentCoordinates.y === boardStart + (boardSize - head.size)){
            head.currentCoordinates.y = boardStart
            // head.dead()
        }else{
            head.currentCoordinates.y += head.dy
        }
    }
    //if the left arrow key is pressed the snake head's coordinates will be decremented (go left) along the x-axis 
    if(head.currentKey === 'ArrowLeft'){
        if(head.currentCoordinates.x === boardStart){
            head.currentCoordinates.x = boardSize - head.size
            // head.dead()
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
        // draws food object
        food.draw()
        // draws snake head
        head.draw()
        // sets previousCoordinates to currentCoordinates AFTER drawing current frame
        head.previousCoordinates = {...head.currentCoordinates}
    }
}

//draws a fresh board 
const drawBoard = () => {
    c.clearRect(boardStart, boardStart, boardSize, boardSize)
    c.beginPath()
    c.fillStyle = 'black'
    c.fillRect(boardStart, boardStart, boardSize, boardSize)
    c.stroke()
}

//gets random coordinates to draw food object in a random location on the board
const getRandomCoordinates = () => {
    //used to calculate the active board area with relation to the snake head size
    const divs = boardSize / head.size
    
    c.clearRect(food.x, food.y, head.size, head.size)
    const randomXMultiplier = Math.floor(Math.random() * divs)
    const randomYMultiplier = Math.floor(Math.random() * divs)
    food.x = randomXMultiplier * head.size
    food.y = randomYMultiplier * head.size
    food.draw()
}

//checks snake coordinates against the food coordinates
const checkForFood = () => {
    if(
        head.currentCoordinates.x === food.x && head.currentCoordinates.y === food.y
    ){
        getRandomCoordinates()
        head.length++
        counter.innerHTML = head.length 
    }
}

const checkForTail = () => {
    for(let i = 0; i < tail.tailArr.length; i++){
        if(head.currentCoordinates.x === tail.tailArr[i].x && head.currentCoordinates.y === tail.tailArr[i].y){
            head.isDead = true
            head.displayPause = true
            setTimeout(()=>{head.dead()}, 10)
        }
    }
}

//sets what arrowkey was press for snake head direction
const setKey = (key) => {
    if(key.key === ' '){
        key.preventDefault()
        return
    }
    if(key.key === 'ArrowUp' || key.key === 'ArrowDown' || key.key === 'ArrowLeft' || key.key === 'ArrowRight'){
        key.preventDefault()
        head.currentKey = key.key
    }
}



//resets all parameters and draws a fresh board
const resetBoard = async () => {
    head.currentCoordinates.x = boardStart
    head.currentCoordinates.y = boardStart
    head.previousCoordinates.x = boardStart
    head.previousCoordinates.y = boardStart
    head.currentKey = "ArrowDown"
    head.length = 0
    head.displayPause = true
    tail.tailArr = []
    counter.innerHTML = 0
    c.clearRect(boardStart, boardStart, boardSize, boardSize)
    drawBoard()
    head.draw()
}
const selectSizes = (e)=>{
    let size = Number(e.target.value)
    if(e.target.name === 'boardSize'){        
        boardSize = size
        canvas.height = size
        canvas.width = size
        settings.style.width = `${size}px`
        settings.style.height = `${size}px`
    }else if(e.target.name === 'unitSize'){
        head.size = size
        head.dy = size
        head.dx = size
        tail.size = size
    }
    setTimeout(()=>{
        resetBoard()
    },200)
}
canvasSize.onchange = (e)=>{selectSizes(e)}
unitSize.onchange = (e)=>{selectSizes(e)}