const clientRouter = require('express').Router();

const { createClient,getClientDetailsById,updateClientDetails, createClientDetails, getAllClients, deleteClient, getCurrentlyLoggedinClient, loginClient, logoutClient } = require("../controllers/client_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const upload = require("../middleware/upload");

clientRouter.post("/createClient", createClient);

clientRouter.post("/createClientDetails", isAuthenticatedUser, authorizeRoles("client"), upload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), createClientDetails)

clientRouter.get("/getAllClients", isAuthenticatedUser, authorizeRoles("admin", "station-master"), getAllClients);

clientRouter.delete("/deleteClient/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master"), deleteClient);

clientRouter.post("/loginClient", loginClient);

clientRouter.get("/logoutClient", logoutClient);

clientRouter.get("/getCurrentlyLoggedinClient", isAuthenticatedUser, authorizeRoles("client"), getCurrentlyLoggedinClient);

clientRouter.get("/getClientDetailsById/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master","client"), getClientDetailsById);

clientRouter.put("/updateClientDetails/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master","client"), upload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), updateClientDetails);

module.exports = clientRouter;