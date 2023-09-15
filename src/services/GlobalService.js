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

export const createUser = (sqlQuery, modelName, postData, table) => {
    return new Promise((resolve, reject) => {
        const ModelClass = Model[modelName];
        const model = new ModelClass();
        Object.assign(model, postData);

        const missingProps = Object.keys(model).filter((prop) => model[prop] === undefined);

        if (missingProps.length > 0) {
            reject(
                new Error(`Données manquantes pour les propriétés : ${missingProps.join(', ')}`)
            );
        } else {
            dbPool.query(sqlQuery, postData, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const userId = result.insertId;
                    const query = `SELECT * FROM ${table} WHERE id = ${userId}`;
                    const postSend = getById(query, modelName, userId);
                    resolve(postSend);
                }
            });
        }
    });
};

export const deleteById = (sqlQuery, modelName, id) => {
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
