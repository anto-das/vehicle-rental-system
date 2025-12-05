import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { VehicleRouter } from "./modules/vehicles/vehicles.routes";
import { AuthRouter } from "./modules/authentication/auth.routes";
import { UserRouter } from "./modules/users/users.routes";
export const app = express();

// middle ware
app.use(express.json());

initDB();

app.use("/v1/auth",AuthRouter)

app.use("/v1/users",UserRouter)

app.use("/v1/vehicles",VehicleRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("vehicle rental platform");
});