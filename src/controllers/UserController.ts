import {  Request,Response} from "express";

class UserController {
     async userRegister(req:Request,res:Response){
        try {
            res.send({
                status:200,
                message:"Called user register"
            })
        } catch (error) {
            res.send({
                status:400,
                message:"Process failed"
            })
        }        
     }
     async userLogin(req:Request,res:Response){
        try {
            
        } catch (error) {
            
        }
     }
}

export default new UserController()
