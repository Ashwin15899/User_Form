import userController from "./userController";
import express from "express";

const userRouter = express.Router();

userRouter.post("/createUser", userController.createUser);
userRouter.get("/getAllUsers", userController.getAllUsers);
userRouter.get("/getUserById/:id", userController.getUserById);
userRouter.put("/updateUser/:id", userController.updateUser);
userRouter.delete("/deleteUser/:id", userController.deleteUser);

export default userRouter;
