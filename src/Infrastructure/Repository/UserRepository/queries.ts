export default class UserQueries {
    public readonly create = `
    INSERT INTO user(
        email,
        password,
        firstname,
        lastname,
        roles
    ) VALUES (?, ?, ?, ?, JSON_ARRAY(?));`;

    public readonly findAll = `
    SELECT * FROM user
    `;

    public readonly findById = `
    SELECT * FROM user WHERE id = ?
    `;

    public readonly findByEmail = `
    SELECT * FROM user WHERE email = ? LIMIT 1
    `;

    public readonly update = `
    UPDATE user SET email = ?, password = ?, firstname = ?, lastname = ?, roles = JSON_ARRAY(?) WHERE id = ?
    `;

    public readonly delete = `
    DELETE FROM user WHERE id = ?
    `;
}
