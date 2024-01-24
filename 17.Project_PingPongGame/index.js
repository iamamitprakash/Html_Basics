document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle");
    let gameOverDiv = document.getElementById("game-over");
    let tryAgainBtn = document.getElementById("try-again-btn");

    let ballX = 50;
    let ballY = 50;

    let dx = 2;
    let dy = 2;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    setInterval(function exec() {

        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // if(ballX > 700-20 || ballX <= 0) dx *= -1;
        // if(ballY > 400-20 || ballY <= 0) dy *= -1;

        // Collision of ball and paddle
        if(ballX < paddle.offsetLeft + paddle.offsetWidth && 
            ballY > paddle.offsetTop && 
            ballY - ball.offsetHeight < paddle.offsetTop+ paddle.offsetHeight){
                dx *= -1;
        }

        if(ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1;
        if(ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1;

        // Check if the ball hits the left side of the table
        if (ballX <= 0) {
            gameOverDiv.style.display = "block";
            
            dx = 0;
            dy = 0;
        }

    }, 1);

    tryAgainBtn.addEventListener("click", () => {
        // Hide the game over message
        gameOverDiv.style.display = "none";

        // Reset ball and paddle positions
        ballX = 50;
        ballY = 50;
        paddleY = 0;
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
        paddle.style.top = `${paddleY}px`;

        // Restart the ball movement
        dx = 2;
        dy = 2;
    });

    let paddleY = 0;
    let dpY = 5;
    document.addEventListener("keydown", (event) =>{
        if(event.keyCode == 38 && paddleY > 0){
            paddleY += (-1)*dpY;
        }else if(event.keyCode == 40 && paddleY < table.offsetHeight - paddle.offsetHeight){
            paddleY += dpY;
        }
        paddle.style.top = `${paddleY}px`;
    });

    document.addEventListener("mousemove", (event) => {
        let mouseDistanceFromTop = event.clientY;
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop -paddle.offsetHeight/2;
        paddleY = mousePointControl;
        if(paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight) return;
        paddle.style.top = `${paddleY}px`;
    })
});