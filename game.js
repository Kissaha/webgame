document.addEventListener("DOMContentLoaded", function () {
    const welcomePopup = document.getElementById("welcomePopup");
    const gameContainer = document.querySelector(".game-container");
    const startGameButton = document.getElementById("click");
    const choices = document.querySelectorAll(".choice");
    const badgePopup = document.getElementById("badgePopup");
    const closeBadgeButton = document.getElementById("closeBadge");
    const questionText = document.getElementById("question");
    const lifeInfo = document.getElementById("lifeInfo");
    const levelInfo = document.getElementById("levelInfo");
    const difficultyInfo = document.getElementById("difficultyInfo");

    let currentLevel = 0; // Start at level 0 (before game starts)
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 2; // Move to next level after 2 wrong attempts
    let score = 0;

    // Levels with easy difficulty
    const levels = [
        {
            question: "How do you check if a device has network connectivity?",
            answers: [
                { text: "Check the router or the patch panel.", correct: false },
                { text: "Open the network settings and check if it is connected.", correct: false },
                { text: "Use the ping command to check if the device can communicate with another network device.", correct: true },
                { text: "Open Google Chrome to see if a webpage loads.", correct: false },
            ],
            badge: "🌐",
            difficulty: "Easy",
        },
        {
            question: "What is the first step in troubleshooting a network issue?",
            answers: [
                { text: "Check the system unit.", correct: false },
                { text: "Check physical connections (cables, routers, and switches).", correct: true },
                { text: "Check the IP address.", correct: false },
                { text: "Check the socket of the cables.", correct: false },
            ],
            badge: "🔌",
            difficulty: "Easy",
        },
        {
            question: "You suspect a faulty network cable is causing connectivity issues. What tool should you use to test it?",
            answers: [
                { text: "Task Manager.", correct: false },
                { text: "Windows Defender.", correct: false },
                { text: "Power Supply.", correct: false },
                { text: "Cable tester.", correct: true },
            ],
            badge: "🔧",
            difficulty: "Easy",
        },
        {
            question: "A user is experiencing slow internet speeds. What is the most likely cause?",
            answers: [
                { text: "The monitor is too bright.", correct: false },
                { text: "Too many devices using the network.", correct: true },
                { text: "The computer needs more RAM.", correct: false },
                { text: "The keyboard is faulty.", correct: false },
            ],
            badge: "📶",
            difficulty: "Easy",
        },
        {
            question: "A user cannot connect to Wi-Fi. What is the first thing they should try?",
            answers: [
                { text: "Uninstall the Wi-Fi driver.", correct: false },
                { text: "Remove the Wi-Fi antenna.", correct: false },
                { text: "Restart the router.", correct: true },
                { text: "Replace the CPU.", correct: false },
            ],
            badge: "📡",
            difficulty: "Easy",
        },
    ];

    // Load the current level
    function loadLevel() {
        if (currentLevel >= levels.length) {
            alert("🎉 Congratulations! You completed all levels!");
            saveScore();
            window.location.href = "game2.html"; // Redirect to game2.html
            return;
        }

        // Update the question, choices, level, and difficulty
        questionText.textContent = levels[currentLevel].question;
        choices.forEach((choice, index) => {
            choice.textContent = levels[currentLevel].answers[index].text;
            choice.setAttribute("data-correct", levels[currentLevel].answers[index].correct);
        });

        levelInfo.textContent = `Level: ${currentLevel + 1}`;
        difficultyInfo.textContent = `Difficulty: ${levels[currentLevel].difficulty}`;
        lifeInfo.textContent = `Lives: ${maxIncorrectAttempts - incorrectAttempts}`;
        incorrectAttempts = 0; // Reset incorrect attempts
    }

    // Start game
    startGameButton.addEventListener("click", function () {
        welcomePopup.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        currentLevel = 0; // Start from level 1
        score = 0; // Reset score
        loadLevel();
    });

    // Check answer
    choices.forEach((choice) => {
        choice.addEventListener("click", function () {
            const isCorrect = this.getAttribute("data-correct") === "true";

            if (isCorrect) {
                score += 10; // Increase score for correct answer
                document.querySelector(".badge").textContent = levels[currentLevel].badge;
                badgePopup.classList.remove("hidden");
            } else {
                incorrectAttempts++;
                lifeInfo.textContent = `Lives: ${maxIncorrectAttempts - incorrectAttempts}`;
                if (incorrectAttempts >= maxIncorrectAttempts) {
                    alert("⚠️ You've made two mistakes. Moving to the next level.");
                    nextLevel();
                } else {
                    alert("⚠️ Incorrect! Try again.");
                }
            }
        });
    });

    // Move to next level when clicking "Next"
    closeBadgeButton.addEventListener("click", function () {
        badgePopup.classList.add("hidden");
        nextLevel();
    });

    // Function to move to the next level
    function nextLevel() {
        currentLevel++;
        loadLevel();
    }

    // Save score to local storage
    function saveScore() {
        const playerName = prompt("Enter your name:");
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: playerName, score: score });
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
});