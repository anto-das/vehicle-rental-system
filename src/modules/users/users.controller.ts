import { Request, Response } from "express";
import { userService } from "./users.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).send({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const role =req.user?.role;
  const userId =req.user?.id;
  try {
    const result = await userService.updateUser(req.body, role,id as string,userId);
    if (result === null) {
      res.status(401).send({
        success: false,
        message: "unauthorized access",
      });
    } else if (result.rowCount === 0) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUser(id as string);
    if (result === null) {
      res.status(403).send({
        success: false,
        message: "User not deleted user booked a vehicle",
      });
    } else if (result.rowCount === 0) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getAllUser,
  updateUser,
  deleteUser,
};
