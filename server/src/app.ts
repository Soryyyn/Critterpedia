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
            res.send({
                status: 200,
                msg: "fishes collected from api successfully",
                data: response.data
            });
        })
        .catch((error: Error) => {
            res.send({
                status: 500,
                msg: "error when connecting to api. error: " + error,
                data: {}
            });
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

// update or insert change from fishes page
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

// get saved bugs from user_bugs table
app.get("/bugs/:userid", (req, res) => {
    try {
        connection.query(`SELECT * FROM user_bugs WHERE user = "${req.params.userid}"`, (error: Error, results: any) => {
            if (error) throw error;
            res.send(Object.values(JSON.parse(JSON.stringify(results))));
        });
    } catch (error) {
        throw error;
    }
});

// update or insert change from bugs page
app.post("/bugs", (req, res) => {
    let changes = req.body;

    try {
        connection.query(`SELECT * FROM user_bugs WHERE user = "${changes.userid}" AND bug = "${changes.bug}"`, (error: Error, results: any) => {
            if (error) throw error;

            // if there is no result for the changed bugs for the user
            // insert new entry into table
            // else update the entry
            if (results.length > 0) {
                connection.query(`UPDATE user_bugs SET catched = ${changes.catched}, favorited = ${changes.favorited} WHERE user = "${changes.userid}" AND bug = "${changes.bug}"`, (error: Error, results: any) => {
                    if (error) throw error;
                });
            } else {
                connection.query(`INSERT INTO user_bugs (user, bug, favorited, catched) VALUES (${changes.userid}, ${changes.bug}, ${changes.favorited}, ${changes.catched})`, (error: Error, results: any) => {
                    if (error) throw error;
                });
            }
        });

        res.sendStatus(200);
    } catch (error) {
        throw error;
    }
});

// signup user in table
app.post("/signup", (req, res) => {

    let user = req.body;

    // check if password is 6 or more characters
    // & is a mix of numbers and letters
    if (this.password.match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)) {

        // check if email is valid
        if (this.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {

            // test if user with same nickname or email exists in users table
            // if there isnt send error to client
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
                        res.send("User with same nickname or email is already in use");
                    }

                });
            } catch (error) {
                throw error;
            }

        } else {
            res.send("Email is not valid");
        }
    } else {
        res.send("Password doesn't match the rules");
    }

});

// signin user
app.post("/signin", (req, res) => {
    let user = req.body;

    // test if user with same email exists in users table
    // if there isnt send error to client
    // else return userid to signin
    connection.query(`SELECT * FROM users WHERE email = "${user.email}"`, (error: Error, results: any) => {
        if (error) throw error;

        if (results.length < 1) {
            res.send("No user with this email available")
        } else {
            if (error) throw error;
            res.send({ hash: results[0].password, userid: results[0].id });
        }
    });
});

app.listen(8081, () => {
    console.log("server listening on port 8081...")
});
