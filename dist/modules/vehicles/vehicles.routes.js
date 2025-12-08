"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = require("express");
const vehicles_controller_1 = require("./vehicles.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("admin"), vehicles_controller_1.vehicleController.postVehicles);
router.get("/", vehicles_controller_1.vehicleController.getVehicles);
router.get("/:id", vehicles_controller_1.vehicleController.getSingleVehicle);
router.put("/:id", (0, auth_1.default)("admin"), vehicles_controller_1.vehicleController.updateVehicle);
router.delete("/:id", (0, auth_1.default)("admin"), vehicles_controller_1.vehicleController.deleteVehicle);
exports.vehicleRouter = router;
