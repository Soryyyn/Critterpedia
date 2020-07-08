const mysql = require("mysql");

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "critterpedia"
});

connection.connect((err: Error) => {
    if (err) {
        console.error(err.stack);
        return;
    } else {
        console.log(`connected to db (critterpedia) as id ${connection.threadId}`);
    }
});