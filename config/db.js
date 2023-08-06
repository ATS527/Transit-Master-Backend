const mongoose = require("mongoose");

//remote db
const db = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.MONGO_PASSWORD}@${process.env.DB_NAME}.wsirnke.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

// local db
// const db = mongoose.connect(`mongodb://127.0.0.1:27017/transitdb`,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const conn = mongoose.connection;

// conn.on('error', () => console.error.bind(console, 'connection error'));

// conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;