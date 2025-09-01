const Game = require('../database/models/game.model');

exports.game = async (req, res, next) => {
    try {
        res.render('games/game');
    } catch(e) {
        next(e);
    }
}

exports.gameNew = async (req, res, next) => {
    try {
        res.render('games/game-form');
    } catch(e) {
        next(e);
    }
}
