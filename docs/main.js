function generateCombinations(players, courts) {
    const playerPairs = [];
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            playerPairs.push([players[i], players[j]]);
        }
    }

    const totalPairs = playerPairs.length;
    const rounds = Math.ceil(totalPairs / courts);
    const schedule = [];
    const usedPairs = new Set();

    for (let r = 0; r < rounds; r++) {
        const roundPairs = [];
        const roundPlayers = new Set();
        for (let c = 0; c < courts; c++) {
            for (const pair of playerPairs) {
                const [player1, player2] = pair;
                const pairKey = `${player1}-${player2}`;
                if (!usedPairs.has(pairKey) && !roundPlayers.has(player1) && !roundPlayers.has(player2)) {
                    roundPairs.push(pair);
                    roundPlayers.add(player1);
                    roundPlayers.add(player2);
                    usedPairs.add(pairKey);
                    break;
                }
            }
        }
        schedule.push(roundPairs);
    }

    return schedule;
}

// Example usage:
const players = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];
const courts = 2;
const schedule = generateCombinations(players, courts);

console.log("Schedule:");
schedule.forEach((round, index) => {
    console.log(`Round ${index + 1}:`);
    round.forEach(pair => {
        console.log(`  ${pair[0]} - ${pair[1]}`);
    });
});