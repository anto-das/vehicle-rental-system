import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.get("/",userController.getAllUser);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

export const userRouter =router;