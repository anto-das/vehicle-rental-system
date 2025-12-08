"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const postBookings = async (req, res) => {
    const userId = String(req.user?.id);
    try {
        const result = await booking_service_1.bookingService.postBookings(req.body, userId);
        if (result === false) {
            res.status(403).send({
                success: false,
                message: "you can't booked please give your customer id"
            });
        }
        else if (result === null) {
            res.status(404).send({
                success: false,
                message: "vehicle not found",
            });
        }
        else {
            res.status(201).send({
                success: true,
                message: "Booking created successfully",
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
const getAllBookings = async (req, res) => {
    const user = req.user;
    try {
        const result = await booking_service_1.bookingService.getBookings(user);
        if (result.rowCount === 0) {
            res.status(404).send({
                success: false,
                message: "Booking not found",
            });
        }
        else if (result.rows.length === 1) {
            res.status(200).send({
                success: true,
                message: "Your bookings retrieved successfully",
                data: result.rows,
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Bookings retrieved successfully",
                data: result.rows,
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
const updateBookings = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    try {
        const result = await booking_service_1.bookingService.updateBookings(req.body, user, id);
        if (result === null) {
            res.status(403).send({
                success: false,
                message: "Sorry! You can't change status"
            });
        }
        else if (result === false) {
            res.status(403).send({
                success: false,
                message: "Sorry! You can't cancelled your booking"
            });
        }
        else if (result.rowCount === 0) {
            res.status(404).send({
                success: false,
                message: "Booking not found"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "Booking cancelled successfully",
                data: result?.rows[0]
            });
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
exports.bookingController = {
    postBookings,
    getAllBookings,
    updateBookings,
};
