const clientRouter = require('express').Router();

const { createClient,getClientDetailsById,updateClientDetails, createClientDetails, getAllClients, deleteClient, getCurrentlyLoggedinClient, loginClient, logoutClient } = require("../controllers/client_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {clientUpload} = require("../middleware/upload");

clientRouter.post("/createClient", createClient);

clientRouter.post("/createClientDetails", clientUpload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), createClientDetails)

clientRouter.get("/getAllClients", getAllClients);

clientRouter.delete("/deleteClient/:id", deleteClient);

clientRouter.post("/loginClient", loginClient);

clientRouter.get("/logoutClient", logoutClient);

clientRouter.get("/getCurrentlyLoggedinClient", getCurrentlyLoggedinClient);

clientRouter.get("/getClientDetailsById/:id", getClientDetailsById);

clientRouter.put("/updateClientDetails/:id", clientUpload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), updateClientDetails);

module.exports = clientRouter;