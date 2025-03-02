document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.getElementById("menu");

    if (!menuToggle || !navMenu) {
        console.error("Menu elements not found!");
        return;
    }

    // Toggle menu on click
    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        navMenu.classList.toggle("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("show");
        }
    });

    // Button event listeners
    document.getElementById("startGame").addEventListener("click", function() {
        window.location.href = "game.html";
    });
    

    document.getElementById("login").addEventListener("click", function() {
        alert("Opening Login...");
    });

    document.getElementById("leaderboard").addEventListener("click", function() {
        window.location.href = "pages/leaderboard.html";
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const leaderboardButton = document.getElementById("leaderboard");
    
        if (leaderboardButton) {
            leaderboardButton.addEventListener("click", function () {
                window.location.href = "pages/leaderboard.html";
            });
        }
    });
    
    // Debugging logs
    console.log("JavaScript loaded successfully");
});

