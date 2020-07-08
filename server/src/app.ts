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

// get all fish from online api
app.get("/fish", (req, res) => {
    axios.get("http://acnhapi.com/v1/fish")
        .then((response: any) => {
            res.send(response.data);
        })
        .catch((error: Error) => {
            throw error;
        });
});

// get saved fish from user_fish table
app.get("/fish/:userid", (req, res) => {
    try {
        connection.query(`SELECT * FROM user_fish WHERE user = "${req.params.userid}"`, (error: Error, results: any) => {
            if (error) throw error;
            res.send(Object.values(JSON.parse(JSON.stringify(results))));
        });
    } catch (error) {
        throw error;
    }
});

app.post("/fish", (req, res) => {
    let changes = req.body;

    try {
        connection.query(`SELECT * FROM user_fish WHERE user = "${changes.userid}" AND fish = "${changes.fish}"`, (error: Error, results: any) => {
            if (error) throw error;

            // if there is no result for the changed fish for the user
            // insert new entry into table
            // else update the entry
            if (results.length > 0) {
                connection.query(`UPDATE user_fish SET catched = ${changes.catched}, favorited = ${changes.favorited} WHERE user = "${changes.userid}" AND fish = "${changes.fish}"`, (error: Error, results: any) => {
                    if (error) throw error;
                });
            } else {
                connection.query(`INSERT INTO user_fish (user, fish, favorited, catched) VALUES (${changes.userid}, ${changes.fish}, ${changes.favorited}, ${changes.catched})`, (error: Error, results: any) => {
                    if (error) throw error;
                });
            }
        });

        res.sendStatus(200);
    } catch (error) {
        throw error;
    }
});

// get all bugs from api
app.get("/bugs", (req, res) => {
    axios.get("http://acnhapi.com/v1/bugs")
        .then((response: any) => {
            res.send(response.data);
        })
        .catch((error: Error) => {
            throw error;
        });
});

// signup user in table
app.post("/signup", (req, res) => {
    let user = req.body;

    // test if user with same nickname or email exists in users table
    // if there is send error to client
    // else create new entry for user in table
    // and send userid to client for better management
    try {
        connection.query(`SELECT * FROM users WHERE nickname = "${user.nickname}" OR email = "${user.email}"`, (error: Error, results: any) => {
            if (error) throw error;

            if (results.length < 1) {
                connection.query(`INSERT INTO users (nickname, email, password) VALUES ("${user.nickname}", "${user.email}", "${user.password}")`, (error: Error) => {
                    if (error) {
                        throw error
                    }

                    connection.query(`SELECT id FROM users WHERE nickname = "${user.nickname}" OR email = "${user.email}"`, (error: Error, results: any) => {
                        if (error) throw error;
                        res.send({ userid: results[0].id });
                    });
                })
            } else {
                // TODO: better error sending
                res.send("user with same nickname or email is already in use");
            }

        });
    } catch (error) {
        throw error;
    }
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
