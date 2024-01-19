document.addEventListener("DOMContentLoaded", () =>{
    console.log("Starting game");
    let ball = document.getElementById("ball");
    let table = document.getElementById("ping-pong-table");
    let paddle = document.getElementById("paddle");
    let ballX = 100; // x coordinate of the ball
    let ballY = 300; // y coordinate of the ball

    // setInterval(function f() {

    //     ballX += 1;
    //     if(ballX > 300){
    //         ballX = 0;
    //     }
    //     ball.style.left = `${ballX}px`;
    // }, 1);

    let dx = 2; // +1 -> it will move the ballX by 1px right and -1 -> moves the ballX by 1px left
    let dy = 2; // +1 -> it will move the ballY by 1px bottom and -1 -> moves the ballY by 1px top
    let paddleY = 0;
    paddle.style.top = `${paddleY}px`;

    document.addEventListener("keydown", (event) => {
        if(event.keyCode == 38 && paddleY > 0){
            paddleY -= 10;
        }else if(event.keyCode == 40 && paddleY < table.offsetHeight - paddle.offsetHeight){
            paddleY += 10;
        }
        paddle.style.top = `${paddleY}px`;
    });

    document.addEventListener("mousemove", (event) =>{
        // console.log(event.clientY, event.clientX);
        let mousePoint = event.clientY - table.offsetTop -paddle.offsetHeight/2;
        paddleY = mousePoint;
        if(paddleY < 0 || paddleY > table.offsetHeight - paddle.offsetHeight) return;
        paddle.style.top = `${paddleY}px`;
    });


    function gameBall(){
        ballX += dx;
        ballY += dy;

        ball.style.top = `${ballY}px`;
        ball.style.left = `${ballX}px`;

        if(ballY < 0 || ballY + ball.offsetHeight > table.offsetHeight){
            dy *= -1;
        }

        if(ballX < 0 || ballX + ball.offsetWidth > table.offsetWidth){
            dx *= -1;
        }

        if(ballX < paddle.offsetLeft + paddle.offsetWidth && ballY > paddleY && ballY + ball.offsetHeight  < paddleY + paddle.offsetHeight){
            console.log("Collision");
            dx *= -1;
        }

    }

    function loop(){
        gameBall();
        requestAnimationFrame(loop);
    }
    loop();

})