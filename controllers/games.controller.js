const Game = require('../database/models/game.model');

const {createGame, getGames, deleteGame, getGame, updateGame, searchGames} = require('../queries/game.queries');

exports.game = async (req, res, next) => {
    try {
        const games = await getGames();
        res.render('games/game', {games, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch(e) {
        next(e);
    }
}

exports.gameAll = async (req, res, next) => {
    try {
        const games = await getGames();
        res.render('games/game-all', {games, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
    } catch(e) {
        next(e);
    }
}

exports.gameSearch = async (req,res, next) => {
    try {
        const search = req.query.str;
        const games = await searchGames(search);
        res.render('games/game-list', { games, isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
            currentUser: req.user });
    } catch(e) {
        next(e);
    }
}

exports.gameNew = async (req, res, next) => { 
    try {
        res.render('games/game-form', { game: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
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
        res.status(400).render('games/game-form', {errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
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
        res.render('games/game-form', { game, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    } catch(e) {
        next(e);
    }
}

exports.gameUpdate = async (req, res, next) => {
    try {
        const gameId = req.params.gameId;

        const body = req.body;
        await updateGame(gameId, body);
        res.redirect('/games');

    } catch(e) {
        next(e);
    }
}

exports.gamePage = async (req, res, next) => {
    try {
        const gameId = req.params.gameId;
        const game = await getGame(gameId);
        res.render('games/game-page', { game, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    } catch(e) {
        next(e);
    }
}