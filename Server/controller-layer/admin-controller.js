const express = require("express");
const router = express.Router();
const adminLogic = require('../bussiness-logic-layer/admin-logic');
const Book = require("../model/book");
const verifyAdmin = require("../middleware/verify-admin");

router.get("/users", verifyAdmin, async (req, res) => {
    try {
        const userList = await adminLogic.getAllUsers();
        res.status(200).send({ userList: userList });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
});

router.patch("/editBook", verifyAdmin, async (req, res) => {
    try {
        const editBook = req.body;
        await adminLogic.editBook(editBook);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't return book." });
    }
});

router.get("/history/:userName", verifyAdmin, async (req, res) => {
    try {
        const historyList = await adminLogic.getHistoryByUserId(req.params.userName);
        res.status(200).send({ historyList: historyList });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
});

router.get("/history", verifyAdmin, async (req, res) => {
    try {
        const historyList = await adminLogic.getAllHistory();
        res.status(200).send({ historyList: historyList });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
});

router.patch("/block", verifyAdmin, async (req, res) => {
    try {
        const userId = req.body.userId;
        await adminLogic.blockUser(userId);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't return book." });
    }
});

router.patch("/unblock", verifyAdmin, async (req, res) => {
    try {
        const userId = req.body.userId;
        await adminLogic.unblockUser(userId);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't return book." });
    }
});

router.get("/archive", verifyAdmin, async (req, res) => {
    try {
        const archiveList = await adminLogic.getArchive();
        res.status(200).send({ bookList: archiveList });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
});



/* router.post("/newBook", verifyLoggedIn, async (req, res) => {
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
}); */


/* router.get("/searchBooks/:operation/:lang/:type/:key", verifyLoggedIn, async (req, res) => {
    try {
        const bookList = await userLogic.searchBooks(req.params.operation, req.params.key, req.params.lang, req.params.type);
        res.status(200).send({ bookList: bookList });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error" });
    }
}); */

/* router.patch("/borrowBook", verifyLoggedIn, async (req, res) => {
    try {
        const book = req.body;
        await userLogic.borrowBook(book);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't borrow book." });
    }
}); */

/* router.patch("/returnBook", verifyLoggedIn, async (req, res) => {
    try {
        const book = req.body;
        await userLogic.returnBook(book);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't return book." });
    }
}); */

/* router.get("/getLanguages", verifyLoggedIn, async (req, res) => {
    try {
        const languages = await userLogic.getLanguages();
        res.status(200).send({ list: languages });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
}); */

/* router.post("/newLanguage", verifyLoggedIn, async (req, res) => {
    try {
        const lang = req.body.language;
        await userLogic.newLanguage(lang);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't add language." });
    }
}); */

/* router.delete("/deleteLanguage/:languageId", verifyLoggedIn, async (req, res) => {
    try {
        const languageId = req.params.languageId;
        await userLogic.deleteLanguage(languageId);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't delete language." });
    }
}); */

/* router.delete("/deleteBook/:bookId", verifyLoggedIn, async (req, res) => {
    try {
        const bookId = req.params.bookId;
        await userLogic.deleteBook(bookId);
        res.status(200).send({ message: "success" });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't delete book." });
    }
}); */

/* router.get("/getBorrowerName/:bookId", verifyLoggedIn, async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const borrowerName = await userLogic.getBorrowerName(bookId);
        res.status(200).send({ borrowerName: borrowerName[borrowerName.length - 1].borrower });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Server Error." });
    }
}); */

module.exports = router;