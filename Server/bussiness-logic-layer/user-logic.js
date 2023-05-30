const dal = require("../data-access-layer/dal");


async function postNewBook(book) {
    /*  const sqlCmd = "INSERT INTO `books`(`name`, `category`, `status`, `language`, `pages`, `devPages`, `qaPages`)" +
         " VALUES ('" + book.name + "','" + book.category + "','1','" + book.language + "','" + book.pages + "', '"
         + book.devPages + "', '" + book.qaPages + "')"; */
    const sqlCmd = "INSERT INTO `books`(`name`, `category`, `status`, `language`, `pages`)" +
        " VALUES ('" + book.name + "','" + book.category + "','1','" + book.language + "','" + book.pages + "')";
    await dal.executeQueryAsync(sqlCmd);

    const date = new Date();
    const addDate = await getDate(date);
    const addTime = await getTime(date);
    const sqlCmd1 = "INSERT INTO `history`(`user`, `date`, `book_name`, `operation`, `borrower`, `time`) VALUES ('" +
        book.userName + "','" + addDate + "','" + book.name + "','" + 1 + "',' ','" + addTime + "')";
    return dal.executeQueryAsync(sqlCmd1);
    /*  sqlCmd = "INSERT INTO `history`(`user`, `date`, `operation`, `borrower`, `time`, `book_name`) VALUES ('" + book.user + "','"
                + borrowDate + "' ,'3','" + book.name + "', '" + borrowTime + "', '" + book.title + "')"; */
}

async function searchBooks(operation, keys, lang, type) {
    let sqlCmd = "SELECT * FROM `books` ";
    if (lang != 0 && type > 0)
        sqlCmd += "WHERE `language` = '" + lang + "' and `category` = '" + type + "'";
    else if (lang != 0)
        sqlCmd += "WHERE `language` = '" + lang + "'";
    else if (type > 0)
        sqlCmd += "WHERE `category` = '" + type + "'";

    //operations: 0-search 1-borrow 2-return //Lunguages + Category search
    if (operation == 1) {
        if (lang != 0 || type > 0)
            sqlCmd += " and `status` = '1'";
        else
            sqlCmd += " WHERE `status` = '1'";
    }
    else if (operation == 2) {
        if (lang != 0 || type > 0)
            sqlCmd += " and `status` = '0'";
        else
            sqlCmd += " WHERE `status` = '0'";
    }
    sqlCmd += "ORDER BY `name` ASC";
    const unsortedlist = await dal.executeQueryAsync(sqlCmd);

    //search for letters
    if (keys != "-1" && keys) {
        let bookList = [];
        for (let book of unsortedlist) {
            if (book.name.toLowerCase().includes(keys.toLowerCase())) {
                bookList.push(book);
            }
        }
        return bookList;
    }
    else {
        return unsortedlist;
    }
}

async function borrowBook(book) {
    const date = new Date();
    const borrowDate = getDate(date);
    const borrowTime = getTime(date);
    const sqlCmd = "INSERT INTO `history`(`user`, `date`, `operation`, `borrower`, `bookId_not_key`, `time`, `book_name`) VALUES ('"
        + book.user + "','" + borrowDate + "' ,'2','" + book.name + "', '" + book.id + "', '" + borrowTime + "', '"
        + book.title + "')";
    await dal.executeQueryAsync(sqlCmd)
    const sqlCmd1 = "UPDATE `books` SET `status`='0' WHERE `book_id`=' " + book.id + "'";
    return dal.executeQueryAsync(sqlCmd1);
}

async function returnBook(book) {
    const date = new Date();
    const borrowDate = getDate(date);
    const borrowTime = getTime(date);
    let sqlCmd = "";

    //, '" + book.user + "' , '" + book.title + "'
    /* , `user` = '" + book.user + "', `book_name` = '" + book.title + "' */
    /* if (book.qaPages && book.qaPages != "0" && book.devPages && book.devPages != "0") {// DEV & QA pages
        sqlCmd = "INSERT INTO `history`(`user`, `date`, `operation`, `borrower`, `time`, `qaPages`, `devPages`, `book_name`) VALUES ('" + book.user + "','"
            + borrowDate + "' ,'3','" + book.name + "', '" + borrowTime + "', '" + book.qaPages + "', '" + book.devPages + "', '" + book.title + "')";
    }
    else if (book.qaPages && book.qaPages != "0" && !book.devPages) {// QA pages
        sqlCmd = "INSERT INTO `history`(`user`, `date`, `operation`, `borrower`, `time`, `qaPages`, `book_name`) VALUES ('" + book.user + "','"
            + borrowDate + "' ,'3','" + book.name + "', '" + borrowTime + "', '" + book.qaPages + "', '" + book.title + "')";
    }
    else if (book.devPages && book.devPages != "0" && !book.qaPages) { // DEV pages
        sqlCmd = "INSERT INTO `history`(`user`, `date`, `operation`, `borrower`, `time`, `devPages`, `book_name`) VALUES ('" + book.user + "','"
            + borrowDate + "' ,'3','" + book.name + "', '" + borrowTime + "', '" + book.devPages + "', '" + book.title + "')";
    }
    else { //no pages added */
    sqlCmd = "INSERT INTO `history`(`user`, `date`, `operation`, `borrower`, `time`, `book_name`) VALUES ('" + book.user + "','"
        + borrowDate + "' ,'3','" + book.name + "', '" + borrowTime + "', '" + book.title + "')";
    /* } */
    await dal.executeQueryAsync(sqlCmd);//history
    const sqlCmd1 = "UPDATE `books` SET `status`='1' WHERE`book_id` = '" + book.id + "'";
    /* ,`devPages`='" + book.devPages + "',`qaPages`='" + book.qaPages +
        "' */
    return dal.executeQueryAsync(sqlCmd1);//update book
}

async function getLanguages() {
    const sqlCmd = "SELECT * FROM `languages` WHERE 1";
    return dal.executeQueryAsync(sqlCmd);
}


async function newLanguage(lang) {
    const sqlCmd = "INSERT INTO `languages`(`name`) VALUES ('" + lang + "')";
    return dal.executeQueryAsync(sqlCmd);
}

async function deleteBook(bookId, userName) {

    const sqlCmd = "SELECT * FROM `books` WHERE `book_id` = '" + bookId + "'";
    const book = (await dal.executeQueryAsync(sqlCmd))[0];
    const date = new Date();
    const addDate = await getDate(date);
    const addTime = await getTime(date);
    const sqlCmd1 = "INSERT INTO `history`(`user`, `date`, `book_name`, `operation`, `borrower`, `time`) VALUES ('" +
        userName + "','" + addDate + "','" + book.name + "','" + 4 + "',' ','" + addTime + "')";
    await dal.executeQueryAsync(sqlCmd1);

    const sqlCmd2 =
        "INSERT INTO `archive`(`bookId_not_key`, `book_name`, `date`, `time`, `pages`, `language`, `type`) VALUES ('"
        + book.book_id + "','" + book.name + "','" + addDate + "','" + addTime + "','" + book.pages + "','" + book.language
        + "','" + book.category + "')";
    await dal.executeQueryAsync(sqlCmd2);


    const sqlCmd3 = "DELETE FROM `books` WHERE `book_id`= '" + bookId + "'";
    return dal.executeQueryAsync(sqlCmd3);
}

async function deleteLanguage(langId) {
    const sqlCmd = "DELETE FROM `languages` WHERE `language_id` = '" + langId + "'";
    return dal.executeQueryAsync(sqlCmd);
}

async function getBorrowerName(bookId) {
    const sqlCmd = "SELECT `borrower` FROM `history` WHERE `bookId_not_key`='" + bookId + "'";
    return dal.executeQueryAsync(sqlCmd);
}

async function getDate(date) { // private
    const day = date.getDate();
    const month = Number(date.getMonth()) + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

async function getTime(date) { // private
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}


module.exports = {
    postNewBook, searchBooks, borrowBook, returnBook, getLanguages, newLanguage, deleteLanguage, deleteBook, getBorrowerName
}



