
exports.getCategories = (pool) => {
    return pool.query('SELECT * FROM categories ORDER BY name ASC');
}

exports.addGameCategory = (pool, gameMongoId, categoryId) => {
    return pool.execute(
        'INSERT INTO game_categories (game_mongo_id, category_id) VALUES (?, ?)', [gameMongoId, categoryId]);
}

exports.getGameCategories = (pool, gameMongoId) => {
    return pool.query(`
        SELECT c.id, c.name 
        FROM categories c 
        JOIN game_categories gc ON c.id = gc.category_id 
        WHERE gc.game_mongo_id = ?
    `, [gameMongoId]);
}

exports.removeGameCategories = (pool, gameMongoId) => {
    return pool.execute(
        'DELETE FROM game_categories WHERE game_mongo_id = ?', 
        [gameMongoId]
    );
}

exports.getGameIdsByCategory = (pool, categoryId) => {
    return pool.query(`
        SELECT game_mongo_id 
        FROM game_categories 
        WHERE category_id = ?
    `, [categoryId]);
}
