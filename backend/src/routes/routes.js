import { loginController, registerController } from "@/controller/auth.js";
import { Router } from "express";
const route = Router()

route.post("/login", loginController);
route.post("/register", registerController);

export default route;