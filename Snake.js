const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight-200
canvas.width = window.innerWidth
c = canvas.getContext("2d")
const boardXStart = (canvas.width/2) - 150
const boardYStart = 100
let x = boardXStart
let y = boardYStart
let dx = 25
let dy = 25


const gameBoard = (key)=>{
    c.clearRect(0,0, canvas.width, canvas.height)
    c.beginPath()
    c.fillStyle = 'black'
    c.fillRect((canvas.width/2) - 150, 100, 300, 300)
    c.stroke()
    if(key.key === 'ArrowUp'){
        key.preventDefault()
        if(y === boardYStart){
            y = boardYStart + 275
        }else{
            y -= dy
        }
    }
    if(key.key === 'ArrowRight'){
        key.preventDefault()
        if(x === boardXStart + 275){
            x = boardXStart
        }else{
            x += dx
        }
    }
    if(key.key === 'ArrowDown'){
        key.preventDefault()
        if(y === boardYStart + 275){
            y = boardYStart
        }else{
            y += dy
        }
    }
    if(key.key === 'ArrowLeft'){
        key.preventDefault()
        if(x === boardXStart){
            x = boardXStart + 275
        }else{
            x -= dx
        }
    }    
    
    c.beginPath()
    c.fillStyle = 'red'
    c.fillRect(x, y, 25, 25)
    c.stroke()
}
window.addEventListener('DOMContentLoaded',()=>{
    c.clearRect(0,0, canvas.width, canvas.height)
    c.beginPath()
    c.fillStyle = 'black'
    c.fillRect((canvas.width/2) - 150, 100, 300, 300)
    c.stroke()
    c.beginPath()
    c.fillStyle = 'red'
    c.fillRect(x, y, 25, 25)
    c.stroke()
})
window.addEventListener('keydown',(e)=>{
    gameBoard(e)
})