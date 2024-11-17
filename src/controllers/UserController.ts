import {  Request,Response} from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

import {Auth,secretKey,UserInterface} from "../services/jwt";

interface Authentication extends Request{
    user?:any
}

class UserController {
     async userRegister(req:Request,res:Response){
        try {
             //receive data
             const { name, surname, nick, password, email } = req.body;
             //find user
                   const userFind = await User.findOne({
                       name: name,
                       email: email,
                   });
                   if (userFind) {
                       res.status(403).json({ message: "The user already exist" });
                       return;
                   }
                   let newUser = {
                    name: name,
                    surname: surname,
                    nick: nick,
                    email:email,
                    password: password
                  }
                   const hashedPassword = await bcrypt.hash(password, 10)
                 newUser.password = hashedPassword

                const responseData = await new User(newUser)
                await responseData.save()
            res.send({
                status:200,
                message:"User registered sucessfull"
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
            const {email, password} = req.body;
            const findUser = await User.findOne({
                email: email,
            })
            if(!findUser){
                res.status(404).json({status: false ,message: "User not found"})
                return
            }
            const verifyPass = await bcrypt.compare(password, findUser.password)
            if(!verifyPass){
                res.status(401).json({status: false ,message: "Invalid password"})
                return
            }
            const IUser: UserInterface = {
                name: findUser.name,
                surname: findUser.surname,
                nick: findUser.nick,
                email: findUser.email,
                rol: findUser.role
            }
            const jwtLogin= Auth(IUser)
            res.send({
                status: true,
                message: "User found",
                findUser,
                token: jwtLogin
            })
            
        } catch (error) {
            
        }
     }
     async getUserById(req:Request,res:Response){
        try {
            const{id}=req.params

            const dataUser = await User.findById(id).select('-password -__v -role')
            res.send({
                status:true,
                message:"User found",
                dataUser
            })
        } catch (error) {
            res.status(404).send({
                status:false,
                message:"Error",
                error
            })
        }
     }
     async getListUser(req:Request,res:Response){
        try {
            //Convert to number the page
            const page = Number(req.params.page) | 1
            //Convert to number the limit
            const limit = Number(req.params.limit) | 4
            //Create the skip 
            const skip = (page - 1 ) * limit
            //Get all users
            const data = await User.find().skip(skip).limit(limit).select('-password -__v -role')
            const counterDocuments=await User.countDocuments()
            res.send({
                status:true,
                message:"List user",
                counterDocuments,
                data
            })
        } catch (error) {
            res.status(404).send({
                status:false,
                message:"Error",
                error
            })
        }
     }
     async updateUserById(req:Authentication,res:Response){
        try {
            const userBody=req.body
            const userToken=req.user

            console.log(userBody);
            
            
        } catch (error) {
            
        }
     }


}

export default new UserController()
