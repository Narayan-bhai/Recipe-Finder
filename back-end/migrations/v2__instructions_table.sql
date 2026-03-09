CREATE TABLE instructions (
    recipe_id INT,
    step_number INT,
    instruction TEXT,
    PRIMARY KEY (recipe_id, step_number),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

INSERT INTO instructions (recipe_id, step_number, instruction)
    WITH RECURSIVE split_steps AS (
        SELECT
            id AS recipe_id,
            1 AS step_number,
            TRIM(SUBSTRING_INDEX(instructions,'|',1)) AS instruction,
            SUBSTRING(instructions, LENGTH(SUBSTRING_INDEX(instructions,'|',1)) + 2) AS rest
        FROM recipe
        WHERE instructions IS NOT NULL

        UNION ALL

        SELECT
            recipe_id,
            step_number + 1,
            TRIM(SUBSTRING_INDEX(rest,'|',1)),
            SUBSTRING(rest, LENGTH(SUBSTRING_INDEX(rest,'|',1)) + 2)
        FROM split_steps
        WHERE rest <> ''
    )

    SELECT recipe_id, step_number, instruction
    FROM split_steps;



ALTER TABLE recipe DROP COLUMN instructions;