document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("Login successful! Redirecting to the game...");
            window.location.href = "index.html"; // Redirect back to the game
        } else {
            errorMsg.style.display = "block";
        }
    });
});