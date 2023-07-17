const studentRouter = require('express').Router();

const { createStudent, createStudentDetails, deleteStudent, getAllStudents, getCurrentlyLoggedinStudent, getStudentDetailsById, loginStudent, logoutStudent, updateStudentDetails } = require("../controllers/student_controller");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {studentUpload} = require("../middleware/upload");

studentRouter.post("/createStudent", createStudent);

studentRouter.post("/createStudentDetails", studentUpload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), createStudentDetails)

studentRouter.get("/getAllStudents", getAllStudents);

studentRouter.delete("/deleteStudent/:id", deleteStudent);

studentRouter.post("/loginStudent", loginStudent);

studentRouter.get("/logoutStudent", logoutStudent);

studentRouter.get("/getCurrentlyLoggedinStudent", getCurrentlyLoggedinStudent);

studentRouter.get("/getStudentDetailsById/:id", getStudentDetailsById);

studentRouter.put("/updateStudentDetails/:id", studentUpload.fields([{ name: "aadhar", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }, { name: "ration_card", maxCount: 1 }]), updateStudentDetails);

module.exports = studentRouter;