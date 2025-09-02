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