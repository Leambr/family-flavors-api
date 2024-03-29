export default class DishTypeQueries {
    public readonly create = `
    INSERT INTO dishType (
        name
    ) VALUES (?)
    `;

    public readonly findAll = `
    SELECT * FROM dishType
    `;

    public readonly findById = `
    SELECT * FROM dishType WHERE id = ?
    `;

    public readonly update = `
    UPDATE dishType SET name = ? WHERE id = ?
    `;

    public readonly delete = `
    DELETE FROM dishType WHERE id = ?
    `;
}
