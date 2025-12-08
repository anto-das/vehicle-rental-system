"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const db_1 = require("../../config/db");
const number_of_days_1 = __importDefault(require("../../utilities/number_of_days"));
const vehicles_services_1 = require("../vehicles/vehicles.services");
const postBookings = async (payload, userId) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const number_of_days = (0, number_of_days_1.default)(rent_start_date, rent_end_date);
    //check login user id and given customer
    if (String(customer_id) !== userId) {
        return false;
    }
    // find out single vehicle using vehicle_id
    const getSingleVehicle = await vehicles_services_1.vehicleService.getSingleVehicle(vehicle_id);
    if (getSingleVehicle.rows[0] === undefined) {
        return null;
    }
    const { daily_rent_price, vehicle_name } = getSingleVehicle.rows[0];
    const totalPrice = daily_rent_price * number_of_days;
    // set availability status available to booked
    const updateVehicle = await vehicles_services_1.vehicleService.updateVehicle({ availability_status: "booked" }, vehicle_id);
    const result = await db_1.pool.query(`INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        totalPrice,
        "active",
    ]);
    const vehicleInfo = {
        ...result.rows[0],
        vehicle: { vehicle_name: vehicle_name, daily_rent_price: daily_rent_price },
    };
    return vehicleInfo;
};
const getSingleBookings = async (id) => {
    const result = await db_1.pool.query(`
    SELECT * FROM bookings WHERE customer_id=$1`, [id]);
    return result;
};
const getBookings = async (user) => {
    const id = String(user?.id);
    const userRole = user?.role;
    // all users and vehicles from database
    const customers = await db_1.pool.query(`SELECT * FROM users`);
    const vehicles = await vehicles_services_1.vehicleService.getVehicles();
    // condition if user is customer
    if (userRole !== "admin") {
        const result = await getSingleBookings(id);
        const { vehicle_id } = result.rows[0];
        const { vehicle_name, registration_number, type } = vehicles.rows?.find((vehicle) => vehicle.id === vehicle_id);
        const getOwnBooking = {
            ...result.rows[0],
            vehicles: {
                vehicle_name,
                registration_number,
                type,
            },
        };
        result.rows = [getOwnBooking];
        autoMarked(id);
        return result;
    }
    // if user is admin
    const result = await db_1.pool.query(`SELECT * FROM bookings`);
    const finalResult = result.rows.map((bookedResult) => {
        const { name, email } = customers.rows?.find((customer) => customer.id === bookedResult.customer_id);
        const { vehicle_name, registration_number } = vehicles.rows?.find((vehicle) => vehicle.id === bookedResult.vehicle_id);
        const adminResult = {
            ...bookedResult,
            customer: {
                name,
                email,
            },
            vehicle: {
                vehicle_name,
                registration_number,
            },
        };
        return adminResult;
    });
    result.rows = finalResult;
    autoMarked(id);
    return result;
};
const updateBookings = async (payload, user, id) => {
    const status = payload.status;
    // get booking where id is equal user given id
    const bookingData = await db_1.pool.query(`SELECT * FROM bookings WHERE id=$1`, [
        id,
    ]);
    const { customer_id, rent_start_date, status: bookedStatus, } = bookingData.rows[0];
    //check customer id and user
    if (user.role === "customer" && String(user.id) !== String(customer_id)) {
        return null;
    }
    // check admin and status
    if (user.role !== "admin" && status === "returned") {
        return null;
    }
    if (bookingData.rowCount === 0) {
        return bookingData;
    }
    // d'structuring booking data get date
    const today = new Date();
    if (today >= rent_start_date && bookedStatus === "active") {
        return false;
    }
    //set update bookings
    const result = await db_1.pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, id]);
    const { vehicle_id } = bookingData.rows[0];
    const availability_status = bookedStatus === "active" ? "booked" : "available";
    //update vehicle status
    const updateVehicle = await db_1.pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`, [availability_status, vehicle_id]);
    if (user.role === "admin" && status === "returned") {
        const updateResult = {
            ...result.rows[0],
            vehicle: {
                availability_status: updateVehicle.rows[0]?.availability_status,
            },
        };
        result.rows[0] = updateResult;
    }
    return result;
};
const autoMarked = async (id) => {
    const today = new Date();
    const getSingleBooked = await getSingleBookings(id);
    const { rent_end_date, vehicle_id } = getSingleBooked?.rows[0];
    if (rent_end_date < today) {
        await db_1.pool.query(`UPDATE bookings SET status=$1 WHERE customer_id=$2`, [
            "returned",
            id,
        ]);
        await db_1.pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
            "available",
            vehicle_id,
        ]);
    }
};
exports.bookingService = {
    postBookings,
    getSingleBookings,
    getBookings,
    updateBookings,
    autoMarked,
};
