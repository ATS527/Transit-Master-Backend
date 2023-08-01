const busRouter = require('express').Router();

const { createBus, getAllBuses, updateBusByBusNumber, deleteBusByBusNumber } = require("../controllers/bus_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

busRouter.post("/createBus", isAuthenticatedUser, authorizeRoles("admin","station-master"), createBus);

busRouter.get("/getAllBuses", isAuthenticatedUser, authorizeRoles("admin","station-master"), getAllBuses);

// busRouter.get("/getBusByNumber/:bus_number", isAuthenticatedUser, authorizeRoles("admin"), getBusByNumber);

busRouter.put("/updateBusByNumber", isAuthenticatedUser, authorizeRoles("admin","station-master"), updateBusByBusNumber);

busRouter.delete("/deleteBusByNumber/:id", isAuthenticatedUser, authorizeRoles("admin","station-master"), deleteBusByBusNumber);

module.exports = busRouter;
