document.addEventListener("DOMContentLoaded", function () {
    let leaderboardContainer = document.getElementById("leaderboard-list");

    // Error handling kung wala ang leaderboard container
    if (!leaderboardContainer) {
        console.error("❌ Error: Leaderboard container not found. Check your HTML ID.");
        return;
    }

    leaderboardContainer.innerHTML = "";

    // Kuhanin ang leaderboard data mula sa localStorage
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Kung walang scores, magpakita ng message
    if (leaderboard.length === 0) {
        leaderboardContainer.innerHTML = "<li>No scores available yet.</li>";
        return;
    }

    // Sort leaderboard (highest to lowest score)
    leaderboard.sort((a, b) => b.score - a.score);

    // Display each player's score sa leaderboard
    leaderboard.forEach((player, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.username}: ${player.score} points`;
        leaderboardContainer.appendChild(listItem);
    });

    console.log("✅ Leaderboard updated successfully!");
});