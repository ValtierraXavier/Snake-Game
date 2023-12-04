const canvas = document.getElementById("canvas")
canvas.height = 300
canvas.width = 300
c = canvas.getContext("2d")
//the snake board (0,0 coordinates)
const boardXStart = 0
const boardYStart = 0
const boardSize = 300
const divs = boardSize / 25
const minX = (boardXStart + 25)
const maxX = (boardXStart + 275)
const minY = boardYStart + 25
const maxY = boardYStart + 275
let interval
const gameOverTimer = (ms) => {
    return new Promise (resolve => setTimeout(()=>{resolve()}, ms))
}

const snakeObj = {
    x: boardXStart,
    y: boardYStart,
    dx: 25,
    dy: 25,
    size: 25,
    length: 0,
    currentKey: 'ArrowDown',
    displayPause: true,
    snakeColor: {
        headColor: "red",
        bodyColor: "grey"
    }
}

const getRandomCoordinates = () => {
    c.clearRect(foodObj.x, foodObj.y, 25, 25)
    const randomXMultiplier = Math.floor(Math.random() * 12)
    const randomYMultiplier = Math.floor(Math.random() * 12)
    foodObj.x = randomXMultiplier * 25
    foodObj.y = randomYMultiplier * 25
    drawFood()
}

const checkCoordinates = () => {
    if(snakeObj.x === foodObj.x && snakeObj.y === foodObj.y){
        getRandomCoordinates()
        snakeObj.length += 1
    }
}

const foodObj = {
    x: boardXStart,
    y: boardYStart,
    dx: 25,
    dy: 25,
    displayPause: true,
    foodColor: "yellow"
}


const gameBoard = ()=>{
    c.clearRect(boardXStart, boardYStart, canvas.width, canvas.height)
    checkCoordinates()
    c.beginPath()
    c.fillStyle = `black`
    c.fillRect(0, 0, boardSize, boardSize)
    c.stroke()
    if(snakeObj.currentKey === 'ArrowUp'){
        if(snakeObj.y === boardYStart){
            // snakeObj.y = boardYStart + 275
            snakeDead()
        }else{
            snakeObj.y -= snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowRight'){
        if(snakeObj.x === boardXStart + 275){
            // snakeObj.x = boardXStart
            snakeDead()
        }else{
            snakeObj.x += snakeObj.dx
        }
    }
    if(snakeObj.currentKey === 'ArrowDown'){
        if(snakeObj.y === boardYStart + 275){
            // snakeObj.y = boardYStart
            snakeDead()
        }else{
            snakeObj.y += snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowLeft'){
        if(snakeObj.x === boardXStart){
            // snakeObj.x = boardXStart + 275
            snakeDead()
        }else{
            snakeObj.x -= snakeObj.dx
        }
    }  
    drawFood()
    c.beginPath()
    c.fillStyle = `${snakeObj.snakeColor.headColor}`
    c.fillRect(snakeObj.x, snakeObj.y, 25, 25)
    c.stroke()
}
const resetBoard = async () => {
        c.clearRect(boardXStart, boardYStart, canvas.width, canvas.height)
        c.beginPath()
        c.fillStyle = 'black'
        c.fillRect(boardXStart, boardYStart, boardSize, boardSize)
        c.stroke()
        c.beginPath()
        c.fillStyle = `${snakeObj.snakeColor.headColor}`
        c.fillRect(snakeObj.x, snakeObj.y, 25, 25)
        c.stroke()
        foodObj.x = boardXStart
        foodObj.y= boardYStart
        snakeObj.x = boardXStart
        snakeObj.y = boardYStart
}
window.addEventListener('DOMContentLoaded',()=>{
    resetBoard()
})
const setKey = (key) => {
    if(key.key === ' '){
        return
    }
    if(key.key === 'ArrowUp' || key.key === 'ArrowDown' || key.key === 'ArrowLeft' || key.key === 'ArrowRight'){
        key.preventDefault()
        snakeObj.currentKey = key.key
    }
}

const snakeDead = async () => {
    clearInterval(interval)
    resetBoard()


}

const stopSnake = () => {
    clearInterval(interval);
    snakeObj.displayPause = true;
}

const startSnake = () => {
    interval = setInterval(() => {
        gameBoard(snakeObj.currentKey)
        },100)
        snakeObj.displayPause = false 
    }

const drawFood = () => {
    c.beginPath()
    c.fillStyle = `${foodObj.foodColor}`
    c.fillRect(foodObj.x, foodObj.y , 25, 25)
    c.stroke()
    console.log(snakeObj.length)
}

    window.addEventListener('keydown',(e)=>{
        setKey(e)
        if(e.key === ' '){
            console.log("called")
            if(snakeObj.displayPause){
                console.log("unpaused")
                startSnake()
            }
            else{
                console.log("pause")
                stopSnake()
            }
        }
    }) 
    
