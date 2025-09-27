const router = require('express').Router();
const {game, gameAll, gameSearch, gameNew, gameCreate, gameDelete, gameEdit, gameUpdate, gamePage } = require('../controllers/games.controller');
const { ensureAuthenticated } = require('../middlewares/route');

router.get('/', game);
router.get('/game/all', gameAll);
router.get('/search', gameSearch);
router.get('/game/new', ensureAuthenticated, gameNew);
router.post('/', gameCreate);
router.delete('/:gameid', gameDelete);
router.get('/edit/:gameId', gameEdit);
router.post('/update/:gameId', gameUpdate);
router.get('/page/:gameId', gamePage);

module.exports = router;