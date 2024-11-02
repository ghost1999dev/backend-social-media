import UserController from "../controllers/UserController";
import { Router} from "express";
const app=Router()
app.get("/user-register/save",UserController.userRegister)
app.post("/user-login",UserController.userLogin)
export default app
