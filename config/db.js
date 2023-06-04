const mongoose = require("mongoose");

//remote db
const db = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.MONGO_PASSWORD}@${process.env.DB_NAME}.9daglqy.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("Connected to MongoDB");
    connected = true;
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
    return;
});

//local db
// const db = mongoose.connect(`mongodb://localhost:27017/transitdb`).then(() => {
//     console.log("Connected to MongoDB");
//     connected = true;
// }
// ).catch((err) => {
//     console.log("Error connecting to MongoDB", err);
//     return;
// });