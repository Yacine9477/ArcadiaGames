const router = require('express').Router();
const {game, gameNew, gameCreate, gameDelete} = require('../controllers/games.controller');

router.get('/', game);
router.get('/game/new', gameNew);
router.post('/', gameCreate);
router.delete('/:gameid', gameDelete)

module.exports = router;