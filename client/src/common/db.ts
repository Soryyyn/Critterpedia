const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "critterpedia"
});

connection.connect((err: any) => {
    if (err) throw err;
    console.log("Connected!");
});
