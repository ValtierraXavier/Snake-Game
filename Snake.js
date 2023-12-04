const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight-200
canvas.width = window.innerWidth
c = canvas.getContext("2d")
const boardXStart = (canvas.width/2) - 150
const boardYStart = 100
// let snakeObj.x = boardXStart
// let snakeObj.y = boardYStart
// let dx = 25
// let dy = 25
// let currentKey = 'ArrowDown'
// const displayPause = false;
const snakeObj = {
    x: boardXStart,
    y: boardYStart,
    dx: 25,
    dy: 25,
    currentKey: 'ArrowDown',
    displayPause: true,
    snakeColor: {
        headColor: "red",
        bodyColor: "grey"
    }
}
let interval


const gameBoard = (key)=>{
    c.clearRect(0,0, canvas.width, canvas.height)
    c.beginPath()
    c.fillStyle = `black`
    c.fillRect((canvas.width/2) - 150, 100, 300, 300)
    c.stroke()
    if(snakeObj.currentKey === 'ArrowUp'){
        if(snakeObj.y === boardYStart){
            snakeObj.y = boardYStart + 275
        }else{
            snakeObj.y -= snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowRight'){
        if(snakeObj.x === boardXStart + 275){
            snakeObj.x = boardXStart
        }else{
            snakeObj.x += snakeObj.dx
        }
    }
    if(snakeObj.currentKey === 'ArrowDown'){
        if(snakeObj.y === boardYStart + 275){
            snakeObj.y = boardYStart
        }else{
            snakeObj.y += snakeObj.dy
        }
    }
    if(snakeObj.currentKey === 'ArrowLeft'){
        if(snakeObj.x === boardXStart){
            snakeObj.x = boardXStart + 275
        }else{
            snakeObj.x -= snakeObj.dx
        }
    }  
    
    c.beginPath()
    c.fillStyle = `${snakeObj.snakeColor.headColor}`
    c.fillRect(snakeObj.x, snakeObj.y, 25, 25)
    c.stroke()
}
window.addEventListener('DOMContentLoaded',()=>{
    c.clearRect(0,0, canvas.width, canvas.height)
    c.beginPath()
    c.fillStyle = 'black'
    c.fillRect((canvas.width/2) - 150, 100, 300, 300)
    c.stroke()
    c.beginPath()
    c.fillStyle = `${snakeObj.snakeColor.headColor}`
    c.fillRect(snakeObj.x, snakeObj.y, 25, 25)
    c.stroke()
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
    
    window.addEventListener('keydown',(e)=>{
        setKey(e)
        if(e.key === ' '){
            console.log("called")
            if(snakeObj.displayPause){
                console.log("pause")
                startSnake()
            }
            else{
                stopSnake()
                console.log("unpaused")
            }
        }
    }) 
    
