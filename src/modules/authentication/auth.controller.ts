import { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpUser(req.body);
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.signInUser(email, password);
    if (result === null) {
      res.status(403).send({
        success: false,
        message: "user not found",
      });
    } else if (!result) {
      res.status(400).send({
        success: false,
        message: "password is incorrect",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "login successful",
        data:result
      });
    }
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  signUpUser,
  signInUser,
};
