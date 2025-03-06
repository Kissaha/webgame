document.addEventListener("DOMContentLoaded", function () {
    const questionText = document.getElementById("question");
    const hintText = document.getElementById("hint");
    const commandInput = document.getElementById("commandInput");
    const submitButton = document.getElementById("submitCommand");
    const levelText = document.getElementById("level");
    const timerText = document.getElementById("timer");
    const badgeText = document.getElementById("badges");
    const endMessage = document.getElementById("endMessage");
    const tryAgainButton = document.getElementById("tryAgain");
    const homeButton = document.getElementById("homeButton");
    const endGameContainer = document.querySelector(".end-game");

    let timeLeft = 60;
    let level = 1;
    let score = 0;
    let badges = [];
    let timer;
    let currentQuestion = {};

    const questions = [
        { question: "What IP address do you enter in the browser to access router settings?", hint: "Most common default gateway", answer: "192.168.1.1", badge: "⭐" },
        { question: "How do you test the local network connection using ping?", hint: "Ping the local loopback address", answer: "ping 127.0.0.1", badge: " 🌟 " },
        { question: "The subnet mask of the server is 255.255.0.0, what should the client subnet mask be?", hint: "Must match the server", answer: "255.255.0.0", badge: "✨" },
        { question: "Class A 0-126, Class B 128-191, Class C 192 - ?", hint: "Think of the next range", answer: "223", badge: " 💫 " },
        { question: "What should you input in the IP address of the server computer if the client IP address is 192.168.0.3?", hint: "Server IP should be in the same network", answer: "192.168.0.2", badge: "✴️" },
        
        
    ];

    function startGame() {
        level = 1;
        score = 0;
        timeLeft = 60;
        badges = [];
        endGameContainer.classList.add("hidden");
        nextQuestion();
        startTimer();
    }

    function nextQuestion() {
        if (level > questions.length) {
            endGame(true);
            return;
        }
        currentQuestion = questions[level - 1];
        questionText.textContent = currentQuestion.question;
        hintText.textContent = `Hint: ${currentQuestion.hint}`;
        levelText.textContent = level;
        commandInput.value = "";
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerText.textContent = timeLeft;
            } else {
                endGame(false);
            }
        }, 1000);
    }

    function checkAnswer() {
        if (commandInput.value.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
            score += 10; 
            badges.push(currentQuestion.badge);
            badgeText.textContent = badges.join(" ");
            level++;
            nextQuestion();
        } else {
            alert("Incorrect command! Try again.");
        }
    }

    function endGame(success) {
        clearInterval(timer);
        endGameContainer.classList.remove("hidden");
        
        if (success) {
            badges.push("🏆");
            badgeText.textContent = badges.join(" ");
            endMessage.textContent = "🎉 Congratulations! You completed all levels!";
        } else {
            endMessage.textContent = "❌ Game Over! Time ran out.";
        }

        saveScore();
        saveBadges();
    }

    function saveScore() {
        let username = localStorage.getItem("currentUser"); 
        if (!username) return;

        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        let existingUser = leaderboard.find(entry => entry.username === username);
        
        if (existingUser) {
            existingUser.score += score;
        } else {
            leaderboard.push({ username: username, score: score });
        }

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    function saveBadges() {
        let username = localStorage.getItem("currentUser");
        if (!username) return;

        let userBadges = JSON.parse(localStorage.getItem(username + "_badges")) || [];
        badges.forEach(badge => {
            if (!userBadges.includes(badge)) {
                userBadges.push(badge);
            }
        });

        localStorage.setItem(username + "_badges", JSON.stringify(userBadges));
    }

    submitButton.addEventListener("click", checkAnswer);
    tryAgainButton.addEventListener("click", startGame);
    homeButton.addEventListener("click", () => window.location.href = "selectgame.html");

    startGame();
});