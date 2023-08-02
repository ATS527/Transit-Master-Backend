const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

userSchema.pre("save", function (next) {
    var date = convertUTCDateToLocalDate(new Date());
    //convert the utc time to ist
    // const currentDate = new Date();
    const currentDate = date;
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

function convertUTCDateToLocalDate(date) {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30 

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    const exactTime = ISTTime.getTime();

    return exactTime;
}

module.exports = mongoose.model("User", userSchema);