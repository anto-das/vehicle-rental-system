import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router = Router();
router.get("/",vehicleController.postVehicles)


export const VehicleRouter = router;

