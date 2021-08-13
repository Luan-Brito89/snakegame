let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32
let snake = [];
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let direction = "right";  //direção que a cobra  vem no jogo  
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,  // Math.flor retorna o menor numero inteiro dentro()
    y: Math.floor(Math.random() * 15 + 1) * box   // Math.random  retorna um numero inteiro aleatorio até 1
}

// funçoes para criar os desenhos do jogo no canvas
function criarBG() {
    context.fillStyle = "snow";
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarCobra(){
    for(i=0; i< snake.length; i++){
        context.fillStyle = "red";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "black"
    context.fillRect(food.x, food.y, box, box)
}


// eventos de click para direção da cobra 
document.addEventListener('keydown', update);  // evento de clik, chamando a função update

// eventos de direção da cobra
function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "up") direction = "down";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "down") direction = "up";

}


function iniciarJogo(){
    // cobrar nao parar na parede
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "down") snake[0].y = 16 * box;

     // condição para dar game over quando a cobra se bater   
    for(i = 1; i< snake.length; i++){              
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over Tente Outra Vez');
        }
    }

    criarBG();
    criarCobra();
    drawFood();

    //Ponto de partida do jogo (x,y)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // coordenadas da cobra(condicionais)

    if( direction == "right") snakeX += box;
    if( direction == "left") snakeX -= box;
    if( direction == "up") snakeY += box;
    if( direction == "down") snakeY -= box;

    // condiçao de aleatoriedade da fruta
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();   // se o if for true continua a tirar o ultimo elemento do array
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;  // posições aleatorias da fruta
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    // movimento da nova cabeça da cobra
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);  // adiciona elementos no inicio do array

}


let jogo = setInterval(iniciarJogo, 100); // variavel que não deixará o jogo ficar parado
