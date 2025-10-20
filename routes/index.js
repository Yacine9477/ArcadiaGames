const router = require('express').Router();
const games = require('./games');
const users = require('./users');
const auth = require('./auth');
const reviews = require('./reviews')


router.use('/games', games);
router.use('/users', users);
router.use('/auth', auth);
router.use('/review', reviews);

router.get('/', (req, res) => {
    res.redirect('/games');
})

module.exports = router;