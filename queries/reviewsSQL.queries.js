

exports.getReviews = (pool) => {
    return pool.execute('SELECT * FROM reviews');
}

exports.createReview = (pool, userId, username, gameId, title, rating, content) => {
    return pool.execute('INSERT INTO reviews (user_mongo_id, username, game_mongo_id, title, rating, content) VALUES (?, ?, ?, ?, ?, ?)', [userId, username, gameId, title, rating, content]);    
}

exports.getReviewsByGameId = (pool, gameId) => {
    return pool.execute('SELECT * FROM reviews WHERE game_mongo_id = ?', [gameId]);
}

exports.removeGameReviews = (pool, gameId) => {
    return pool.execute('DELETE FROM reviews WHERE game_mongo_id = ?', [gameId]);
}