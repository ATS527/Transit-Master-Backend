const nfcCardRouter = require('express').Router();

const { NFCAddBalance, NFCShowBalance, activateNFCCard, deactivateNFCCard } = require("../controllers/nfc_card_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

nfcCardRouter.get("/NFCShowBalance", isAuthenticatedUser, authorizeRoles("client", "student"), NFCShowBalance);

nfcCardRouter.put("/NFCAddBalance", isAuthenticatedUser, authorizeRoles("admin","station-master","client", "student"), NFCAddBalance);

nfcCardRouter.put("/activateNFCCard/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master"), activateNFCCard);

nfcCardRouter.put("/deactivateNFCCard/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master"), deactivateNFCCard);

module.exports = nfcCardRouter;