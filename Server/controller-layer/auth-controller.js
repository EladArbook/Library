const express = require("express");
const authLogic = require("../bussiness-logic-layer/auth-logic");
const Credentials = require("../model/credentials");
const User = require("../model/user");
const router = express.Router();
const verifyLoggedIn = require("../middleware/verify-logged-In");



router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const errors = newUser.validate();
        if (errors) {
            return res.status(200).send({ message: errors[0] });
        }
        else {
            const data = await authLogic.registerAsync(newUser); //register
            return res.status(201).send(data)
        }
    }
    catch (error) {
        console.log(error);
        res.status(200).send({ message: "*Couldn't send user's info" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const credentials = new Credentials(req.body);
        const errors = credentials.validate();
        if (errors) {
            return res.status(200).send({ message: "*Invalid employee ID or password." });
        }
        const loggedInUser = await authLogic.loginAsync(credentials); //generate jwt for user
        if (!loggedInUser) {
            return res.status(200).send({ message: "*Incorrect employee ID or password." })
        }
        //success
        if (loggedInUser.role == "Pending")
            return res.status(200).send({ message: "Please wait for an approvement." });
        else if (loggedInUser.role == "Blocked")
            return res.status(200).send({ message: "Your account is been blocked." });

        return res.status(200).send({ details: loggedInUser });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send({ message: "*Inncorrect employee ID password combination." });
    }
});


router.get("/valid", verifyLoggedIn, async (req, res) => { //:/token
    try {
        res.status(200).send({ valid: true });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ error: "Couldn't connect" });
    }
});

module.exports = router;