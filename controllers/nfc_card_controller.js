const NFCCard = require("../models/nfc_details");

exports.NFCShowBalance = async (req, res, next) => {
    try {
        const nfcCard = await NFCCard.findOne({
            user_id: req.query.user_id,
        });

        if (!nfcCard) {
            res.status(404).json({
                success: false,
                message: "NFC Card not found",
            });
            return;
        }

        if(nfcCard.is_valid === false) {
            res.status(404).json({
                success: false,
                message: "NFC Card is not valid",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: nfcCard,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.NFCAddBalance = async (req, res, next) => {
    try {
        const nfcCard = await NFCCard.findOne({
            user_id: req.query.user_id,
        });

        if (!nfcCard) {
            res.status(404).json({
                success: false,
                message: "NFC Card not found",
            });
            return;
        }

        if(nfcCard.is_valid === false) {
            res.status(404).json({
                success: false,
                message: "NFC Card is not valid",
            });
            return;
        }

        nfcCard.balance += req.body.amount;

        await nfcCard.save();

        res.status(200).json({
            success: true,
            message: "Balance added successfully",
            data: nfcCard,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.deactivateNFCCard = async (req, res, next) => {
    try {
        const nfcCard = await NFCCard.findOne({
            user_id: req.params.id,
        });

        if (!nfcCard) {
            res.status(404).json({
                success: false,
                message: "NFC Card not found",
            });
            return;
        }

        if(nfcCard.is_valid === false) {
            res.status(404).json({
                success: false,
                message: "NFC Card is not valid already",
            });
            return;
        }

        nfcCard.is_valid = false;

        await nfcCard.save();

        res.status(200).json({
            success: true,
            message: "NFC Card deactivated successfully",
            data: nfcCard,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.activateNFCCard = async (req, res, next) => {
    try {
        
        const nfcCard = await NFCCard.findOne({
            user_id: req.params.id,
        });

        if (!nfcCard) {
            res.status(404).json({
                success: false,
                message: "NFC Card not found",
            });
            return;
        }

        if(nfcCard.is_valid === true) {
            res.status(404).json({
                success: false,
                message: "NFC Card is already valid",
            });
            return;
        }

        nfcCard.is_valid = true;

        await nfcCard.save();

        res.status(200).json({
            success: true,
            message: "NFC Card activated successfully",
            data: nfcCard,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getAllNFCCardDetails = async (req, res, next) => {
    try {
        const nfcCards = await NFCCard.find({}).populate("user_id");

        if (!nfcCards) {
            res.status(404).json({
                success: false,
                message: "NFC Card not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: nfcCards,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.decrementNFCCardBalance = async (req, res, next) => {
    try {
        const amount = req.query.amount;
        const id = req.query.id;

        const nfcCard = await NFCCard.findOne({
            card_id: req.query.id,
        });

        if (!nfcCard) {
            res.status(404).json({
                success: false,
                message: "NFC Card not found",
            });
            return;
        }

        if(nfcCard.is_valid === false) {
            res.status(404).json({
                success: false,
                message: "NFC Card is not valid",
            });
            return;
        }

        nfcCard.balance -= req.query.amount;

        await nfcCard.save();

        res.status(200).json({
            success: true,
            message: "Balance decremented successfully",
            data: nfcCard,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}





