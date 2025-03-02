document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const signupErrorMsg = document.getElementById("signupErrorMsg");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(user => user.username === newUsername)) {
            signupErrorMsg.textContent = "Username already exists. Try a different one.";
            signupErrorMsg.style.display = "block";
        } else {
            users.push({ username: newUsername, password: newPassword });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Sign up successful! Redirecting to login...");
            window.location.href = "login.html";
        }
    });
});