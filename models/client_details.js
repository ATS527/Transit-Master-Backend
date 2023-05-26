const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        primaryKey: true,
        ref: "User",
    },
    full_name: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    address: {
        type: String,
    },
    pin_code: {
        type: String,
    },
    nearest_dippo: {
        type: String,
    },
    income_certificate_link: {
        type: String,
    },
    aadhar_link: {
        type: String,
    },
    ration_card_link: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

clientSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("clientDetails", clientSchema);