const adminRouter = require('express').Router();

const { createAdmin, getCurrentlyLoggedinAdmin,getAllAdmins, loginAdmin, logoutAdmin, deleteAdmin } = require("../controllers/admin_controller");

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

adminRouter.post("/createAdmin", createAdmin);

adminRouter.get("/getAllAdmins", getAllAdmins);

adminRouter.post("/loginAdmin", loginAdmin);

adminRouter.get("/logoutAdmin",logoutAdmin);

adminRouter.get("/getCurrentlyLoggedinAdmin", getCurrentlyLoggedinAdmin);

adminRouter.delete("/deleteAdmin/:email", deleteAdmin);

module.exports = adminRouter;