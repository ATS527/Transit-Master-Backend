const adminRouter = require('express').Router();

const { createAdmin, getCurrentlyLoggedinAdmin,getAllAdmins, loginAdmin, logoutAdmin, deleteAdmin } = require("../controllers/admin_controller");

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

// adminRouter.post("/createAdmin",isAuthenticatedUser,authorizeRoles("admin"), createAdmin);

adminRouter.post("/createAdmin", createAdmin);

adminRouter.get("/getAllAdmins",authorizeRoles("admin"), getAllAdmins);

adminRouter.post("/loginAdmin", loginAdmin);

adminRouter.get("/logoutAdmin",logoutAdmin);

adminRouter.get("/getCurrentlyLoggedinAdmin",authorizeRoles("admin"), getCurrentlyLoggedinAdmin);

adminRouter.delete("/deleteAdmin/:email",authorizeRoles("admin"), deleteAdmin);

module.exports = adminRouter;