import jwt from 'jwt-simple'
import { secretKey, Auth } from '../services/jwt'
import moment from 'moment'
import { Request, Response, NextFunction } from 'express'

//Create authenticate function
interface Authentication extends Request{
    user?:any
}

const auth = (req: Authentication, res: Response, next: NextFunction) => {
    try{
        if(!req.headers.authorization){
            res.status(401).json({message: 'Unauthorized', status: false })
            return
        }
        let token = req.headers.authorization.replace(/['"]+/g, '')
        console.log(token);
        console.log(secretKey);
        
        let payload =jwt.decode(token,secretKey)
        if(payload.exp < moment().unix()){
            res.send({
                status: false,
                message: 'Token has expired',
            })
            return
        }
        req.user = payload
        next()
    }catch(e){
        res.status(401).json({message: 'Unauthorized', e})
    }
}
export default auth