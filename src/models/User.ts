import {  Schema,Document, model} from "mongoose";

interface UserInterface extends Document{
    name:string,
    surname:string,
    password:string,
    role:string,
    image:string,
    created_at:Date
}


const UserModel=new Schema<UserInterface>({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"administrator"
    },
    image:{
        type:String,
        default:"image_user"
    },
    created_at:{
        type:Date
    }

})

const User = model<UserInterface>('User',UserModel)

export default User