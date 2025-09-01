const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gameSchema = schema({
    title: {type: String, maxlength: [100, 'Titre trop long'], required: [true, 'Champ requis']}
})

const Game = mongoose.model('games', gameSchema);

module.exports = Game;