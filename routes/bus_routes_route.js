const busRouteRouter = require('express').Router();

const {createBusRoute,deleteBusRouteById,getAllBusRoutes,getBusRouteById,updateBusRouteById} = require("../controllers/bus_route_controller");

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

busRouteRouter.post("/createBusRoute",isAuthenticatedUser,authorizeRoles("admin","station-master"),createBusRoute);

busRouteRouter.get("/getAllBusRoutes",isAuthenticatedUser,authorizeRoles("admin","station-master"),getAllBusRoutes);

busRouteRouter.get("/getBusRouteById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"),getBusRouteById);

busRouteRouter.put("/updateBusRouteById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"),updateBusRouteById);

busRouteRouter.delete("/deleteBusRouteById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master"),deleteBusRouteById);

module.exports = busRouteRouter;