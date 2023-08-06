const adminRouter = require('express').Router();

const { createAdmin, getAllAdmins, getCurrentlyLoggedinAdmin, loginAdmin, logoutAdmin, deleteAdmin } = require("../controllers/admin_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

adminRouter.post("/createAdmin", createAdmin);

adminRouter.get("/getAllAdmins", isAuthenticatedUser, authorizeRoles("admin"), getAllAdmins);

adminRouter.post("/loginAdmin", loginAdmin);

adminRouter.get("/logoutAdmin", isAuthenticatedUser, authorizeRoles("admin"), logoutAdmin);

adminRouter.get("/getCurrentlyLoggedinAdmin", isAuthenticatedUser, authorizeRoles("admin"), getCurrentlyLoggedinAdmin);

adminRouter.delete("/deleteAdmin/:email", isAuthenticatedUser, authorizeRoles("admin"), deleteAdmin);

module.exports = adminRouter;