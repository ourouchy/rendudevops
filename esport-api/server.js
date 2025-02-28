const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/esports";
const dbname = "esports"

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();

        const database = client.db(dbname);
        const collection = database.collection('players');

        // Function to add a new player
        async function addPlayer(player) {
            const result = await collection.insertOne(player);
            console.log(`New player added with the following id: ${result.insertedId}`);
        }

        // Function to find a player by name
        async function findPlayerByName(name) {
            const player = await collection.findOne({ name: name });
            if (player) {
                console.log(`Found a player in the collection with the name '${name}':`, player);
            } else {
                console.log(`No player found with the name '${name}'`);
            }
        }

        // Function to update a player's rating
        async function updatePlayerRating(name, newRating) {
            const result = await collection.updateOne({ name: name }, { $set: { rating: newRating } });
            if (result.matchedCount > 0) {
                console.log(`Successfully updated the rating for player '${name}'`);
            } else {
                console.log(`No player found with the name '${name}' to update`);
            }
        }

        // Function to delete a player by name
        async function deletePlayerByName(name) {
            const result = await collection.deleteOne({ name: name });
            if (result.deletedCount > 0) {
                console.log(`Successfully deleted the player with the name '${name}'`);
            } else {
                console.log(`No player found with the name '${name}' to delete`);
            }
        }

        // Example usage
        await addPlayer({ name: 'John Doe', team: 'Team A', role: 'Striker', rating: 85 });
        await findPlayerByName('John Doe');
        await updatePlayerRating('John Doe', 90);
        await deletePlayerByName('John Doe');

    } finally {
        await client.close();
    }
}

main().catch(console.error);
