document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");

    function displayLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.sort((a, b) => b.score - a.score); // Sort by score in descending order

        leaderboardList.innerHTML = "";
        leaderboard.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${entry.name} - ${entry.score} points`;
            leaderboardList.appendChild(listItem);
        });
    }

    displayLeaderboard();
});