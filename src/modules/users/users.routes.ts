import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../config/auth";

const router = Router();

router.get("/", auth("admin"), userController.getAllUser);
router.put("/:id", auth("admin", "customer"), userController.updateUser);
router.delete("/:id", auth("admin"), userController.deleteUser);

export const userRouter = router;
