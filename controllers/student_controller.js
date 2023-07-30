const Student = require("../models/user_model");
const StudentDetails = require("../models/client_details");
const sendToken = require("../utils/jwtToken")
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;

const student_server_url = (process.env.SERVER_URL || "http://127.0.0.1:4000") + "/student_documents/";

exports.createStudent = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = "student";

        const client = await Student.findOne({
            email: email,
        });

        if (client) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        const studentCreated = new Student({
            username: username,
            email: email,
            password: password,
            role: role,
        });

        await studentCreated.save()
            .then((result) => {
                sendToken(result, 201, res);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "student creation failed",
                    error: error,
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "student creation failed",
            error: err,
        });
    }
};

exports.createStudentDetails = async (req, res, next) => {
    try {

        const studentDetails = await StudentDetails.findOne({
            user_id: req.user._id,
        });

        if (studentDetails) {
            res.status(400).json({
                success: false,
                message: "Student details already exists",
            });
            return;
        }

        await StudentDetails.create({
            user_id: req.user._id,
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            pin_code: req.body.pin_code,
            nearest_depot: req.body.nearest_depot,
            is_student: true,
        });

        const student = await StudentDetails.findOne({
            user_id: req.user._id,
        });

        if (req.files) {
            if (req.files.income_certificate) {
                student.income_link = student_server_url + req.files.income_certificate[0].filename;
            }
            if (req.files.aadhar) {
                student.aadhar_card_link = student_server_url + req.files.aadhar[0].filename;
            }
            if (req.files.ration_card) {
                student.ration_link = student_server_url + req.files.ration_card[0].filename;
            }
            await student.save();
        }

        res.status(201).json({
            success: true,
            message: "student details created",
            student,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "student details creation failed",
            error: err,
        });
    }
}

exports.updateStudentDetails = async (req, res, next) => {
    try {
        const studentDetails = await StudentDetails.findOne({
            user_id: req.user._id,
        });

        if (!studentDetails) {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
            return;
        }

        studentDetails.full_name = req.body.full_name;
        studentDetails.phone_number = req.body.phone_number;
        studentDetails.address = req.body.address;
        studentDetails.pin_code = req.body.pin_code;
        studentDetails.nearest_depot = req.body.nearest_depot;

        if (req.files) {
            if (req.files.income_certificate) {
                if (studentDetails.income_link !== undefined) {
                    const strippedFileName = studentDetails.income_link.replace(student_server_url, "");
                    await fs.unlink("./public/student_documents/" + strippedFileName, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                studentDetails.income_link = student_server_url + req.files.income_certificate[0].filename;
                await studentDetails.save().then(result => {
                    console.log(result)   
                }).catch(err => {
                    console.log(err);   
                });
            }
            if (req.files.aadhar) {
                if (studentDetails.aadhar_card_link !== undefined) {
                    const strippedFileName = studentDetails.aadhar_card_link.replace(student_server_url, "");
                    await fs.unlink("./public/student_documents/" + strippedFileName, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                studentDetails.aadhar_card_link = student_server_url + req.files.aadhar[0].filename;
                await studentDetails.save();
            }
            if (req.files.ration_card) {
                if (studentDetails.ration_link !== undefined) {
                    const strippedFileName = studentDetails.ration_link.replace(student_server_url, "");
                    await fs.unlink("./public/student_documents/" + strippedFileName, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                studentDetails.ration_link = student_server_url + req.files.ration_card[0].filename;
                await studentDetails.save();
            }
        }

        res.status(200).json({
            success: true,
            message: "student details updated",
            clientDetails: studentDetails,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "student details updation failed",
            error: err,
        });
    }
}

exports.getStudentDetailsById = async (req, res, next) => {
    const id = req.params.id;

    try {
        // get the client details by the id and populate the user_id field and omit the password field
        const studentDetails = await StudentDetails.findOne({
            user_id: id,
        }).populate("user_id", "-password -_id -__v");

        if (!studentDetails) {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Get student by id success",
            studentDetails,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get student by id failed",
            error: err,
        });
    }
}

exports.getAllStudents = async (req, res, next) => {
    try {
        const studentDetails = await StudentDetails.find({
            is_student: true,
        }).populate("user_id", "-password -__v");

        const s = await StudentDetails.find();

        res.status(200).json({
            success: true,
            message: "Get all students success",
            students: studentDetails,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all students failed",
            error: err,
        });
    }
};

exports.loginStudent = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const student = await Student.findOne({
            email: email,
        });

        if (!student) {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
            return;
        }

        const isPasswordMatched = bcrypt.compareSync(password, student.password);

        if (!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        sendToken(student, 200, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: err
        })
    }
};

exports.logoutStudent = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            Credentials: true,
            sameSite: "none",
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "Log out success",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Log out failed",
            error: err,
        });
    }
};

exports.getCurrentlyLoggedinStudent = async (req, res, next) => {
    try {
        const student = await Student.find({
            _id: req.user._id,
        }, "-password");

        if (!student) {
            res.status(401).json({
                success: false,
                message: "student not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        await StudentDetails.findOne({
            user_id: req.params.id
        }).then(async (result) => {
            if (result.income_link !== undefined) {
                const strippedFileName = result.income_link.replace(student_server_url, "");
                await fs.unlink("./public/student_documents/" + strippedFileName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            if (result.aadhar_card_link !== undefined) {
                const strippedFileName = result.aadhar_card_link.replace(student_server_url, "");
                await fs.unlink("./public/student_documents/" + strippedFileName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            if (result.ration_link !== undefined) {
                const strippedFileName = result.ration_link.replace(student_server_url, "");
                await fs.unlink("./public/student_documents/" + strippedFileName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }).then(async () => {
            await StudentDetails.deleteOne({
                user_id: req.params.id
            }).then(async () => {
                await Student.deleteOne({
                    _id: req.params.id
                });
                res.status(200).json({
                    success: true,
                    message: "Student deleted successfully",
                });
            })
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
}