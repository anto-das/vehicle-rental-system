"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicles_services_1 = require("./vehicles.services");
const postVehicles = async (req, res) => {
    try {
        const result = await vehicles_services_1.vehicleService.postVehicle(req.body);
        res.status(201).send({
            success: true,
            message: "vehicle created successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_services_1.vehicleService.getVehicles();
        res.status(200).send({
            success: true,
            message: "Vehicles retrieved successfully",
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
const getSingleVehicle = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await vehicles_services_1.vehicleService.getSingleVehicle(id);
        if (result.rows.length === 0) {
            res.send({
                success: false,
                message: "vehicle not found",
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Vehicles retrieved successfully",
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
const updateVehicle = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await vehicles_services_1.vehicleService.updateVehicle(req.body, id);
        if (result.rowCount === 0) {
            res.status(404).send({
                success: false,
                message: "vehicle not found",
            });
        }
        else {
            res.status(201).send({
                success: true,
                message: "vehicle updated successfully",
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
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await vehicles_services_1.vehicleService.deleteVehicle(id);
        if (result === null) {
            res.status(403).send({
                success: false,
                message: "Vehicle not deleted vehicle is booked"
            });
        }
        else if (result.rowCount === 0) {
            res.status(404).send({
                success: false,
                message: "vehicle not found",
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Vehicle deleted successfully"
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
exports.vehicleController = {
    postVehicles,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
