document.addEventListener("DOMContentLoaded", function () {
    const welcomePopup = document.getElementById("welcomePopup");
    const startGameButton = document.getElementById("click");
    const gameContainer = document.querySelector(".game-container");
    const choices = document.querySelectorAll(".choice");
    const badgePopup = document.getElementById("badgePopup");
    const closeBadgeButton = document.getElementById("closeBadge");
    const questionText = document.getElementById("question");
    const lifeInfo = document.getElementById("lifeInfo");
    const levelInfo = document.getElementById("levelInfo");
    const difficultyInfo = document.getElementById("difficultyInfo");
    const badgeText = document.querySelector(".badge");

    let currentLevel = 0;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 2;
    let score = 0;

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
            badge: "🔒",
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
            badge: "🛠",
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
        }
    ];

    // Start Game Button
    startGameButton.addEventListener("click", function () {
        console.log("Start button clicked");
        welcomePopup.style.display = "none";
        gameContainer.classList.remove("hidden");
        currentLevel = 0;
        score = 0;
        incorrectAttempts = 0;
        loadLevel();
    });

    // Function para i-load ang kasalukuyang level
    function loadLevel() {
        if (currentLevel >= levels.length) {
            alert("🎉 Congratulations! You completed all levels!");
            saveScore();
            window.location.href = "game2.html"; // Redirect sa susunod na game
            return;
        }

        // I-update ang question, choices, level, at difficulty
        questionText.textContent = levels[currentLevel].question;
        choices.forEach((choice, index) => {
            choice.textContent = levels[currentLevel].answers[index].text;
            choice.setAttribute("data-correct", levels[currentLevel].answers[index].correct);
        });

        levelInfo.textContent = `Level: ${currentLevel + 1}`;
        difficultyInfo.textContent = `Difficulty: ${levels[currentLevel].difficulty}`;
        lifeInfo.textContent = `Lives: ${maxIncorrectAttempts - incorrectAttempts}`;
    }

    // Function para sa pag-check ng sagot
    choices.forEach((choice) => {
        choice.addEventListener("click", function () {
            const isCorrect = this.getAttribute("data-correct") === "true";

            if (isCorrect) {
                score += 10;
                let earnedBadge = levels[currentLevel].badge;
                badgeText.textContent = earnedBadge;
                badgePopup.classList.remove("hidden");
                saveBadge(earnedBadge);
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

    // Function para lumipat sa next level
    function nextLevel() {
        currentLevel++;
        loadLevel();
    }

    // Event listener para sa "Next" button sa badge popup
    closeBadgeButton.addEventListener("click", function () {
        badgePopup.classList.add("hidden");
        nextLevel();
    });

    // Function para i-save ang score sa local storage
    function saveScore() {
        let username = localStorage.getItem("currentUser"); 
        if (!username) return;

        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

        // Hanapin kung may existing entry na ang user
        let existingUser = leaderboard.find(entry => entry.username === username);
        
        if (existingUser) {
            // Idagdag ang bagong score sa dati
            existingUser.score += score;
        } else {
            // Kung bagong player, idagdag sa leaderboard
            leaderboard.push({ username: username, score: score });
        }

        // I-save ulit ang leaderboard sa localStorage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    // Function para i-save ang mga badges ng user sa local storage
    function saveBadge(badge) {
        let username = localStorage.getItem("currentUser");
        if (!username) return;

        let userBadges = JSON.parse(localStorage.getItem(username + "_badges")) || [];
        
        if (!userBadges.includes(badge)) {
            userBadges.push(badge);
            localStorage.setItem(username + "_badges", JSON.stringify(userBadges));
        }
    }
});