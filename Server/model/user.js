const Joi = require("joi");

class User {

    constructor(user) {
        this.employeeID = user.employee_ID;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.password = user.password;
    }

    static #validationSchema = Joi.object({
        employeeID: Joi.number().required().min(1).max(999999),
        first_name: Joi.string().required().min(2).max(20),
        last_name: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(4).max(12),
    });

    validate() {
        const result = User.#validationSchema.validate(this, { abortEarly: true });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = User;