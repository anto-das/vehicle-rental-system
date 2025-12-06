import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../config/auth";

const router = Router();
router.post("/", auth("admin"), vehicleController.postVehicles);
router.get("/", vehicleController.getVehicles);
router.get("/:id", vehicleController.getSingleVehicle);
router.put("/:id", auth("admin"), vehicleController.updateVehicle);
router.delete("/:id", auth("admin"), vehicleController.deleteVehicle);
export const vehicleRouter = router;
