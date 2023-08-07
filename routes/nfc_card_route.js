const nfcCardRouter = require('express').Router();

const { NFCAddBalance, NFCShowBalance, activateNFCCard, decrementNFCCardBalance ,deactivateNFCCard, getAllNFCCardDetails, addNFCCardId } = require("../controllers/nfc_card_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

nfcCardRouter.get("/NFCShowBalance",isAuthenticatedUser,authorizeRoles("client","student"), NFCShowBalance);

nfcCardRouter.put("/NFCAddBalance",isAuthenticatedUser,authorizeRoles("client", "student"),  NFCAddBalance);

nfcCardRouter.put("/activateNFCCard/:id",isAuthenticatedUser,authorizeRoles("admin","station-master") ,activateNFCCard);

nfcCardRouter.put("/deactivateNFCCard/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"), deactivateNFCCard);

nfcCardRouter.get("/decrementNFCCardBalance",isAuthenticatedUser,authorizeRoles("station-master"), decrementNFCCardBalance);

nfcCardRouter.get("/getAllNFCCardDetails",isAuthenticatedUser,authorizeRoles("station-master","admin"), getAllNFCCardDetails);

nfcCardRouter.put("/addNFCCardId", isAuthenticatedUser, authorizeRoles("admin", "station-master"), addNFCCardId);

module.exports = nfcCardRouter;