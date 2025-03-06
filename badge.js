document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("currentUser");
    let badgeContainer = document.getElementById("badge-container");

    if (!username) {
        alert("You must be logged in to view your badges.");
        window.location.href = "login.html"; // Redirect to login if not logged in
        return;
    }

    // Retrieve the user's badges from localStorage
    let userBadges = JSON.parse(localStorage.getItem(username + "_badges")) || [];

    if (userBadges.length === 0) {
        badgeContainer.innerHTML = "<p>You haven't earned any badges yet.</p>";
    } else {
        userBadges.forEach(badge => {
            let badgeElement = document.createElement("div");
            badgeElement.classList.add("badge");

            let emojiSpan = document.createElement("span");
emojiSpan.textContent = badge.emoji || badge; // Gamitin ang emoji property o mismong badge kung wala

badgeElement.appendChild(emojiSpan);
badgeContainer.appendChild(badgeElement);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        let badgeContainer = document.getElementById("badgeList");
        let earnedBadges = JSON.parse(localStorage.getItem("badges")) || [];
    
        badgeContainer.innerHTML = "";
    
        earnedBadges.forEach(badge => {
            let badgeElement = document.createElement("div");
            badgeElement.classList.add("badge");
            badgeElement.innerText = badge;
            badgeContainer.appendChild(badgeElement);
        });
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        let badgeContainer = document.getElementById("badgeList");
        let earnedBadges = JSON.parse(localStorage.getItem("badges")) || [];
    
        badgeContainer.innerHTML = "";
    
        earnedBadges.forEach(badge => {
            let badgeElement = document.createElement("div");
            badgeElement.classList.add("badge");
            badgeElement.innerHTML = `${badge.icon} <br> ${badge.name}`;
            badgeContainer.appendChild(badgeElement);
        });
    });
    
    document.addEventListener("DOMContentLoaded", () => {
    let badgeContainer = document.getElementById("badgeList");
    let earnedBadges = JSON.parse(localStorage.getItem("badges")) || [];

    badgeContainer.innerHTML = "";

    earnedBadges.forEach(badge => {
        let badgeElement = document.createElement("div");
        badgeElement.classList.add("badge");
        badgeElement.innerHTML = `${badge.icon} <br> ${badge.name}`;
        badgeContainer.appendChild(badgeElement);
    });
});

});