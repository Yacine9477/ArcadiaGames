const Game = require('../database/models/game.model');

const {createGame, getGames, deleteGame, getGame, updateGame} = require('../queries/game.queries');

exports.game = async (req, res, next) => {
    try {
        const games = await getGames();
        res.render('games/game', {games});
    } catch(e) {
        next(e);
    }
}

exports.gameNew = async (req, res, next) => {
    try {
        res.render('games/game-form', { game: {}});
    } catch(e) {
        next(e);
    }
}

exports.gameCreate = async (req, res, next) => {
    try {
        const body = req.body;
        console.log('Form data:', body);
        await createGame(body);
        res.redirect('/games');
    } catch(e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message);
        res.status(400).render('games/game-form', {errors});
    }
}

exports.gameDelete = async (req, res, next) => {
    try {
        const gameId = req.params.gameid;
        await deleteGame(gameId);
        const games = await getGames();
        res.render('games/game-list', {games})
    } catch(e) {
        console.error('Erreur suppression:', e);
        res.status(500).send('Erreur suppression: ' + e.message);
        next(e);
    }
}

exports.gameEdit = async (req, res,next) => {
    try {
        const gameId = req.params.gameId;
        const game = await getGame(gameId);
        res.render('games/game-form', { game })
    } catch(e) {
        next(e)
    }
}

exports.gameUpdate = async (req, res, next) => {
    try {
        const gameId = req.params.gameId;

        const body = req.body;
        await updateGame(gameId, body);
        res.redirect('/games');

    } catch(e) {
        next(e)
    }
}
