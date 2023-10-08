CREATE DATABASE lea_cuisine_app;

USE lea_cuisine_app;

CREATE TABLE recipes (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
category VARCHAR(50) NOT NULL,
diet_type VARCHAR(50) NOT NULL,
serving SMALLINT NOT NULL,
prep_time INT NOT NULL,
cook_time INT,
instructions TEXT NOT NULL,
image_url VARCHAR(255),
season_id INT,
FOREIGN KEY (season_id) REFERENCES seasons(id)
);

CREATE TABLE ingredients (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL
);

-- faire une table exprès pour les unités
CREATE TABLE recipe_ingredient (
id INT PRIMARY KEY AUTO_INCREMENT,
recipe_id INT,
ingredient_id INT,
quantity INT NOT NULL,
measurement_unit VARCHAR(10) NOT NULL,
FOREIGN KEY (recipe_id) REFERENCES recipe(id),
FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE seasons (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) NOT NULL, -- Nom de la saison (par exemple, "Printemps", "Été", "Automne", "Hiver")
start_date DATE NOT NULL,  -- Date de début de la saison
end_date DATE NOT NULL     -- Date de fin de la saison
);

-- Table des saisons
INSERT INTO seasons (name, start_date, end_date)
VALUES
    ('Printemps', '2023-03-20', '2023-06-20'),
    ('Été', '2023-06-21', '2023-09-22'),
    ('Automne', '2023-09-23', '2023-12-21'),
    ('Hiver', '2023-12-22', '2024-03-19');

-- Table des ingrédients
INSERT INTO ingredients (name)
VALUES
    ('Laitue romaine'), 
    ('Poulet'),
    ('Aubergine'),
    ('Poivron rouge');

-- Table des recettes
INSERT INTO recipes (title, category, diet_type, serving, prep_time, cook_time, instructions, image_url, season_id)
VALUES
    ('Salade César', 'Salades', 'Non végétarien', 2, 20, 15, 'Mélangez la laitue romaine, les croûtons, le parmesan et la vinaigrette.', 'url_image1.jpg', 1),
    ('Poulet Tikka Masala', 'Plats principaux', 'Non végétarien', 4, 30, 45, "Mélangez le poulet mariné avec la sauce tikka masala et faites cuire jusqu'à ce qu'il soit tendre.", 'url_image2.jpg', 2),
    ('Ratatouille', 'Plats principaux', 'Végétarien', 6, 15, 40, "Faites sauter les légumes dans de l'huile d'olive jusqu'à ce qu'ils soient tendres.", 'url_image3.jpg', 3);

-- Table de liaison entre recettes et ingrédients
-- Associe des ingrédients aux recettes avec des quantités et des unités de mesure
INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, measurement_unit)
VALUES
    (1, 1, 200, 'g'), -- 200 grammes de laitue romaine dans la Salade César
    (2, 2, 500, 'g'), -- 500 grammes de poulet dans le Poulet Tikka Masala
    (3, 3, 2, 'unité'), -- 2 aubergines dans la Ratatouille
    (3, 4, 1, 'unité'); -- 1 poivron rouge dans la Ratatouille
