export default class SeasonQueries {
    public readonly create = `
    INSERT INTO season (
        name, 
        startDate,
        endDate
        ) VALUES (?, ?, ?)
    `;

    public readonly findAll = `
    SELECT * FROM season
    `;

    public readonly findById = `
    SELECT * FROM season WHERE id = ?
    `;

    public readonly update = `
    UPDATE season SET name = ?, startDate = ?, endDate = ? WHERE id = ?
    `;

    public readonly delete = `
    DELETE FROM season WHERE id = ?
    `;
}
