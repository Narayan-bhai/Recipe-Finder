ALTER TABLE recipe_ingredient
DROP FOREIGN KEY recipe_ingredient_ibfk_1;

ALTER TABLE recipe_rating
DROP FOREIGN KEY recipe_rating_ibfk_2;

ALTER TABLE recipe
MODIFY id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE recipe_ingredient
ADD CONSTRAINT recipe_ingredient_ibfk_1
FOREIGN KEY (recipe_id)
REFERENCES recipe(id)
ON DELETE CASCADE;

ALTER TABLE recipe_rating
ADD CONSTRAINT recipe_rating_ibfk_2
FOREIGN KEY (recipe_id)
REFERENCES recipe(id)
ON DELETE CASCADE;