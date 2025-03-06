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
    const badgeText = document.querySelector(".badge");

    let currentLevel = 0;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 2;
    let score = 0;

    const levels = [
        {
            question: "A company has multiple computers connected to a modem through a router. One computer cannot access the internet, but others can. You check its IP address and see 169.254.5.20. What is the best troubleshooting step?",
            answers: [
                { text: "Restart the computer and hope it.", correct: false },
                { text: "Check if the monitor is turned on.", correct: false },
                { text: "Manually assign an IP in the correct network range.", correct: true },
                { text: "Turn off all computers and restart them at the same time.", correct: false },
            ],
            badge: "🕵️",
            difficulty: "Hardest",
        },
        {
            question: "A server is not responding to client requests. After checking, you find that it has no assigned IP address. What should you do first?",
            answers: [
                { text: "Restart the network switch.", correct: false },
                { text: "Check if the DHCP server is running.", correct: true },
                { text: "Reinstall the operating system.", correct: false },
                { text: "Replace the network card.", correct: false },
            ],
            badge: "⌨️",
            difficulty: "Hardest",
        },
        {
            question: "A technician needs to replace a faulty power supply unit (PSU) in a server. What should be done first?",
            answers: [
                { text: "Unplug the power cable and wait for capacitors to discharge.", correct: true },
                { text: "Remove the motherboard first.", correct: false },
                { text: "Open all the RAM slots.", correct: false },
                { text: "Disable the network card.", correct: false },
            ],
            badge: "⚡",
            difficulty: "Hardest",
        },
        {
            question: "A company's database server is experiencing frequent crashes. What is the best approach to diagnose the issue?",
            answers: [
                { text: "Check the event logs and system resource usage.", correct: true },
                { text: "Restart the server randomly.", correct: false },
                { text: "Uninstall security software.", correct: false },
                { text: "Increase the screen resolution.", correct: false },
            ],
            badge: "📊",
            difficulty: "Hardest",
        },
        {
            question: "A network administrator suspects that an unauthorized device is connected to the network. What tool can be used to identify unknown devices?",
            answers: [
                { text: "Wireshark", correct: true },
                { text: "Task Manager", correct: false },
                { text: "Device Manager", correct: false },
                { text: "Notepad", correct: false },
            ],
            badge: "🔍",
            difficulty: "Hardest",
        }
    ];

    function loadLevel() {
        if (currentLevel >= levels.length) {
            alert("🎉 You're unstoppable! Every difficulty—completed! 🏆🚀");
            saveScore();
            window.location.href = "selectgame.html"; // Redirect after finishing all levels
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
        if (currentLevel >= levels.length) {
            saveScore();
            window.location.href = "selectgame.html"; // Redirect kapag tapos na ang laro
        } else {
            loadLevel();
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

        window.location.href = "selectgame.html"; // Redirect pagkatapos ng score save
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