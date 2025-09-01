const router = require('express').Router();
const {game, gameNew} = require('../controllers/games.controller');

router.get('/', game);
router.get('/game/new', gameNew);

module.exports = router;