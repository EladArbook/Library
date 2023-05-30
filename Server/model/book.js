const Joi = require("joi");

class Book {

    constructor(book) {
        this.name = book.name;
        this.category = book.category;
        this.language = book.language;
        this.pages = book.pages;
        /* this.qaPages = book.qaPages;
        this.devPages = book.devPages; */
        this.userName = book.userName;
    }

    static #validationSchema = Joi.object({
        name: Joi.string().required().min(1).max(30),
        category: Joi.number().required().min(1).max(3),
        language: Joi.string().required().min(1).max(20),
        pages: Joi.number().required().min(0).max(9999999999),
        /* qaPages: Joi.string().min(0),
        devPages: Joi.string().min(0), */
        userName: Joi.string().min(0),
    });

    validate() {
        const result = Book.#validationSchema.validate(this, { abortEarly: true });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = Book;