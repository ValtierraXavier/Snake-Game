const canvas = document.getElementById("canvas")
c = canvas.getContext("2d")
const canvasSize = document.getElementById('boardSize')
const unitSize = document.getElementById('unitSize')
const wallSettings = document.getElementById('wall')
const settings = document.getElementById('selectionsDiv')
const counter = document.getElementById('counter')
const counterSection = document.getElementById('counterSection')
const pauseDisplay = document.getElementById('pauseDisplay')
let wallDeath = 'true'
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
let blinker
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
    currentScore: 0,
    currentKey: 'ArrowDown',
    paused: false,
    displayPause: true,
    initial: true,
    highScore: false,
    isDead: false,
    headColor: "red",
    speed: 150,
    // starts the interval calls to draw the board
    start: () => {
        head.paused = false
        head.displayPause = false
        head.initial = false
        head.isDead = false 
        food.getRandomCoordinates()
        settings.style.opacity = '0%'
        settings.style.visibility = 'hidden'
        interval = setInterval(
            () => {gameBoard()
        },head.speed)
        pauseDisplay.innerHTML = 'Playing'
    },
    // clears the draw interval
    stop: () => {
        clearInterval(interval);
    },
    resume: () => {
        interval = setInterval(()=>{
            gameBoard()
        },head.speed)

    },
    pause: () => {
        if(head.paused == false && head.initial == false){
            head.paused = true
            head.stop()
            // pauseDisplay.style.opacity = '100%'
            pauseDisplay.innerHTML = 'Paused'
            blinker = setInterval(()=>{
                if(head.headColor == 'red'){
                    head.headColor = 'black'
                    drawBoard()
                    c.clearRect(head.currentCoordinates.x, head.currentCoordinates.y, head.size, head.size)
                    head.draw()
                }else{
                    head.headColor = 'red'
                    c.clearRect(head.currentCoordinates.x, head.currentCoordinates.y, head.size, head.size)
                    drawBoard()
                    head.draw()
                }
            }, 500)
        }else if(head.paused == true && head.initial == false){
            head.headColor = 'red'
            clearInterval(blinker)
            head.paused = false
            head.resume()
            pauseDisplay.innerHTML = 'Playing'
            // pauseDisplay.style.opacity = '0%'
        }
    },
    
    //resets the board and clears the draw interval
    isHiscore: async (n) => {
        try{
            const res = await fetch("http://localhost:3020/score/get/highest")
            const data = await res.json()
            if(n >= data[0]?.score){
                return true
            }else{
                return false
            }
        }catch(error){console.log(error.message)}
    },

    dead: async () => {
        pauseDisplay.innerHTML = "Dead, Awww"
        head.isDead = true  
        head.displayPause = true   
        head.currentScore = head.length  
        head.highScore = await head.isHiscore(head.length) 
        clearInterval(interval) 
        for(let i = 0; i < 10; i++){
            await blink(350)
            if(head.headColor === "red"){
                head.headColor = 'black'
                head.draw()
            }else if(head.headColor === "black"){
                head.headColor = 'red'
                head.draw()
            }
        }
        settings.style.visibility = 'visible'
        settings.style.opacity = '100%'
        resetBoard()
    },
    draw: () => {
        c.beginPath()
        c.fillStyle = `${head.headColor}`
        c.fillRect(head.currentCoordinates.x, head.currentCoordinates.y, head.size, head.size)
        c.stroke()
    },  
    checkForFood: () => {
        if(head.currentCoordinates.x == food.x && head.currentCoordinates.y == food.y){
            head.length++
            counter.innerHTML = head.length
            food.getRandomCoordinates()
            drawBoard()
            food.draw()
            tail.draw
            head.draw()
        }
    }
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
    },
    //checks if head's current position is included in the tail coordinate's array
    checkForTail: () => {
    for(let i = 0; i < tail.tailArr.length; i++){
        if(head.currentCoordinates.x === tail.tailArr[i].x && head.currentCoordinates.y === tail.tailArr[i].y){
            head.isDead = true
            head.displayPause = true
            setTimeout(()=>{head.dead()}, 10)
        }
    }
}}

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
    },

    getRandomCoordinates: () => {
        //used to calculate the active board area with relation to the snake head size
        const divs = boardSize / head.size
        //Sets random coordinates for food object's next position
        const randomXMultiplier = Math.floor(Math.random() * divs)
        const randomYMultiplier = Math.floor(Math.random() * divs)
        food.x = randomXMultiplier * head.size
        food.y = randomYMultiplier * head.size
        food.draw()
    },
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

//handle game functions
const gameBoard = ()=>{
    //if game is not paused check the coordinates of snake vs food and draw new food if overlapping
    if(!head.displayPause){
        head.checkForFood()
        tail.checkForTail()
    }
    //draw black board
    drawBoard()
    //move snake head in a direction based on input
    //if the up arrow key is pressed the snake head's coordinates will be decremented (go up) along the x-axis 
    if(head.currentKey === 'ArrowUp'){
        if(head.currentCoordinates.y === boardStart){
            wallDeath === 'false' ?
            head.currentCoordinates.y = boardSize - head.size:
            head.dead()
        }else{
            
            head.currentCoordinates.y -= head.dy
        }
    }
    //if the right arrow key is pressed the snake head's coordinates will be incremented (go right) along the x-axis 
    if(head.currentKey === 'ArrowRight'){
        if(head.currentCoordinates.x === boardStart + (boardSize - head.size) ){
            wallDeath === 'false' ? 
            head.currentCoordinates.x = boardStart :
            head.dead()
        }else{
            head.currentCoordinates.x += head.dx
        }
    }
    //if the down arrow key is pressed the snake head's coordinates will be incremented (go down) along the y-axis 
    if(head.currentKey === 'ArrowDown'){
        if(head.currentCoordinates.y === boardStart + (boardSize - head.size)){
            wallDeath === 'false' ?
            head.currentCoordinates.y = boardStart:
            head.dead()
        }else{
            head.currentCoordinates.y += head.dy
        }
    }
    //if the left arrow key is pressed the snake head's coordinates will be decremented (go left) along the x-axis 
    if(head.currentKey === 'ArrowLeft'){
        if(head.currentCoordinates.x === boardStart){
            wallDeath === 'false' ?
            head.currentCoordinates.x = boardSize - head.size:
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

//detect space bar and toggle game state pause or unpause
window.addEventListener('keydown',(e)=>{
    setKey(e)
}) 

//sets what arrowkey was press for snake head direction
const setKey = (key) => {
    if(key.key === ' '){
        key.preventDefault()
        if(head.initial == true){
            head.start()
        }else{
            head.pause()
        }
    }
    if(key.key === 'ArrowUp' || key.key === 'ArrowDown' || key.key === 'ArrowLeft' || key.key === 'ArrowRight' || key.key === "Enter"){
        key.preventDefault()
        if(head.displayPause && head.highScore){
            highScore(key.key)   
        }
        if(head.paused || head.displayPause || head.initial){
            return
        }else{
            if(key.key ==='Enter'){
                return
            }
            head.currentKey = key.key
        }
    }
}

//resets all parameters and draws a fresh board
const resetBoard = async () => {
    if(head.highScore == false){        
        resetHiScrSelect()
    }
    head.currentCoordinates.x = boardStart
    head.currentCoordinates.y = boardStart
    head.previousCoordinates.x = boardStart
    head.previousCoordinates.y = boardStart
    head.paused = false
    head.initial = true
    head.displayPause = true
    head.currentKey = "ArrowDown"
    head.length = 0
    tail.tailArr = []
    counter.innerHTML = 0
    c.clearRect(boardStart, boardStart, boardSize, boardSize)
    drawBoard()
    head.draw()
    pauseDisplay.innerHTML = 'Press Spacebar to Start'
}
//alows useer toselect the board and snake/food sizes. also used to turn of fatal edges (touch the edge and you die)
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
    }else if(e.target.name === 'wall'){
        wallDeath = e.target.value

    }
    setTimeout(()=>{
        resetBoard()
    },200)
}
canvasSize.onchange = (e)=>{selectSizes(e)}
unitSize.onchange = (e)=>{selectSizes(e)}
wallSettings.onchange = (e)=>{selectSizes(e)}

// next steps add database to save highscores:Check
// add display for "Paused" with snake head blinking (no food, no tail): Check
// add css and title.: Blank

const letters = document.getElementsByClassName("letters")
const lettersArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","%","^","&","*","(",")","_","-","+","-"]
const lettersMap = new Map()
for(let i = 0; i < lettersArr.length; i++){
    lettersMap.set(i, lettersArr[i])
}

const resetHiScrSelect = () => {
    for(let i = 0; i < letters.length; i++){
        letters[i].dataset.count = 0
        letters[i].innerHTML = 'A'
    }
    highScore()
    head.highScore = false
}

let col = 0;
const highScore = (key) => { 
    let colIndex = col
    let letterIndex = Number(letters[col].dataset.count)

    if(key == 'ArrowUp'){
        if(letterIndex == lettersArr.length -1){
            letterIndex = 0
        }else{
            letterIndex++
        }
    }else if(key == "ArrowDown"){
        if(letterIndex == 0){
            letterIndex = lettersArr.length - 1
        }else{
            letterIndex--
        }
    }else if(key == "ArrowRight"){
        if(colIndex == letters.length -1){
            colIndex = 0
        }else{
            colIndex++
        }
    }else if(key == "ArrowLeft"){
        if(colIndex == 0){
            colIndex = letters.length -1
        }else{
            colIndex--
        }
    }else if(key === 'Enter'){
        handleName()
    }
    letters[col].dataset.count = letterIndex
    col = colIndex

    columnControl()
}

const columnControl = () => {
    for(let i = 0; i < letters.length; i++){
        if(col == i){
            letters[i].style.color = 'green'
            letters[i].innerHTML = `${lettersMap.get(Number(letters[i].dataset.count))}`
        }else{
            letters[i].style.color = 'black'
        }   
    }
}
highScore()
 
const handleName = async () => {
    let name = `${letters[0].innerHTML}${letters[1].innerHTML}${letters[2].innerHTML}`
    let score = head.currentScore
    let body = {
        name,
        score
    }
    try{
        const response = await fetch ('http://localhost:3020/score/add', {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(body)
        })
        resetHiScrSelect()
    }catch(error){console.log(error.message)}
}

// class HighScoreArr{
//     constructor(){
//         this.scoreArr = new Array(10)
//         this.currentHighScore = 0
//     }
//     add (score, name){
//         let HS = new HighScore(score, name)
//      if(this.scoreArr.length == 10){
//             this.scoreArr.pop()
//         }
//         this.scoreArr.unshift(HS)
//         this.sortScores
//     }
//     print(){
//         console.log(`Current highScore is ${this.currentHighScore}`, this.scoreArr)
//     }
//     checkScore (score){
//         for(let i = 0; i < this.scoreArr.length; i++){
//             if(score >= this.currentHighScore){
//                 head.newHighScore =
//             }
//         }
//     }
//     sortScores(){
//         let highest
//         let highestIndex
//         let arrCopy = [...this.scoreArr]
//         let sortedArr = []
//         for(let i = 0; i < this.scoreArr.length; i++){
//             highest = arrCopy[0]
//             for(let j = 0; j < arrCopy.length; j++){
//                if(arrCopy[j].score >= highest.score){
//                 highest = arrCopy[j]
//                 highestIndex = j
//                }
//             }
//             sortedArr.push(arrCopy[highestIndex])
//             arrCopy.splice(highestIndex, 1)
//         }
//         this.scoreArr = [...sortedArr]
//         this.currentHighScore = this.scoreArr[0].score
//         this.print()
//     }
// }
// class HighScore {
//     constructor(score, name){
//         this.score = score
//         this.name = name
//     }
// }
// // let highScores = new HighScoreArr()
// // for(let j = 0; j < 15; j++){
// //     let score = Math.floor(Math.random() * 10)
// //     let name = `name${j}`
// //     highScores.add(score, name)
// // }
// // highScores.sortScores()