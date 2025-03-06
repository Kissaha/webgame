document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.querySelector(".game-container");
    const taskText = document.getElementById("task-text");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const feedback = document.getElementById("feedback");
    const timerDisplay = document.getElementById("timer");

    // Create button container for centering
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const tryAgainButton = document.createElement("button");
    const homeButton = document.createElement("button");
    
    tryAgainButton.textContent = "Try Again";
    tryAgainButton.style.display = "none";
    
    homeButton.textContent = "Home";
    homeButton.style.display = "none";
    homeButton.addEventListener("click", function () {
        window.location.href = "selectgame.html";
    });

    // Append buttons inside the container
    buttonContainer.appendChild(tryAgainButton);
    buttonContainer.appendChild(homeButton);
    
    // Append button container to game container
    gameContainer.appendChild(buttonContainer);

    let timeLeft = 60;
    let timer;
    let taskIndex = 0;
    let shuffledTasks = [];
    let completedAllTasks = false;
    let score = 0;
    let badgeEarned = "🏆"; // Default badge

    const tasks = [
        { question: "A laptop cannot detect any Wi-Fi networks. What hardware component should you check? (Hint: Network device)", answer: "adapter" },
        { question: "A website is not loading. What command helps diagnose the issue? (Hint: Network test)", answer: "ping" },
        { question: "A network printer is not responding. What is the first step in troubleshooting? (Hint: Restart)", answer: "reboot" },
        { question: "A user complains about slow internet. What device should you restart first? (Hint: Network box)", answer: "router" },
        { question: "Your computer is assigned an IP of 169.254.x.x. What might be the issue? (Hint: No DHCP)", answer: "dhcp" }
    ];

    function showWelcomePopup() {
        const welcomePopup = document.createElement("div");
        welcomePopup.classList.add("popup");

        welcomePopup.innerHTML = `
            <div class="popup-content">
                <h2>Welcome to Network Fixer: Task Rush</h2>
                <p>Test your troubleshooting skills and fix network issues fast!</p>
                <button id='startGame'>Click to Start</button>
            </div>
        `;
        
        document.body.appendChild(welcomePopup);
        
        document.getElementById("startGame").addEventListener("click", function () {
            welcomePopup.remove();
            startGame();
        });
    }
    
    function startGame() {
        shuffledTasks = shuffleArray([...tasks]); 
        taskIndex = 0;
        completedAllTasks = false;
        score = 0;
        loadNewTask();
        timeLeft = 60;
        timerDisplay.textContent = timeLeft;
        tryAgainButton.style.display = "none";
        homeButton.style.display = "none";
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }

    function loadNewTask() {
        if (taskIndex >= shuffledTasks.length) {
            completedAllTasks = true;
            endGame();
            return;
        }
        const currentTask = shuffledTasks[taskIndex];
        taskText.textContent = currentTask.question;
        answerInput.value = "";
        feedback.textContent = "";
        taskIndex++;
    }

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(timer);
            completedAllTasks = false;
            endGame();
        }
    }

    submitButton.addEventListener("click", function () {
        if (answerInput.value.trim().toLowerCase() === shuffledTasks[taskIndex - 1].answer.toLowerCase()) {
            feedback.textContent = "✅ Correct!";
            score += 10; // Add 10 points per correct answer
            setTimeout(loadNewTask, 1000);
        } else {
            feedback.textContent = "❌ Incorrect! Try again.";
        }
    });

    function endGame() {
        clearInterval(timer);
        if (completedAllTasks) {
            feedback.textContent = "🎉 Congratulations! You completed all tasks successfully!";
            assignBadge();
        } else {
            feedback.textContent = "❌ Game Over! You ran out of time.";
        }
        saveScore();
        saveBadge();
        tryAgainButton.style.display = "block";
        homeButton.style.display = "block";
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function assignBadge() {
        if (score >= 50) {
            badgeEarned = "🔥"; // Example badge for high score
        }
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

    function saveBadge() {
        let username = localStorage.getItem("currentUser");
        if (!username) return;

        let userBadges = JSON.parse(localStorage.getItem(username + "_badges")) || [];

        if (!userBadges.includes(badgeEarned)) {
            userBadges.push(badgeEarned);
            localStorage.setItem(username + "_badges", JSON.stringify(userBadges));
        }
    }

    tryAgainButton.addEventListener("click", startGame);
    showWelcomePopup();
});