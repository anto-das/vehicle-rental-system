import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { vehicleRouter } from "./modules/vehicles/vehicles.routes";
import { authRouter } from "./modules/authentication/auth.routes";
import { userRouter } from "./modules/users/users.routes";
import { bookingRouter } from "./modules/bookings/booking.routes";
export const app = express();

// middle ware
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("vehicle rental platform");
});
app.use("/v1/auth", authRouter);

app.use("/v1/users", userRouter);

app.use("/v1/vehicles", vehicleRouter);

app.use("/v1/bookings", bookingRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "route not found",
    method: req.method,
    path: req.path,
  });
});
