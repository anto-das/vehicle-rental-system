import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleService } from "./vehicles.services";

const postVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.postVehicle(req.body);
    res.status(201).send({
      success: true,
      message: "vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicles();
    res.status(200).send({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await vehicleService.getSingleVehicle(id!);
    if (result.rows.length === 0) {
      res.send({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await vehicleService.updateVehicle(req.body, id!);
    if (result.rowCount === 0) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(201).send({
        success: true,
        message: "vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await vehicleService.deleteVehicle(id!);
    if (result.rowCount === 0) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).send({
        success:true,
        message:"Vehicle deleted successfully"
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  postVehicles,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
