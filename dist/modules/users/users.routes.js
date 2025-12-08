"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), users_controller_1.userController.getAllUser);
router.put("/:id", (0, auth_1.default)("admin", "customer"), users_controller_1.userController.updateUser);
router.delete("/:id", (0, auth_1.default)("admin"), users_controller_1.userController.deleteUser);
exports.userRouter = router;
