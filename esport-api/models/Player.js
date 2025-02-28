const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/esports';


const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
    rating: { type: Number, required: true }
});

module.exports = mongoose.model('Player', playerSchema);
