import { Request, response, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import {Auth, UserInterface} from '../services/jwt'

class UserController {
  async userRegister(req: Request, res: Response) {
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
      //encrypt password

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
      res.status(201).send({ message: "User created successfully", responseData });
    } catch (error) {
      res.send({
        status: 400,
        message: "Process failed",
      });
    }
  }

  async userLogin(req: Request, res: Response) {
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

        const jwtLogin = Auth(IUser)

        res.send({
            status: true,
            message: "User found",
            findUser,
            token: jwtLogin
        })
    } catch (error) {
        res.send({
            status: 400,
            message: "Process failed",
            });
    }
  }
  async privateTest(req: Request, res: Response){
    try {
        res.send({
            status: true,
            message: "Private test",
            data: req.params
        })
        
    } catch (error) {
        res.status(404).send({
            status: false,
            message: "Private test failed",
            error
        })
    }
  }
}

export default new UserController();
