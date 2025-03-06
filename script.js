document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.getElementById("menu");

    if (!menuToggle || !navMenu) {
        console.error("Menu elements not found!");
        return;
    }

    // Toggle menu on click
    menuToggle.addEventListener("click", function (event) {
        console.log("Hamburger menu clicked");
        event.stopPropagation();
        navMenu.classList.toggle("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            console.log("Click outside menu");
            navMenu.classList.remove("show");
        }
    });

    // Button event listeners
    document.getElementById("startGame").addEventListener("click", function() {
        console.log("Start Game button clicked");
        window.location.href = "game.html";
    });

    document.getElementById("login").addEventListener("click", function() {
        console.log("Login button clicked");
        window.location.href = "login.html";
    });

    document.getElementById("signup").addEventListener("click", function() {
        console.log("Sign up button clicked");
        window.location.href = "signup.html";
    });

    document.getElementById("leaderboard").addEventListener("click", function() {
        console.log("Leaderboard button clicked");
        window.location.href = "leaderboard.html";
    });

    // Debugging logs
    console.log("JavaScript loaded successfully");
});