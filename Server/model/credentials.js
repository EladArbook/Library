const Joi = require("joi");

class Credentials {

    constructor(credentials) {
        this.employeeID = credentials.employeeID;
        this.password = credentials.password;
    }

    static #validationSchema = Joi.object({
        employeeID: Joi.number().required().min(1).max(999999),
        password: Joi.string().required().min(4).max(12),
    });

    validate() {
        const result = Credentials.#validationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = Credentials;