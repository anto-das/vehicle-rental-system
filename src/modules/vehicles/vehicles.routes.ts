import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router = Router();
router.post("/", vehicleController.postVehicles);
router.get("/", vehicleController.getVehicles);
router.get("/:id", vehicleController.getSingleVehicle);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);
export const vehicleRouter = router;
