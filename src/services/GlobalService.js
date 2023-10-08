import { dbPool } from '../config/databaseConfig.js';
import * as Model from '../models/models.js';

export const getAll = (sqlQuery, modelName) => {
    return new Promise((resolve, reject) => {
        dbPool.query(sqlQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const ModelClass = Model[modelName];
                const modelData = result.map((data) => {
                    const model = new ModelClass();
                    Object.assign(model, data);
                    return model;
                });

                resolve(modelData);
            }
        });
    });
};

export const getById = (sqlQuery, modelName, id) => {
    return new Promise((resolve, reject) => {
        dbPool.query(sqlQuery, [id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                const ModelClass = Model[modelName];
                if (result.length === 0) {
                    reject(new Error('Aucun enregistrement trouvé.'));
                } else {
                    const data = result[0];
                    const model = new ModelClass();
                    Object.assign(model, data);
                    resolve(model);
                }
            }
        });
    });
};

export const create = (sqlQuery, modelName, postData, table) => {
    return new Promise((resolve, reject) => {
        const ModelClass = Model[modelName];
        const model = new ModelClass();
        Object.assign(model, postData);

        dbPool.query(sqlQuery, postData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const newDataId = result.insertId;
                const query = `SELECT * FROM ${table} WHERE id = ${newDataId}`;
                const postSend = getById(query, modelName, newDataId);
                resolve(postSend);
            }
        });
    });
};

export const editById = (sqlQuery, modelName, postData, table, id) => {
    return new Promise((resolve, reject) => {
        const ModelClass = Model[modelName];
        const model = new ModelClass();
        Object.assign(model, postData);

        dbPool.query(sqlQuery, postData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const affectedRows = result.affectedRows;
                if (affectedRows === 0) {
                    reject(new Error("Aucun changement n'a été effectué"));
                } else {
                    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
                    const postSend = getById(query, modelName, id);
                    resolve(postSend);
                }
            }
        });
    });
};

export const deleteById = (sqlQuery, id) => {
    return new Promise((resolve, reject) => {
        dbPool.query(sqlQuery, [id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                const affectedRows = result.affectedRows;
                if (affectedRows === 0) {
                    reject(new Error('Aucun enregistrement trouvé.'));
                } else {
                    resolve('Suppression réussie');
                }
            }
        });
    });
};
