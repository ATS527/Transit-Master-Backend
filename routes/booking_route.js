const bookingRouter = require('express').Router();

const { bookBusRoute, getAllBookings, showAvailableRoutes, getUserBookings } = require("../controllers/booking_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

bookingRouter.post("/bookBusRoute", isAuthenticatedUser,authorizeRoles("client"), bookBusRoute);

bookingRouter.get("/getAllBookings", isAuthenticatedUser,authorizeRoles("admin","station-master"), getAllBookings);

bookingRouter.get("/getUserBookings", isAuthenticatedUser, authorizeRoles("client","student"), getUserBookings);

bookingRouter.get("/showAvailableRoutes", isAuthenticatedUser, authorizeRoles("admin","station-master","client","student"), showAvailableRoutes);

module.exports = bookingRouter;