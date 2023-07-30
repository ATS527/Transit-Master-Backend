const nfcCardRequestsRouter = require('express').Router();

const { createNFCCardRequest, getCurrentStatusOfNFCRequest, getAllNFCCardClientRequests, getAllNFCCardStudentRequests, getNFCCardRequestDetailed, validateNFCCardRequest } = require("../controllers/nfc_card_requests_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

nfcCardRequestsRouter.post("/createNFCCardRequest", isAuthenticatedUser, authorizeRoles("client","student"), createNFCCardRequest);

nfcCardRequestsRouter.get("/getAllNFCCardClientRequests", isAuthenticatedUser, authorizeRoles("admin", "station-master"), getAllNFCCardClientRequests);

nfcCardRequestsRouter.get("/getAllNFCCardStudentRequests", isAuthenticatedUser, authorizeRoles("admin", "station-master"), getAllNFCCardStudentRequests);

nfcCardRequestsRouter.get("/getNFCCardRequestDetailed/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master"), getNFCCardRequestDetailed);

nfcCardRequestsRouter.post("/validateNFCCardRequest", isAuthenticatedUser, authorizeRoles("admin", "station-master"), validateNFCCardRequest);

nfcCardRequestsRouter.get("/getCurrentStatusOfNFCRequest", isAuthenticatedUser, authorizeRoles("client","student"), getCurrentStatusOfNFCRequest);

module.exports = nfcCardRequestsRouter;

