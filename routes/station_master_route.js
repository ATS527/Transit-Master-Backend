const stationMasterRouter = require('express').Router();

const { createStationMaster, getAllStationMasters, getCurrentlyLoggedinStationMaster, loginStationMaster, logoutStationMaster, deleteStationMaster } = require("../controllers/station_master_controller");

const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

stationMasterRouter.post("/createStationMaster", createStationMaster);

stationMasterRouter.get("/getAllStationMasters", getAllStationMasters);

stationMasterRouter.post("/loginStationMaster",loginStationMaster);

stationMasterRouter.get("/logoutStationMaster", logoutStationMaster);

stationMasterRouter.get("/getCurrentlyLoggedinStationMaster", getCurrentlyLoggedinStationMaster);

stationMasterRouter.delete("/deleteStationMaster/:email", deleteStationMaster);

module.exports = stationMasterRouter;