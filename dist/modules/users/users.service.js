"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const booking_service_1 = require("../bookings/booking.service");
const getAllUser = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const getSingleUser = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result;
};
const updateUser = async (payload, userRole, id, userId) => {
    const { name, email, phone, role } = payload;
    let idx = 1;
    const values = [];
    const fields = [];
    const strId = String(userId);
    const isAdmin = userRole === "admin" && strId !== id;
    const isCustomer = userRole === "customer" && strId === id;
    if (!isAdmin && !isCustomer) {
        return null;
    }
    if (name !== undefined) {
        fields.push(`name=$${idx++}`);
        values.push(name);
    }
    if (email !== undefined) {
        fields.push(`email=$${idx++}`);
        values.push(email);
    }
    if (phone !== undefined) {
        fields.push(`phone=$${idx++}`);
        values.push(phone);
    }
    if (role !== undefined && isAdmin) {
        fields.push(`role=$${idx++}`);
        values.push(role);
    }
    if (isCustomer) {
        values.push(strId);
    }
    else {
        values.push(id);
    }
    const result = await db_1.pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`, values);
    return result;
};
const deleteUser = async (id) => {
    const bookings = await booking_service_1.bookingService.getSingleBookings(id);
    if (bookings.rows.length > 0) {
        return null;
    }
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result;
};
exports.userService = {
    getAllUser,
    updateUser,
    deleteUser,
    getSingleUser,
};
