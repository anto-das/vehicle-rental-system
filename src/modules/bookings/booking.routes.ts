import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";


const router = Router();
router.post("/",auth("admin"),bookingController.postBookings);
router.get("/",auth("admin","customer"),bookingController.getAllBookings)
export const bookingRouter = router;