const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    connected = true;
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
    return;
});

