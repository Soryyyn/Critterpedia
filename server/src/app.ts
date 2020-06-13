import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";

import { connection } from "./db";

const app = express();

// use express plugin for useful information & more
app.use(morgan("combined")); // better logging
app.use(bodyParser.json()); // used for parsing json request
app.use(cors()); // security stuff

app.get("/fish", (req, res) => {
    connection.query("SELECT * FROM view_fish", (err, results, fields) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
