// express & axios
import * as express from "express";
import axios from "axios";

// express plugins
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
import rateLimit = require("express-rate-limit");
import Filter = require("bad-words");

// create express app
// and load plugins
const app = express();
app.use(morgan("combined")); // better logging
app.use(bodyParser.json()); // used for parsing json request
app.use(cors()); // security stuff

// create bad word filter
const filter = new Filter();

// import user collection from db file
// setup mongoose and set schema
import mongoose = require('mongoose');
const Schema = mongoose.Schema;

// setup port & db connection for local or prod
const PORT = process.env.port || 8081
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
});

// define model
export const userCollection = mongoose.model("users", userSchema);


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

// limit express posts
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10 // limit each IP to 100 posts
}));

app.post("/fish", async (req, res) => {

    // TODO: change "catched" to "caught" here and client
    let changesToFish = {
        user: req.body.userid,
        fishId: req.body.fishId,
        caught: req.body.catched,
        favorited: req.body.favorited
    }

    // if user has this bug already saved
    // update the entry
    // else insert new entry
    userCollection.findOneAndUpdate({
        _id: changesToFish.user,
        "fish.fish": changesToFish.fishId
    }, {
        $set: {
            "fish.$.fish": changesToFish.fishId,
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
                            fish: changesToFish.fishId,
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
                            error: doc
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

    // TODO: change "catched" to "caught" here and client
    let changesToBugs = {
        user: req.body.userid,
        bugId: req.body.bugId,
        caught: req.body.catched,
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

app.post("/signup", async (req, res) => {

    // create data
    let data = {
        nickname: filter.clean(req.body.nickname.toString()),
        email: filter.clean(req.body.email.toString()),
        password: filter.clean(req.body.password.toString())
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