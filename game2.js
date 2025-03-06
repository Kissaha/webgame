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
    const badgeText = document.querySelector(".badge");

    let currentLevel = 0;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 2;
    let score = 0;

    const levels = [
        {
            question: "A user reports that they cannot print to the network printer. What could be the issue?",
            answers: [
                { text: "The printer is turned off.", correct: false },
                { text: "The monitor brightness is too low.", correct: false },
                { text: "The printer has an IP conflict.", correct: true },
                { text: "The keyboard is unplugged.", correct: false },
            ],
            badge: "🖨️",
            difficulty: "Medium",
        },
        {
            question: "A computer is connected to the network but cannot access websites. What should you check first?",
            answers: [
                { text: "The screen resolution.", correct: false },
                { text: "The printer drivers.", correct: false },
                { text: "The battery level.", correct: false },
                { text: "The DNS settings.", correct: true },
            ],
            badge: "🖱",
            difficulty: "Medium",
        },
        {
            question: "Which command can be used to view the network configuration and active connections on a Windows computer?",
            answers: [
                { text: "taskmgr", correct: false },
                { text: "netstat", correct: false },
                { text: "nslookup", correct: false },
                { text: "ipconfig", correct: true },
            ],
            badge: "💻",
            difficulty: "Medium",
        },
        {
            question: "A user lost network access after manually modifying their IP address. What could be the issue?",
            answers: [
                { text: "The computer is overheating.", correct: false },
                { text: "The IP configuration is incorrect.", correct: true },
                { text: "The network cables are too long.", correct: false },
                { text: "The Wi-Fi signal is too strong.", correct: false },
            ],
            badge: "🔍",
            difficulty: "Medium",
        },
        {
            question: "A PC connected via Ethernet displays 'No Internet Access,' but other wired and wireless devices are functioning normally. What is the most logical first step in troubleshooting?",
            answers: [
                { text: "Restart the entire network for the company.", correct: false },
                { text: "Check the network cable and try a different port on the switch.", correct: true },
                { text: "Ask someone else if their internet is working.", correct: false },
                { text: "Reinstall the operating system.", correct: false },
            ],
            badge: "⚠️",
            difficulty: "Medium",
        }
    ];

    function loadLevel() {
        if (currentLevel >= levels.length) {
            alert("🎉 Congratulations! You completed all levels!");
            saveScore();
            window.location.href = "game3.html"; // Next game
            return;
        }

        questionText.textContent = levels[currentLevel].question;
        choices.forEach((choice, index) => {
            choice.textContent = levels[currentLevel].answers[index].text;
            choice.setAttribute("data-correct", levels[currentLevel].answers[index].correct);
        });

        levelInfo.textContent = `Level: ${currentLevel + 1}`;
        difficultyInfo.textContent = `Difficulty: ${levels[currentLevel].difficulty}`;
        lifeInfo.textContent = `Lives: ${maxIncorrectAttempts - incorrectAttempts}`;
    }

    startGameButton.addEventListener("click", function () {
        welcomePopup.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        currentLevel = 0;
        score = 0;
        incorrectAttempts = 0;
        loadLevel();
    });

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

    closeBadgeButton.addEventListener("click", function () {
        badgePopup.classList.add("hidden");
        nextLevel();
    });

    function nextLevel() {
        currentLevel++;
        loadLevel();
    }

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