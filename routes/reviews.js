const router = require('express').Router();
const { reviewList, reviewForm, reviewCreate } = require('../controllers/reviews.controller');

router.get('/form/:gameId', reviewForm);
router.post('/:gameId', reviewCreate);
router.get('/', reviewList);

module.exports = router;