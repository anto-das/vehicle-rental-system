"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const signUpUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.signUpUser(req.body);
        if (result === null) {
            res.status(400).send({
                success: false,
                message: "Password must be at least 6 character or long",
            });
        }
        else {
            res.status(201).send({
                success: true,
                message: "User registered successfully",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};
const signInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authService.signInUser(email, password);
        if (result === null) {
            res.status(403).send({
                success: false,
                message: "user not found",
            });
        }
        else if (!result) {
            res.status(400).send({
                success: false,
                message: "password is incorrect",
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "login successful",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};
exports.authController = {
    signUpUser,
    signInUser,
};
