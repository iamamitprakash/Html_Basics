document.addEventListener("DOMContentLoaded", () =>{
    console.log("Starting game");
    let ball = document.getElementById("ball");
    let table = document.getElementById("ping-pong-table")
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

    }

    function loop(){
        gameBall();
        requestAnimationFrame(loop);
    }
    loop();

})//2:17