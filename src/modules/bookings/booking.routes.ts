import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";


const router = Router();
router.post("/",auth("admin"),bookingController.postBookings);
router.get("/",auth("admin","customer"),bookingController.getAllBookings);
router.put("/:id",auth("admin","customer"),bookingController.updateBookings)
export const bookingRouter = router;