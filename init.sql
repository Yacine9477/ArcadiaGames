USE arcadiagames;

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_mongo_id VARCHAR(48) NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT fk_gc_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    CONSTRAINT uq_game_category UNIQUE (game_mongo_id, category_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_mongo_id VARCHAR(48) NOT NULL,
    username VARCHAR(100) NOT NULL,
    game_mongo_id VARCHAR(48) NOT NULL,
    title VARCHAR(200) NOT NULL,
    rating INT NOT NULL CHECK (
        rating >= 1
        AND rating <= 5
    ),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Données initiales
INSERT INTO
    categories (name)
VALUES ('Coup de cœur'),
    ('Multijoueurs'),
    ('Horreur'),
    ('Famille'),
    ('Gestion');