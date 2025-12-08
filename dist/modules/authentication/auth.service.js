"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signUpUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const lowerEmail = String(email || "").toLowerCase();
    if (String(password || "").length < 6) {
        return null;
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, lowerEmail, hashedPassword, phone, role]);
    return result;
};
const signInUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const isMatch = bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return false;
    }
    const { id, name, email: userEmail, phone, role } = user;
    const token = jsonwebtoken_1.default.sign({ id: id, name: name, email: userEmail, phone: phone, role: role }, config_1.default.jwt_secret_token, { expiresIn: "8d" });
    return {
        token,
        user: { id: id, name: name, email: userEmail, phone: phone, role: role },
    };
};
exports.authService = {
    signUpUser,
    signInUser,
};
