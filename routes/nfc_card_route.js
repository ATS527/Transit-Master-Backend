const nfcCardRouter = require('express').Router();

const { NFCAddBalance, NFCShowBalance, activateNFCCard, decrementNFCCardBalance ,deactivateNFCCard } = require("../controllers/nfc_card_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

nfcCardRouter.get("/NFCShowBalance", NFCShowBalance);

nfcCardRouter.put("/NFCAddBalance",  NFCAddBalance);

nfcCardRouter.put("/activateNFCCard/:id", activateNFCCard);

nfcCardRouter.put("/deactivateNFCCard/:id", deactivateNFCCard);

nfcCardRouter.get("/decrementNFCCardBalance", decrementNFCCardBalance);

module.exports = nfcCardRouter;