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
let currentKey = 'ArrowDown'


const gameBoard = (key)=>{
    c.clearRect(0,0, canvas.width, canvas.height)
    c.beginPath()
    c.fillStyle = 'black'
    c.fillRect((canvas.width/2) - 150, 100, 300, 300)
    c.stroke()
    if(currentKey === 'ArrowUp'){
        if(y === boardYStart){
            y = boardYStart + 275
        }else{
            y -= dy
        }
    }
    if(currentKey === 'ArrowRight'){
        if(x === boardXStart + 275){
            x = boardXStart
        }else{
            x += dx
        }
    }
    if(currentKey === 'ArrowDown'){
        if(y === boardYStart + 275){
            y = boardYStart
        }else{
            y += dy
        }
    }
    if(currentKey === 'ArrowLeft'){
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
const setKey = (key) => {
    if(key.key === 'ArrowUp' || key.key === 'ArrowDown' || key.key === 'ArrowLeft' || key.key === 'ArrowRight'){
        key.preventDefault()
        currentKey = key.key
    }

}
window.addEventListener('keydown',(e)=>{
        setKey(e)
}) 

setInterval(()=>{
    gameBoard(currentKey)
},200);