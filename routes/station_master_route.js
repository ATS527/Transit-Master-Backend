const stationMasterRouter = require('express').Router();

const { createStationMaster, getAllStationMasters, getCurrentlyLoggedinStationMaster, loginStationMaster, logoutStationMaster, deleteStationMaster } = require("../controllers/station_master_controller");

const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

stationMasterRouter.post("/createStationMaster", isAuthenticatedUser,authorizeRoles("admin") ,createStationMaster);

stationMasterRouter.get("/getAllStationMasters",isAuthenticatedUser,authorizeRoles("admin"), getAllStationMasters);

stationMasterRouter.post("/loginStationMaster",loginStationMaster);

stationMasterRouter.get("/logoutStationMaster",logoutStationMaster);

stationMasterRouter.get("/getCurrentlyLoggedinStationMaster",isAuthenticatedUser,authorizeRoles("station-master"), getCurrentlyLoggedinStationMaster);

stationMasterRouter.delete("/deleteStationMaster/:email",isAuthenticatedUser,authorizeRoles("admin"), deleteStationMaster);

module.exports = stationMasterRouter;