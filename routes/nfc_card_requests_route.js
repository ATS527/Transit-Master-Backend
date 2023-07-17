const nfcCardRequestsRouter = require('express').Router();

const { createNFCCardRequest, getCurrentStatusOfNFCRequest,getAllNFCCardClientRequests, getAllNFCCardStudentRequests, getNFCCardRequestDetailed, validateNFCCardRequest } = require("../controllers/nfc_card_requests_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

nfcCardRequestsRouter.post("/createNFCCardRequest", createNFCCardRequest);

nfcCardRequestsRouter.get("/getAllNFCCardClientRequests", getAllNFCCardClientRequests);

nfcCardRequestsRouter.get("/getAllNFCCardStudentRequests", getAllNFCCardStudentRequests);

nfcCardRequestsRouter.get("/getNFCCardRequestDetailed/:id", getNFCCardRequestDetailed);

nfcCardRequestsRouter.put("/validateNFCCardRequest/:id", validateNFCCardRequest);

nfcCardRequestsRouter.get("/getCurrentStatusOfNFCRequest", getCurrentStatusOfNFCRequest);

module.exports = nfcCardRequestsRouter;

