// setup mongoose and set schema
import mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect MongoDB at default port 27017.
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.uyw2p.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, {
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

// if it ever get stuck uncomment to drop user collection
// userCollection.collection.drop();