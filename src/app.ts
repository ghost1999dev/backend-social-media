//Config my server
import express from "express";
import cors from 'cors'
import morgan from "morgan";

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/ping',(req:express.Request,res:express.Response)=>{
    try {
        res.json({message:"Hello word"})
    } catch (error) {
        console.log(error);
        
    }
})
export default app