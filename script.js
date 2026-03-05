const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let playerY = 200
let aiY = 200

let paddleHeight = 100

let ballX = 450
let ballY = 250

let ballSpeedX = 4
let ballSpeedY = 3

let playerScore = 0
let aiScore = 0

let mode = "ai"
let difficulty = "easy"

const hitSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3")
const scoreSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3")

function startGame(m,d){

mode = m
difficulty = d || "easy"

requestAnimationFrame(gameLoop)

}

document.addEventListener("mousemove",e=>{

let rect = canvas.getBoundingClientRect()
playerY = e.clientY - rect.top - paddleHeight/2

})

document.addEventListener("keydown",e=>{

if(mode==="manual"){

if(e.key==="w") aiY -= 25
if(e.key==="s") aiY += 25

}

})

function aiMove(){

let speed = 2

if(difficulty==="medium") speed = 4
if(difficulty==="hard") speed = 6

let center = aiY + paddleHeight/2

if(center < ballY) aiY += speed
else aiY -= speed

}

function moveBall(){

ballX += ballSpeedX
ballY += ballSpeedY

if(ballY < 0 || ballY > canvas.height){
ballSpeedY = -ballSpeedY
}

if(ballX < 20){

if(ballY > playerY && ballY < playerY + paddleHeight){

ballSpeedX = -ballSpeedX
hitSound.play()

}

}

if(ballX > canvas.width-20){

if(ballY > aiY && ballY < aiY + paddleHeight){

ballSpeedX = -ballSpeedX
hitSound.play()

}

}

if(ballX < 0){

aiScore++
scoreSound.play()
resetBall()

}

if(ballX > canvas.width){

playerScore++
scoreSound.play()
resetBall()

}

}

function resetBall(){

ballX = canvas.width/2
ballY = canvas.height/2

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"

ctx.fillRect(10,playerY,10,paddleHeight)

ctx.fillRect(canvas.width-20,aiY,10,paddleHeight)

ctx.beginPath()

ctx.arc(ballX,ballY,8,0,Math.PI*2)

ctx.fill()

document.getElementById("playerScore").innerText = playerScore
document.getElementById("aiScore").innerText = aiScore

}

function gameLoop(){

moveBall()

if(mode==="ai") aiMove()

draw()

requestAnimationFrame(gameLoop)

}