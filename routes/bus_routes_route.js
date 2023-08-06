const busRouteRouter = require('express').Router();

const {createBusRoute,deleteBusRouteById,getAllBusRoutes,getBusRouteById,updateBusRouteById, incrementStop, getCurrentStop} = require("../controllers/bus_route_controller");

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

busRouteRouter.post("/createBusRoute",isAuthenticatedUser,authorizeRoles("admin","station-master"),createBusRoute);

busRouteRouter.get("/getAllBusRoutes",isAuthenticatedUser,authorizeRoles("admin","station-master"),getAllBusRoutes);

busRouteRouter.get("/getBusRouteById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"),getBusRouteById);

busRouteRouter.put("/updateBusRouteById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"),updateBusRouteById);

busRouteRouter.delete("/deleteBusRouteById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"),deleteBusRouteById);

busRouteRouter.put("/incrementStop",isAuthenticatedUser,authorizeRoles("admin","station-master"),incrementStop);

busRouteRouter.get("/getCurrentStop/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master", "client", "student"), getCurrentStop);

module.exports = busRouteRouter;