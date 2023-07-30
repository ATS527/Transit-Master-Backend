const studentRouter = require('express').Router();

const { createStudent, createStudentDetails, deleteStudent, getAllStudents, getCurrentlyLoggedinStudent, getStudentDetailsById, loginStudent, logoutStudent, updateStudentDetails } = require("../controllers/student_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { studentUpload } = require("../middleware/upload");

studentRouter.post("/createStudent", createStudent);

studentRouter.post("/createStudentDetails", isAuthenticatedUser, authorizeRoles("student"), studentUpload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), createStudentDetails)

studentRouter.get("/getAllStudents", isAuthenticatedUser, authorizeRoles("admin", "station-master"), getAllStudents);

studentRouter.delete("/deleteStudent/:id", isAuthenticatedUser, authorizeRoles("admin", "station-master"), deleteStudent);

studentRouter.post("/loginStudent", loginStudent);

studentRouter.get("/logoutStudent", logoutStudent);

studentRouter.get("/getCurrentlyLoggedinStudent",isAuthenticatedUser,authorizeRoles("student"), getCurrentlyLoggedinStudent);

studentRouter.get("/getStudentDetailsById/:id",isAuthenticatedUser,authorizeRoles("admin","station-master","student"), getStudentDetailsById);

studentRouter.put("/updateStudentDetails",isAuthenticatedUser,authorizeRoles("admin","station-master","student"), studentUpload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), updateStudentDetails);

module.exports = studentRouter;