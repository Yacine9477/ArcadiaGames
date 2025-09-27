const Game = require('../database/models/game.model');

exports.createGame = (game) => {
    const newGame = new Game(game);
    return newGame.save();
}

exports.getGames = () => {
    return Game.find({}).exec();
}

exports.deleteGame = (gameId) => {
    return Game.findByIdAndDelete(gameId).exec();
}

exports.getGame = (gameId) => {
    return Game.findOne({_id: gameId }).exec();
}

exports.updateGame = (gameId, game) => {
    return Game.findByIdAndUpdate(gameId, { $set: game });
}

exports.searchGames = (search) => {
    return Game.find({ title: new RegExp(search, 'i')}).exec(); // le i permet d'être case-insensitive
}