const dal = require("../data-access-layer/dal");
const jwt = require("jsonwebtoken");
const config = require("../configuration");
const User = require("../model/user");

async function loginAsync(credentials) {
    const sqlCmd = "SELECT * FROM `users` WHERE `employee_ID` = '" + credentials.employeeID + "' and `password` = '" + credentials.password + "'";
    const user = await dal.executeQueryAsync(sqlCmd);
    if (!user || user.length < 1)
        return null;
    delete user[0].password;
    if (user[0].role == "Admin")
        user[0].token = jwt.sign({ user: user[0] }, config.jwtStringAdmin, { expiresIn: config.logginSession }); //token valid for
    else
        user[0].token = jwt.sign({ user: user[0] }, config.jwtString, { expiresIn: config.logginSession }); //token valid for
    return user[0];
}

async function registerAsync(newUser) {
    const sqlCmd = "SELECT * FROM `users` WHERE `employee_ID` = '" + newUser.employeeID + "'";
    const isExist = await dal.executeQueryAsync(sqlCmd);
    if (isExist.length > 0) {
        return { message: "Employee ID is already exists." };
    }
    else {
        const sqlCmd1 = "INSERT INTO `users`(`employee_ID`, `first_name`, `last_name`, `password`, `role`) VALUES ('"
            + newUser.employeeID + "','" + newUser.first_name + "','" + newUser.last_name + "','" + newUser.password +
            "', 'Pending')";
        return await dal.executeQueryAsync(sqlCmd1);
        /* return loginAsync(newUser); */
    }
}

module.exports = {
    loginAsync, registerAsync
}