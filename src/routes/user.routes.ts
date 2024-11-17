import UserController from "../controllers/UserController";
import { Router} from "express";
import AuthJwt from "../middleware/auth"
import User from "../models/User";
const app=Router()
app.post("/public/user-register",UserController.userRegister)
app.post("/public/user-login",UserController.userLogin)
app.get("/private/user-id/:id",AuthJwt,UserController.getUserById)
app.get("/private/user-list/:page",AuthJwt,UserController.getListUser)
app.put("/private/user-update",AuthJwt,UserController.updateUserById)
export default app
