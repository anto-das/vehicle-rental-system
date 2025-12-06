import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();
router.post("/",bookingController.postBookings)
export const bookingRouter = router;