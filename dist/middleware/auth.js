"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).send({
                    success: false,
                    message: "unauthorized access",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret_token);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).send({
                    success: false,
                    message: "forbidden access",
                });
            }
            next();
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message,
            });
        }
    };
};
exports.default = auth;
