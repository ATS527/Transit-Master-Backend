const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    transaction_id: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

paymentSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("PaymentDetails", paymentSchema);