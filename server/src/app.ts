// express & axios, more
import * as express from "express";
import axios from "axios";
import * as path from "path";
import history = require('connect-history-api-fallback');

// express plugins
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
import rateLimit = require("express-rate-limit");
import Filter = require("bad-words");

// create express app
// and load plugins
const app = express();
app.use(bodyParser.json()); // used for parsing json request
app.use(cors()); // security stuff
app.use(history());

if (process.env.NODE_ENV != "production") {
    app.use(morgan("dev")); // better logging
}

// create bad word filter
const filter = new Filter();

// import user collection from db file
// setup mongoose and set schema
import mongoose = require('mongoose');
const Schema = mongoose.Schema;

// setup port & db connection for local or prod
const PORT = process.env.PORT || 8081
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Critterpedia";

// Connect MongoDB at default port 27017
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log('connected to mongodb')
    } else {
        console.log(`error when connecting to mongodb: ${err}`)
    }
});

// define user schema
let userSchema = new Schema({
    nickname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fish: [
        {
            fish: Number,
            caught: Boolean,
            favorited: Boolean
        }
    ],
    bugs: [
        {
            bug: Number,
            caught: Boolean,
            favorited: Boolean
        }
    ],
    hemisphere: {
        type: String,
        default: "Northern",
        required: true
    }
});

// define model
export const userCollection = mongoose.model("users", userSchema);

// serve vue static files
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")))


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
                            error: doc
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

// limit express posts
// 1 post per ip in 1 second
app.use(rateLimit({
    windowMs: 1000,
    max: 1
}));

app.post("/signup", async (req, res) => {

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
                res.json({
                    status: "ok",
                    msg: `New user has been created`,
                    user: doc
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

// make express build for production if necessary
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../../client/build"));
}

// listen on port
app.listen(PORT, () => console.log(`server listening on port ${PORT}.`));