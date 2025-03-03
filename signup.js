document.addEventListener("DOMContentLoaded", function () {
    // Menu toggle handling
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.getElementById("menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            navMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove("show");
            }
        });
    }

    // Button navigation handling
    const startGameBtn = document.getElementById("startGame");
    if (startGameBtn) {
        startGameBtn.addEventListener("click", function () {
            window.location.href = "game.html";
        });
    }

    const leaderboardBtn = document.getElementById("leaderboard");
    if (leaderboardBtn) {
        leaderboardBtn.addEventListener("click", function () {
            window.location.href = "leaderboard.html";
        });
    }

    // Sign Up form handling
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const newUsername = document.getElementById("newUsername").value.trim();
            const newPassword = document.getElementById("newPassword").value.trim();
            const errorMsg = document.getElementById("signupErrorMsg");

            if (!newUsername || !newPassword) {
                errorMsg.style.display = "block";
                errorMsg.textContent = "Username and password are required!";
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if username already exists
            if (users.some(user => user.username === newUsername)) {
                errorMsg.style.display = "block";
                errorMsg.textContent = "Username already exists!";
                return;
            }

            users.push({ username: newUsername, password: newPassword });

            localStorage.setItem("users", JSON.stringify(users));

            alert("Sign up successful! Redirecting to login...");
            window.location.href = "login.html";
        });
    }
});