CREATE TABLE IF NOT EXISTS dishType (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS season (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipe` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `dietType` VARCHAR(50) NOT NULL,
    `serving` SMALLINT NOT NULL,
    `prepTime` INT NOT NULL,
    `cookTime` INT,
    `instruction` TEXT NOT NULL,
    `imageUrl` VARCHAR(255),
    `season_id` INT,
    `dishType_id` INT,
    CONSTRAINT fk_recipe_season FOREIGN KEY (season_id) REFERENCES season(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_recipe_dishType FOREIGN KEY (dishType_id) REFERENCES dishType(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ingredient (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE recipe_ingredient_measure (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `unit` VARCHAR(50) NOT NULL, 
    `amount` DECIMAL(10, 2) NOT NULL  
);


CREATE TABLE recipe_ingredient (
    `recipe_id` INT,
    `ingredient_id` INT,
    `recipe_ingredient_measure_id` INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
    FOREIGN KEY (recipe_ingredient_measure_id) REFERENCES recipe_ingredient_measure(id)
);

INSERT INTO `dishType` (`id`, `name`) VALUES (1, 'Main Course');