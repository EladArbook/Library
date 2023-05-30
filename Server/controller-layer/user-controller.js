const express = require("express");
const router = express.Router();
const userLogic = require('../bussiness-logic-layer/user-logic');
const Book = require("../model/book");
const verifyLoggedIn = require("../middleware/verify-logged-In");

router.post("/newBook", verifyLoggedIn, async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const errors = newBook.validate();
        if (errors) {
            return res.status(200).send({ error: errors });
        }
        else {
            await userLogic.postNewBook(newBook);
            res.status(200).send({ message: "success" });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(200).send({ error: "Couldn't post book." });
    }
});


router.get("/searchBooks/:operation/:lang/:type/:key", verifyLoggedIn, async (req, res) => {
    try {
        const bookList = await userLogic.searchBooks(req.params.operation, req.params.key, req.params.lang, req.params.type);
        res.status(200).send({ bookList: bookList });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error" });
    }
});

router.patch("/borrowBook", verifyLoggedIn, async (req, res) => {
    try {
        const book = req.body;
        await userLogic.borrowBook(book);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't borrow book." });
    }
});

router.patch("/returnBook", verifyLoggedIn, async (req, res) => {
    try {
        const book = req.body;
        await userLogic.returnBook(book);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't return book." });
    }
});

router.get("/getLanguages", verifyLoggedIn, async (req, res) => {
    try {
        const languages = await userLogic.getLanguages();
        res.status(200).send({ list: languages });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
});

router.post("/newLanguage", verifyLoggedIn, async (req, res) => {
    try {
        const lang = req.body.language;
        await userLogic.newLanguage(lang);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't add language." });
    }
});

router.delete("/deleteBook/:bookId/:userName", verifyLoggedIn, async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const userName = req.params.userName;
        await userLogic.deleteBook(bookId, userName);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't delete book." });
    }
});

router.delete("/deleteLanguage/:languageId", verifyLoggedIn, async (req, res) => {
    try {
        const languageId = req.params.languageId;
        await userLogic.deleteLanguage(languageId);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't delete language." });
    }
});

router.get("/getBorrowerName/:bookId", verifyLoggedIn, async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const borrowerName = await userLogic.getBorrowerName(bookId);
        res.status(200).send({ borrowerName: borrowerName[borrowerName.length - 1].borrower });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
});

module.exports = router;