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

app.get("/bugs", (req, res) => {
    axios.get("http://acnhapi.com/v1/bugs")
        .then((response: any) => {
            res.send(response.data);
        })
        .catch((error: Error) => {
            throw error;
        });
});

app.post("/signup", (req, res) => {
    let user = req.body;

    // test if user with same nickname or email exists in users table
    // if there is send error to client
    // else create new entry for user in table
    try {
        connection.query(`SELECT * FROM users WHERE nickname = "${user.nickname}" OR email = "${user.email}"`, (error: Error, results: any) => {
            if (error) throw error;

            if (results.length < 1) {
                connection.query(`INSERT INTO users (nickname, email, password) VALUES ("${user.nickname}", "${user.email}", "${user.password}")`, (error: Error) => {
                    if (error) {
                        throw error
                    }

                    res.send(true);
                })
            } else {
                // TODO: better error sending
                res.send(false);
            }

        });
    } catch (error) {
        throw error;
    }
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
