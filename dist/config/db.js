"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.pool = void 0;
const pg_1 = require("pg");
const _1 = __importDefault(require("."));
exports.pool = new pg_1.Pool({
    connectionString: _1.default.db_connection_url,
    ssl: { rejectUnauthorized: false },
});
const initDB = async () => {
    await exports.pool.query(`CREATE TABLE IF NOT EXISTS Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL CHECK (length(password) >= 6),
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin','customer'))
    )`);
    await exports.pool.query(`
    CREATE TABLE IF NOT EXISTS Vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('car','bike','van','suv')),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    daily_rent_price NUMERIC CHECK (daily_rent_price > 0) NOT NULL,
    availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available','booked'))
    )
    `);
    await exports.pool.query(`
      CREATE TABLE IF NOT EXISTS Bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
      total_price NUMERIC NOT NULL CHECK ( total_price > 0),
      status VARCHAR(20) NOT NULL CHECK (status IN ('active','cancelled','returned'))
      )
      `);
};
exports.initDB = initDB;
