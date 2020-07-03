import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
const axios = require('axios');

import { connection } from "./db";

const app = express();

// use express plugin for useful information & more
app.use(morgan("combined")); // better logging
app.use(bodyParser.json()); // used for parsing json request
app.use(cors()); // security stuff

app.get("/fish", (req, res) => {
    axios.get("http://acnhapi.com/v1/fish")
        .then((response: any) => {
            res.send(response.data);
        })
        .catch((error: Error) => {
            throw error;
        });
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
