document.addEventListener("DOMContentLoaded", function () {
    const welcomePopup = document.getElementById("welcomePopup");
    const gameContainer = document.querySelector(".game-container");
    const startGameButton = document.getElementById("startGame");
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

    // Levels with difficult difficulty
    const levels = [
        {
            question: "A company has multiple computers connected to a modem through a router. One computer cannot access the internet, but others can. You check its IP address and see 169.254.5.20. What is the best troubleshooting step?",
            answers: [
                { text: "Restart the computer and see if it resolves the issue.", correct: false },
                { text: "Check if the monitor is turned on.", correct: false },
                { text: "Manually assign an IP in the correct network range.", correct: true },
                { text: "Turn off all computers and restart them at the same time.", correct: false },
            ],
            badge: "🖥️",
            difficulty: "Difficult",
        },
        {
            question: "You set up two computers in a peer-to-peer network using an Ethernet cable. Both have IPs in the 192.168.1.X range, but they cannot communicate. What should you check next?",
            answers: [
                { text: "If they have the same IP address.", correct: false },
                { text: "If both computers have working speakers.", correct: false },
                { text: "If the router is overheating.", correct: false },
                { text: "If the subnet masks match.", correct: true },
            ],
            badge: "🔗",
            difficulty: "Difficult",
        },
        {
            question: "A student is troubleshooting a peer-to-peer network between two computers using an Ethernet cable. Both devices have the same subnet mask (255.255.255.0) and static IP addresses in the range 192.168.1.X, but they still cannot communicate. What should they check next?",
            answers: [
                { text: "If a crossover or straight-through cable is being used.", correct: true },
                { text: "The modem settings.", correct: false },
                { text: "The internet speed.", correct: false },
                { text: "The computer’s screen brightness.", correct: false },
            ],
            badge: "🔌",
            difficulty: "Difficult",
        },
        {
            question: "A business network uses static IP addresses, but one computer was set to DHCP by mistake. The user reports no internet access. How can this issue be fixed?",
            answers: [
                { text: "Restart the computer three times.", correct: false },
                { text: "Wait for the computer to auto-configure.", correct: false },
                { text: "Install more RAM.", correct: false },
                { text: "Manually assign the correct static IP address.", correct: true },
            ],
            badge: "📡",
            difficulty: "Difficult",
        },
        {
            question: "You are troubleshooting a home modem connected to an ISP. The modem’s WAN light is off, and no devices can connect to the internet. What is the first step?",
            answers: [
                { text: "Restart the laptop.", correct: false },
                { text: "Change the modem’s name.", correct: false },
                { text: "Ensure the modem is securely connected to the ISP line.", correct: true },
                { text: "Check the computer’s power settings.", correct: false },
            ],
            badge: "🌐",
            difficulty: "Difficult",
        },
    ];

    // Load the current level
    function loadLevel() {
        if (currentLevel >= levels.length) {
            alert("🎉 Congratulations! You completed all levels!");
            saveScore();
            window.location.href = "leaderboard.html"; // Redirect to leaderboard.html
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