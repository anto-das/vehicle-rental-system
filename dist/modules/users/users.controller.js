"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_service_1 = require("./users.service");
const getAllUser = async (req, res) => {
    try {
        const result = await users_service_1.userService.getAllUser();
        res.status(200).send({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};
const updateUser = async (req, res) => {
    const id = req.params.id;
    const role = req.user?.role;
    const userId = req.user?.id;
    try {
        const result = await users_service_1.userService.updateUser(req.body, role, id, userId);
        if (result === null) {
            res.status(401).send({
                success: false,
                message: "You can't update others data",
            });
        }
        else if (result.rowCount === 0) {
            res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "User updated successfully",
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
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await users_service_1.userService.deleteUser(id);
        if (result === null) {
            res.status(403).send({
                success: false,
                message: "User not deleted user booked a vehicle",
            });
        }
        else if (result.rowCount === 0) {
            res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "User deleted successfully",
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
exports.userController = {
    getAllUser,
    updateUser,
    deleteUser,
};
