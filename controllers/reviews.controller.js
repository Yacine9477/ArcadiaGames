const { getReviews, createReview } = require('../queries/reviewsSQL.queries');
const pool = require('../database/mysql');

exports.reviewList = async (req, res, next) => {
    try {
        const [reviews] = await getReviews(pool);
        res.render('reviews/review-list', {reviews});
    } catch(e) {
        console.error(e);
        res.status(500).send('Erreur serveur');
    }
}

exports.reviewForm = async (req, res, next) => {
    try {
        const gameId = req.params.gameId;
        res.render('reviews/review-form', { review: {}, gameId });
    } catch(e) {
        next(e);
    }
}

exports.reviewCreate = async (req, res, next) => {
    try {
        const { title, rating, content } = req.body;
        const userId = req.user._id;
        const username = req.user.username;
        const gameId = req.params.gameId;

        await createReview(pool, userId, username, gameId, title, rating, content);
        res.redirect(`/games/page/${gameId}`);
    } catch(e) {
        console.error('Erreur dans reviewCreate:', e);
        next(e);
    }
}

