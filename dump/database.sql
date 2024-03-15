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
    `seasonId` INT,
    `dishTypeId` INT,
    CONSTRAINT fk_recipe_season FOREIGN KEY (seasonId) REFERENCES season(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_recipe_dishType FOREIGN KEY (dishTypeId) REFERENCES dishType(id) ON DELETE CASCADE ON UPDATE CASCADE
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
    `recipeId` INT,
    `ingredientId` INT,
    `recipeIngredientMeasureId` INT,
    PRIMARY KEY (recipeId, ingredientId),
    FOREIGN KEY (recipeId) REFERENCES recipe(id),
    FOREIGN KEY (ingredientId) REFERENCES ingredient(id),
    FOREIGN KEY (recipeIngredientMeasureId) REFERENCES recipe_ingredient_measure(id)
);

INSERT INTO `dishType` (`id`, `name`) VALUES (1, 'Main Course');
INSERT INTO `season` (`id`, `name`, `startDate`, `endDate`) VALUES (1, 'Printemps', '2021-03-20', '2021-06-20');