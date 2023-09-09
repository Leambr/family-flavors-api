export const formatResponse = (status, data) => {
    return {
        message: 'Success',
        status: status,
        data: data,
    };
};

export const deleteFormatResponse = (status, message) => {
    return {
        message: message,
        status: status,
    };
};

export const authFormatResponse = (status, username, token) => {
    return {
        message: 'Success',
        status: status,
        username: username,
        token: token,
    };
};
