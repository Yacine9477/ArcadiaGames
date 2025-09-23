const router = require('express').Router();
const {game, gameNew, gameCreate, gameDelete, gameEdit, gameUpdate } = require('../controllers/games.controller');

router.get('/', game);
router.get('/game/new', gameNew);
router.post('/', gameCreate);
router.delete('/:gameid', gameDelete);
router.get('/edit/:gameId', gameEdit);
router.post('/update/:gameId', gameUpdate);

module.exports = router;