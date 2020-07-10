import * as express from "express";
import axios from "axios";

// express plugins
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
import * as rateLimit from "express-rate-limit";

// more imports
import { connection } from "./db";
import Filter = require("bad-words");

const app = express();
const filter = new Filter();

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

// limit express posts
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10 // limit each IP to 100 posts
}));

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

    // convert input from form to strings
    // and filter out bad words
    let user = req.body;
    user.nickname = filter.clean(user.nickname.toString());
    user.email = filter.clean(user.email.toString());
    user.password = filter.clean(user.password.toString());

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

});

// signin user
app.post("/signin", (req, res) => {

    // convert input from form to strings
    // and filter out bad words
    let user = req.body;
    user.email = filter.clean(user.email.toString());
    user.password = filter.clean(user.password.toString());

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
