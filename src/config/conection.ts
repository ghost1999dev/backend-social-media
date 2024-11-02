import mongoose from "mongoose";
const conection=async()=>{
    try {
        //Rememeber change your database
        //in this case it`s social in your case it will be your database
        await mongoose.connect('mongodb://127.0.0.1:27017/social')
        console.log("Connection succesfull");
    } catch (error) {
        console.log(error);
    }
}
export {conection}