//import modules
import jwtsimple from 'jwt-simple';
import moment from 'moment';
import User from '../models/User';

export interface UserInterface{
    id:string,
    name: string,
    surname: string,
    nick: string,
    email: string,
    rol: string,
    iat?: number,
    exp?: number
}

//secret key
export const secretKey = 'SPUTNIK'; 
//we'll create the token func
export const Auth =(user: UserInterface)=>{
    const payload ={
        id:user.id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        emai: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }
    return jwtsimple.encode(payload, secretKey)
}