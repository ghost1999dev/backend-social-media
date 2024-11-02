//Config my server
import express from "express";
import cors from 'cors'
import morgan from "morgan";
import { conection} from "./config/conection";
import  UserRoute  from "./routes/user.routes";

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api',UserRoute)

conection()

export default app