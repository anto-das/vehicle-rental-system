"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const auth_routes_1 = require("./modules/authentication/auth.routes");
const users_routes_1 = require("./modules/users/users.routes");
const booking_routes_1 = require("./modules/bookings/booking.routes");
exports.app = (0, express_1.default)();
// middle ware
exports.app.use(express_1.default.json());
(0, db_1.initDB)();
exports.app.get("/", (req, res) => {
    res.send("vehicle rental platform");
});
exports.app.use("/v1/auth", auth_routes_1.authRouter);
exports.app.use("/v1/users", users_routes_1.userRouter);
exports.app.use("/v1/vehicles", vehicles_routes_1.vehicleRouter);
exports.app.use("/v1/bookings", booking_routes_1.bookingRouter);
exports.app.use((req, res) => {
    res.status(404).send({
        success: false,
        message: "route not found",
        method: req.method,
        path: req.path,
    });
});
