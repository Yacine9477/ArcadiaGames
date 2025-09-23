const router = require('express').Router();
const games = require('./games');


router.use('/games', games);

router.get('/', (req, res) => {
    res.redirect('/games');
})

module.exports = router;