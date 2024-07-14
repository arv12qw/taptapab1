const gameContainer = document.getElementById("game-container");

        let score = 0;
        let timeLeft = 50; // Initial time (seconds)
        const squareSpeed = 15;
        let gameIsOver = false;

        function createSquare() {
            if (gameIsOver) return;

            const square = document.createElement("div");
            square.classList.add("square");

            // 5% chance of a special square
            const isSpecial = Math.random() < 0.10;

            if (isSpecial) {
                square.classList.add("special-square");
            }

            square.style.left = Math.random() * (gameContainer.clientWidth - square.offsetWidth) + "px";
            square.style.top = "0";
            gameContainer.appendChild(square);

            square.addEventListener("click", function() {
                gameContainer.removeChild(square);

                if (isSpecial) {
                    score += 5; // Award 500 points for special squares
                } else {
                    score += 1; // Award 100 points for regular squares
                }

                updateScore();
            });

            const squareInterval = setInterval(function() {
                if (gameIsOver) {
                    clearInterval(squareInterval);
                    return;
                }

                const squareTop = square.offsetTop;
                if (squareTop > gameContainer.clientHeight) {
                    clearInterval(squareInterval);
                    gameContainer.removeChild(square);
                } else {
                    square.style.top = squareTop + squareSpeed + "px";
                }
            }, 20);
        }

        function updateScore() {
            document.getElementById("score").textContent = "Score: " + score;
            if (score >= 100) {
                endGame();
            }
        }

        function endGame() {
            gameIsOver = true;
            document.getElementById("game-over").textContent = "Snap Your Score📸: " + score;
            document.getElementById("game-over").style.display = "block";
            document.getElementById("restart-button").style.display = "block";
        }

        function restartGame() {
            location.reload();
        }

        function updateTimeLeft() {
            if (timeLeft > 0 && !gameIsOver) {
                timeLeft--;
                document.getElementById("timer").textContent = "Time Left: " + timeLeft;
                setTimeout(updateTimeLeft, 1000); // Update the timer every second
            } else {
                endGame();
            }
        }

        function gameLoop() {
            if (gameIsOver) return;

            createSquare();
            setTimeout(gameLoop, 2000); // Adjust the interval to create squares less frequently
        }

        // Start the game loop
        gameLoop();
        updateTimeLeft();

        // Add an event listener for the restart button
        document.getElementById("restart-button").addEventListener("click", restartGame);