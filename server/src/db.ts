const mysql = require("mysql");

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "critterpedia"
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected to db: "critterpedia" as id ' + connection.threadId);
});