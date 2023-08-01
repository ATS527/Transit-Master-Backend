const routeRouter = require('express').Router();

const { createRoute, getAllRoutes, updateRoute, deleteRoute } = require("../controllers/route_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

routeRouter.post("/createRoute", isAuthenticatedUser, authorizeRoles("admin","station-master"), createRoute);

routeRouter.get("/getAllRoutes", isAuthenticatedUser, authorizeRoles("admin","station-master"), getAllRoutes);

routeRouter.put("/updateRoute/:id" , isAuthenticatedUser, authorizeRoles("admin", "station-master"), updateRoute);

routeRouter.put("/deleteRoute" , isAuthenticatedUser, authorizeRoles("admin", "station-master"), deleteRoute);

module.exports = routeRouter;



