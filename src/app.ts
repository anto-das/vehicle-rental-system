import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { VehicleRouter } from "./modules/vehicles/vehicles.routes";
export const app = express();

// middle ware
app.use(express.json());

initDB();

app.use("/vehicles",VehicleRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("vehicle rental platform");
});