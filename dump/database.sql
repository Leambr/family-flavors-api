CREATE TABLE IF NOT EXISTS dish_type (
    `id` VARCHAR(36) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS season (
    `id` VARCHAR(36) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipe` (
`id` VARCHAR(36) PRIMARY KEY,
`title` VARCHAR(255) NOT NULL,
`diet_type` VARCHAR(50) NOT NULL,
`serving` SMALLINT NOT NULL,
`prep_time` INT NOT NULL,
`cook_time` INT,
`instruction` TEXT NOT NULL,
`image_url` VARCHAR(255),
`season_id` VARCHAR(36),
`dish_type_id` VARCHAR(36),
CONSTRAINT fk_recipe_season FOREIGN KEY (season_id) REFERENCES season(id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_recipe_dish_type FOREIGN KEY (dish_type_id) REFERENCES dish_type(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ingredient (
    `id` VARCHAR(36) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE recipe_ingredient_measure (
    `id` VARCHAR(36) PRIMARY KEY,
    `unit` VARCHAR(50) NOT NULL, 
    `amount` DECIMAL(10, 2) NOT NULL  
);

CREATE TABLE recipe_ingredient (
    `recipe_id` VARCHAR(36),
    `ingredient_id` VARCHAR(36),
    `recipe_ingredient_measure_id` VARCHAR(36),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
    FOREIGN KEY (recipe_ingredient_measure_id) REFERENCES recipe_ingredient_measure(id)
);