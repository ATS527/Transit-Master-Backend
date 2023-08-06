const stopRouter = require('express').Router();

const { createStop, getAllStops,updateStop, deleteStop } = require("../controllers/stop_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

stopRouter.post("/createStop", isAuthenticatedUser,authorizeRoles("admin","station-master"), createStop);

stopRouter.get("/getAllStops", isAuthenticatedUser,authorizeRoles("admin","station-master","client","student"), getAllStops);

stopRouter.put("/updateStop/:id", isAuthenticatedUser,authorizeRoles("admin","station-master"), updateStop);

stopRouter.delete("/deleteStop/:id", isAuthenticatedUser,authorizeRoles("admin","station-master"), deleteStop);

module.exports = stopRouter;