const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// use express plugin for useful information & more
app.use(morgan("combined")); // better logging
app.use(bodyParser.json()); // used for parsing json request
app.use(cors()); // security stuff

app.get("/status", (req, res) => {
    res.send({
        message: "hello world"
    });
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
