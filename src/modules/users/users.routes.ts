import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
import isAdmin from "../../middleware/isAdmin";


const router = Router();

router.get("/", auth("admin"), userController.getAllUser);
router.put("/:id", auth("admin", "customer"), isAdmin,userController.updateUser);
router.delete("/:id", auth("admin"), userController.deleteUser);

export const userRouter = router;
