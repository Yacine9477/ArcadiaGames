const router = require('express').Router();
const games = require('./games');
const users = require('./users');
const auth = require('./auth');


router.use('/games', games);
router.use('/users', users);
router.use('/auth', auth);

router.get('/', (req, res) => {
    res.redirect('/games');
})

module.exports = router;