const dal = require("../data-access-layer/dal");


async function getAllUsers() {
    const sqlCmd = "SELECT `user_id`,`employee_ID`,`first_name`,`last_name`,`role` FROM `users` WHERE 1 ORDER BY `user_id` DESC";
    return dal.executeQueryAsync(sqlCmd);
}
async function getHistoryByUserId(userName) {
    const sqlCmd = "SELECT `operation_id`,`book_name`,`operation`,`borrower`,`date`,`time` FROM `history` WHERE `user` = '" +
        userName + "' ORDER BY `operation_id` DESC";
    return dal.executeQueryAsync(sqlCmd);
}

async function getAllHistory() {
    const sqlCmd = "SELECT `operation_id`,`user`,`book_name`,`operation`,`borrower`,`date`,`time` FROM `history` WHERE 1 ORDER BY `operation_id` DESC";
    return dal.executeQueryAsync(sqlCmd);
}

async function blockUser(userId) { // UPDATE `users` SET `role`='' WHERE `user_id` = ''
    const sqlCmd = "UPDATE `users` SET `role`='Blocked' WHERE `user_id` = '" + userId + "'";
    return dal.executeQueryAsync(sqlCmd);
}

async function unblockUser(userId) {// + Approve a new user
    const sqlCmd = "UPDATE `users` SET `role`='Active' WHERE `user_id` = '" + userId + "'";
    return dal.executeQueryAsync(sqlCmd);
}

async function editBook(book) {
    const sqlCmd = "UPDATE `books` SET `name`='" + book.name + "',`category`='" + book.category + "',`language`='" + book.language
        + "',`pages`='" + book.pages + "' WHERE `book_id` = '" + book.book_id + "'";
    return dal.executeQueryAsync(sqlCmd);
}

async function getArchive() {
    const sqlCmd = "SELECT `archive_id`,`book_name`,`date`,`time`,`pages`,`language`,`type` FROM `archive` WHERE 1";
    return dal.executeQueryAsync(sqlCmd);
}


module.exports = {
    getAllUsers, blockUser, unblockUser, getHistoryByUserId, getAllHistory, editBook, getArchive
}



