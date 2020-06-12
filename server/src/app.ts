const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const { connection } = require("./db");

const app = express();

// use express plugin for useful information & more
app.use(morgan("combined")); // better logging
app.use(bodyParser.json()); // used for parsing json request
app.use(cors()); // security stuff

app.get("/fish", (req, res) => {
    connection.query("SELECT * FROM fish", (err, results, fields) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
