CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) ,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_sessions (
    session_id CHAR(32) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) 
        REFERENCES users(id) 
            ON DELETE CASCADE
);

CREATE TABLE recipe_rating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipes_id INT NOT NULL,
    rating INT,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
            ON DELETE CASCADE,
    FOREIGN KEY (recipes_id)
        REFERENCES recipe(id)
            ON DELETE CASCADE
);

ALTER TABLE recipe
ADD COLUMN avg_rating DECIMAL(2,1) DEFAULT 0,
ADD COLUMN count_rating INT DEFAULT 0,
ADD COLUMN user_id INT DEFAULT 1,
ADD CONSTRAINT fk_ratings_user
FOREIGN KEY (user_id)
REFERENCES users(id);

ALTER TABLE recipe 
MODIFY COLUMN user_id INT AFTER id;


