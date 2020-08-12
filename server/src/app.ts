import express = require("express");
import axios from "axios";
import path from "path";
import history from 'connect-history-api-fallback';
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

// limit post request (server stability & safety)
import rateLimit from "express-rate-limit";

// create bad word filter
import Filter from "bad-words";
const filter = new Filter();

// create express app
const app = express();

// let express use plugins
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")))
app.use(history());
app.set('trust proxy', 1); // trust proxy for heroku
app.use(bodyParser.json());
app.use(cors());
if (process.env.NODE_ENV != "production") {
    app.use(morgan("dev"));
}

// local port or deployed port
const PORT = process.env.PORT || 8081;

// import db
import { userCollection } from "./db";

// import mailer
import { transporter } from "./mail";

//
// GET-REQUESTS
//

app.get("/fish", (req, res) => {

    axios.get("http://acnhapi.com/v1/fish")

        .then((response: any) => {

            res.json({
                status: "ok",
                msg: "Fish have been collected successfully",
                fish: response.data
            });

        })
        .catch((err: any) => {

            res.json({
                status: "error",
                msg: "Error when collecting fish from api",
                error: err
            });

        });

});

app.get("/fish/:userid", (req, res) => {

    // search for user in collection with id
    userCollection.findOne({ _id: req.params.userid }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Couldn't search in db",
                error: err
            });
        } else {
            if (doc != null) {
                res.json({
                    status: "ok",
                    msg: "User has been found, getting fish from user",
                    fish: doc.get("fish")
                });
            } else {
                res.json({
                    status: "error",
                    msg: "No user with that id found"
                });
            }
        }
    });

});

app.get("/bugs", (req, res) => {

    axios.get("http://acnhapi.com/v1/bugs")

        .then((response: any) => {

            res.json({
                status: "ok",
                msg: "Bugs have been collected successfully",
                bugs: response.data
            });

        })
        .catch((err: any) => {

            res.json({
                status: "error",
                msg: "Error when collecting bugs from api",
                error: err
            });

        });

});

app.get("/bugs/:userid", (req, res) => {

    // search for user in collection with id
    userCollection.findOne({ _id: req.params.userid }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Couldn't search in db",
                error: err
            });
        } else {
            if (doc != null) {
                res.json({
                    status: "ok",
                    msg: "User has been found, getting bugs from user",
                    bugs: doc.get("bugs")
                });
            } else {
                res.json({
                    status: "error",
                    msg: "No user with that id found"
                });
            }
        }
    });

});

app.get("/settings/:userid", (req, res) => {

    userCollection.findOne({ _id: req.params.userid }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Couldn't search in db",
                error: err
            });
        } else {
            if (doc != null) {
                res.json({
                    status: "ok",
                    msg: "User has been found, getting settings",
                    settings: {
                        email: doc.get("email"),
                        hemisphere: doc.get("hemisphere")
                    }
                });
            } else {
                res.json({
                    status: "error",
                    msg: "No user with that id found"
                });
            }
        }

    });

});


//
// POST-REQUESTS
//

app.post("/fish", async (req, res) => {

    let changesToFish = {
        user: req.body.userId,
        fish: req.body.fish,
        caught: req.body.caught,
        favorited: req.body.favorited
    }

    // if user has this bug already saved
    // update the entry
    // else insert new entry
    userCollection.findOneAndUpdate({
        _id: changesToFish.user,
        "fish.fish": changesToFish.fish
    }, {
        $set: {
            "fish.$.fish": changesToFish.fish,
            "fish.$.caught": changesToFish.caught,
            "fish.$.favorited": changesToFish.favorited,
        }
    }, {
        new: true
    }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Could not find for fish in user",
            });
        } else {

            if (doc == null) {

                userCollection.findOneAndUpdate({
                    _id: changesToFish.user,
                }, {
                    $push: {
                        fish: {
                            fish: changesToFish.fish,
                            caught: changesToFish.caught,
                            favorited: changesToFish.favorited,
                        }
                    }
                }, {
                    new: true
                }, (err, doc) => {

                    if (err) {
                        res.json({
                            status: "error",
                            msg: "Could not find for fish in user",
                        });
                    } else {
                        res.json({
                            status: "ok",
                            msg: "Added new entry for fish in user",
                            data: doc
                        });
                    }

                })

            } else {
                res.json({
                    status: "ok",
                    msg: "Updated fish in user",
                    data: doc
                });
            }

        }

    });

});

app.post("/bugs", async (req, res) => {

    let changesToBugs = {
        user: req.body.userId,
        bugId: req.body.bugId,
        caught: req.body.caught,
        favorited: req.body.favorited
    }

    // if user has this bug already saved
    // update the entry
    // else insert new entry
    userCollection.findOneAndUpdate({
        _id: changesToBugs.user,
        "bugs.bug": changesToBugs.bugId
    }, {
        $set: {
            "bugs.$.bug": changesToBugs.bugId,
            "bugs.$.caught": changesToBugs.caught,
            "bugs.$.favorited": changesToBugs.favorited,
        }
    }, {
        new: true
    }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Could not find for bug in user",
            });
        } else {

            if (doc == null) {

                userCollection.findOneAndUpdate({
                    _id: changesToBugs.user,
                }, {
                    $push: {
                        bugs: {
                            bug: changesToBugs.bugId,
                            caught: changesToBugs.caught,
                            favorited: changesToBugs.favorited,
                        }
                    }
                }, {
                    new: true
                }, (err, doc) => {

                    if (err) {
                        res.json({
                            status: "error",
                            msg: "Could not find for bug in user",
                        });
                    } else {
                        res.json({
                            status: "ok",
                            msg: "Added new entry for bug in user",
                            data: doc
                        });
                    }

                })

            } else {
                res.json({
                    status: "ok",
                    msg: "Updated bug in user",
                    data: doc
                });
            }

        }

    });

});

app.post("/signup", rateLimit({
    windowMs: 5 * 60 * 1000,  // 5 minute window
    max: 5, // start blocking after
    message: "Limit reached from this IP, please try again in a few minutes"
}), async (req, res) => {

    // create data
    let data = {
        nickname: filter.clean(req.body.nickname.toString()),
        email: filter.clean(req.body.email.toString()),
        password: filter.clean(req.body.password.toString()),
        hemisphere: req.body.hemisphere.toString()
    };

    // look in collection if user already exists
    // if there is send to client that there are more than 1 user
    // with same nickname or email
    // else insert new user in db
    if (await userCollection.exists({
        nickname: filter.clean(req.body.nickname.toString()),
        email: filter.clean(req.body.email.toString()),
    })) {

        res.json({
            status: "error",
            msg: "User with same nickname or email already exists"
        });

    } else {

        // create new user
        let user = new userCollection(data);

        // save new user in collection
        userCollection.create(user, (err, doc) => {
            if (err) {
                res.json({
                    status: "error",
                    msg: "Couldn't create new user",
                    error: err
                });
            } else {
                // TODO: change mail on release
                let mailOptions = {
                    from: "Soryn Bächli <critterpedia@soryn.dev>",
                    to: data.email,
                    subject: "🍑 Critterpedia Authentication Email",
                    html: `
                        <html>
                        <body>
                            <h1 style="color: black">Hi ${data.nickname}!</h1>
                            <p style="color: black">Please visit <a href="https://critterpedia.soryn.dev/auth/${user._id}" target="_blank">this link</a> to authenticate your account!</p>
                            <p style="color: black">Have a nice day! 🧡</p>
                            <p style="color: black">Soryn Bächli<br>(Dev of Critterpedia)</p>
                        </body>
                        </html>
                    `
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(`error when sending auth mail: \n${err}`);
                    } else {
                        res.json({
                            status: "ok",
                            msg: `New user has been created, sent auth mail`
                        });
                    }
                });
            }
        });

    }

});

app.post("/signin", async (req, res) => {

    // create data
    let data = {
        email: filter.clean(req.body.email.toString()),
    };

    // if there exists a user with same email
    // send to to client to sign in
    userCollection.findOne({ email: data.email }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Couldn't search in db",
                error: err
            });
        } else {
            res.json({
                status: "ok",
                msg: "User has been found",
                user: doc
            });
        }

    });


});

app.post("/auth/:userid", (req, res) => {
    userCollection.findOne({ _id: req.params.userid }, (err, doc) => {

        if (err) {
            res.json({
                status: "error",
                msg: "Couldn't search in db",
                error: err
            });
        } else {
            if (doc != null) {
                userCollection.updateOne(doc, {
                    $set: { authenticated: true }
                })
                    .then(() => {
                        res.json({
                            status: "ok",
                            msg: "Authenticated user",
                            user: doc
                        });
                    })
                    .catch((err) => {
                        res.json({
                            status: "error",
                            msg: "Couldn't authenticate user",
                            error: err
                        });
                    });
            } else {
                res.json({
                    status: "error",
                    msg: "No user with that id found"
                });
            }
        }

    });
});

// make express build for production if necessary
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../../client/build"));
}

// listen on port
app.listen(PORT, () => console.log(`server listening on port ${PORT}.`));