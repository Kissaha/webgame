document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Username and password are required!";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Hanapin ang user gamit ang case-insensitive comparison
        const user = users.find(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password);

        if (user) {
            alert("Login successful! Redirecting to the game...");

            // I-save ang username sa localStorage para magamit sa leaderboard
            localStorage.setItem("currentUser", user.username);

            // Redirect sa game page (palitan ang "index.html" kung iba ang main game file mo)
            window.location.href = "index.html";
        } else {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Invalid username or password!";
        }
    });
});