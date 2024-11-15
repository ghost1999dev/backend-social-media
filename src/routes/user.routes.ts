import UserController from "../controllers/UserController";
import { auth } from "../middleware/auth";
import { Router} from "express";
import User from "../models/User";
const app=Router()
app.post("/public/user-register",UserController.userRegister)
app.post("/public/user-login",UserController.userLogin)
app.post("/private/user-test", auth, UserController.privateTest)
export default app
