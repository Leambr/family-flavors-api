CREATE DATABASE lea_cuisine_app;

USE lea_cuisine_app;

CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    sub_category VARCHAR(255) NOT NULL,
    serving SMALLINT NOT NULL,
    prep_time INT NOT NULL,
    cook_time INT,
    instruction TEXT NOT NULL,
    is_favorite BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO
    recipes (
        title,
        description,
        category,
        sub_category,
        serving,
        prep_time,
        cook_time,
        instruction,
        is_favorite
    )
VALUES
    (
        'Parmigiana',
        'Une recette italienne excellente',
        'Pâtes',
        'Végétarien',
        1,
        600,
        3600,
        'Coupez les aubergines, les tomates et la mozzarella. Faire des couches de chaque ingrédient puis enfourner pendant une heure. Dégustez chaud.',
        true
    );