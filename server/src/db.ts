import mongoose from "mongoose";
const Schema = mongoose.Schema;

// connect to local db or hosted db
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Critterpedia";

// create connection with database
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log('connected to mongo database')
    } else {
        console.log(`error when connecting to mongodb: \n${err}`)
    }
});

// defining user schema & collection
export const userCollection = mongoose.model("users", new Schema({
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
}));