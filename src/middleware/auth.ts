import jwt from 'jwt-simple'
import { secretKey, Auth } from '../services/jwt'
import moment from 'moment'
import { Request, Response, NextFunction } from 'express'

//create Auth function
export const auth = (req: Request & {user: any}, res: Response, next: NextFunction) => {
    try{
        if(!req.headers.authorization){
            res.status(401).json({message: 'Unauthorized', status: false })
            return
        }
        let token = req.headers.authorization.replace(/['"]+/g, '')
        const decode = jwt.decode(token, secretKey)
        if(decode.exp < moment().unix()){
            res.send({
                status: false,
                message: 'Token has expired',
            })
            return
        }
        req.user = decode.user
        next()
    }catch(e){
        res.status(401).json({message: 'Unauthorized', e})
    }
}
