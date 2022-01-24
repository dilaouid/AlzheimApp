export const pushErrors = (errors, field, msg) => {
    if (errors.hasOwnProperty(field)) {
        errors[field] = msg;
    } else {
        errors[field] = msg;
    }
    return errors;
};

export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};