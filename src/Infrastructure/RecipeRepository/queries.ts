export default class RecipeQueries {
    public readonly create = `
    INSERT INTO recipe (
        title,
        dietType,
        serving,
        prepTime,
        cookTime,
        instruction,
        imageUrl, 
        seasonId, 
        dishTypeId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    public readonly findAll = `
    SELECT * FROM recipe
    `;

    public readonly findById = `
    SELECT * FROM recipe WHERE id = ?
    `;

    public readonly update = `
    UPDATE recipe SET title = ?, dietType = ?, serving = ?, prepTime = ?, cookTime = ?, instruction = ?, imageUrl = ?, seasonId = ?, dishTypeId = ? WHERE id = ?
    `;

    public readonly delete = `
    DELETE FROM recipe WHERE id = ?
    `;

    public readonly findByDishTypeId = `
    SELECT * FROM recipe WHERE dishTypeId = ?
    `;
}
