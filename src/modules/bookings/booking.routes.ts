import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../config/auth";

const router = Router();
router.post("/",auth("admin"),bookingController.postBookings);
router.get("/",bookingController.getAllBookings)
export const bookingRouter = router;